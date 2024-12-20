import { define } from "../../utils.ts";

const cache = await caches.open("test");

export const handler = define.handlers({
  async GET() {
    return await cache.match("https://example.com") ??
      new Response("nothing cached");
  },
});
