import { createRequestHandler } from "@netlify/remix-adapter";

const handler = createRequestHandler({
  build: () => import("../../build/server/index.js"),
  mode: "production",
});

export { handler }; 