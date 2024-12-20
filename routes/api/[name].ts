import { define } from "../../utils.ts";

const cache = await caches.open("test");

export const handler = define.handlers({
  async GET(ctx) {
    const url = new URL("https://example.com");
    url.searchParams.set("name", ctx.params.name);

    if (ctx.url.searchParams.get("set")) {
      await cache.put(url, new Response(ctx.url.searchParams.get("set")));
      return new Response("cached");
    }

    const cached = await cache.match(url);
    return cached ?? new Response("not cached");
  },
});
