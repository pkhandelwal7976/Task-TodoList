const express 	= require('express');
const router 	= express.Router();

const todoListController = require("./controller.js");


router.post('/post', 	                todoListController.insertTodoList);
router.get('/get/list',                 todoListController.todoListData);
router.get('/get/list/:status',         todoListController.filterByStatus);
router.delete('/delete/:_id',           todoListController.deleteOneTodoData);
router.put('/update/one/status/:id',    todoListController.updateTaskStatus);

module.exports = router;
