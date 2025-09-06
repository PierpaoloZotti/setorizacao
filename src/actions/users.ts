"use server";
import { db } from "@/database/db";
import { user } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq, notInArray } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (response) {
      return { success: true, message: "Login realizado com sucesso" };
    } else {
      return { success: false, message: "Credenciais inválidas" };
    }
  } catch (error) {
    console.error("Erro no signIn:", error);
    const e = error as Error;
    return { success: false, message: e.message || "Erro desconhecido" };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { success: true, message: "Cadastro realizado com sucesso" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Erro desconhecido" };
  }
};

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const currentUser = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  if (!currentUser) {
    redirect("/login");
  }

  return {
    ...session,
    currentUser,
  };
};
