import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
class Todo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             task:'',
             todos:[],
             updateTask:''
        }
    }
    componentDidMount()
    {
        axios.get("https://todo-react12.herokuapp.com/getTodos").then(res=>{
                this.setState({todos:res.data.data})
        }).catch(error=>{
            console.log(error);
        })
    }
    addTask=()=>
    {
        if(this.state.task.length===0)
        {
            swal({
                text: "Please enter the task",
                icon: "warning",
                dangerMode: true,
              })
        }
        else
        {
            const newtodos=this.state.todos;
            const data={taskName:this.state.task}
            newtodos.push(data);
            this.setState({todos:newtodos,task:''})
            axios.post("https://todo-react12.herokuapp.com/addTodo",data).then(res=>{
            }).catch(error=>{
                console.log(error);
            })
        }
    }
    deleteTask=(taskname)=>{
            axios.delete("https://todo-react12.herokuapp.com/deleteTodo/",{data:{task:taskname}}).then(res=>{
                const todos=this.state.todos.filter(item=>{
                    return item.taskName!==taskname;
                })
                this.setState({todos:todos})
            }).catch(error=>{
                console.log(error);
            })
    }
    updateTask=()=>{
        if(this.state.task.length===0)
        {
            swal({
                text: "Please enter the new name",
                icon: "warning",
                dangerMode: true,
              })
        }
        else
        {
            const data={oldName:this.state.updateTask,newName:this.state.task}
            axios.put("https://todo-react12.herokuapp.com/updateTodo",data).then(response=>{
                const todos=this.state.todos.filter(item=>{
                    return item.taskName!==this.state.updateTask;
                })
                todos.push({taskName:this.state.task})
                this.setState({todos:todos,task:''})
            }).catch(error=>{
                console.log(error);
            })
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">
                            A Simple App using MERN STACK. You can Add Task,Delete Task and Update Task.
                        </h2>
                    </div>
                </div>
                <br/>
                <div className="row well">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" value={this.state.task} onChange={(e)=>this.setState({task:e.target.value})}/>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-success" onClick={this.addTask}>Add Task</button>
                    </div>
                </div>

                {this.state.todos.length>0&& <div className="row well">
                    <div className="col-md-12 text-center">
                    <h3>
                        List of Task is given below
                    </h3>
                    <br/>
                    </div>
                    {this.state.todos.map((item,index)=>{
                        return <div className="row" key={`update4455${index}`}>
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                <h4 className="text-center" key={index}>{item.taskName}</h4>
                                </div>
                                <div className="col-md-4" >
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={()=>this.setState({updateTask:item.taskName})}>Update</button>
                                <button  className="btn btn-primary" onClick={()=>{this.deleteTask(item.taskName)}}><i className="fa fa-trash" ></i></button>
                                </div>
                                </div>
                    })}
                    <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <h4 className="modal-title">Update the Task</h4>
                        </div>
                        <div className="modal-body">
                          <input type="text" onChange={(e)=>this.setState({task:e.target.value})} value={this.state.task} className="form-control" placeholder="Enter updated name of the task"/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.updateTask()}>Update</button>
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>}
                </div>
            </div>
        )
    }
}

export default Todo
