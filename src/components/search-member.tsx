"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getMemberByName } from "@/actions/actions";
import { toast } from "sonner";

const formSchema = z.object({
  nome: z.string().min(2).max(50),
});

export function SearchMember() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const membro = await getMemberByName(values.nome);
    if (!membro) {
      toast.error("Membro não encontrado");
    }
    toast.success("Membro encontrado");
    console.log(membro);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Procurar membro..."
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
