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

```js
// POST /api/posts/:id
{
  
}
```


## Architecture

### Express server
The app runs a vanilla Express.js server. 
Both the task runner and the API is initiated from *app.js*

### Task runner
A task runner service is setup in services/taskRunner.

