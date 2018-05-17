import React, { Component } from "react"
import { Panel, Grid, Row, Col, Navbar, Button } from "react-bootstrap"
import TaskList from "./TaskList"
import SearchBar from "./SearchBar"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchText: "",
            sortBy: "Name",
            showCreateTask: false,
            taskNumber: 0
        }
    }



    // search function, get input value
    searchTaskKeyUp(event) {
        if (event.keyCode === 13) {
            let text = event.target.value;
            this.setState({
                searchText: text
            })
        }
    }

    showTaskNumber(taskNumber) {
        this.setState({
            taskNumber: taskNumber
        })
    }

    handleShowTaskModal(show) {
        this.setState({
            showCreateTask: show
        })
    }

    handleCreateTaskModal() {
        this.setState({ showCreateTask: false })
    }

    render() {

        return (
            <div className="container task-app__container">
                <Row className="my-3">
                    <Col md={6}><h3 className="my-0">Home</h3></Col>
                    <Col md={6} className="text-right"><i className="fa fa-user-circle fa-lg icon"></i></Col>
                </Row>
                <Row className="my-3 text-center">
                    <Col md={6}><a>Tasks</a><span className="highlight"></span></Col>
                    <Col md={6}><a>Notifications</a></Col>
                </Row>
                <SearchBar searchTaskKeyUp={this.searchTaskKeyUp.bind(this)}
                    onCreateClick={this.handleShowTaskModal.bind(this)} />
                <Panel>
                    <Panel.Body>
                        <TaskList
                            searchText={this.state.searchText}
                            showTaskNumber={this.showTaskNumber.bind(this)}
                            showCreateTask={this.state.showCreateTask}
                            handleCreateTaskModal={this.handleCreateTaskModal.bind(this)}
                            handleShowTaskModal={this.handleShowTaskModal.bind(this)} />
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default App
