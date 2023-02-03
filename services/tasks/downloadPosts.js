const { RateLimit } = require('async-sema')

const fetchPostAndRetry = (id, retries = 2) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/`)
    .then(res => res.json())
    .catch(err => {
      if (retries > 0) {
        return fetchPostAndRetry(id, retries - 1)
      }
      throw err
    })
}

const savePost = (post) => {
  // Save post to database
  console.log('save post')
}

const downloadPost = async (id) => {
  const post = await fetchPostAndRetry(id)
  await savePost(post);
  
  return true
}

module.exports = async () => {
  // Fetch posts from the API
  const numPosts = 25 //50;
  const limit = RateLimit(5);

  let promises = [];

  // Download posts concurrently
  for (let i = 0; i < numPosts; i++) {
    await limit();
    promises.push(downloadPost(i).then(() => {
      return {
        status: 'success',
        id: i
      }
    })
    .catch((err) => {
      return {
        status: 'error',
        id: i
      }
    }))
  }

  // Wait for all promises to resolve and log results
  const results = await Promise.all(promises);
  const failed = result.filter(r => r.status === 'error').length;
  const succeeded = result.filter(r => r.status === 'success').length;

  console.log(`Succesfully downloaded ${succeeded} posts, failed ${failed} posts.`)


}