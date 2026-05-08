"use client";

import { useState, type FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import programingSVG from "../../profilegithub/programming.svg";

type Projeto = {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  imagem: string;
  status: string;
  repositorio: string;
  demo: string;
};

const softSkills = [
  "Comunicação clara",
  "Trabalho em equipe",
  "Pensamento analítico",
  "Resolução de problemas",
  "Gestão de tempo",
  "Aprendizado contínuo",
];

const hardSkills = [
  { nome: "JavaScript / TypeScript", nivel: 95 },
  { nome: "Node.js e APIs REST", nivel: 91 },
  { nome: "React e Next.js", nivel: 90 },
  { nome: "SQL e modelagem de dados", nivel: 85 },
  { nome: "Docker e CI/CD", nivel: 80 },
  { nome: "Git e GitHub", nivel: 92 },
];

const projetos: Projeto[] = [
  {
    titulo: "StudyCycle - Plataforma de Gestão de Estudos",
    descricao:
      "Aplicação full stack para gestão de estudos com trilhas, progresso e organização de rotina de forma prática.",
    tecnologias: ["Next.js", "TypeScript", "PostgreSQL"],
    imagem: "/projetos/StudyCycle.png",
    status: "Em produção",
    repositorio: "https://github.com/lucasdevtec/study-cycle",
    demo: "https://studycycle.ltech.dev.br/",
  },
  {
    titulo: "RPGManager - Sistema de Gestão de Personagens",
    descricao:
      "Aplicação mobile para criação e gestão de personagens com foco em velocidade de uso durante sessões de RPG.",
    tecnologias: ["React Native", "JavaScript", "Expo", "Zustand"],
    imagem: "/projetos/api-monitoramento.svg",
    status: "Em desenvolvimento",
    repositorio: "https://github.com/lucasdevtec/rpgmanager",
    demo: "https://rpgmanager.ltech.dev.br/",
  },
  {
    titulo: "SSTHelp - Sistema de Gestão de Segurança do Trabalho",
    descricao:
      "Plataforma de SST com monitoramento de indicadores, riscos, conformidade legal e documentação operacional.",
    tecnologias: [
      "Next.js",
      "Prisma",
      "JWT",
      "Material-UI",
      "TypeScript",
      "Domain-Driven Design",
      "PostgreSQL",
    ],
    imagem: "/projetos/painel-indicadores.svg",
    status: "Em desenvolvimento",
    repositorio: "https://github.com/lucasdevtec/ssthelp",
    demo: "https://ssthelp.ltech.dev.br/",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ltech.dev.br/#person",
      name: "Lucas Oliveira",
      alternateName: "Lucas DevTec",
      url: "https://ltech.dev.br",
      image: "https://ltech.dev.br/opengraph-image",
      jobTitle: "Desenvolvedor Full Stack",
      sameAs: [
        "https://github.com/lucasdevtec",
        "https://linkedin.com/in/lucasdevtec",
        "https://leetcode.com/u/lucasdevtec/",
      ],
      alumniOf: [
        "Análise e Desenvolvimento de Sistemas",
        "Ciência da Computação",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Arquitetura de Software",
        "DevOps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ltech.dev.br/#website",
      url: "https://ltech.dev.br",
      name: "Lucas Oliveira Portfolio",
      description:
        "Portfólio de Lucas Oliveira com projetos, stack e experiência em desenvolvimento full stack.",
      inLanguage: "pt-BR",
      publisher: {
        "@id": "https://ltech.dev.br/#person",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://ltech.dev.br/#portfolio",
      url: "https://ltech.dev.br",
      name: "Portfólio de Projetos de Lucas Oliveira",
      isPartOf: {
        "@id": "https://ltech.dev.br/#website",
      },
      about: {
        "@id": "https://ltech.dev.br/#person",
      },
    },
    {
      "@type": "ItemList",
      name: "Projetos em destaque",
      itemListElement: projetos.map((projeto, index) => ({
        "@type": "SoftwareSourceCode",
        position: index + 1,
        name: projeto.titulo,
        description: projeto.descricao,
        codeRepository: projeto.repositorio,
        url: projeto.demo,
        programmingLanguage: projeto.tecnologias.join(", "),
      })),
    },
  ],
};

const secoesNavegacao = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#contato", label: "Contato" },
];

export default function MainPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtroTecnologia, setFiltroTecnologia] = useState("Todas");
  const [contatoStatus, setContatoStatus] = useState("");

  const tecnologiasDisponiveis = [
    "Todas",
    ...new Set(projetos.flatMap((projeto) => projeto.tecnologias)),
  ];

  const projetosFiltrados =
    filtroTecnologia === "Todas"
      ? projetos
      : projetos.filter((projeto) =>
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
      setContatoStatus("Preencha todos os campos antes de enviar.");
      return;
    }

    const assunto = encodeURIComponent(`Contato via portfólio - ${nome}`);
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
    );

    window.location.href = `mailto:lucasg113377@gmail.com?subject=${assunto}&body=${corpo}`;
    setContatoStatus(
      "Mensagem pronta no seu cliente de e-mail. Obrigado pelo contato!",
    );
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-[#0c111d] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c111d]/80 backdrop-blur-md">
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6"
          aria-label="Global"
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-amber-300 text-sm font-black text-slate-900">
              LO
            </span>
            <span className="text-sm font-semibold tracking-[0.2em] text-slate-200">
              LUCAS OLIVEIRA
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {secoesNavegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-slate-100 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-slate-900/60" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-white/10 bg-[#0c111d] p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-[0.2em] text-slate-200">
              MENU
            </span>
            <button
              type="button"
              className="rounded-md p-2 text-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {secoesNavegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute -right-20 top-28 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:pb-24 lg:pt-16">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-200/40 bg-cyan-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
                Dev Full Stack
              </p>
              <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Eu construo produtos
                <span className="block bg-gradient-to-r from-cyan-200 via-sky-100 to-amber-200 bg-clip-text text-transparent">
                  que resolvem problemas reais
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Sou Lucas Oliveira, desenvolvedor web full stack com foco em
                aplicações escaláveis, experiência de usuário consistente e
                arquitetura limpa.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projetos"
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition-transform hover:-translate-y-0.5"
                >
                  Ver projetos
                </a>
                <a
                  href="https://github.com/lucasdevtec"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-100 transition-colors hover:bg-white/10"
                >
                  GitHub
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-white">+3</p>
                  <p className="text-xs uppercase tracking-wider text-slate-300">
                    Projetos ativos
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-white">90%+</p>
                  <p className="text-xs uppercase tracking-wider text-slate-300">
                    Stack moderna
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs uppercase tracking-wider text-slate-300">
                    Foco em entrega
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <Image
                alt="Ilustracao de programacao"
                width={460}
                height={460}
                priority
                className="mx-auto h-auto w-full max-w-sm"
                src={programingSVG}
              />
            </div>
          </div>
        </section>

        <section
          id="projetos"
          className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                Projeto acima de tudo
              </p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Cases em destaque
              </h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Uma seleção de produtos que mostram arquitetura, integração de
                dados e foco na experiência de quem usa.
              </p>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {tecnologiasDisponiveis.map((tech) => {
              const ativo = filtroTecnologia === tech;

              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setFiltroTecnologia(tech)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                    ativo
                      ? "border-cyan-300 bg-cyan-300 text-slate-900"
                      : "border-white/20 bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          {projetoPrincipal ? (
            <article className="mb-8 grid overflow-hidden rounded-3xl border border-white/15 bg-[#11182a] lg:grid-cols-2">
              <div className="relative min-h-72">
                <Image
                  src={projetoPrincipal.imagem}
                  alt={`Capa do projeto ${projetoPrincipal.titulo}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <span className="inline-flex rounded-full bg-amber-300 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-900">
                  {projetoPrincipal.status}
                </span>
                <h3 className="mt-4 text-2xl font-black text-white">
                  {projetoPrincipal.titulo}
                </h3>
                <p className="mt-4 text-slate-300">
                  {projetoPrincipal.descricao}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {projetoPrincipal.tecnologias.map((tecnologia) => (
                    <span
                      key={tecnologia}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-200"
                    >
                      {tecnologia}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={projetoPrincipal.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-cyan-300 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-900"
                  >
                    Ver demo
                  </a>
                  <a
                    href={projetoPrincipal.repositorio}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-100"
                  >
                    Repositorio
                  </a>
                </div>
              </div>
            </article>
          ) : null}

          {projetosSecundarios.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {projetosSecundarios.map((projeto) => (
                <article
                  key={projeto.titulo}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#10182c] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-52 w-full">
                    <Image
                      src={projeto.imagem}
                      alt={`Capa do projeto ${projeto.titulo}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-black text-white">
                      {projeto.titulo}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300">
                      {projeto.descricao}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {projeto.tecnologias.map((tecnologia) => (
                        <span
                          key={tecnologia}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-200"
                        >
                          {tecnologia}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <a
                        href={projeto.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-900"
                      >
                        Demo
                      </a>
                      <a
                        href={projeto.repositorio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-100"
                      >
                        Repositorio
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200">
              Nenhum projeto encontrado com esse filtro.
            </div>
          )}
        </section>

        <section
          id="sobre"
          className="border-y border-white/10 bg-[#101728] py-20"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                Sobre mim
              </p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Perfil tecnico com visao de produto
              </h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                Sou graduado em Análise e Desenvolvimento de Sistemas e
                estudante de Ciência da Computação, com experiência em Back-End
                e DevOps.
              </p>
              <p>
                Trabalho com tecnologias modernas para desenvolver software que
                performa bem, escala com segurança e mantém boa experiência para
                o usuário final.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://drive.google.com/file/d/17wmC1iItTjBBOndBT4VQrws4cZWNFQx-/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Currículo
                </a>
                <a
                  href="https://linkedin.com/in/lucasdevtec"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-slate-900"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6"
        >
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              Skills
            </p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Competências para tirar produto do papel
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-black text-white">Soft skills</h3>
              <ul className="mt-5 space-y-3">
                {softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-black text-white">Hard skills</h3>
              <div className="mt-5 space-y-4">
                {hardSkills.map((skill) => (
                  <div key={skill.nome}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-100">
                        {skill.nome}
                      </span>
                      <span className="text-slate-300">{skill.nivel}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-amber-300"
                        style={{ width: `${skill.nivel}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section
          id="contato"
          className="border-t border-white/10 bg-[#101728] py-20"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
              <h2 className="text-2xl font-black text-white">
                Vamos conversar
              </h2>
              <p className="mt-3 text-slate-300">
                Disponível para projetos, freelas e oportunidades de produto.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:lucasg113377@gmail.com"
                  className="block rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  Email: lucasg113377@gmail.com
                </a>
                <a
                  href="https://wa.me/5581993849219"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  WhatsApp
                </a>
                <a
                  href="https://linkedin.com/in/lucasdevtec"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <form
              onSubmit={handleContatoSubmit}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-3"
            >
              <h3 className="text-xl font-black text-white">Enviar mensagem</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
                    placeholder="voce@email.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="mensagem"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    className="w-full rounded-lg border border-white/20 bg-[#0b1222] px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
                    placeholder="Conte um pouco sobre seu projeto"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-cyan-300 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-slate-900"
              >
                Enviar por email
              </button>

              {contatoStatus ? (
                <p className="mt-3 text-sm text-slate-300">{contatoStatus}</p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0c111d]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 Lucas Oliveira. Portfólio profissional.</span>
          <div className="flex gap-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/lucasdevtec"
              className="hover:text-white"
            >
              GitHub
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/in/lucasdevtec"
              className="hover:text-white"
            >
              LinkedIn
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://leetcode.com/u/lucasdevtec/"
              className="hover:text-white"
            >
              LeetCode
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
