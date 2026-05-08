import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucas Oliveira | Desenvolvedor Full Stack",
    short_name: "Lucas Oliveira",
    description:
      "Portfólio de Lucas Oliveira com projetos, experiência e stack em desenvolvimento full stack.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c111d",
    theme_color: "#0c111d",
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
