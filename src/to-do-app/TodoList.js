import React from "react";
import TodoItem from "../to-do-app/TodoItem";


class TodoList extends React.Component{

    state = {
        taskTitle: "",
        taskDescription : "",
        taskDeadline : "",
        todoItems: []

    }

    async componentDidMount(){

        console.log("entered mount");

        const url = "http://localhost:5000/api/todo/showAllTask";
        let response = await fetch(url);
        let data = await response.json();
        
        console.log(data.todoList);
        // console.log(data.todoList.length);
        
        this.setState({
            todoItems :data.todoList,
            taskTitle:"",
            taskDescription:"",
            taskDeadline:""
        })

        // console.log("component" + this.state.taskTitle);
        // console.log("component" + this.state.todoItems);
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
                key ={item._id}
                id = {item._id}
                title={item.title}
                description ={item.description}
                deadline = {item.deadline}
                deleteFun= {(id) => {this.deleteTodoItem(id)}}
                componentFun = {this.componentDidMount}
                editFun = {(id, title, description, deadline) => {this.editTodoItem(id, title, description, deadline)}} 
            />                        
        )
        );

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

     addTodoItem(){

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
        .then(()=> this.componentDidMount())
        
    
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
    
    deleteTodoItem(id){
        var url = "http://localhost:5000/api/todo/delete_edit_markTask/" + id;
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
        .then(()=> this.componentFun())

        
    }

    // editTodoItem(id,editTitle,editDescription,editDeadline){

    //     this.setState({
    //         taskTitle: editTitle,
    //         taskDescription: editDescription,
    //         taskDeadline: editDeadline
    //     })

    //     var url = "http://localhost:5000/api/todo/delete_edit_markTask/" + id;
    //     console.log(url + id );

    //     console.log("entered edit function");

    //     fetch(url,{
    //         method: "PUT",
    //         body: JSON.stringify({
    //             title : editTitle,
    //             description: editDescription,
    //             deadline: editDeadline
    //         }),
    //         headers:{
    //             "Content-type":"application/json, charset = UTF-8"
    //         }
    //     })
    // }

    markAsDone(id){

        var url = "http://localhost:5000/api/todo/delete_edit_markTask/" + id;
        console.log(url + id );

        console.log("entered delete function");
        // console.log(id);

        fetch(url ,{
            method : "PUT",
            body: JSON.stringify({

                isCompleted: true
            }) ,
            headers: {
                "Content-type": "application/json; charset = UTF-8"
            }
        })
        // .then()

    }

    
}

export default TodoList;
