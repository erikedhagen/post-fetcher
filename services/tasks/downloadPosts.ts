import { RateLimit } from "async-sema";

/**
 * Fetch a post, retrying N times if it fails
 */
const fetchPostAndRetry = (id: number, retries = 2): Promise<Post> => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/`)
    .then((res) => res.json())
    .catch((err: Error) => {
      if (retries > 0) {
        return fetchPostAndRetry(id, retries - 1);
      }
      throw err;
    });
};

/**
 * Save a post to the database
 */
const savePost = (post: Post) => {
  console.log("save post");
};

/**
 * Download a post from the API and save it to the database
 */
const downloadPost = async (id: number) => {
  await fetchPostAndRetry(id)
    .then(async (post) => {
      return savePost(post);
    })
    .catch((err) => {
      return false;
    });

  return true;
};

/**
 * Download posts from the API and save them to the database.
 */
export default async () => {
  const numPosts = 25; //50;
  const limit = RateLimit(5);

  let promises = [];

  for (let i = 0; i < numPosts; i++) {
    await limit();
    promises.push(
      downloadPost(i)
        .then(() => {
          return {
            status: "success",
            id: i,
          };
        })
        .catch((err) => {
          return {
            status: "error",
            id: i,
          };
        })
    );
  }

  const results = await Promise.all(promises);
  const failedCount = results.filter((r) => r.status === "error").length;
  const successCount = results.filter((r) => r.status === "success").length;

  console.log(
    `Succesfully saved ${successCount} posts, failed ${failedCount} posts.`
  );
};
