"use client";

import { useState, useMemo, useEffect, type FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import programingSVG from "../../profilegithub/programming.svg";

type Projeto = {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  imagem: string;
  status: string;
  repositorio: string | null;
  demo: string | null;
  categoria?: string;
};

type Servico = {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  recursos: string[];
  prazo: string;
  icone: "rocket" | "server" | "mobile" | "api" | "seo";
  destaque?: boolean;
};

type CalculadoraOpcao = {
  id: string;
  nome: string;
  descricao: string;
  precoBase: number;
  prazos: {
    padrao: string;
    urgente: string;
    flexivel: string;
  };
  destaque?: boolean;
};

type CalculadoraRecurso = {
  id: string;
  nome: string;
  preco: number;
};

type OpcaoPrazo = {
  id: "padrao" | "urgente" | "flexivel";
  nome: string;
  descricao: string;
  badge: string;
  fatorPreco: number;
};

const prazosDesejados: OpcaoPrazo[] = [
  {
    id: "padrao",
    nome: "Padrão (Recomendado)",
    descricao: "Prazo equilibrado com rigor de testes e melhor custo-benefício",
    badge: "Mais Escolhido",
    fatorPreco: 1,
  },
  {
    id: "urgente",
    nome: "Acelerado / Prioritário",
    descricao: "Sprint dedicado para lançamentos com data crítica definida",
    badge: "Prioridade na Fila",
    fatorPreco: 1.25,
  },
  {
    id: "flexivel",
    nome: "Flexível / Sem Pressa",
    descricao: "Ideal para validação de ideia ou planejamento inicial",
    badge: "5% de Desconto",
    fatorPreco: 0.95,
  },
];

const WHATSAPP_NUMERO = "5584999797930";
const WHATSAPP_URL = "https://wa.me/5584999797930";

const servicosLista: Servico[] = [
  {
    id: "landing-page",
    titulo: "Landing Pages de Alta Conversão",
    subtitulo: "Ideal para vender produtos, serviços e captar leads",
    descricao:
      "Páginas ultra velozes (< 1s), copywriting estruturado para vendas, design responsivo moderno e integração direta com WhatsApp, CRM e pixels de anúncio (Google Ads e Meta Ads).",
    recursos: [
      "Carregamento em menos de 1 segundo (PageSpeed 95+)",
      "Design 100% responsivo para mobile, tablet e desktop",
      "Otimização SEO técnica com Schema.org para o Google",
      "Integração com WhatsApp, formulários e Google Analytics",
      "Copywriting e CTAs posicionados estrategicamente",
    ],
    prazo: "1 a 2 semanas (conforme alinhamento de conteúdo)",
    icone: "rocket",
  },
  {
    id: "sistema-web",
    titulo: "Sistemas Web & Plataformas Sob Medida",
    subtitulo: "Automatize rotinas e elimine planilhas confusas",
    descricao:
      "Plataformas completas com controle de usuários, dashboards administrativos, relatórios automáticos, persistência segura em banco de dados e arquitetura escalável.",
    recursos: [
      "Painel administrativo com permissões por perfil de usuário",
      "Banco de dados seguro (PostgreSQL/SQLite) com backups",
      "Exportação de dados em PDF, Excel e relatórios gerenciais",
      "Arquitetura moderna (Next.js, Node.js/NestJS, TypeScript)",
      "Automação de processos repetitivos da sua empresa",
    ],
    prazo: "4 a 8 semanas (1 a 2 meses em sprints ágeis)",
    icone: "server",
    destaque: true,
  },
  {
    id: "aplicativo-mobile",
    titulo: "Aplicativos Mobile (iOS e Android)",
    subtitulo: "Sua marca e serviço diretamente no bolso do cliente",
    descricao:
      "Apps desenvolvidos em React Native e Expo com visual nativo fluido, armazenamento offline-first, notificações push e integração total com APIs na nuvem.",
    recursos: [
      "Um único código de alta performance para Android e iOS",
      "Notificações push para engajar e avisar seus clientes",
      "Funcionamento offline-first com sincronização automática",
      "Design intuitivo focado em usabilidade e rapidez",
      "Apoio completo para publicação na Google Play e App Store",
    ],
    prazo: "6 a 10 semanas (1,5 a 2,5 meses incluindo homologação nas lojas)",
    icone: "mobile",
  },
  {
    id: "apis-integracoes",
    titulo: "APIs, Integrações & Inteligência Artificial / RAG",
    subtitulo: "Conecte seus sistemas a meios de pagamento, webhooks e IA",
    descricao:
      "Desenvolvimento de APIs RESTful seguras, integração com gateways de pagamento (Pix automático, Mercado Pago, Stripe), webhooks de dados e busca semântica inteligente via RAG.",
    recursos: [
      "Recebimento automático de Pix, boleto e cartão de crédito",
      "Webhooks, autenticação JWT segura e arquitetura em nuvem",
      "Integração de busca semântica em acervos e PDFs com IA/RAG",
      "Comunicação segura entre microsserviços e bancos de dados",
      "Contêineres Docker para deploy confiável e monitoramento",
    ],
    prazo: "3 a 5 semanas (conforme complexidade das integrações)",
    icone: "api",
  },
  {
    id: "seo-performance",
    titulo: "Otimização SEO Técnico & Performance",
    subtitulo: "Coloque seu site rápido e no topo das buscas do Google",
    descricao:
      "Auditoria técnica aprofundada de Core Web Vitals, reestruturação semântica, Rich Snippets (JSON-LD) e aceleração para o site carregar instantaneamente em qualquer conexão.",
    recursos: [
      "Atingimento de pontuação 90+ no Google PageSpeed Insights",
      "Metadados OpenGraph, Twitter Cards e marcação Schema.org",
      "Geração automática de Sitemap XML e Robots.txt otimizados",
      "Redução de bounce rate (abandono) por lentidão de página",
      "Estratégia de indexação para palavras-chave de alta intenção",
    ],
    prazo: "1 a 2 semanas (auditoria + refatoração técnica)",
    icone: "seo",
  },
];

const etapasProcesso = [
  {
    passo: "01",
    titulo: "Diagnóstico & Alinhamento",
    descricao:
      "Entendemos seu negócio, seu público e o que você realmente precisa. Sem empurrar custos desnecessários: desenhamos o escopo exato para resolver seu problema.",
  },
  {
    passo: "02",
    titulo: "Arquitetura & Prototipagem",
    descricao:
      "Planejamos a interface funcional e a melhor tecnologia para seu caso (Next.js, React Native, NestJS, etc.), garantindo estabilidade e custo operacional mínimo.",
  },
  {
    passo: "03",
    titulo: "Desenvolvimento Ágil & Testes",
    descricao:
      "Construímos seu projeto com código limpo, componentizado e seguro. Você recebe um link exclusivo de homologação para acompanhar a evolução em tempo real.",
  },
  {
    passo: "04",
    titulo: "Lançamento & Suporte Garantido",
    descricao:
      "Colocamos tudo no ar com domínio próprio, certificado SSL gratuito, SEO configurado e oferecemos garantia de funcionamento pós-entrega com suporte dedicado.",
  },
];

const faqsLista = [
  {
    pergunta: "Quanto custa para desenvolver um site ou sistema sob medida?",
    resposta:
      "O investimento varia conforme a complexidade e os recursos necessários. Landing pages de alta conversão possuem valores mais acessíveis (a partir de R$ 1.200), enquanto sistemas web e aplicativos sob medida são orçados de acordo com o escopo exato. Você pode simular na nossa calculadora interativa abaixo para ter uma estimativa transparente ou me chamar no WhatsApp para uma proposta personalizada sem compromisso!",
  },
  {
    pergunta: "Qual é o prazo médio de entrega do projeto?",
    resposta:
      "Os prazos são planejados de forma realista e transparente conforme o escopo e a complexidade:\n• Landing Pages de alta conversão: de 1 a 2 semanas (7 a 14 dias), com foco em copywriting persuasivo e velocidade.\n• Sistemas Web & Dashboards: de 4 a 8 semanas (1 a 2 meses) para modelagem de banco de dados, autenticação segura, painel administrativo e testes.\n• Aplicativos Mobile (iOS & Android): de 6 a 10 semanas (1,5 a 2,5 meses), incluindo telas fluidas, funcionamento offline e submissão/aprovação nas lojas Google Play e App Store.\n• O cronograma completo com entregas parciais é alinhado antes de iniciarmos, e você recebe um link de homologação para acompanhar cada evolução em tempo real.",
  },
  {
    pergunta: "O site já vem otimizado para aparecer no Google (SEO)?",
    resposta:
      "Sim! Todos os projetos são desenvolvidos com semântica HTML5 rigorosa, meta tags comerciais completas, dados estruturados JSON-LD (Schema.org), sitemap XML, robots.txt e otimização Core Web Vitals para carregamento ultrarrápido, garantindo a melhor base para indexação e ranqueamento no Google.",
  },
  {
    pergunta: "O que eu preciso ter antes de iniciar o projeto?",
    resposta:
      "Apenas a ideia do que deseja resolver ou vender. Se você já tiver logotipo, textos ou referências visuais, nós aproveitamos tudo. Se não tiver, eu oriento você em cada etapa para estruturarmos o melhor conteúdo e design para o seu público.",
  },
  {
    pergunta: "O código do projeto será meu ou ficarei preso a mensalidades?",
    resposta:
      "O código é 100% de sua propriedade! Ao contrário de plataformas proprietárias engessadas (como Wix ou plataformas que prendem seus dados), você tem liberdade total sobre a sua aplicação, seus dados e sua infraestrutura, sem mensalidades abusivas.",
  },
  {
    pergunta: "Como funciona a forma de pagamento e o suporte pós-lançamento?",
    resposta:
      "Trabalhamos com entrada e restante na entrega e homologação, ou parcelamento facilitado em Pix ou cartão de crédito. Além disso, todos os projetos contam com garantia de funcionamento pós-entrega e suporte técnico dedicado para tirar qualquer dúvida.",
  },
];

const opcoesCalculadoraTipo: CalculadoraOpcao[] = [
  {
    id: "landing-page",
    nome: "Landing Page de Alta Conversão",
    descricao: "Ideal para anúncios, venda de serviços e captura de leads",
    precoBase: 1200,
    prazos: {
      padrao: "1 a 2 semanas (7 a 14 dias)",
      urgente: "5 a 7 dias úteis",
      flexivel: "2 a 3 semanas",
    },
  },
  {
    id: "sistema-web",
    nome: "Sistema Web / Dashboard Sob Medida",
    descricao: "Gestão de dados, automação de processos e controle interno",
    precoBase: 3200,
    prazos: {
      padrao: "4 a 8 semanas (1 a 2 meses)",
      urgente: "3 a 4 semanas (sprint dedicado)",
      flexivel: "2 a 3 meses",
    },
    destaque: true,
  },
  {
    id: "app-mobile",
    nome: "Aplicativo Mobile (iOS & Android)",
    descricao: "App nativo em React Native / Expo com sincronização",
    precoBase: 4500,
    prazos: {
      padrao: "6 a 10 semanas (1,5 a 2,5 meses)",
      urgente: "4 a 6 semanas (MVP prioritário)",
      flexivel: "3 a 4 meses",
    },
  },
  {
    id: "api-integracao",
    nome: "API, Integrações & Inteligência Artificial",
    descricao: "Gateways de pagamento, webhooks e integração de IA/RAG",
    precoBase: 1800,
    prazos: {
      padrao: "3 a 5 semanas",
      urgente: "2 a 3 semanas",
      flexivel: "5 a 7 semanas",
    },
  },
];

const recursosCalculadora: CalculadoraRecurso[] = [
  {
    id: "painel-admin",
    nome: "Painel Administrativo / CMS (gerencie o conteúdo sozinho)",
    preco: 600,
  },
  {
    id: "pagamentos",
    nome: "Integração de Pagamentos (Pix automático, Cartão, Stripe)",
    preco: 500,
  },
  {
    id: "auth",
    nome: "Área de Membros / Autenticação com Níveis de Acesso",
    preco: 500,
  },
  {
    id: "seo-avancado",
    nome: "SEO Avançado & Configuração de Campanhas Google/Meta",
    preco: 400,
  },
  {
    id: "ia-rag",
    nome: "Módulo Inteligente com IA Generativa / Chatbot / RAG",
    preco: 900,
  },
];

const softSkills = [
  "Comunicação clara e transparente",
  "Foco em resolução ágil de problemas",
  "Visão de negócio e produto digital",
  "Pontualidade rigorosa nos prazos",
  "Código limpo e sustentável",
  "Aprendizado contínuo e inovação",
];

const hardSkills = [
  { nome: "JavaScript / TypeScript", nivel: 96 },
  { nome: "React & Next.js (App Router)", nivel: 94 },
  { nome: "React Native & Expo (Mobile)", nivel: 88 },
  { nome: "Node.js, NestJS & APIs REST", nivel: 92 },
  { nome: "SQL, PostgreSQL, SQLite & Prisma", nivel: 87 },
  { nome: "Docker, DevOps & CI/CD", nivel: 82 },
  { nome: "Otimização SEO & Core Web Vitals", nivel: 93 },
  { nome: "RAG & Integração com Modelos de IA", nivel: 85 },
];

const frasesHero = [
  "sistemas web modernos e sob medida",
  "landing pages de alta conversão",
  "aplicativos mobile rápidos e fluidos",
  "soluções digitais que geram lucro",
];

const imagensPlaceholder = [
  "/projetos/a.svg",
  "/projetos/b.svg",
  "/projetos/c.svg",
];

const projetos: Projeto[] = [
  {
    titulo: "Encomenda Aê - Plataforma de Gestão de Encomendas",
    descricao:
      "Aplicação full stack mobile para gestão de encomendas com rastreamento de entregas, offline-first com SQLite e sincronização na nuvem.",
    tecnologias: ["React Native", "TypeScript", "SQLite", "Expo"],
    imagem: "",
    status: "Em produção",
    repositorio: null,
    demo: "https://encomendaae.ltech.dev.br/",
    categoria: "Mobile & Full Stack",
  },
  {
    titulo: "StudyCycle - Plataforma de Gestão de Estudos",
    descricao:
      "Aplicação full stack para organização de rotina de estudos, controle de ciclos, métricas de aprendizado e banco de dados relacional.",
    tecnologias: ["Next.js", "TypeScript", "PostgreSQL"],
    imagem: "/projetos/StudyCycle.png",
    status: "Em produção",
    repositorio: "https://github.com/lucasdevtec/study-cycle",
    demo: "https://studycycle.ltech.dev.br/",
    categoria: "Sistema Web",
  },
  {
    titulo: "CardForge - Criador de Cartas Personalizadas",
    descricao:
      "Plataforma interativa para criação de cartas personalizadas em lote com renderização em alta resolução e download em massa em arquivo ZIP.",
    tecnologias: ["Next.js", "Tailwind CSS", "TypeScript"],
    imagem: "",
    status: "Em produção",
    repositorio: "https://github.com/lucasdevtec/cardforge",
    demo: "https://cardforge.ltech.dev.br/",
    categoria: "Aplicação Web",
  },
  {
    titulo: "OpenLib - Biblioteca Pessoal com Busca Semântica e RAG",
    descricao:
      "Biblioteca inteligente local-first com busca vetorial e respostas RAG em PDFs. Monorepo com API NestJS, ChromaDB, Docker e app mobile em React Native.",
    tecnologias: ["NestJS", "React Native", "Expo", "TypeScript", "Docker"],
    imagem: "",
    status: "Em desenvolvimento",
    repositorio: "https://github.com/lucasdevtec/openlib",
    demo: null,
    categoria: "IA & Monorepo",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ltech.dev.br/#person",
      name: "Lucas Oliveira",
      alternateName: ["Lucas DevTec", "Lucas Dev"],
      url: "https://ltech.dev.br",
      image: "https://ltech.dev.br/opengraph-image",
      email: "mailto:lucasprogjr@gmail.com",
      jobTitle: "Desenvolvedor Web Full Stack & Freelancer",
      knowsLanguage: ["pt-BR", "en"],
      sameAs: [
        "https://github.com/lucasdevtec",
        "https://linkedin.com/in/lucasdevtec",
        "https://leetcode.com/u/lucasdevtec/",
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Análise e Desenvolvimento de Sistemas",
        },
        {
          "@type": "EducationalOrganization",
          name: "Ciência da Computação",
        },
      ],
      knowsAbout: [
        "Desenvolvimento Web",
        "Criação de Sites",
        "Landing Pages",
        "Sistemas Web",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "NestJS",
        "React Native",
        "Docker",
        "PostgreSQL",
        "SEO e Performance",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://ltech.dev.br/#service",
      name: "Lucas Oliveira | Soluções Web & Desenvolvimento de Software",
      url: "https://ltech.dev.br",
      image: "https://ltech.dev.br/opengraph-image",
      telephone: "+5584999797930",
      email: "lucasprogjr@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Brasil",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Desenvolvimento Web e Software",
        itemListElement: servicosLista.map((servico, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: servico.titulo,
            description: servico.descricao,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://ltech.dev.br/#faq",
      mainEntity: faqsLista.map((faq) => ({
        "@type": "Question",
        name: faq.pergunta,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.resposta,
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://ltech.dev.br/#website",
      url: "https://ltech.dev.br",
      name: "Lucas Oliveira | Soluções Web & Sistemas",
      description:
        "Desenvolvimento de landing pages de alta conversão, sistemas web sob medida e aplicativos mobile.",
      inLanguage: "pt-BR",
      publisher: {
        "@id": "https://ltech.dev.br/#person",
      },
    },
    {
      "@type": "ItemList",
      name: "Cases e Projetos Recentes",
      itemListElement: projetos.map((projeto, index) => ({
        "@type": "SoftwareSourceCode",
        position: index + 1,
        name: projeto.titulo,
        description: projeto.descricao,
        codeRepository: projeto.repositorio,
        url: projeto.demo ?? projeto.repositorio ?? "https://ltech.dev.br",
        programmingLanguage: projeto.tecnologias.join(", "),
      })),
    },
  ],
};

const secoesNavegacao = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como Funciona" },
  { href: "#orcamento", label: "Simulador" },
  { href: "#projetos", label: "Cases & Projetos" },
  { href: "#faq", label: "FAQ" },
  { href: "#sobre", label: "Sobre Mim" },
  { href: "#contato", label: "Contato" },
];

export default function MainPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtroTecnologia, setFiltroTecnologia] = useState("Todas");
  const [contatoStatus, setContatoStatus] = useState("");
  const [faqAberto, setFaqAberto] = useState<number | null>(0);
  const [copiado, setCopiado] = useState(false);

  // Typewriter effect state for Hero
  const [indexFrase, setIndexFrase] = useState(0);
  const [subTexto, setSubTexto] = useState("");
  const [estaApagando, setEstaApagando] = useState(false);

  useEffect(() => {
    const fraseAtual = frasesHero[indexFrase];
    let timer: NodeJS.Timeout;

    if (!estaApagando) {
      if (subTexto.length < fraseAtual.length) {
        timer = setTimeout(() => {
          setSubTexto(fraseAtual.slice(0, subTexto.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setEstaApagando(true);
        }, 2200);
      }
    } else {
      if (subTexto.length > 0) {
        timer = setTimeout(() => {
          setSubTexto(fraseAtual.slice(0, subTexto.length - 1));
        }, 25);
      } else {
        setEstaApagando(false);
        setIndexFrase((prev) => (prev + 1) % frasesHero.length);
      }
    }

    return () => clearTimeout(timer);
  }, [subTexto, estaApagando, indexFrase]);

  // Terminal State (lucasdev.site style)
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistorico, setTerminalHistorico] = useState<
    { tipo: "cmd" | "resp"; texto: string }[]
  >([
    {
      tipo: "resp",
      texto:
        "● Sistema iniciado: Lucas DevTec OS v2.4 (Online // Disponível para novos projetos)\nDigite 'ajuda' ou use os comandos rápidos abaixo para explorar.",
    },
  ]);

  // Calculadora Interativa State (lucasdevweb.lovable.app style)
  const [calcTipo, setCalcTipo] = useState<string>("sistema-web");
  const [calcPrazo, setCalcPrazo] =
    useState<"padrao" | "urgente" | "flexivel">("padrao");
  const [calcRecursos, setCalcRecursos] = useState<string[]>([
    "auth",
    "painel-admin",
  ]);

  const tipoSelecionado = useMemo(
    () =>
      opcoesCalculadoraTipo.find((t) => t.id === calcTipo) ??
      opcoesCalculadoraTipo[0],
    [calcTipo],
  );

  const prazoSelecionadoObj = useMemo(
    () =>
      prazosDesejados.find((p) => p.id === calcPrazo) ?? prazosDesejados[0],
    [calcPrazo],
  );

  const recursosSelecionadosObj = useMemo(
    () => recursosCalculadora.filter((r) => calcRecursos.includes(r.id)),
    [calcRecursos],
  );

  const totalCalculado = useMemo(() => {
    const somaBase = recursosSelecionadosObj.reduce(
      (acc, r) => acc + r.preco,
      tipoSelecionado.precoBase,
    );
    const precoFinal =
      Math.round((somaBase * prazoSelecionadoObj.fatorPreco) / 50) * 50;
    const prazoTexto = tipoSelecionado.prazos[calcPrazo];

    return { preco: precoFinal, prazo: prazoTexto };
  }, [tipoSelecionado, recursosSelecionadosObj, calcPrazo, prazoSelecionadoObj]);

  const toggleRecurso = (id: string) => {
    setCalcRecursos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleWhatsappCalculadora = () => {
    const listaRecursosTxt =
      recursosSelecionadosObj.length > 0
        ? recursosSelecionadosObj.map((r) => `  • ${r.nome}`).join("\n")
        : "  • Nenhum adicional selecionado";

    const mensagem =
      `Olá, Lucas! 👋\n\n` +
      `Fiz uma simulação de projeto no seu site e gostaria de um orçamento formal:\n\n` +
      `📋 *PROJETO SIMULADO:*\n` +
      `*Tipo:* ${tipoSelecionado.nome}\n` +
      `*Ritmo desejado:* ${prazoSelecionadoObj.nome}\n` +
      `*Prazo estimado:* ${totalCalculado.prazo}\n` +
      `*Estimativa base:* a partir de R$ ${totalCalculado.preco.toLocaleString("pt-BR")}\n\n` +
      `⚙️ *RECURSOS DESEJADOS:*\n${listaRecursosTxt}\n\n` +
      `Podemos conversar sobre os detalhes do projeto?`;

    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  const handleCopiarProposta = () => {
    const listaRecursosTxt =
      recursosSelecionadosObj.length > 0
        ? recursosSelecionadosObj.map((r) => `  • ${r.nome}`).join("\n")
        : "  • Nenhum adicional selecionado";

    const textoProposta =
      `📋 PROPOSTA ESTIMADA - LUCAS OLIVEIRA (LTech)\n\n` +
      `Solução: ${tipoSelecionado.nome}\n` +
      `Ritmo: ${prazoSelecionadoObj.nome}\n` +
      `Prazo Estimado: ${totalCalculado.prazo}\n` +
      `Investimento Base: a partir de R$ ${totalCalculado.preco.toLocaleString("pt-BR")}\n\n` +
      `Recursos Inclusos:\n${listaRecursosTxt}\n\n` +
      `Atendimento com Contrato Formal e Emissão de Nota Fiscal (PJ)\n` +
      `WhatsApp: +55 (84) 99979-7930 | E-mail: lucasprogjr@gmail.com\n` +
      `Site: https://ltech.dev.br`;

    navigator.clipboard.writeText(textoProposta).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    });
  };

  const executarComandoTerminal = (comandoRaw: string) => {
    const cmd = comandoRaw.trim().toLowerCase();
    if (!cmd) return;

    let resposta = "";

    switch (cmd) {
      case "ajuda":
      case "help":
        resposta =
          "Comandos disponíveis:\n" +
          " • servicos   - Ver todos os serviços e soluções sob medida\n" +
          " • orcamento  - Ir para o simulador de investimento em tempo real\n" +
          " • projetos   - Listar cases de sucesso e sistemas criados\n" +
          " • processo   - Como funciona a metodologia em 4 passos\n" +
          " • skills     - Principais linguagens, frameworks e tecnologias\n" +
          " • contato    - Canais diretos (WhatsApp, e-mail, redes)\n" +
          " • whois      - Quem sou eu e minha trajetória profissional\n" +
          " • limpar     - Limpar o histórico deste terminal";
        break;

      case "servicos":
      case "services":
        resposta =
          "SOLUÇÕES ESPECIALIZADAS:\n" +
          " 1. Landing Pages de Alta Conversão (1 a 2 semanas)\n" +
          " 2. Sistemas Web & Dashboards Sob Medida (4 a 8 semanas / 1 a 2 meses)\n" +
          " 3. Aplicativos Mobile em React Native/Expo (6 a 10 semanas / 1,5 a 2,5 meses)\n" +
          " 4. APIs, Integrações de Pagamento (Pix/Stripe) e IA/RAG (3 a 5 semanas)\n" +
          " 5. Otimização SEO Técnico & Performance (1 a 2 semanas)";
        break;

      case "orcamento":
      case "simulador":
        resposta =
          "Redirecionando para o simulador interativo... Você pode simular prazos e valores e exportar para o WhatsApp!";
        document
          .getElementById("orcamento")
          ?.scrollIntoView({ behavior: "smooth" });
        break;

      case "projetos":
      case "cases":
        resposta =
          "CASES RECENTES:\n" +
          " • Encomenda Aê: App mobile full stack de encomendas (React Native/SQLite)\n" +
          " • StudyCycle: Plataforma web de gestão de estudos (Next.js/PostgreSQL)\n" +
          " • CardForge: Gerador de cartas personalizadas em lote (Next.js/Tailwind)\n" +
          " • OpenLib: Biblioteca inteligente com RAG e busca semântica (NestJS/Expo/Docker)";
        break;

      case "processo":
        resposta =
          "METODOLOGIA DE TRABALHO EM 4 PASSOS:\n" +
          " [01] Diagnóstico & Briefing → [02] Arquitetura & Design → [03] Desenvolvimento Ágil → [04] Lançamento & Suporte";
        break;

      case "skills":
        resposta =
          "STACK TÉCNICA PRINCIPAL:\n" +
          " • Front-end: Next.js, React, Tailwind CSS, TypeScript\n" +
          " • Mobile: React Native, Expo, SQLite, Offline-first\n" +
          " • Back-end: Node.js, NestJS, APIs RESTful, Docker, BullMQ\n" +
          " • Dados & IA: PostgreSQL, Prisma, ChromaDB, RAG, Ollama";
        break;

      case "contato":
        resposta =
          "CANAIS DE CONTATO:\n" +
          " • WhatsApp: +55 (84) 99979-7930 (Atendimento rápido)\n" +
          " • E-mail: lucasprogjr@gmail.com\n" +
          " • LinkedIn: linkedin.com/in/lucasdevtec\n" +
          " • GitHub: github.com/lucasdevtec";
        break;

      case "whois":
        resposta =
          "LUCAS OLIVEIRA (Lucas DevTec):\n" +
          " • Desenvolvedor Full Stack & Criador de Soluções Web\n" +
          " • Graduado em Análise e Desenvolvimento de Sistemas | Ciência da Computação\n" +
          " • Missão: Transformar problemas complexos e processos manuais em software moderno, rápido e lucrativo.";
        break;

      case "limpar":
      case "clear":
        setTerminalHistorico([]);
        setTerminalInput("");
        return;

      default:
        resposta = `Comando '${comandoRaw}' não reconhecido. Digite 'ajuda' para ver a lista de comandos válidos.`;
        break;
    }

    setTerminalHistorico((prev) => [
      ...prev,
      { tipo: "cmd", texto: `$ ${comandoRaw}` },
      { tipo: "resp", texto: resposta },
    ]);
    setTerminalInput("");
  };

  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    executarComandoTerminal(terminalInput);
  };

  const projetosComImagem = useMemo(
    () =>
      projetos.map((p, index) => ({
        ...p,
        imagem:
          p.imagem ||
          imagensPlaceholder[index % imagensPlaceholder.length],
      })),
    [],
  );

  const tecnologiasDisponiveis = [
    "Todas",
    ...new Set(projetosComImagem.flatMap((projeto) => projeto.tecnologias)),
  ];

  const projetosFiltrados =
    filtroTecnologia === "Todas"
      ? projetosComImagem
      : projetosComImagem.filter((projeto) =>
          projeto.tecnologias.includes(filtroTecnologia),
        );

  const projetoPrincipal = projetosFiltrados[0];
  const projetosSecundarios = projetosFiltrados.slice(1);

  const handleContatoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = String(formData.get("nome") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const mensagem = String(formData.get("mensagem") ?? "").trim();

    if (!nome || !email || !mensagem) {
      setContatoStatus("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const assunto = encodeURIComponent(`Orçamento / Contato de ${nome}`);
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\n\nDetalhes do projeto:\n${mensagem}`,
    );

    window.location.href = `mailto:lucasprogjr@gmail.com?subject=${assunto}&body=${corpo}`;
    setContatoStatus(
      "Sua mensagem foi preparada no seu cliente de e-mail. Responderei o mais rápido possível!",
    );
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 selection:bg-cyan-300 selection:text-slate-900 font-sans">
      {/* Background cyber grid & glow effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-400/10 blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0f1d]/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-amber-300 p-0.5 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0c1222] text-sm font-black tracking-wider text-cyan-300">
                LO
              </span>
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-white">
                LUCAS OLIVEIRA
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Disponível para projetos
              </span>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Navegação Principal"
          >
            {secoesNavegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#orcamento"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md shadow-cyan-500/20 transition hover:brightness-110 hover:-translate-y-0.5"
            >
              <SparklesIcon className="h-4 w-4" />
              Simular Orçamento
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/10 p-2 text-slate-200 lg:hidden hover:bg-white/5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-white/10 bg-[#0a0f1d] p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-widest text-slate-400">
              NAVEGAÇÃO
            </span>
            <button
              type="button"
              className="rounded-md p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-8 flex flex-col space-y-3">
            {secoesNavegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#orcamento"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-cyan-300 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md shadow-cyan-400/20"
            >
              <SparklesIcon className="h-4 w-4" />
              Simular Orçamento Agora
            </a>
          </div>
        </Dialog.Panel>
      </Dialog>

      <main>
        {/* JSON-LD Structured Data for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Value Proposition & CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  Desenvolvedor Full Stack & Soluções Web
                </div>

                <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-[50px] min-h-[135px] sm:min-h-[155px]">
                  Transformo processos manuais em{" "}
                  <span className="block mt-1 bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
                    {subTexto}
                    <span className="inline-block w-0.5 sm:w-1 h-6 sm:h-10 ml-1.5 align-middle bg-cyan-300 animate-pulse" />
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Desenvolvimento sob medida de <strong>Landing Pages</strong>{" "}
                  de alta conversão, <strong>Sistemas Web</strong>,{" "}
                  <strong>Aplicativos Mobile</strong> e integrações com APIs e
                  IA. Código próprio de alta performance, sem amarras e focado
                  em gerar resultados reais para o seu negócio.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#orcamento"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-400/25 transition-all hover:bg-cyan-200 hover:-translate-y-0.5 hover:shadow-cyan-400/40"
                  >
                    <SparklesIcon className="h-4 sm:h-5 w-4 sm:w-5" />
                    Simular Orçamento
                  </a>

                  <a
                    href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                      "Olá, Lucas! Gostaria de agendar um diagnóstico técnico rápido de 15 minutos pelo WhatsApp para alinhar meu projeto.",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-400"
                  >
                    <CalendarIcon className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-400" />
                    Diagnóstico Grátis (15 min)
                  </a>

                  <a
                    href="#servicos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Ver Soluções
                  </a>
                </div>

                {/* Key Metrics / Highlights */}
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                    <p className="text-2xl font-black text-white">&lt; 1s</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Carregamento Rápido
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                    <p className="text-2xl font-black text-cyan-300">100%</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Código Próprio
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                    <p className="text-2xl font-black text-amber-300">40%+</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Mais Conversões
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                    <p className="text-2xl font-black text-emerald-400">Suporte</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Garantia Pós-Entrega
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Developer Terminal (lucasdev.site style) */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#0d1424] shadow-2xl shadow-cyan-500/10">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#090d18] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                      <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-slate-400">
                        lucas@ltech: ~ (bash)
                      </span>
                    </div>
                    <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      Terminal Interativo
                    </span>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm">
                    <div className="max-h-64 space-y-2.5 overflow-y-auto pr-1 text-slate-300 scrollbar-thin">
                      {terminalHistorico.map((item, idx) => (
                        <div
                          key={idx}
                          className={
                            item.tipo === "cmd"
                              ? "font-bold text-cyan-300"
                              : "whitespace-pre-line text-slate-300 leading-relaxed"
                          }
                        >
                          {item.texto}
                        </div>
                      ))}
                    </div>

                    {/* Quick Command Pills */}
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <p className="mb-2 text-[11px] uppercase tracking-wider text-slate-400">
                        Atalhos rápidos para clicar:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "servicos",
                          "orcamento",
                          "projetos",
                          "processo",
                          "skills",
                          "contato",
                          "whois",
                          "limpar",
                        ].map((cmd) => (
                          <button
                            key={cmd}
                            type="button"
                            onClick={() => executarComandoTerminal(cmd)}
                            className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
                          >
                            {cmd}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Command Input Form */}
                    <form
                      onSubmit={handleTerminalSubmit}
                      className="mt-3 flex items-center gap-2 rounded-lg border border-white/15 bg-[#080d18] px-3 py-2 text-xs"
                    >
                      <span className="text-cyan-400 font-bold">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="digite um comando (ex: servicos, orcamento)"
                        className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                      />
                      <button
                        type="submit"
                        className="rounded bg-cyan-300 px-2 py-0.5 text-[10px] font-black uppercase text-slate-900 hover:bg-cyan-200"
                      >
                        Executar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SERVIÇOS & SOLUÇÕES (lucasdevweb.lovable.app style) */}
        <section
          id="servicos"
          className="border-t border-white/10 bg-[#0d1424] py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                Soluções Sob Medida
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                O que posso construir para o seu negócio?
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Desenvolvimento completo, do planejamento inicial ao deploy em
                servidores de alta performance. Escolha a solução ideal para o
                seu momento:
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicosLista.map((servico) => {
                const getIcon = () => {
                  switch (servico.icone) {
                    case "rocket":
                      return <RocketLaunchIcon className="h-6 w-6 text-cyan-300" />;
                    case "server":
                      return <ServerStackIcon className="h-6 w-6 text-amber-300" />;
                    case "mobile":
                      return (
                        <DevicePhoneMobileIcon className="h-6 w-6 text-emerald-400" />
                      );
                    case "api":
                      return <CpuChipIcon className="h-6 w-6 text-sky-400" />;
                    case "seo":
                      return <GlobeAltIcon className="h-6 w-6 text-purple-400" />;
                  }
                };

                const msgWhatsapp = encodeURIComponent(
                  `Olá, Lucas! Tenho interesse no serviço de *${servico.titulo}*. Podemos conversar sobre meu projeto?`,
                );

                return (
                  <article
                    key={servico.id}
                    className={`relative flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                      servico.destaque
                        ? "border-cyan-400/50 bg-[#111c34] shadow-xl shadow-cyan-500/10"
                        : "border-white/10 bg-[#0e1628] hover:border-white/25"
                    }`}
                  >
                    {servico.destaque && (
                      <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan-400 to-amber-300 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md">
                        Mais Procurado
                      </span>
                    )}

                    <div>
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        {getIcon()}
                      </div>

                      <h3 className="mt-5 text-xl font-black text-white">
                        {servico.titulo}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-cyan-300">
                        {servico.subtitulo}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {servico.descricao}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {servico.recursos.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs text-slate-300"
                          >
                            <CheckCircleIcon className="h-4 w-4 shrink-0 text-cyan-300 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-5">
                      <p className="text-xs font-bold text-amber-300 mb-4">
                        ⏱ {servico.prazo}
                      </p>
                      <a
                        href={`${WHATSAPP_URL}?text=${msgWhatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/15 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-cyan-300 hover:border-cyan-300 hover:text-slate-950"
                      >
                        Pedir Orçamento Deste Serviço
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: COMO FUNCIONA O PROCESSO (Metodologia) */}
        <section
          id="processo"
          className="border-t border-white/10 bg-[#0a0f1d] py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                Processo Transparente
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Como transformamos sua ideia em realidade
              </h2>
              <p className="mt-3 text-base text-slate-300">
                Sem burocracia ou termos técnicos incompreensíveis. O projeto é
                conduzido em 4 etapas claras e objetivas:
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {etapasProcesso.map((etapa) => (
                <div
                  key={etapa.passo}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-cyan-400/40 hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-3xl font-black text-cyan-300/40">
                    {etapa.passo}
                  </span>
                  <h3 className="mt-3 text-lg font-black text-white">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {etapa.descricao}
                  </p>
                </div>
              ))}
            </div>

            {/* Diferenciais Competitivos */}
            <div className="mt-16 grid gap-6 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#101b33] to-[#0a1020] p-8 lg:grid-cols-4">
              <div className="flex items-start gap-4">
                <ShieldCheckIcon className="h-7 w-7 shrink-0 text-cyan-300" />
                <div>
                  <h4 className="text-sm font-black text-white">
                    Código 100% Seu
                  </h4>
                  <p className="mt-1 text-xs text-slate-300">
                    Sem plataformas fechadas. O código fonte pertence à sua
                    empresa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BoltIcon className="h-7 w-7 shrink-0 text-amber-300" />
                <div>
                  <h4 className="text-sm font-black text-white">
                    Performance Máxima
                  </h4>
                  <p className="mt-1 text-xs text-slate-300">
                    Carregamento instantâneo que converte visitantes e agrada o
                    Google.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ChatBubbleLeftRightIcon className="h-7 w-7 shrink-0 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-black text-white">
                    Sem Intermediários
                  </h4>
                  <p className="mt-1 text-xs text-slate-300">
                    Comunicação ágil e direta com quem realmente programa a
                    solução.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <SparklesIcon className="h-7 w-7 shrink-0 text-sky-300" />
                <div>
                  <h4 className="text-sm font-black text-white">
                    Garantia Pós-Entrega
                  </h4>
                  <p className="mt-1 text-xs text-slate-300">
                    Suporte dedicado e acompanhamento garantido após o
                    lançamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SIMULADOR DE ORÇAMENTO INTERATIVO (lucasdevweb.lovable.app style) */}
        <section
          id="orcamento"
          className="border-t border-white/10 bg-[#0d1424] py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-cyan-300">
                Estimativa Instantânea
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Simulador de Orçamento em Tempo Real
              </h2>
              <p className="mt-3 text-base text-slate-300">
                Selecione o tipo de projeto e os recursos desejados para calcular
                o prazo e investimento estimado. Depois, envie direto para o
                WhatsApp com 1 clique!
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* Opções da Calculadora */}
              <div className="space-y-8 lg:col-span-7">
                {/* 1. Escolha do Tipo */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
                    1. Escolha o tipo de solução:
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {opcoesCalculadoraTipo.map((tipo) => {
                      const ativo = calcTipo === tipo.id;
                      return (
                        <button
                          key={tipo.id}
                          type="button"
                          onClick={() => setCalcTipo(tipo.id)}
                          className={`relative flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                            ativo
                              ? "border-cyan-300 bg-cyan-400/10 shadow-md shadow-cyan-400/10"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex w-full items-start justify-between gap-2">
                            <span
                              className={`text-sm font-black ${
                                ativo ? "text-cyan-300" : "text-white"
                              }`}
                            >
                              {tipo.nome}
                            </span>
                            {tipo.destaque && (
                              <span className="rounded-full bg-gradient-to-r from-cyan-400 to-amber-300 px-2 py-0.5 text-[9px] font-black uppercase text-slate-950 shrink-0 shadow-sm">
                                Mais Procurado
                              </span>
                            )}
                          </div>
                          <span className="mt-1 text-xs text-slate-400">
                            {tipo.descricao}
                          </span>
                          <span className="mt-3 text-[11px] font-bold text-amber-300">
                            Base: a partir de R${" "}
                            {tipo.precoBase.toLocaleString("pt-BR")} ({tipo.prazos.padrao})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Escolha do Prazo Ideal */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
                    2. Qual é o seu prazo ideal?
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {prazosDesejados.map((prazo) => {
                      const ativo = calcPrazo === prazo.id;
                      return (
                        <button
                          key={prazo.id}
                          type="button"
                          onClick={() => setCalcPrazo(prazo.id)}
                          className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                            ativo
                              ? "border-cyan-300 bg-cyan-400/10 shadow-md shadow-cyan-400/10"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div>
                            <span
                              className={`text-xs font-black ${
                                ativo ? "text-cyan-300" : "text-white"
                              }`}
                            >
                              {prazo.nome}
                            </span>
                            <span className="mt-1.5 block text-[11px] leading-relaxed text-slate-400">
                              {prazo.descricao}
                            </span>
                          </div>
                          <span className="mt-3 inline-block rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            {prazo.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Escolha dos Recursos Adicionais */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
                    3. Selecione os recursos adicionais necessários:
                  </h3>
                  <div className="mt-4 space-y-2.5">
                    {recursosCalculadora.map((recurso) => {
                      const selecionado = calcRecursos.includes(recurso.id);
                      return (
                        <label
                          key={recurso.id}
                          onClick={() => toggleRecurso(recurso.id)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                            selecionado
                              ? "border-cyan-400/50 bg-cyan-400/5"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selecionado}
                              onChange={() => {}}
                              className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                            />
                            <span className="text-xs sm:text-sm font-medium text-slate-200">
                              {recurso.nome}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-300 shrink-0 ml-2">
                            + R$ {recurso.preco}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Resumo do Orçamento */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 rounded-2xl border border-cyan-400/40 bg-gradient-to-b from-[#111c34] to-[#0a1122] p-7 shadow-2xl shadow-cyan-500/10">
                  <span className="inline-flex rounded-full bg-cyan-300/10 border border-cyan-300/30 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Resumo da Simulação
                  </span>

                  <h4 className="mt-4 text-2xl font-black text-white">
                    {tipoSelecionado.nome}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300">
                    {tipoSelecionado.descricao}
                  </p>

                  <div className="mt-6 space-y-3 border-y border-white/10 py-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Prazo estimado:</span>
                      <span className="font-bold text-amber-300 text-right">
                        {totalCalculado.prazo}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Ritmo de entrega:</span>
                      <span className="font-bold text-cyan-300">
                        {prazoSelecionadoObj.nome}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Recursos inclusos:</span>
                      <span className="font-bold text-slate-200">
                        {recursosSelecionadosObj.length} adicionais
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-400">
                        Investimento base estimado:
                      </span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs text-slate-400">a partir de</span>
                        <span className="text-3xl font-black text-cyan-300">
                          R$ {totalCalculado.preco.toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        * Prazos e valores realistas alinhados em contrato formal antes
                        do início. Parcelamento disponível em Pix e cartão.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={handleWhatsappCalculadora}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 hover:-translate-y-0.5"
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      Enviar Simulação no WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={handleCopiarProposta}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-950/30 py-3 text-xs font-bold text-cyan-300 transition-all hover:bg-cyan-900/40 hover:border-cyan-400/60"
                    >
                      {copiado ? (
                        <>
                          <CheckIcon className="h-4 w-4 text-emerald-400" />
                          <span>Proposta Copiada para Área de Transferência!</span>
                        </>
                      ) : (
                        <>
                          <DocumentDuplicateIcon className="h-4 w-4 text-cyan-400" />
                          <span>Copiar Resumo da Proposta (Ctrl+C)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* B2B Trust Badges */}
                  <div className="mt-5 rounded-xl border border-white/5 bg-slate-900/40 p-3">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheckIcon className="h-3.5 w-3.5 text-cyan-400" />
                        Contrato Formal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-400" />
                        Nota Fiscal (PJ)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GlobeAltIcon className="h-3.5 w-3.5 text-amber-400" />
                        Atendimento Brasil & Exterior
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[11px] text-slate-400">
                    Atendimento rápido sem compromisso! Resposta em minutos no horário comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CASES & PROJETOS RECENTES */}
        <section
          id="projetos"
          className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                Cases em Produção
              </p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Projetos desenvolvidos
              </h2>
              <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base">
                Exemplos práticos de software demonstrando arquitetura limpa,
                integrações reais e foco na experiência do usuário:
              </p>
            </div>
          </div>

          {/* Technology Filter Pills */}
          <div className="mb-10 flex flex-wrap gap-2">
            {tecnologiasDisponiveis.map((tech) => {
              const ativo = filtroTecnologia === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setFiltroTecnologia(tech)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-all ${
                    ativo
                      ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-md shadow-cyan-400/20"
                      : "border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          {projetoPrincipal ? (
            <article className="mb-10 overflow-hidden rounded-3xl border border-white/15 bg-[#10192e] shadow-2xl transition hover:border-cyan-400/40">
              {/* Browser Window Chrome Topbar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#090e1a] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-1 text-[11px] font-mono text-slate-300">
                  <span className="text-emerald-400 text-xs">🔒</span>
                  <span className="truncate max-w-[220px] sm:max-w-xs">
                    {projetoPrincipal.demo
                      ? projetoPrincipal.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
                      : projetoPrincipal.repositorio
                      ? projetoPrincipal.repositorio.replace(/^https?:\/\//, "")
                      : "https://ltech.dev.br/cases"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-300">
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="hidden sm:inline">LIVE DEMO</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-72 bg-[#090d18] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/10">
                  {projetoPrincipal.imagem ? (
                    <Image
                      src={projetoPrincipal.imagem}
                      alt={`Capa do projeto ${projetoPrincipal.titulo}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6">
                      <CodeBracketIcon className="h-16 w-16 text-cyan-400/60" />
                      <span className="mt-3 font-mono text-xs font-bold text-slate-400">
                        {projetoPrincipal.categoria ?? "Sistema Web Full Stack"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-amber-300 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-slate-950">
                      {projetoPrincipal.status}
                    </span>
                    <h3 className="mt-4 text-2xl font-black text-white">
                      {projetoPrincipal.titulo}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {projetoPrincipal.descricao}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {projetoPrincipal.tecnologias.map((tecnologia) => (
                        <span
                          key={tecnologia}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                        >
                          {tecnologia}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {projetoPrincipal.demo && (
                      <a
                        href={projetoPrincipal.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-300 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-cyan-200 shadow-md shadow-cyan-300/20"
                      >
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        Acessar Demo
                      </a>
                    )}
                    {projetoPrincipal.repositorio && (
                      <a
                        href={projetoPrincipal.repositorio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-100 transition hover:bg-white/10"
                      >
                        Ver Repositório
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          {projetosSecundarios.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projetosSecundarios.map((projeto) => (
                <article
                  key={projeto.titulo}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0e1628] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40"
                >
                  {/* Browser Window Chrome Topbar */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#090d18] px-3.5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="max-w-[170px] truncate rounded bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                      {projeto.demo
                        ? projeto.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
                        : projeto.repositorio
                        ? projeto.repositorio.replace("https://github.com/", "gh/")
                        : "demo.ltech.dev.br"}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </div>

                  <div className="relative h-48 w-full bg-[#080d18] flex items-center justify-center">
                    {projeto.imagem ? (
                      <Image
                        src={projeto.imagem}
                        alt={`Capa do projeto ${projeto.titulo}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <CommandLineIcon className="h-12 w-12 text-cyan-400/40" />
                        <span className="mt-2 font-mono text-[11px] text-slate-400">
                          {projeto.categoria ?? "Full Stack Case"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-black text-white">
                        {projeto.titulo}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
                        {projeto.descricao}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {projeto.tecnologias.map((tecnologia) => (
                          <span
                            key={tecnologia}
                            className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300"
                          >
                            {tecnologia}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2 border-t border-white/10 pt-4">
                      {projeto.demo && (
                        <a
                          href={projeto.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-cyan-300 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-cyan-200"
                        >
                          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                          Demo
                        </a>
                      )}
                      {projeto.repositorio && (
                        <a
                          href={projeto.repositorio}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-lg border border-white/15 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
                        >
                          Repositório
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300 text-center">
              Nenhum projeto encontrado com essa tecnologia.
            </div>
          )}
        </section>

        {/* SECTION: FAQ (Perguntas Frequentes & SEO Rich Snippets) */}
        <section id="faq" className="border-t border-white/10 bg-[#0d1424] py-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                Tire Suas Dúvidas
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Perguntas Frequentes
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Respostas diretas para as principais perguntas sobre
                desenvolvimento, valores e prazos:
              </p>
            </div>

            <div className="mt-12 space-y-3.5">
              {faqsLista.map((faq, index) => {
                const aberto = faqAberto === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setFaqAberto(aberto ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white transition hover:text-cyan-300"
                    >
                      <span>{faq.pergunta}</span>
                      <ChevronDownIcon
                        className={`h-5 w-5 shrink-0 text-cyan-400 transition-transform duration-200 ${
                          aberto ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {aberto && (
                      <div className="border-t border-white/5 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                        {faq.resposta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6 text-center">
              <p className="text-sm font-bold text-white">
                Ficou com alguma dúvida específica sobre o seu projeto?
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Me envie uma mensagem no WhatsApp. Respondo com rapidez!
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-300"
              >
                <ChatBubbleLeftRightIcon className="h-4 w-4" />
                Falar Comigo no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: SOBRE MIM & SKILLS */}
        <section
          id="sobre"
          className="border-t border-white/10 bg-[#0a0f1d] py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                  Perfil Técnico
                </p>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  Engenharia de software com foco em resultados reais de negócio
                </h2>
                <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
                  <p>
                    Sou <strong>Lucas Oliveira</strong>, desenvolvedor Full Stack com sólida base acadêmica — graduado em{" "}
                    <strong>Análise e Desenvolvimento de Sistemas</strong> e
                    graduando em <strong>Ciência da Computação</strong>.
                  </p>
                  <p>
                    Não encaro a tecnologia apenas como linhas de código, mas como uma{" "}
                    <strong>alavanca estratégica para empresas</strong>: automatizar rotinas manuais repetitivas,
                    eliminar planilhas confusas e transformar visitantes em clientes com plataformas modernas,
                    rápidas e altamente responsivas.
                  </p>
                  <p>
                    Minha abordagem combina o melhor de dois mundos: <strong>rigor técnico de engenharia</strong> (código limpo,
                    bancos de dados relacionais bem modelados, testes e arquitetura modular) com{" "}
                    <strong>visão comercial prática</strong>: o software precisa ser intuitivo e instantâneo para quem usa, e
                    lucrativo para quem contrata.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://drive.google.com/file/d/17wmC1iItTjBBOndBT4VQrws4cZWNFQx-/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                  >
                    Baixar Currículo
                  </a>
                  <a
                    href="https://linkedin.com/in/lucasdevtec"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-amber-300 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-200"
                  >
                    Conectar no LinkedIn
                  </a>
                  <a
                    href="https://github.com/lucasdevtec"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <Image
                  alt="Ilustração de Lucas desenvolvendo software"
                  width={420}
                  height={420}
                  className="mx-auto h-auto w-full max-w-sm drop-shadow-2xl"
                  src={programingSVG}
                />
              </div>
            </div>

            {/* Competências / Skills Grid */}
            <div id="skills" className="mt-20 grid gap-8 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-[#0d1424] p-7">
                <h3 className="text-xl font-black text-white">
                  Diferenciais & Soft Skills
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Como conduzo o relacionamento e a entrega dos projetos:
                </p>
                <ul className="mt-6 space-y-3.5">
                  {softSkills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#0d1424] p-7">
                <h3 className="text-xl font-black text-white">
                  Hard Skills & Tecnologias
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Domínio técnico aplicado em produção:
                </p>
                <div className="mt-6 space-y-4">
                  {hardSkills.map((skill) => (
                    <div key={skill.nome}>
                      <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-100">
                          {skill.nome}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {skill.nivel}%
                        </span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={`Nível de domínio em ${skill.nome}`}
                        aria-valuenow={skill.nivel}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-2 w-full rounded-full bg-white/10"
                      >
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-amber-300"
                          style={{ width: `${skill.nivel}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: CONTATO / FORMULÁRIO */}
        <section
          id="contato"
          className="border-t border-white/10 bg-[#0d1424] py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                    Vamos Conversar?
                  </span>
                  <h2 className="mt-2 text-3xl font-black text-white">
                    Inicie seu projeto hoje
                  </h2>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Estou disponível para novos projetos, demandas de consultoria
                    ou contratação freelance. Escolha o canal que preferir:
                  </p>

                  <div className="mt-8 space-y-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="text-xs text-slate-400">WhatsApp Direto</p>
                        <p>+55 (84) 99979-7930</p>
                      </div>
                    </a>

                    <a
                      href="mailto:lucasprogjr@gmail.com"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      <div>
                        <p className="text-xs text-slate-400">E-mail Principal</p>
                        <p>lucasprogjr@gmail.com</p>
                      </div>
                    </a>

                    <a
                      href="https://linkedin.com/in/lucasdevtec"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      <div>
                        <p className="text-xs text-slate-400">Rede Profissional</p>
                        <p>linkedin.com/in/lucasdevtec</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-slate-400">
                    💡 Resposta garantida em até 24 horas úteis.
                  </p>
                </div>
              </div>

              {/* Formulário de Mensagem */}
              <form
                onSubmit={handleContatoSubmit}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:col-span-3"
              >
                <h3 className="text-xl font-black text-white">
                  Envie uma mensagem
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Conte um pouco sobre o que você deseja construir:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Seu Nome *
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-white/15 bg-[#080d18] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      placeholder="Ex: Carlos Silva"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Seu E-mail *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-white/15 bg-[#080d18] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      placeholder="carlos@empresa.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="mensagem"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Descrição do Projeto ou Ideia *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-white/15 bg-[#080d18] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      placeholder="Descreva seu projeto, o objetivo da sua empresa e o prazo desejado..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-cyan-200"
                  >
                    Enviar Mensagem por E-mail
                  </button>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:underline"
                  >
                    Prefere WhatsApp? Fale comigo agora →
                  </a>
                </div>

                {contatoStatus && (
                  <p className="mt-4 rounded-lg bg-cyan-400/10 border border-cyan-400/30 p-3 text-xs text-cyan-200">
                    {contatoStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#070b14] text-slate-300">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-white/10">
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-2">
              <span className="font-mono text-base font-black tracking-wider text-white">
                LTech<span className="text-cyan-400">.dev.br</span>
                <span className="text-amber-400">_</span>
              </span>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-400">
                Desenvolvedor Web Full Stack especializado em sistemas web sob medida, landing pages que convertem visitantes em clientes e aplicativos de alta performance.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <span className="text-cyan-400">🌐</span>
                <span>Atendimento remoto para todo o Brasil e exterior</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400">🛡️</span>
                <span>Segurança contratual: Contrato Formal e Emissão de Nota Fiscal (PJ)</span>
              </div>
            </div>

            {/* Column 2: Navegação Rápida */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                Navegação
              </p>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <a href="#servicos" className="hover:text-cyan-300 transition">
                    Serviços & Soluções
                  </a>
                </li>
                <li>
                  <a href="#processo" className="hover:text-cyan-300 transition">
                    Como Funciona o Processo
                  </a>
                </li>
                <li>
                  <a href="#orcamento" className="hover:text-cyan-300 transition">
                    Simulador de Orçamento
                  </a>
                </li>
                <li>
                  <a href="#projetos" className="hover:text-cyan-300 transition">
                    Cases & Projetos
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-cyan-300 transition">
                    Dúvidas Frequentes (FAQ)
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contato & Social */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                Conecte-se
              </p>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={WHATSAPP_URL}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
                  >
                    WhatsApp Direto
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/lucasdevtec"
                    className="hover:text-cyan-300 transition"
                  >
                    GitHub (@lucasdevtec)
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://linkedin.com/in/lucasdevtec"
                    className="hover:text-cyan-300 transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://leetcode.com/u/lucasdevtec/"
                    className="hover:text-cyan-300 transition"
                  >
                    LeetCode
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:lucasprogjr@gmail.com"
                    className="hover:text-cyan-300 transition"
                  >
                    lucasprogjr@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Lucas Oliveira. Todos os direitos reservados.
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              Next.js 15 • React 19 • Tailwind CSS • TypeScript
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (High Conversion) */}
      <aside aria-label="Atendimento via WhatsApp">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar comigo no WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-emerald-500 px-4 py-3 text-slate-950 font-black shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 hover:bg-emerald-400"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-950 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-slate-950" />
          </span>
          <span className="text-xs uppercase tracking-wider font-extrabold text-slate-950">
            WhatsApp Online
          </span>
        </a>
      </aside>
    </div>
  );
}
