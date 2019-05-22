import React, { Component } from "react";
import uuidv4 from "uuid";
import "./BlessPage.css";

export default class BlessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blessings: [],
      input: ""
      //   notify: false,
      //   occurence: "",
      //   time: null,
      //   title: ""
    };

    // this.handleTitleChange = this.handleTitleChange.bind(this);
    // this.handleOccurChange = this.handleOccurChange.bind(this);
    // this.handleNotifyChange = this.handleNotifyChange.bind(this);
    // this.handleTimeChange = this.handleTimeChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      blessings: this.props.blessings
    });
  }

  //   handleTitleChange(event) {
  //     this.setState({ title: event.target.value });
  //   }

  //   handleNotifyChange(event) {
  //     this.setState({ notify: event.target.value });
  //   }

  //   handleOccurChange(event) {
  //     this.setState({ occurence: event.target.value });
  //   }

  //   handleBlessingInput = idx => evt => {
  //     const newBlessing = this.state.listItems.map((listItem, blessIndex) => {
  //       if (idx !== blessIndex) return listItem;
  //       return { ...listItem, name: evt.target.value };
  //     });

  //     this.setState({ listItems: newBlessing });
  //   };

  handleAddBlessing = blessing => {
    const newBlessings = [
      ...this.state.blessings,
      {
        id: uuidv4(),
        blessing
      }
    ];
    this.setState({
      blessings: newBlessings,
      input: ""
    });
  };

  handleRemoveBlessing = id => {
    const newBlessings = this.state.blessings.filter(
      blessing => id !== blessing.id
    );
    this.setState({
      blessings: newBlessings
    });
  };

  //   handleTimeChange(event) {
  //     this.setState({ time: event.target.value });
  //   }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleInput = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    return (
      <>
        <header>
          <h1>Your Reflections</h1>
        </header>
        <section>
          <form id="record-dream">
            <div className="form-section">
              <input
                type="text"
                name="title"
                className="title"
                placeholder="~Your Blessings~"
                // value={this.state.title}
                // onChange={this.handleTitleChange}
                // required
              />
            </div>
            <div className="form-section">
              <label htmlFor="List" />
              {this.state.blessings.map(blessing => (
                <div key={blessing.id} className="listItem">
                  <div>{blessing.blessing}</div>
                  <button
                    type="button"
                    onClick={() => this.handleRemoveBlessing(blessing.id)}
                    className="small"
                  >
                    -
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={this.state.input}
                onChange={this.handleInput}
              />
              <button
                type="button"
                onClick={() => this.handleAddBlessing(this.state.input)}
                className="small"
                disabled={!this.state.input}
              >
                +
              </button>
            </div>

            <button type="submit">Save List</button>
          </form>
        </section>
      </>
    );
  }
}

BlessPage.defaultProps = {
  blessings: []
};
