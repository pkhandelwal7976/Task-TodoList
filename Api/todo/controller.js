const mongoose          	= require("mongoose");
const todoList       		= require('./model.js');

exports.insertTodoList = (req, res, next)=>{
    console.log("inside controller insideTodoList",req.body)
        if (req.body.type === "Submit") {
            const todoListData = new todoList ({
                        "_id" 		       : new mongoose.Types.ObjectId(),
                        "title"            : req.body.title,
                        "status"           : req.body.status,
                        "createdAt"        : new Date()
            });
            todoListData  
                        .save()
                        .then((Data)=>{
                            res.status(200).json({
                                data   : Data,
                                message: "Live class Data inserted !!!"
                            });
                        })
                        .catch((error)=>{
                            res.status(500).json({
                                error : error,
                                message: "Some problem occured while insertion"
                            });
                        });
        }else{
            todoList
                    .put(
                        {"_id":req.body._id},
                        {$set : {
                            "title"            : req.body.title,
                            "status"           : req.body.status,
                        }}
                    )
                    .then((data)=>{
                        console.log("data after update = ",data);
                        res.status(200).json({
                            "message": "Data Updated Successfully",
                        });
                    })
                    .catch((error)=>{
                        console.log("error while updating Data = ", error);
                        res.status(500).json({
                            "message" : "Some error occured while updating Data",
                            "error"   : error
                        })
                    });
        }

}

exports.todoListData = (req, res, next)=>{
    console.log("inside 27 todoListData => ",res.data)
    todoList.find({})
                .sort({"createdAt" : -1})
                .then(TodoListData =>{
                    res.status(200).json({
                        TodoListData : TodoListData,
                        message      : "Todo List Generated !!"
                    })
                })
                .catch(error=>{
                    res.status(500).json({
						error:error,
						message:"Some error occured while generating Todo List Data !!"
					})
                })
}

exports.filterByStatus = (req, res, next)=>{
    console.log("req.params.status => ",req.params.status);

    todoList.find({"status":req.params.status})
                .sort({"createdAt" : -1})
                .then(TodoListData =>{
                    res.status(200).json({
                        TodoListData : TodoListData,
                        message      : "Todo List Generated !!"
                    })
                })
                .catch(error=>{
                    res.status(500).json({
						error:error,
						message:"Some error occured while generating Todo List Data !!"
					})
                })
}

exports.deleteOneTodoData = (req,res,next)=>{
    console.log("req.parms delete",req.params)
    todoList.deleteOne({"_id":req.params._id})
            .then(data =>{
                res.status(200).json({
                    data : data,
                    message: "Data deleted successfully" 
                })
            })
            .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while deleting Data!"
                })
            })
}

exports.updateTaskStatus = (req,res,next)=>{
    console.log("req.parms delete",req.body.status)
    todoList.updateOne(
                        {"_id":req.params.id},
                        {$set : {                           
                            "status"           : req.body.status,
                        }})
            .then(data =>{
                res.status(200).json({
                    data : data,
                    message: "Data updated successfully" 
                })
            })
            .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while updating Data!"
                })
            })
}


