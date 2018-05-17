import React, { Component } from "react"
import { Grid, Row, Col } from "react-bootstrap"

class SearchBar extends Component {

    onCreateClick() {
        this.props.onCreateClick(true)
    }

    render() {
        return (
            <Grid className="search-bar__container">
                <Row className="show-grid row-height">
                    <Col md={8}>
                        <input type="text" className="add-task__input" placeholder="Seach Task Name..." onKeyUp={this.props.searchTaskKeyUp} />
                    </Col>
                    <Col md={4}>
                        <a type="button" onClick={this.onCreateClick.bind(this)}><i className="fa fa-plus fa-lg icon"></i></a>
                        <span ><i className="fa fa-folder fa-lg icon"></i></span>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SearchBar
