import { RateLimit } from "async-sema";
import Post from "../../models/post";

/**
 * Fetch a post, retrying N times if it fails
 */
const fetchPostAndRetry = (id: number, retries = 2): Promise<IPost> => {
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
 * Save a post to the database, creating or updating it as necessary.
 * Will not update a post if it has been edited locally.
 */
const savePost = async (post: IPost): Promise<ISavePostResult> => {
  try {
    let postDocument = await Post.findOne({ id: post.id });

    if (!postDocument) {
      const newPost = new Post({ ...post, lastEditedAt: 0 });
      return newPost.save().then(() => ({ status: "created" }));
    }

    if (!postDocument.lastEditedAt) {
      return Post.findOneAndUpdate({ id: post.id }, post).then(() => ({
        status: "updated",
      }));
    }

    return { status: "skipped" };
  } catch (err) {
    throw err;
  }
};

/**
 * Download a post from the API and save it to the database
 */
const downloadPost = async (id: number): Promise<ISavePostResult> => {
  return fetchPostAndRetry(id)
    .then(async (post) => {
      return savePost(post);
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Download posts from external post API, save them to the database and log results.
 */
export default async () => {
  const numPosts = 50;

  console.log(`[downloadPosts]: Fetching ${numPosts} posts...`);

  const limit = RateLimit(5);

  let promises = [];

  for (let i = 0; i < numPosts; i++) {
    await limit();
    promises.push(
      downloadPost(i)
        .then((data: ISavePostResult) => {
          return {
            status: data.status,
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

  return Promise.all(promises).then((results) => {
    const errorCount = results.filter((r) => r.status === "error").length;
    const successCount = results.length - errorCount;
    const createdCount = results.filter((r) => r.status === "created").length;
    const updatedCount = results.filter((r) => r.status === "updated").length;
    const skippedCount = results.filter((r) => r.status === "skipped").length;

    console.log(
      `[downloadPosts]: Succesfully downloaded ${successCount} posts (${createdCount} created. ${updatedCount} updated, ${skippedCount} skipped). ${errorCount} posts could not be fetched.`
    );
  });
};
