# Post fetcher - an Adway task
This is an Express app that fetches posts hourly and stores them in a MongoDB.

## Requirements
* Node 18+
* MongoDB server

## Getting started
#### 1) Install packages   
  ```bash
  npm install
  ```
#### 2) Add your MongoDB details to .env
  ```bash 
  cp .env.example .env
  ```
#### 3) Run the server
  ```bash
  npm run start
  ```
#### 4) Done! Posts are being fetched.

## Using the app
This app has two main features:
* a background service that fetches remote posts and stores them in a database,runs a fetch job every hour
* an API for updating stored posts


### API
The REST API is available at http://localhost:3000/api/post.

#### Update a post with new data 

```json
// POST /api/posts/:id
{
  "title": "Post title",
  "body": "Post body"
}
```


## Features

### Express server
The app starts a vanilla Express.js server. 
Both the task runner and the API is run by the server process.
In a production scenario, we would likely want to separate.

### Task runner
A simple task runner to run any function at a given interval.
Tasks are registered as an array of objects with a name, interval and callback.
By default, a single task is registered that fetches and saves posts.

### Post fetching
The task runner is used to repeatedly fetch posts from a remote source, keeping them updated.
Post that were manually edited are not overwritten.

### Editing API
Posts can be edited through a simple REST API.
