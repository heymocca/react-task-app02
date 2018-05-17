import React, { Component } from "react"
import TaskListItem from "./TaskListItem"
import ConfirmationDialog from "./ConfirmationModal"
import TaskDetails from "./TaskDetails"

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {},
            isLoading: true,
            showDeleteModal: false,
            showUpdateModal: false,
            initialTask: ''
        }
        this.task = {}
        
    }

    // Hide Modal
    handleHide() {
        this.setState({ showDeleteModal: false })
    }

    // Method: GET. Get all items from API
    loadTasks() {
        fetch("http://localhost:3004/Tasks", {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then(tasks => {
                this.setState({
                    tasks: tasks,
                    isLoading: false    
                })
            })
            .then(this.props.showTaskNumber(this.state.tasks.length))
            .catch(error => {
                this.setState({
                    isLoading: false
                })
            })            
    }

    // Method: DELETE. When click OK button, it will delete current item
    handleOk() {
        let self = this;
        let tasks = this.state.tasks;
        fetch("http://localhost:3004/Tasks/" + self.task.id, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                const index = self.state.tasks.indexOf(self.task);
                tasks.splice(index, 1)
                self.setState({
                    tasks: tasks,
                    showDeleteModal: false,
                    taskNumber: 0
                });
            }
        });
    }

    // Method: PUT, updating data
    updateTaskRecord(newTask) {
        let self = this;
        let index = this.state.tasks.indexOf(this.task)
        let temp = this.state.tasks;
        fetch("http://localhost:3004/Tasks/" + newTask.id, {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(newTask)
        }).then(response => {
            if (response.ok) {
                self.task = {}
                temp[index] = newTask
                self.setState({
                    showUpdateModal: false,
                    tasks: temp
                });
            }
        });
    }

    // Method: POST. Create a new item
    createTaskRecord(newTask) {
        let self = this
        let temp = { ...newTask }
        delete temp.id

        fetch("http://localhost:3004/Tasks", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(temp)
        }).then(response => {
            if (response.ok) {
                this.loadTasks();
                self.setState({
                    showUpdateModal: false
                })
                self.props.handleShowTaskModal(false)
            }
        })
    }

    // Trigger Modal: When click delete button, modal shows
    deleteTask(task) {
        this.task = task;
        this.setState({ showDeleteModal: true })
    }

    // Trigger Modal: When click task item to update, modal shows
    updateTask(task) {
        this.task = task;
        this.setState({ showUpdateModal: true })
    }

    // Trigger Modal: After changed item content, click save button, modal hides
    handleUpdateTaskModal() {
        this.setState({ showUpdateModal: false })
    }

    // Trigger Modal: Since Create Task and Update Task are using same modal, 
    // we have to use 'handleCreateTaskModal' which store as a props
    handleCreateTaskModal() {
        this.props.handleCreateTaskModal()
    }

    // Trigger Modal: Check if it's update or create based on the id
    saveUpdateTaskModal(newTask) {
        if (newTask.id) {
            this.updateTaskRecord(newTask)
        } else {
            this.createTaskRecord(newTask)
        }
    }


    // By the time componentDidMount is called, the component has been rendered once, 
    // here we trigger loadTask function to fetch the data
    componentDidMount() {
        this.loadTasks()
    }

    // Filtered list, when type any letter, check if it's empty, then return the result
    filterByName(e) {
        let self = this

        let result = self.props.searchText === "" ? true : e.title
                    .toLowerCase()
                    .includes(self.props.searchText.toLowerCase()) > 0
        return result;
    }

    // Render Task, pass id, task, delete and update function as a props store in the TaskListItem Component 
    renderTask(task) {
        return (
            <TaskListItem key={task.id} task={task} deleteTask={this.deleteTask.bind(this)} updateTask={this.updateTask.bind(this)} />
        )
    }

    render() {  
        
        console.log(this.state.tasks)
        if (this.state.isLoading) {
            return <div className="loding" />
        } else if (!this.state.tasks.length) {
            return <div className="loding-error">Error in Loading data...</div>
        }

        let showTaskModal = this.props.showCreateTask || this.state.showUpdateModal

        let tasksList = this.state.tasks
            .filter(e => this.filterByName(e))
            .map(task => this.renderTask(task))

        if (!tasksList.length) {
            return <div className="loding-error">No records to view...</div>
        }

        // In Task List, except for mapping the Task List, we have to pass some props to Child Component (Task List Item)
        // In Task List Item Component, we have to 2 functions: Delete and Update
        // 1. Trigger Modal (Show or Hide)
        // 2. Pass functions to Child component
        return (
            <div className="task-list__container">
                <div>{tasksList}</div>
                <ConfirmationDialog handleHide={this.handleHide.bind(this)} handleOk={this.handleOk.bind(this)} show={this.state.showDeleteModal} />
                <TaskDetails show={showTaskModal} handleUpdateTaskModal={this.handleUpdateTaskModal.bind(this)}
                    saveUpdateTaskModal={this.saveUpdateTaskModal.bind(this)}
                    handleCreateTaskModal={this.handleCreateTaskModal.bind(this)}
                    task={this.task}
                />
            </div>
        )
    }
}

export default TaskList;
