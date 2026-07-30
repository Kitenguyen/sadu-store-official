import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { SITE_BASE_PATH } from "./lib/site";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath: SITE_BASE_PATH,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
