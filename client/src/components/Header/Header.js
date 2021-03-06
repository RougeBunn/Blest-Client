import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App/App';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends Component {
  static defaultProps = {
    isLoggedIn: false,
    value: null,
    toggleLoggedIn: () => {}
  };

  state = {};

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.props.fetchBlessings(userId);
      this.setState({
        userId
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.userId) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.props.fetchBlessings(userId);
        this.setState({
          userId
        });
      }
    }
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    localStorage.removeItem('userId');
    this.props.setLoggedInState(false);
  };

  renderLogoutLink() {
    const { userId } = this.state;
    return (
      <div className="Header__logged-in">
        {/* <Link to={`/userpage/${this.props.match.params.userId}`}> */}
        <Link to={`/userpage/${userId}`}>Your List</Link>
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login">Log in</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    );
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => (
          <nav className="Header">
            <h1>
              <Link to="/">BLest</Link>
            </h1>
            {value.state.isLoggedIn
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </nav>
        )}
      </AppContext.Consumer>
      // const logOutLink = (
      //   <div className="Header__logged-in">
      //     <Link to={`/userpage/${this.props.match.params.userId}`}>Your List</Link>
      //     <Link onClick={this.handleLogoutClick} to="/">
      //       Logout
      //     </Link>
      //   </div>
      // );
      // const logInLink = (
      //   <div className="Header__not-logged-in">
      //     <Link to="/login">Log in</Link>
      //     <Link to="/register">Sign Up</Link>
      //   </div>
      // );

      // return (
      //   <AppContext.Consumer>
      //     {value => (
      //       <nav className="Header">
      //         <h1>
      //           <Link to="/">BLest</Link>
      //         </h1>
      //         {value.state.isLoggedIn ? logOutLink : logInLink}
      //       </nav>
      //     )}
      //   </AppContext.Consumer>
    );
  }
}

Header.defaultProps = {
  blessings: []
};
