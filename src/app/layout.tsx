import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ltech.dev.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lucas Oliveira | Desenvolvedor Full Stack",
    template: "%s | Lucas Oliveira",
  },
  description:
    "Portfólio de Lucas Oliveira, desenvolvedor full stack com foco em Next.js, TypeScript, APIs, arquitetura de software e produtos digitais.",
  applicationName: "Lucas Oliveira Portfolio",
  authors: [{ name: "Lucas Oliveira", url: siteUrl }],
  creator: "Lucas Oliveira",
  publisher: "Lucas Oliveira",
  category: "technology",
  keywords: [
    "Lucas Oliveira",
    "Lucas DevTec",
    "desenvolvedor full stack",
    "portfolio desenvolvedor",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "desenvolvedor web",
    "engenharia de software",
  ],
  alternates: {
    canonical: "/",
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
    siteName: "Lucas Oliveira Portfolio",
    title: "Lucas Oliveira | Desenvolvedor Full Stack",
    description:
      "Projetos, experiência e stack de Lucas Oliveira em desenvolvimento full stack, com foco em produtos web escaláveis.",
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
    title: "Lucas Oliveira | Desenvolvedor Full Stack",
    description:
      "Portfólio com projetos, stack e experiência em Next.js, TypeScript, APIs e arquitetura de software.",
    images: ["/twitter-image"],
    creator: "@lucasdevtec",
  },
  manifest: "/manifest.webmanifest",
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
