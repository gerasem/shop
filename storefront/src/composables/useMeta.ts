import { useHead } from "unhead";

export function useMeta(title: string, description: string = "") {
  useHead({
    title: `${title} | Minishop`,
    meta: [
      {
        name: "description",
        content: description,
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  });
}
