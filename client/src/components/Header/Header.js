import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App/App';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends Component {
  static defaultProps = {
    isLoggedIn: false,
    value: null
  };

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    // this.props.isLoggedIn = false;
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
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
        {({ isLoggedIn }) => (
          <nav className="Header">
            {console.log('is logged in', isLoggedIn)}
            <h1>
              <Link to="/">Blest</Link>
            </h1>
            {isLoggedIn ? this.renderLogoutLink() : this.renderLoginLink()}
          </nav>
        )}
      </AppContext.Consumer>
    );
  }
}
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { AppContext } from '../App/App';
// import TokenService from '../../services/token-service';
// import './Header.css';

// export default class Header extends Component {
//   static defaultProps = {
//     isLoggedIn: false,
//     value: null
//   };

//   handleLogoutClick = () => {
//     TokenService.clearAuthToken();
//   };

//   renderLogoutLink() {
//     return (
//       <div className="Header__logged-in">
//         <Link onClick={this.handleLogoutClick} to="/">
//           Logout
//         </Link>
//       </div>
//     );
//   }

//   renderLoginLink() {
//     return (
//       <div className="Header__not-logged-in">
//         <Link to="/login">Log in</Link>
//         <Link to="/register">Sign Up</Link>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <AppContext.Consumer>
//         {value => (
//           <nav className="Header">
//             {console.log(value)}
//             <h1>
//               <Link to="/">Blest</Link>
//             </h1>
//           </nav>
//         )}
//       </AppContext.Consumer>
//     );
//   }
// }
