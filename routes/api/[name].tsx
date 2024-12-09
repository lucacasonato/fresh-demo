import { define } from "../../utils.ts";

export const handler = define.handlers({
  GET() {
    return fetch("https://example.com/");
  },
});
