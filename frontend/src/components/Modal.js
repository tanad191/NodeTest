import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Song Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="song-title">Title</Label>
              <Input
                type="text"
                id="song-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Song Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song-artist">Artist</Label>
              <Input
                type="text"
                id="song-artist"
                name="artist"
                value={this.state.activeItem.artist}
                onChange={this.handleChange}
                placeholder="Enter Song Artist"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song-description">Description</Label>
              <Input
                type="text"
                id="song-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Song description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="registered"
                  checked={this.state.activeItem.registered}
                  onChange={this.handleChange}
                />
                Registered
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}