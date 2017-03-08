const handlers  = require("./handlers");


function createRoute(app) {

  app.get("/", handlers.indexPage);
  app.get("/folder", handlers.folderAction)
  app.get("/send_letter", handlers.sendLetter);
  app.post("/send_letter", handlers.sendLetterPost);
  return app
}


module.exports = createRoute;