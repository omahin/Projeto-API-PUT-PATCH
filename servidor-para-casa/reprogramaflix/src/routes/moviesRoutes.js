const controller = require("../controllers/moviesControllers"); // importei o arquivo de controller

const express = require("express");
const router = express.Router();

router.get("/", controller.home);
router.get("/todos", controller.getAll);
router.get("/titulo", controller.getByTitle)
router.get("/genero", controller.getByGenre)
router.get("/:id", controller.getById)

router.post("/create", controller.createMovie);

router.delete("/:id", controller.deleteMovie);

router.put("/:id", controller.replaceMovie);

router.patch("/updateTitle/:id", controller.updateTitle);

router.patch("/uptade/:id", controller.updateAll);


module.exports = router;