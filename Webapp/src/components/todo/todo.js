import React, { Component } from 'react'
import './todo.css';

import axios            from 'axios';
import swal             from 'sweetalert';

export default class todo extends Component {
    constructor(props) {
        super(props);
            this.state = {
                title        : "",
                status       : "pending",
                todoListData : []
            
            }
    }
    componentDidMount(){
        this.getTodoListData()
    }
    handleChange = (event)=>{
        // console.log("inside handlechange")
          var name = event.currentTarget.name;
          var value = event.currentTarget.value;
        //   console.log("value ==>",value)
          this.setState({ [name] : value},()=>{
          });
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        var formValues = {
            title : this.state.title,
            status : this.state.status,
            type :  "Submit"
        }
        // console.log("formValues => ",formValues)
        axios.post("http://localhost:3003/api/todo/post",formValues)
            .then(response =>{
                swal("Good job!", "Task Added Successfully", "success");
                // swal("Task Added Successfully","success");
                // console.log("response.data = ",response);
                this.getTodoListData()
                this.setState({
                    title:"",
                    type:"",
                    status:""
                })
            })
            .catch(error=>{
                swal("Some Error Occured while getting the  Data List",error.message,"error");
        })
    
    }
    

    getTodoListData(){
		axios.get("http://localhost:3003/api/todo/get/list")
            .then(response =>{
                // console.log("response.data = ",response.data);
                this.setState({
                		todoListData  : response.data.TodoListData,
                });
            })
            .catch(error=>{
                swal("Some Error Occured while getting the  Data List",error.message,"error");
        })
    }
    handleDelete(event){
    	event.preventDefault();
    	var id = event.currentTarget.id;
    	// console.log("id", id);
    	swal({
            title: "Are you sure you want to delete Task?",
            text: "Once deleted, you will not be able to recover this task!",
            // icon: "warning",
            dangerMode: true ,
            buttons: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete("http://localhost:3003/api/todo/delete/"+id)
		            .then(response =>{
		                swal("Task has been deleted successfully");
						this.getTodoListData()
		            })
		            .catch(error=>{
		                swal("Some Error Occured while deleting the Task list",error.message,"error");
		        })
             
            }else {
              swal("Your Task Data is safe!");
            }
          });
    }
    handleSearchbyFilter(event){
    	event.preventDefault();
        var status = event.currentTarget.value;
        // console.log("value === ",status);
       
        if(status==="all"){
            this.getTodoListData();
        }else{
            axios.get("http://localhost:3003/api/todo/get/list/"+status)
            .then(response =>{
                // console.log("response.data = ",response.data);
                this.setState({
                		todoListData  : response.data.TodoListData,
                });
            })
            .catch(error=>{
                swal("Some Error Occured while getting the  Data List",error.message,"error");
        })
        }
        
        this.setState({

         },()=>{
            // this.getLiveClassListByPackage(this.state.packageId, this.state.status);
         })
    }

    changeStatus(event){
    	event.preventDefault();
        var id = event.currentTarget.id.split("-")[0];
        var status = event.currentTarget.id.split("-")[1];
        // console.log("id value === ",id);
        // console.log("status value === ",status);
        if(status==="pending"){
            var formValues ={
                status:"completed"
            }
        }else{
            var formValues ={
                status:"pending"
            } 
        }
        
        axios.put("http://localhost:3003/api/todo/update/one/status/"+id,formValues)
            .then(response =>{
                // console.log("response.data = ",response);
                this.getTodoListData()
                this.setState({
                    status:""
                })
            })
            .catch(error=>{
                swal("Some Error Occured while getting the  Data List",error.message,"error");
        })

    }

    render() {
        return (
            <div className="container PageWrapper">
                <div className="col-12 mt-40 ">
                    <div className="col-7 mx-auto formWrapper">
                        <h2 className="text-center heading"> Create A Task</h2>
                        <hr/>
                        <form className="form-group">
                            <input type="text" placeholder="Enter New Task" name="title" id="title" className="form-control"
                                onChange  = {this.handleChange.bind(this)}
                            />
                            <button type="submit" className="btn btn-primary my-4 float-right" 
                                onClick={this.handleSubmit.bind(this)}
                            ><i class="fa fa-plus" aria-hidden="true"></i>
                            &nbsp;&nbsp; Add task</button>
                        </form>
                    </div>
                </div>
                <div className="col-12 mt40">
                    <div className="col-7 mx-auto tableList">
                        <div className="col-12 ListtopBar ">
                            <div className="col-6 float-left">
                                <div className="row">
                                    <h3 className=" heading "> Task List</h3>
                                </div>
                            </div>
                            <div className="col-5 float-right ">
                                <div className="row">
                                    <select id="taskId" className="form-control" name="taskId" ref="taskId" onChange={this.handleSearchbyFilter.bind(this)}>
                                        <option value="all" >All Tasks</option>
                                        <option value="pending" >Pending Tasks</option>
                                        <option value="completed">Completed Tasks</option>
                                    </select>
                                </div>   
                            </div>
                        </div>
                        <hr/>
                        <table className="table lcListTable">
                        <tbody>
                        {
                            this.state.todoListData && this.state.todoListData.length > 0 
                            ?
                                this.state.todoListData.map((data,index)=>{
                                    return(
                                        <tr key={index} className={data.status==="pending"?"bg-warning":"bg-success"}>
                                            <td>
                                                <span>{data.title}</span>
                                                <span className="float-right boldFont">{data.status}</span>
                                            </td>
                                            <td className="">
                                                {
                                                    data.status==="pending"?
                                                        <i id={data._id+"-"+data.status}  className="fa fa-check  cursor-pointer float-left colorWhite" onClick={this.changeStatus.bind(this)} title="Mark task as Completed"></i>
                                                    :
                                                        <i id={data._id+"-"+data.status}  className="fa fa-undo  cursor-pointer float-left colorWhite" onClick={this.changeStatus.bind(this)} title="Mark task as Pending"></i>
                                                }
                                                <i id={data._id} className="fa fa-times delcolor cursor-pointer float-right colorWhite" onClick={this.handleDelete.bind(this)} title="Delete task"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            : ""
                        }
                        
                        
                      </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
