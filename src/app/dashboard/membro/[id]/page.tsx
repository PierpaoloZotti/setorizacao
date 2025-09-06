import { getMemberByCode } from "@/actions/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Clock,
  Home,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function MembroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const membro = await getMemberByCode(id);
  if (!membro) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Membro não encontrado</h3>
              <p className="text-muted-foreground">
                O membro solicitado não foi localizado no sistema.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-balance">
                {membro?.dados_pessoais.nome}
              </h1>
              <p className="text-muted-foreground">Perfil do Membro</p>
            </div>
          </div>
        </div>
        <Link href="/dashboard" className="absolute right-4 top-4">
          <Button variant="outline" size="sm">
            <Home className="size-4" />
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                <CardDescription className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {membro?.dados_pessoais.contato.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {membro?.dados_pessoais.contato.celular}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        Endereço
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {membro?.dados_pessoais.endereco.logradouro},{" "}
                        {membro?.dados_pessoais.endereco.numero}
                        {membro?.dados_pessoais.endereco.complemento && (
                          <> | {membro?.dados_pessoais.endereco.complemento}</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        Data de Nascimento
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {membro?.dados_pessoais.nascimento
                          ? new Date(
                              membro.dados_pessoais.nascimento
                            ).toLocaleDateString("pt-BR")
                          : "Não informado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        Setorização
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {membro?.dados_pessoais.rede || "Não definido"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Histórico de Ocorrências
                    </CardTitle>
                    <CardDescription>
                      Registro completo das atividades do membro
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {membro.total_ocorrencias}{" "}
                    {membro.total_ocorrencias === 1
                      ? "ocorrência"
                      : "ocorrências"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-background/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold text-foreground">
                          Data
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Descrição
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {membro.ocorrencias.map((ocorrencia, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="font-medium text-sm">
                            {ocorrencia.data}
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary/60"></div>
                              {ocorrencia.descricao}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
