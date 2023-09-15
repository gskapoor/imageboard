import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

const app = new Elysia()
  .use(html())
  .get("/", ({html}) => 
    html(
      <BaseHtml>
        <body>
          <div id="messages">
            Content
          </div>
          <button hx-post="/clicked" hx-target="#messages" hx-swap="outerHTML">
            Pull my Finger
          </button>
        </body>
      </BaseHtml>
    )
  )
  .post("/clicked", () => <div> Obama </div>)
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({children}: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>goofychan</title>
  <script src="https://unpkg.com/htmx.org@1.9.3"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

${children}
`;


