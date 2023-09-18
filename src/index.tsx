import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import * as elements from "typed-html";

// TODO: Split into multiple files

const app = new Elysia()
  .use(html())
  .get("/", ({html}) => 
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
    )
  )
  .get("/posts", () => <PostsList posts={db}/> )
  .post(
    "posts", 
    ({body}) => {
      if (body.content.length === 0){
        throw new Error("EMPTY POST");
      }
      const newPost: Post = {
        id: lastID++,
        content: body.content
      };
      db.push(newPost);
      return (<PostItem{...newPost}/>);
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
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
<body class="bg-gray-100">
  <header class="bg-green-500 p-4 text-white">
    <h1 class="text-2xl font-semibold">Basic Imageboard</h1>
  </header>
  ${children}
</body>
`;

type Post = {
  id: number;
  content: string;
};

let lastID = 3;
const db: Post[] = [
  {id: 1, content: "amongus sucks, amirite"},
  {id: 2, content: "amongus is great"}
];

function PostItem({id, content} : Post){
  return(
    <div class="border-t-2 p-4 ">
      <p>{id}: {content}</p>
    </div>
  );
}

function PostsList({posts}: {posts: Post[]}){
  const reversedPosts = [...posts].reverse();

  return(
    <main class="container mx-auto py-4">
      <PostForm />
      {reversedPosts.map((post) => (
        <PostItem {...post}/> // NOTE: this essentially takes the "post" object and splits it into multiple items
      ))}
    </main>
  );
}

// TODO Clear form after submit

function PostForm(){
  return (
    <form
      class="flex flex-row space-x-3"
      hx-post="posts"
      hx-swap="afterend"
      hx-trigger="submit"
    >
      <tr>
      <td><input type="text" name="content" class="border border-black" /></td>
      <td><button type="submit">Submit</button></td>
      </tr>
    </form>

  );

}




