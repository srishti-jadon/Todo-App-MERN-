import React from "react";
import TodoItem from "../to-do-app/TodoItem";


class TodoList extends React.Component{

    state = {
        taskTitle: "",
        taskDescription : "",
        taskDeadline : "",
        todoItems: [],
        
    }

    
    render(){

        var inputBox = (
            <div id="form_box">
                <form id="new_item_form">
                    <h1 id="form_head">Add New Task</h1>

                    <div className="form_elements">
                        <input className="ip_design" type="text" placeholder="Task Title" onChange={(e)=> this.addTitle(e)} value={this.state.taskTitle}></input>
                    </div>
                    <div className="form_elements">
                        <input className="ip_design" type="text" placeholder="Task Description" onChange={(e)=> this.addDescription(e)} value={this.state.taskDescription}></input>
                    </div>
                    <div className="form_elements">
                        <input className="ip_design" type="date" placeholder="Task Deadline" onChange={(e)=> this.addDeadline(e)} value={this.state.taskDeadline}></input>
                    </div>

                </form>

                <div id="next">
                    <button className="btn" onClick={()=>this.addTodoItem()} > Add Task </button>
                </div>
            </div>

        );

        

        var listOfItems = this.state.todoItems.map(item =>(
            <TodoItem 
                id ={item.id}
                title={item.title}
                description ={item.description}
                deadline = {item.deadline}
                deleteFun= {this.deleteTodoItem}
                // editFun = {this.editTodoItem} 
            />
                        
        )
        )


        return(
            
            <div className="todo_list" >
                {inputBox}
                {listOfItems}
                
            </div>
            

        );
    }

    addTitle(e){
            
        this.setState({
            taskTitle : e.target.value
        })
    }

    addDescription(e){
        this.setState({
            taskDescription: e.target.value
        })
    }

    addDeadline(e){
        this.setState({
            taskDeadline : e.target.value
        })
    }

    async addTodoItem(){

        var url = "http://localhost:5000/api/todo/addTask";

        fetch(url, {
            method:"POST",
            body:JSON.stringify({
                title: this.state.taskTitle,
                description: this.state.taskDescription,
                deadline : this.state.taskDeadline
            }),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
        })
        .then(()=> this.showTasks())
        
    
        // var newTodoItemsArray = [...this.state.todoItems];
        
        // newTodoItemsArray.push({
        //     title : this.state.taskTitle,
        //     description : this.state.taskDescription,
        //     deadline: this.state.taskDeadline,
        // });

        // this.setState({
        //     todoItems : newTodoItemsArray,
        //     taskTitle:"",
        //     taskDescription :"",
        //     taskDeadline:""

        // })
    }

    async showTasks(){

        const url = "http://localhost:5000/api/todo/showAllTask"
        var response = await fetch(url);
        var data = await response.json();
        var test = [];
        console.log(data);
        
        for (var i=0; i< data.length; i++)
        {
            test.push(data[i])
        }

        this.setState({
            todoItems :test,
            taskTitle:"",
            taskDescription:"",
            taskDeadline:""
        })

    }
    
    deleteTodoItem(id){
        const url = "http://localhost:5000/api/todo/delete_edit_markTask/" + id;
        console.log(url + id );

        console.log("entered delete function");
        // console.log(id);

        fetch(url ,{
            method : "PUT",
            body: JSON.stringify({

                isDeleted: true
            }) ,
            headers: {
                "Content-type": "application/json; charset = UTF-8"
            }
        })
        .then( console.log("deletion successful"))

        
    }

    // editTodoItem(title,description,deadline){

    //     this.setState({
    //         taskTitle: title,
    //         taskDescription: description,
    //         taskDeadline: deadline
    //     })

    // }
}

export default TodoList;