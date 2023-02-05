# Post fetcher - an Adway task
This is an Express app that fetches posts hourly and stores them in a MongoDB.

## Requirements
* Node 18+
* Access to a MongoDB server

## Getting started
#### 1) Install packages   
  ```bash
  npm install
  ```
#### 2) Add your MongoDB details to .env
  ```bash 
  cp .env.example .env
  ```
#### 3) Build and run the app
  ```bash
  npm run build && npm run start
  ```
#### 4) You're live!

## Using the app
This app has two main features:
* a background service that fetches remote posts hourly and stores them in a database
* an API for updating stored posts

### Updating posts via API

```javascript
// POST /api/posts/:id
{
  "title": "Post title",
  "body": "Post body"
}
```


## Features

### Express server
The app starts a vanilla Express.js server. 
Both the task runner and the API is run by the server process for simplicity.
In a production scenario, we would likely want to separate these.

### Task runner
A simple task runner that can run any function at a given interval.
Tasks are registered as an array of objects with a name, interval and callback.
By default, a single task is registered that fetches and saves posts.

The task runner is built to be flexible and portable so it can easily be moved into it's own application or replaced by another task runner.

### Post fetching
The task runner is used to trigger a job that repeatedly fetches posts from a remote source, keeping them updated.
A post that was edited through the API will not be overwritten.

This fetch job is consolidated to a single file with no constraints because it might need to be extracted together with the task runner or moved into a lambda function.

### Editing API
Posts can be edited through a simple REST API. 
When editing a post, the edit date is stored.

This API endpoint is setup as a standard Express route.
