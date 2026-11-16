import { FUNDAMENTAL, MATRICULAS_FAQ, MEDIO, SCHOOL, TECNICOS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

// Export estático: sem isto o build falha em "collecting page data".
export const dynamic = "force-static";

// llms.txt para motores de resposta (llmstxt.org). Todo fato sai de constants.ts,
// igual ao JSON-LD — o arquivo não tem dado próprio para sair de sincronia.
export function GET() {
  const cursos = TECNICOS.map(
    (curso) =>
      `- Técnico em ${curso.name} (integrado ao Ensino Médio): ${curso.schedule}, com diploma técnico ao fim dos três anos.`,
  ).join("\n");

  const faq = MATRICULAS_FAQ.map((item) => `- **${item.q}** ${item.a}`).join("\n");

  const text = `# ${SCHOOL.name}

> Colégio estadual gratuito em ${SCHOOL.city} (${SCHOOL.state}), fundado em ${SCHOOL.founded}.
> Atende os anos finais do Ensino Fundamental Integral, o Ensino Médio regular e dois
> cursos técnicos integrados ao Ensino Médio.

## Contato

- Endereço: ${SCHOOL.address}, ${SCHOOL.neighborhood}, ${SCHOOL.city}-${SCHOOL.state}, CEP ${SCHOOL.cep}
- Telefone: ${SCHOOL.phone}
- E-mail: ${SCHOOL.email}
- Secretaria: ${SCHOOL.secretaria.label}
- Instagram: ${SCHOOL.instagramUrl}
- Cadastro oficial na SEED-PR: ${SCHOOL.seedUrl}

## Modalidades e horários

- Fundamental Anos Finais · Integral: ${FUNDAMENTAL.schedule}, com alimentação inclusa e ônibus especial até o Terminal Central na saída.
- ${MEDIO.name}: ${MEDIO.schedule}, com itinerários formativos e foco em ENEM, UEL e UFPR.
${cursos}

## Páginas

- [Início](${SITE_URL}/): modalidades, estrutura, conquistas e passo a passo da matrícula.
- [Contato e matrículas](${SITE_URL}/contato/): endereço, telefone, horário da secretaria e documentos.
- [APMF](${SITE_URL}/apmf/): associação de pais, mestres e funcionários, contribuição e prestação de contas.

## Matrícula

A matrícula é gratuita e começa pela manifestação de interesse na Área do Aluno da SEED-PR.
Depois, os documentos são entregues na secretaria do colégio.

${faq}
`;

  return new Response(text, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
