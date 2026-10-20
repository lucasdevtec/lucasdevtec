import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ltech.dev.br";

export const viewport: Viewport = {
  themeColor: "#0c111d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Lucas Oliveira | Desenvolvedor Web Freelancer & Sistemas Sob Medida",
    template: "%s | Lucas Oliveira",
  },
  description:
    "Desenvolvedor Web Full Stack especializado em criar soluções digitais modernas, landing pages de alta conversão, sistemas web sob medida e aplicativos mobile. Transformo ideias em produtos que funcionam.",
  applicationName: "Lucas Oliveira | Soluções Web & Software",
  authors: [{ name: "Lucas Oliveira", url: siteUrl }],
  creator: "Lucas Oliveira",
  publisher: "Lucas Oliveira",
  category: "technology",
  keywords: [
    "Lucas Oliveira",
    "Lucas DevTec",
    "lucasdevtec",
    "desenvolvedor full stack",
    "programador full stack",
    "desenvolvedor web",
    "desenvolvedor front-end",
    "desenvolvedor back-end",
    "desenvolvedor Next.js",
    "desenvolvedor React",
    "desenvolvedor Node.js",
    "desenvolvedor TypeScript",
    "desenvolvedor React Native",
    "NestJS",
    "PostgreSQL",
    "APIs REST",
    "Docker",
    "DevOps",
    "arquitetura de software",
    "engenharia de software",
    "portfólio desenvolvedor",
    "freelancer full stack",
    "programador freelancer",
    "criar site profissional",
    "landing page alta conversão",
    "desenvolvimento de sistemas web",
    "sistemas web sob medida",
    "orçamento criação de sites",
    "desenvolvedor web freelancer",
    "sistemas SaaS",
    "criação de aplicativos",
    "otimização SEO e performance",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Lucas Oliveira | Soluções Web & Sistemas",
    title:
      "Lucas Oliveira | Desenvolvedor Web Freelancer & Sistemas Sob Medida",
    description:
      "Criação de sites profissionais, landing pages de alta conversão, sistemas web e aplicativos sob medida. Código limpo, rápido e focado em resultados reais.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lucas Oliveira | Desenvolvedor Web Freelancer & Sistemas Sob Medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Lucas Oliveira | Desenvolvedor Web Freelancer & Sistemas Sob Medida",
    description:
      "Criação de landing pages, sistemas web sob medida e aplicativos. Transforme sua ideia em um produto de alta performance.",
    images: [
      {
        url: "/twitter-image",
        alt: "Portfólio de Lucas Oliveira, desenvolvedor full stack",
      },
    ],
    creator: "@lucasdevtec",
    site: "@lucasdevtec",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "_PnqtyEaQYKrHAz3UeEYc670vbhl2p6Aq5pCjNSnp7A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.className} min-h-screen bg-[#0a0f1d] text-slate-100 antialiased selection:bg-cyan-300 selection:text-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
