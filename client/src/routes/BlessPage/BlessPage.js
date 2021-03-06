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
    this.props.fetchBlessings(userId);
  }
  render() {
    return (
      <>
        <header>
          <h1>Your Reflections</h1>
        </header>
        <section>
          <form id="record-blessing">
            <div className="form-section">
              <label htmlFor="List" />
              {this.props.blessings.map(blessing => (
                <div key={blessing.id} className="listItem">
                  <div id="blessing">{blessing.blessing}</div>
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
    );
  }
}

BlessPage.defaultProps = {
  blessings: []
};
