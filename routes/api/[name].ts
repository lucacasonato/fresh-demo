import { define } from "../../utils.ts";

const cache = await caches.open("test");

export const handler = define.handlers({
  async GET(ctx) {
    const resp = new Response(ctx.params.name);
    await cache.put("https://example.com", resp);
    return new Response("cached");
  },
});
