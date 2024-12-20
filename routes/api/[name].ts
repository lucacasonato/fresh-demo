import { define } from "../../utils.ts";

const cache = await caches.open("test");

export const handler = define.handlers({
  async GET(ctx) {
    const url = new URL("https://example.com");
    url.searchParams.set("name", ctx.params.name);

    if (ctx.url.searchParams.get("set")) {
      const resp = new Response();
      resp.headers.set("x-test", ctx.url.searchParams.get("set")!);
      await cache.put(url, resp);
      return new Response("cached");
    }

    const cached = await cache.match(url);
    if (cached) {
      await cached.body?.cancel();
      return new Response(cached.headers.get("x-test"));
    } else {
      return new Response("not cached");
    }
  },
});
