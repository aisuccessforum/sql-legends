import worker from "../../worker/index";

export const onRequest = (ctx: { request: Request; env: unknown }) =>
  (worker as any).fetch(ctx.request, ctx.env, ctx);