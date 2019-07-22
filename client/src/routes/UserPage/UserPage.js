import React, { Component } from 'react';
import './UserPage.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../components/App/App';
import ListApiService from '../../services/list-api-service';

export default class UserPage extends Component {
  componentDidMount() {
    // const { userId } = this.props.match.params;
    const userId = this.props.match.params.userId;
    this.props.fetchBlessings(userId);
  }
  render() {
    console.log('userpage render');
    return (
      <>
        {/** <> === <React.Fragment> */}
        <header role="banner">
          <h1>Blest Dashboard</h1>
        </header>
        <section>
          {this.props.blessings.map(blessing => (
            <div key={blessing.id}>{blessing.blessing}</div>
          ))}

          <Link to={'/blesspage/'.concat(this.props.match.params.userId)}>
            Edit
          </Link>

          <div className="form-section">
            <p className="notify-header">Send Reminders?</p>
            <input type="checkbox" name="yes" value="yes" />
            Yes
            <input type="checkbox" name="no" value="no" />
            No
            <br />
            <input type="radio" name="occurence" value="Daily" /> Daily
            <br />
            <input type="radio" name="occurence" value="Weekly" /> Weekly
            <br />
            <input type="radio" name="occurence" value="Monthly" /> Monthly
            <br />
            <p>At what time:</p>
            <input type="time" name="usr_time" />
          </div>
        </section>
      </>
    );
  }
}

UserPage.defaultProps = {
  blessings: []
};
