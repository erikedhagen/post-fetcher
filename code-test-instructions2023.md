## Description

### Part 1

Create a scheduled task that fetches the first 50 posts from these API endpoints:
https://jsonplaceholder.typicode.com/posts/1
https://jsonplaceholder.typicode.com/posts/2
...
https://jsonplaceholder.typicode.com/posts/50

You should make 5 concurrent requests at a time.

Requests can randomly fail, so handle failures by retrying a specific request two times in case the server doesn't return 200 status.

Store the posts in a mongoDB collection. On subsequent runs a post should be overwritten with the latest data (in case a post is edited for example). This task should run once every hour.

### Part 2

We want to be able to change posts in our database. Create a REST endpoint that enables us to send in a request to change the title and body of a post. Make sure the updated post doesn't get overwritten the next time the scheduled task runs. Don't worry about authorization.

### Notes

Some of the constraints in this task are purely artificial (like the 5 request limit). Your code should nonetheless work within these constraints.

We'd like the code to come with proper documentation that specifies how to get the code and database running.

Also explain design decisions you have taken during the exercise in the readme file.

Please commit the code and documentation to a private Github repo and invite our reviewing developers Github users below;

oskarwiskman
joakimeliasson
cahed78
AdnanDervisevic
svahn1

We'll evaluate the code structure, quality and cleaness.
