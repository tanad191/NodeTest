import React, { useContext, Component } from 'react'
import Modal from "./Modal";
import axios from "axios";
import styles from "./SongListStyle.css";

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRegistered: false,
      songList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        registered: false,
      },
    };
  }
  
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/songs/")
      .then((res) => this.setState({ songList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    alert("save" + JSON.stringify(item));

    if (item.id) {
      axios
        .put(`/api/songs/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/songs/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios
      .delete(`/api/songs/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", registered: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayRegistered = (status) => {
    if (status) {
      return this.setState({ viewRegistered: true });
    }

    return this.setState({ viewRegistered: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs" class=".tabbed-content">
        <span
          className={this.state.viewRegistered ? "nav-link active" : "nav-link"}
          onClick={() => this.displayRegistered(true)}
		  class="tab-item">
          Registered
        </span>
        <span
          className={this.state.viewRegistered ? "nav-link" : "nav-link active"}
          onClick={() => this.displayRegistered(false)}
		  class="tab-item"
        >
          Unregistered
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewRegistered } = this.state;
    const newItems = this.state.songList.filter(
      (item) => item.registered === viewRegistered
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`song-title mr-2 ${
            this.state.viewRegistered ? "registered-song" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container" class=".list-wrapper">
        <h1 className="text-black text-uppercase text-center my-4">Song app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add title
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default SongList;