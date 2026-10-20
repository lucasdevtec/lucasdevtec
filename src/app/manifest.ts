import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucas Oliveira | Desenvolvedor Web & Sistemas Sob Medida",
    short_name: "Lucas.dev",
    description:
      "Criação de sites profissionais, landing pages de alta conversão e sistemas web sob medida por Lucas Oliveira.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1d",
    theme_color: "#0a0f1d",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
