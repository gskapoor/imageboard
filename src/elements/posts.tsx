import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

// file imports
import { postsTable } from "../db/db";
import { Post } from "../global/types";

const db = postsTable;

export const handlePosts = (app: Elysia) =>
{
  app
  .get("/posts", () => <PostsList posts={db}/> )
  .post(
    "posts", 
    ({body}) => {
      if (body.content.length === 0){
        throw new Error("EMPTY POST");
      }
      const newPost: Post = {
        id: db.length + 1,
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
    return app;
}

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
