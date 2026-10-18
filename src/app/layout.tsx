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
    default: "Lucas Oliveira | Desenvolvedor Full Stack (Next.js, React & Node.js)",
    template: "%s | Lucas Oliveira",
  },
  description:
    "Portfólio de Lucas Oliveira (Lucas DevTec), desenvolvedor Full Stack especialista em Next.js, React, TypeScript, Node.js, NestJS, React Native, APIs REST e arquitetura de software escalável.",
  applicationName: "Lucas Oliveira Portfolio",
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
    siteName: "Lucas Oliveira | Portfólio Full Stack",
    title: "Lucas Oliveira | Desenvolvedor Full Stack (Next.js, React & Node.js)",
    description:
      "Conheça os projetos, habilidades e experiência de Lucas Oliveira em desenvolvimento web e mobile full stack com foco em performance e arquitetura limpa.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Portfólio de Lucas Oliveira, desenvolvedor full stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Oliveira | Desenvolvedor Full Stack (Next.js, React & Node.js)",
    description:
      "Portfólio com projetos em produção, stack moderna (Next.js, TypeScript, Node.js, React Native) e arquitetura de software.",
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
    <html lang="pt-BR">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
