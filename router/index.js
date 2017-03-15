const handlers  = require("./handlers");


function createRoute(app) {

  app.get("/", handlers.indexPage);
  app.get("/create-post", handlers.createAction);
  app.post("/create-post", handlers.createActionPost);
  app.get("/post/:id", handlers.editPost)
  app.post("/post/:id", handlers.editPostPost)
  return app
}


module.exports = createRoute;