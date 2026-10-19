import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "./index";
import { SITE_ORIGIN, withBasePath } from "../lib/site";

export const Route = createFileRoute("/egg")({
  head: () => {
    const canonical = new URL(withBasePath("/egg"), SITE_ORIGIN).toString();

    return {
      meta: [
        { title: "Combo Trứng Gà Thảo Dược SADU" },
        {
          name: "description",
          content:
            "Combo trứng gà thảo dược SADU: ưu đãi mua combo, giao hàng toàn quốc và hỗ trợ đặt hàng nhanh.",
        },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: EggLandingPage,
});

function EggLandingPage() {
  return <LandingPage hero="trung-ga-thao-duoc" eggMode />;
}
