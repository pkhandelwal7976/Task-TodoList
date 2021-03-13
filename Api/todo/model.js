const mongoose 		  =  require('mongoose');

const todoListSchema = mongoose.Schema({
	_id 		: mongoose.Schema.Types.ObjectId,
    title 		: String,
    status      : String,
	createdAt 	: Date,
});

module.exports = mongoose.model("todolist", todoListSchema);