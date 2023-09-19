import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

// FILE IMPORTS

import { loadBaseHtml } from "./elements/base";
import { handlePosts } from "./elements/posts";

// TODO: Split into multiple files

const app = new Elysia()
  .use(html())
  .use(loadBaseHtml)
  .use(handlePosts)
  .listen(3000);
console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);