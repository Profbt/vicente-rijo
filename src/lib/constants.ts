export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${BASE_PATH}${path}`;
}

export type ModalItem = { title: string; description: string; icon?: string };

export type ModalSection = { title: string; intro?: string; items: ModalItem[]; highlight?: boolean };

export type ModalData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: ModalSection[];
  image?: string;
  imagePosition?: string;
  accent?: "parana";
};

export const SCHOOL = {
  name: "Colégio Estadual Vicente Rijo",
  shortName: "Vicente Rijo",
  nickname: "Vicente Rijo",
  city: "Londrina",
  state: "PR",
  cep: "86020-000",
  address: "Av. Juscelino Kubitscheck, 2372",
  neighborhood: "Boa Vista",
  phone: "(43) 3323-7630",
  phoneWhats: "(43) 3323-7630",
  email: "ldavicenterijo@escola.pr.gov.br",
  instagram: "@cevicenterijo_oficial",
  instagramUrl: "https://www.instagram.com/cevicenterijo_oficial",
  founded: 1946,
  celebration: 80,
  areaM2: "25.541",
  students: "1.000+",
  teachers: "100+",
  classrooms: "30+",
  navLinks: [
    { label: "Por que o VR", href: "#por-que" },
    { label: "Ensino", href: "#ensino" },
    { label: "Estrutura", href: "#estrutura" },
    { label: "Conquistas", href: "#conquistas" },
    { label: "Matrículas", href: "#matriculas" },
    { label: "APMF", href: "#apmf" },
  ],
};

export const APMF = {
  pix: "(43) 99999-0000",
  president: "Roberto Almeida Santos",
  fiscal: "Manoela C. Freitas",
  fiscalTeacher: "Prof. Jonas F. Viana",
  cnpj: "78.032.711/0001-35",
  pixCopiaECola:
    "00020126360014BR.GOV.BCB.PIX0114780327110001355204000053039865802BR5901N6001C62110507PixSITE6304D2AD",
  contribution: "R$ 20",
  email: "apmfvicenterijo@gmail.com",
};

export const FUNDAMENTAL = {
  name: "Ensino Fundamental · Anos Finais (Integral)",
  schedule: "8h às 15h10",
  highlights: [
    "3 refeições diárias: café, almoço e lanche",
    "Atividades lúdicas e práticas além da sala de aula",
    "Clubes e projetos de protagonismo",
    "Professores especialistas, mestres e doutores",
    "Práticas de acolhimento",
  ],
  details: {
    eyebrow: "Ensino Fundamental Integral · Paraná Integral",
    title: "Um dia inteiro de aprendizado, esporte e cuidado",
    intro: "O estudante permanece no colégio das 08h às 15h10, em uma vivência integrada de 35 horas semanais, sem separar turno e contraturno, com alimentação inclusa e ônibus especial que leva os alunos ao Terminal Central na saída.",
    sections: [
      {
        title: "Matriz ampliada",
        intro: "Além da base curricular, o aluno desenvolve competências contemporâneas em componentes próprios do integral.",
        items: [
          {
            icon: "chip",
            title: "Educação Digital: Programação e Robótica",
            description: "Lógica, criação e protagonismo digital em atividades aplicadas.",
          },
          {
            icon: "light-bulb",
            title: "Empreendedorismo e Projeto de Vida",
            description: "Iniciativa, criatividade e construção de metas para o futuro.",
          },
          {
            icon: "book-open",
            title: "Estudo Orientado e Práticas Experimentais",
            description: "Rotina de estudos guiada e vivências investigativas de ciência.",
          },
        ],
      },
      {
        title: "Clubes de protagonismo",
        intro: "Espaços de escolha e autonomia em que cada estudante desenvolve projetos em equipe.",
        items: [
          {
            icon: "puzzle",
            title: "Robótica e Tecnologia",
            description: "Montagem, programação e desafios práticos com robôs.",
          },
          {
            icon: "megaphone",
            title: "Comunicação e Oratória",
            description: "Debates e apresentações que fortalecem argumentação e confiança.",
          },
          {
            icon: "swatch",
            title: "Arte e Criatividade",
            description: "Música, teatro e artes visuais para expressar a identidade.",
          },
        ],
      },
      {
        title: "Pilares do modelo",
        highlight: true,
        intro: "Os princípios que sustentam a vivência de um dia inteiro de aprendizado.",
        items: [
          {
            icon: "heart",
            title: "Acolhimento",
            description: "O aluno chega, é recebido e constrói vínculos reais com a escola.",
          },
          {
            icon: "users",
            title: "Pedagogia da Presença",
            description: "Educadores que acompanham de perto o percurso acadêmico e humano.",
          },
          {
            icon: "sparkles",
            title: "Escola dos Sonhos",
            description: "Protagonismo, escuta ativa e possibilidades reais de futuro.",
          },
          {
            icon: "badge",
            title: "Prova Paraná +",
            description:
              "A avaliação estadual que abre portas: no Fundamental, o bom desempenho na Prova Paraná é um dos critérios para o acesso ao Ganhando o Mundo, o intercâmbio internacional gratuito da SEED-PR.",
          },
        ],
      },
    ],
    image: "/img/images/fundamental-alunos.png",
    imagePosition: "center 25%",
    accent: "parana",
  } satisfies ModalData,
};

export const TECNICOS = [
  {
    name: "Administração",
    code: "ADM",
    description:
      "Aprenda a gerir empresas, finanças, rotinas administrativas e atendimento: uma porta de entrada para o mercado e o empreendedorismo. Com noções de RH, marketing e logística, o aluno desenvolve postura profissional, organização e visão estratégica para atuar com segurança no ambiente empresarial.",
    topics: ["Rotinas administrativas", "Gestão financeira", "Atendimento ao cliente", "Recursos Humanos"],
    details: {
      eyebrow: "Curso Técnico Integrado ao Ensino Médio",
      title: "Técnico em Administração",
      intro: "Formação integrada ao Ensino Médio (07h30 às 12h50) que prepara o jovem para o mercado empresarial e o empreendedorismo, com visão prática de gestão, organização e tomada de decisão.",
      sections: [
        {
          title: "Eixos de formação",
          intro: "Seis áreas que estruturam a rotina administrativa das empresas e o empreendedorismo.",
          items: [
            {
              icon: "briefcase",
              title: "Gestão e planejamento",
              description: "Princípios de administração, organização de processos, análise de informações e apoio à tomada de decisões.",
            },
            {
              icon: "users",
              title: "Pessoas e liderança",
              description: "Recursos Humanos, gestão de equipes, liderança organizacional e comunicação no ambiente de trabalho.",
            },
            {
              icon: "cash",
              title: "Finanças e economia",
              description: "Orçamentos, fluxo de caixa, demonstrativos financeiros e princípios econômicos aplicados às organizações.",
            },
            {
              icon: "megaphone",
              title: "Marketing, comunicação e vendas",
              description: "Estratégias de marketing, comunicação empresarial, relacionamento com o público e processos de vendas.",
            },
            {
              icon: "cube",
              title: "Produção, logística e qualidade",
              description: "Gestão de materiais, produção, serviços, logística, processos e controle da qualidade.",
            },
            {
              icon: "chip",
              title: "Tecnologia aplicada à administração",
              description: "Informática empresarial e utilização de sistemas de informação nas atividades administrativas.",
            },
          ],
        },
        {
          title: "Formação profissional",
          highlight: true,
          intro: "Ao concluir o curso com êxito, o estudante recebe o Diploma de Técnico em Administração.",
          items: [
            {
              icon: "academic-cap",
              title: "Diploma de Técnico em Administração",
              description: "Preparado para apoiar atividades administrativas nas áreas de pessoas, finanças, marketing, materiais, produção e serviços.",
            },
          ],
        },
        {
          title: "Prova Paraná Mais",
          intro: "Mais uma possibilidade de ingresso na universidade pública.",
          items: [
            {
              title: "Aprova Paraná",
              description: "A nota da Prova Paraná Mais pode ser utilizada para concorrer a vagas pelo Aprova Paraná nas universidades participantes, conforme os editais, requisitos e critérios de classificação vigentes.",
            },
          ],
        },
      ],
    image: "/img/images/NEMADM-alunos.png",
    imagePosition: "center 7%",
  } satisfies ModalData,
  },
  {
    name: "Desenvolvimento de Sistemas",
    code: "DS",
    description:
      "Programe, crie sites e aplicativos e conheça as tecnologias que movem o mundo digital, a profissão mais procurada da década. Com certificações intermediárias ao final de cada série e contato com banco de dados, mobile e Inteligência Artificial, o aluno sai do Ensino Médio pronto para o mercado de tecnologia.",
    topics: ["Programação", "Desenvolvimento web", "Lógica e robótica", "Banco de dados", "Desenvolvimento mobile"],
    details: {
      eyebrow: "Curso Técnico Integrado ao Ensino Médio",
      title: "Técnico em Desenvolvimento de Sistemas",
      intro: "3.232 horas integradas ao Ensino Médio (07h30 às 12h50) para formar programadores com repertório, prática e visão profissional do setor de tecnologia.",
      sections: [
        {
          title: "Certificações intermediárias",
          highlight: true,
          intro: "Reconhecimento progressivo ao final de cada série do curso.",
          items: [
            {
              icon: "terminal",
              title: "1ª Série · Programador de Sistemas",
              description: "Lógica, fundamentos de programação e primeiras soluções digitais.",
            },
            {
              icon: "code",
              title: "2ª Série · Desenvolvedor Front-End",
              description: "Interfaces, experiência do usuário e desenvolvimento visual.",
            },
            {
              icon: "server",
              title: "3ª Série · Desenvolvedor Back-End",
              description: "Dados, servidores, integrações e estruturação completa de sistemas.",
            },
          ],
        },
        {
          title: "Tecnologias estudadas",
          items: [
            {
              icon: "code",
              title: "Linguagens",
              description: "Python, Java, JavaScript, HTML e CSS.",
            },
            {
              icon: "database",
              title: "Dados e aplicativos",
              description: "SQL, React Native e fundamentos de Inteligência Artificial.",
            },
          ],
        },
        {
          title: "Estrutura que ensina",
          items: [
            {
              icon: "desktop",
              title: "6 laboratórios de informática",
              description: "Aprendizagem prática e contato real com ferramentas digitais.",
            },
            {
              icon: "chip",
              title: "Celeiro de robótica",
              description: "Projetos, testes, prototipagem e inovação.",
            },
          ],
        },
        {
          title: "Formação profissional",
          highlight: true,
          intro: "Ao concluir o curso com êxito, o estudante recebe o Diploma de Técnico em Desenvolvimento de Sistemas.",
          items: [
            {
              icon: "academic-cap",
              title: "Diploma de Técnico em Desenvolvimento de Sistemas",
              description: "Preparado para desenvolver, implantar e manter sistemas computacionais, atuando no mercado de tecnologia com repertório prático e certificações intermediárias por série.",
            },
          ],
        },
        {
          title: "Prova Paraná Mais",
          intro: "Mais uma possibilidade de ingresso na universidade pública.",
          items: [
            {
              title: "Aprova Paraná",
              description: "A nota da Prova Paraná Mais pode ser utilizada para concorrer a vagas pelo Aprova Paraná nas universidades participantes, conforme os editais, requisitos e critérios de classificação vigentes.",
            },
          ],
        },
      ],
    image: "/img/images/NEMSIS-alunos.png",
    imagePosition: "center 21%",
  } satisfies ModalData,
  },
];

export const MEDIO = {
  name: "Ensino Médio Regular",
  description:
    "Formação completa com foco em ENEM, vestibulares e desenvolvimento integral, com o suporte da nossa estrutura e dos nossos professores.",
  highlight: "Preparação para ENEM e vestibulares",
  details: {
    eyebrow: "Ensino Médio Regular",
    title: "Preparação forte para o ensino superior",
    intro: "Formação no período matutino (07h30 às 12h50) com foco intenso em UEL, UFPR e ENEM, unindo itinerários formativos, orientação e desenvolvimento integral.",
    sections: [
      {
        title: "Itinerários formativos",
        intro: "As duas grandes áreas de aprofundamento do Paraná, ofertadas pelo Vicente Rijo.",
        items: [
          {
            icon: "book-open",
            title: "Linguagens e Ciências Humanas",
            description: "Leitura crítica, argumentação, repertório cultural e análise social.",
          },
          {
            icon: "calculator",
            title: "Matemática e Ciências da Natureza",
            description: "Raciocínio analítico, resolução de problemas e base científica.",
          },
        ],
      },
      {
        title: "Foco nos exames",
        highlight: true,
        intro: "Rotina pedagógica direcionada aos principais processos seletivos da região e do país.",
        items: [
          {
            icon: "academic-cap",
            title: "UEL, UFPR e ENEM",
            description: "Preparação intensa para os processos seletivos mais disputados da região e do país.",
          },
          {
            icon: "clipboard",
            title: "Prova Paraná",
            description: "Acompanhamento contínuo do desempenho do estudante.",
          },
          {
            icon: "badge",
            title: "Prova Paraná Mais",
            description:
              "A nota pode ser utilizada para concorrer a vagas pelo Aprova Paraná nas universidades participantes, conforme os editais, requisitos e critérios de classificação vigentes.",
          },
        ],
      },
      {
        title: "Apoio para escolher caminhos",
        items: [
          {
            icon: "users",
            title: "Mentoria",
            description: "Orientação próxima na escolha da carreira e em decisões mais conscientes.",
          },
          {
            icon: "light-bulb",
            title: "Projeto de Vida",
            description: "Metas, vocação e protagonismo alinhados ao futuro profissional.",
          },
        ],
      },
    ],
    image: "/img/images/NEM-alunos.png",
    imagePosition: "center 21%",
  } satisfies ModalData,
};

export const NAAHS = {
  name: "NAAHS · Polo Regional",
  description:
    "O NAAH/S-PR é o Centro de Referência Estadual responsável pelas políticas de atendimento a estudantes com Altas Habilidades/Superdotação (AH/SD). Criado em 2006 (MEC/UNESCO), desde 2010 tem sede no Colégio Estadual Vicente Rijo, consolidando-se como um dos pilares da Educação Especial no Paraná.",
  highlight: "Polo regional do NAAH/S em Londrina",
  details: {
    eyebrow: "Polo Regional NAAH/S · Colégio Vicente Rijo",
    title: "NAAH/S · Atendimento Educacional Especializado",
    intro: "O NAAH/S-PR atua como o Centro de Referência Estadual responsável por formular e implementar as políticas de atendimento aos estudantes com indicadores de Altas Habilidades/Superdotação (AH/SD). Criado em 2006 (MEC/UNESCO), o Núcleo apoia a organização e a sustentabilidade das ações voltadas ao desenvolvimento das potencialidades desses alunos. Desde 2010, com sede instalada no Colégio Estadual Vicente Rijo, o NAAH/S consolida-se como um dos pilares da Educação Especial no Paraná.",
    sections: [
      {
        title: "Três unidades de atendimento",
        highlight: true,
        intro: "Como polo regional, o NAAH/S do Vicente Rijo organiza-se em três frentes para garantir suporte integral ao estudante e à comunidade escolar.",
        items: [
          {
            icon: "user-circle",
            title: "Unidade de Atendimento ao Aluno",
            description: "Identifica e estimula estudantes com altas habilidades ou superdotação, por meio de atividades de enriquecimento curricular.",
          },
          {
            icon: "academic-cap",
            title: "Unidade de Atendimento ao Professor",
            description: "Promove a formação continuada de docentes e oferece suporte pedagógico às equipes da rede.",
          },
          {
            icon: "heart",
            title: "Unidade de Atendimento à Família",
            description: "Presta orientação e acolhimento aos familiares e à comunidade escolar.",
          },
        ],
      },
      {
        title: "Atividades de enriquecimento",
        intro: "O atendimento ocorre de forma complementar à escolarização, respeitando os ritmos, interesses e formas de aprendizagem de cada estudante.",
        items: [
          {
            icon: "light-bulb",
            title: "Ciências",
            description: "Investigações e experimentações que ampliam a curiosidade científica.",
          },
          {
            icon: "chip",
            title: "Robótica",
            description: "Criação, lógica e resolução de problemas com tecnologia aplicada.",
          },
          {
            icon: "scale",
            title: "Liderança e Raciocínio Lógico",
            description: "Protagonismo, comunicação e pensamento estratégico em desafios.",
          },
          {
            icon: "globe",
            title: "Presencial e/ou remoto",
            description: "Oficinas, projetos e atividades de aprofundamento em ações presenciais ou remotas.",
          },
        ],
      },
      {
        title: "Fluxo de admissão",
        intro: "Um processo organizado em duas etapas, articulado com as escolas e as Salas de Recursos Multifuncionais (SRM) de toda a região.",
        items: [
          {
            icon: "office-building",
            title: "1. Contato com a escola de origem",
            description: "A família inicia o processo junto à coordenação pedagógica da escola do estudante.",
          },
          {
            icon: "clipboard",
            title: "2. Avaliação diagnóstica no polo",
            description: "Agendamento no Vicente Rijo com a equipe de psicólogos e educadores do NAAH/S, polo regional responsável pelo atendimento.",
          },
        ],
      },
    ],
    image: "/img/images/naahs.png",
    imagePosition: "center 15%",
  } satisfies ModalData,
};

export const STRUCTURE = [
  { icon: "gym", title: "Ginásio de esportes", desc: "Arquibancada para 1.000+ pessoas" },
  { icon: "court", title: "4 quadras esportivas", desc: "Práticas e competições" },
  { icon: "soccer", title: "Campo de futebol", desc: "Padrão profissional" },
  { icon: "lab", title: "6 laboratórios de informática", desc: "Com robótica e tablets" },
  { icon: "science", title: "3 laboratórios de ciências", desc: "Química, física e biologia" },
  { icon: "library", title: "Biblioteca", desc: "Acervo e espaço de estudo" },
  { icon: "auditorium", title: "Salão de Eventos", desc: "Apresentações e eventos" },
  { icon: "dining", title: "Refeitório", desc: "Para 200 pessoas" },
  { icon: "classroom", title: "30+ salas climatizadas", desc: "Conforto o ano todo" },
];

export const MATRICULAS_STEPS = [
  {
    title: "Manifestação de interesse",
    desc: "Faça a manifestação de interesse pelo site oficial da SEED-PR (Área do Aluno).",
    href: "https://www.areadoaluno.seed.pr.gov.br/",
    linkLabel: "Acessar a Área do Aluno",
  },
  {
    title: "Entrega dos documentos",
    desc: "Leve os documentos do aluno e do responsável à secretaria do colégio, das 8h às 12h.",
  },
  {
    title: "Confirmação da vaga",
    desc: "A secretaria analisa e confirma a vaga. Rematrículas acontecem em novembro e dezembro.",
  },
];

export const DOCS_NECESSARIOS = [
  "Certidão de Nascimento ou RG do aluno",
  "CIN/CPF do aluno",
  "RG e CPF do responsável",
  "Comprovante de residência (Copel/Sanepar)",
  "Declaração de vacinação",
  "Histórico ou declaração de matrícula",
  "Número do NIS/Bolsa Família (se houver)",
];

export const MATRICULAS_FAQ = [
  {
    q: "A escola cobra mensalidade?",
    a: "Não. O ensino é 100% gratuito. A APMF é voluntária e o valor arrecadado é revertido em melhorias para os alunos.",
  },
  {
    q: "Preciso morar perto para matricular meu filho?",
    a: "Não. Recebemos alunos de toda a região. No Fundamental Integral, um ônibus especial leva os alunos ao Terminal Central na saída, às 15h10.",
  },
  {
    q: "Como funcionam as vagas do ensino técnico?",
    a: "As vagas seguem o cronograma oficial da SEED-PR, com divulgação pela própria secretaria. Fique atento aos prazos no site do colégio e nas redes.",
  },
  {
    q: "Quando é a rematrícula?",
    a: "As rematrículas dos alunos já matriculados acontecem em novembro e dezembro de cada ano.",
  },
];

export const APMF_CAUSES = [
  {
    title: "Aluguel de ônibus",
    desc: "Aluguel de ônibus para visitas escolares, garantindo que todos os alunos possam participar.",
  },
  {
    title: "Rapidez Estrutural",
    desc: "Consertos e manutenções urgentes que não podem esperar a verba pública chegar.",
  },
  {
    title: "Festivais e Gincanas",
    desc: "Eventos que movimentam a escola e criam memórias para os alunos.",
  },
];

export const APMF_FAQ = [
  {
    q: "Quanto devo contribuir?",
    a: "O valor sugerido é de R$ 20 por mês, mas qualquer contribuição é bem-vinda. O importante é participar.",
  },
  {
    q: "Onde o dinheiro é aplicado?",
    a: "Tudo é revertido diretamente para os alunos: material esportivo, manutenções, eventos e melhorias na estrutura.",
  },
  {
    q: "Como sei que o dinheiro é bem usado?",
    a: "A APMF é transparente: tem CNPJ próprio, diretoria eleita e prestação de contas aberta aos pais.",
  },
  {
    q: "É obrigatório contribuir?",
    a: "Não. A contribuição é voluntária, mas cada real faz diferença para manter o Vicente Rijo forte.",
  },
];

export const INSTAGRAM_URL = "https://www.instagram.com/cevicenterijo_oficial";
