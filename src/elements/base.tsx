import { Elysia} from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

/**
 * 
 * @param app The Elysia server currently running
 * @returns the same Elysia App, with the HTML base running on '/'
 * 
 */

export const loadBaseHtml = (app: Elysia) =>{
    app
    .use(html())
    .get('/', ({html}) => 
    html(
    <BaseHtml>
        <div 
        id="postList"
        class="flex w-full h-screen justify-center items-center"
        hx-get="/posts"
        hx-trigger="load"
        hx-swap="innerHTML"
        />
    </BaseHtml>
    ));
    return app; // Starting to miss those rustacean features now....
}

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
<body class="bg-gray-100">
  <header class="bg-green-500 p-4 text-white">
    <h1 class="text-2xl font-semibold">Basic Imageboard</h1>
  </header>
  ${children}
</body>
`;

   