"use client";

import { Membro } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MembroCompleto = Membro;

export const columns: ColumnDef<MembroCompleto>[] = [
  {
    accessorKey: "codigo_cadastro",
    header: "Código de Cadastro",
  },
  {
    accessorKey: "dados_pessoais.nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dados_pessoais.tipo_cadastro",
    header: "Tipo de Cadastro",
  },
  {
    accessorKey: "dados_pessoais.status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.dados_pessoais.status === "Ativo"
              ? "success"
              : "destructive"
          }
          className="text-xs py-[2px] w-[60px] text-center"
        >
          {row.original.dados_pessoais.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total_ocorrencias",
    header: "Total de Ocorrências",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/membro/${row.original.codigo_cadastro}`}>
            <Eye className="size-4" />
          </Link>
        </Button>
      );
    },
  },
];
