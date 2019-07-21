import React, { Component } from 'react';
import { AppContext } from '../../components/App/App';
import './BlessPage.css';
import { Link } from 'react-router-dom';
export default class BlessPage extends Component {
  state = {
    title: ''
  };

  componentDidMount() {
    // const { userId } = this.props.match.params;
    const userId = this.props.match.params.userId;
    // props == {
    //   match: {
    //     params: {
    //       userId: 1 // userId is what is in route definition
    //     }
    //   }
    // }
    this.props.fetchBlessings(userId);
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

              <form id="record-blessing">
                <div className="form-section">
                  {/* <input
                    type="text"
                    name="title"
                    className="title"
                    placeholder="~Your Blessings~"
                    // value={this.state.title}
                    // onChange={this.handleTitleChange}
                    // required
                  /> */}
                </div>
                <div className="form-section">
                  <label htmlFor="List" />
                  {this.props.blessings.map(blessing => (
                    <div key={blessing.id} className="listItem">
                      <div>{blessing.blessing}</div>
                      {/* <button
                        type="button"
                        onClick={e => {
                          // TODO: update in db through API
                          e.preventDefault();
                          this.props.saveBlessing(blessing.id);
                        }}
                        className="small"
                      >
                        Save/Update
                      </button> */}
                      <button
                        type="button"
                        onClick={e => this.props.deleteBlessing(blessing.id)}
                        className="small"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      this.props.addBlessing({
                        blessing: this.state.title,
                        userId: this.props.match.params.userId
                      })
                    }
                    className="small"
                  >
                    Add Blessing
                  </button>
                </div>

                <button type="submit">
                  {' '}
                  <Link to={`/userpage/${this.props.match.params.userId}`}>
                    Back to Home
                  </Link>
                </button>
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
