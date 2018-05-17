import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this)
    this.handleOk = this.handleOk.bind(this)
  }

  handleHide() {
    this.props.handleHide()
  }

  handleOk() {
    this.props.handleOk()
  }

  render() {
    return (
      <Modal className="confirm-modal"
        show={this.props.show}
        onHide={this.handleHide}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Body>Are you sure to delete?</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleHide}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal
