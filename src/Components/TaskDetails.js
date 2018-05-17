import React, { Component } from "react"
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap"

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <FormControl {...props} />
        </FormGroup>
    )
}

class TaskModal extends Component {
    constructor(props, context) {
        super(props, context)

        this.handleClose = this.handleClose.bind(this)
        this.handleSave = this.handleSave.bind(this)

        this.state = {
            show: false
        }
    }

    // Get input value, trigger saveUpdateTaskModal
    handleSave() {
        let newTask = {
            id: this.props.task.id || "",
            title: document.getElementById("taskTitle").value,
            description: document.getElementById("taskDescription").value,
            due_date: document.getElementById("taskDueDate").value,
            type: document.getElementById("taskType").value
        }
        this.props.saveUpdateTaskModal(newTask)
    }

    handleClose() {        
        this.props.handleUpdateTaskModal()
        this.props.handleCreateTaskModal()
    }

    render() {
        return (
          
              <Modal show={this.props.show} onHide={this.handleClose} container={this} bsSize="small" aria-labelledby="contained-modal-title-lg">
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-lg">
                    Task Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form id="taskModal">
                    <FieldGroup
                      id="taskTitle" type="text" label="Task Title" defaultValue={this.props.task.title || ""}
                      placeholder="Enter Task Title" />
                    <FieldGroup
                      id="taskDescription" type="text" label="Task Description" defaultValue={this.props.task.description || ""}
                      placeholder="Enter Task Description"/>
                    <FieldGroup
                      id="taskDueDate"
                      type="date"
                      label="Task Due Date"
                      defaultValue={this.props.task.due_date || ""} />
                    <FieldGroup
                      id="taskType"
                      type="text"
                      label="Type"
                      placeholder="Enter Task Type"
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="primary" onClick={this.handleSave}>
                    Save
                  </Button>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
        )
    }
}

export default TaskModal
