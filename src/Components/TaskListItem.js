import React, { Component } from "react"
import { Grid, Row, Col, Button, Thumbnail, Panel } from 'react-bootstrap'

class TaskComponent extends Component {
  deleteTask() {
    this.props.deleteTask(this.props.task)
  }

  updateTask() {
    this.props.updateTask(this.props.task)
  }

  render() {
    return (
      <Grid className="task-list-item__container">
        <Row className="show-grid task-list">
            <Col xs={2} md={2} className="delete-icon__container">
              <a onClick={this.deleteTask.bind(this)}><i className="fa fa-times-circle fa-2x icon"></i></a>
            </Col>
            <Col xs={10} md={10} className="task-item__container">
                <Panel onClick={this.updateTask.bind(this)}>
                  <Panel.Body>
                      <div>
                          <div className="task-title truncate__task-title"><strong>{this.props.task.title}</strong></div>
                          <div className="due-date grey">{this.props.task.due_date}</div>
                      </div>
                    <p className="truncate__task-content mt-5">{this.props.task.description}</p>
                  </Panel.Body>
                </Panel>
            </Col>
        </Row>
      </Grid>
    )
  }
}

export default TaskComponent
