import React from "react";

class TodoItem extends React.Component{
    
    render(){

        return(
            <div className="todo_item">
                    
                    <div  className="task_title item_layout" >
                        <i className="fa fa-bookmark icon" aria-hidden="true"></i>
                        {this.props.title}
                    </div>
                    <div  className="task_description item_layout">
                        <i className="fa fa-info-circle icon" aria-hidden="true"></i>
                        {this.props.description}
                    </div>
                    <div  className="task_deadline item_layout">
                        <i className="fa fa-calendar icon" aria-hidden="true"></i>
                        Deadline : {this.props.deadline}
                        </div>
                    <div className = "anchor_button">
                        <button className="del_btn option_button" value={this.props.id} onClick = {(e) =>this.props.deleteFun(e.target.value)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            Delete
                        </button>
                                   
                        <button id = "done" className="done_btn option_button" >
                            <i className="fa fa-check-square-o" aria-hidden="true"></i>
                            Mark as Done
                        </button>
                        <button className="edit_btn option_button" onClick={() => this.props.editFun(this.props.title,this.props.description,this.props.deadline)}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Edit
                        </button>
                    </div>
            </div>

        );
        
    }
}

export default TodoItem;