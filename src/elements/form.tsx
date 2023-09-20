import * as elements from "typed-html"

/**
 * NOTE: Component is meant to go to "posts.tsx"
 * Consider refactoring this
 */

/**
 * 
 * @returns A default PostForm object
 */
export function Form(){
  return (
    <form
      class="flex flex-row space-x-5"
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