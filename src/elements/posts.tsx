import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

// file imports
import { postsTable } from "../db/db";
import { Post } from "../global/types";

const db = postsTable;


/**
 * 
 * @param app the running Elysia server
 * @returns the same app, with the addition of '/posts' endpoint handlers
 */
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


// TODO Clear form after submit

/**
 * 
 * @param {id, content}: A previous post made by a user
 * @returns an HTML formatted post
 */
function PostItem({id, content} : Post){
  return(
    <div class="border-t-2 p-4 ">
      <p>{id}: {content}</p>
    </div>
  );
}

/**
 * 
 * @param {posts}: An array of post objects, meant to be recieved from the server
 * @returns the HTML for all of the posts put together. In the future, this should be per page
 */
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


/**
 * 
 * @returns A default PostForm object
 */

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
