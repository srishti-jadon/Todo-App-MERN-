const express = require("express");

const todoController = require("../controllers/todo.controller");

const router = express.Router();

router.get("/showAllTask",todoController.showAllTask);
router.get("/showPendingTask",todoController.showPendingTask);
router.get("/showCompletedTask",todoController.showCompletedTask);
router.post("/addTask",todoController.addTask);
router.put("/delete_edit_markTask/:id",todoController.delete_edit_markTask);
// router.put("/editTask/:id",todoController.editTask);


module.exports = router;