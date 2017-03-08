const handlers  = require("./handlers");


function createRoute(app) {

  app.get("/", handlers.indexPage);
  app.get("/folder", handlers.folderAction)
  app.get("/send_letter", handlers.sendLetter);
  return app
}


module.exports = createRoute;