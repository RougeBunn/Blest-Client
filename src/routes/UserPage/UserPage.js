import React, { Component } from 'react';
import './UserPage.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../components/App/App';

export default class UserPage extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <>
            <header role="banner">
              <h1>Blest Dashboard</h1>
            </header>
            <section>
              {context.blessings.map(blessing => (
                <div key={blessing.id}>{blessing.blessing}</div>
              ))}
              <Link to="/blesspage">Edit</Link>
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
        )}
      </AppContext.Consumer>
    );
  }
}

UserPage.defaultProps = {
  blessings: []
};
