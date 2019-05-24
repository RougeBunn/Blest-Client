import React, { Component } from 'react';
import { AppContext } from '../../components/App/App';
import './BlessPage.css';
import { Link } from 'react-router-dom';
export default class BlessPage extends Component {
  state = {
    input: ''
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

  handleClearAdd(context) {
    this.setState({
      input: ''
    });
    context.handleAddBlessing(this.state.input);
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <>
            <header>
              <h1>Your Reflections</h1>
            </header>
            <section>
              <button>
                <Link to="/userpage">Back</Link>
              </button>

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
                  {context.blessings.map(blessing => (
                    <div key={blessing.id} className="listItem">
                      <div>{blessing.blessing}</div>
                      <button
                        type="button"
                        onClick={() =>
                          context.handleRemoveBlessing(blessing.id)
                        }
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
                    onClick={() => this.handleClearAdd(context)}
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
        )}
      </AppContext.Consumer>
    );
  }
}

BlessPage.defaultProps = {
  blessings: []
};
