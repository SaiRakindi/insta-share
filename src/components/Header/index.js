import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    showMobileMenu: false,
  }

  onClickHamburgerMenu = () => {
    this.setState(prevState => ({
      showMobileMenu: !prevState.showMobileMenu,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showMobileMenu} = this.state
    return (
      <header className="header-section">
        <nav className="logo-header-container">
          <div className="link-text">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662634898/InstaShare/Insta_share_logo_pm2btx.png"
                alt="website logo"
                className="image-logo"
              />
            </Link>
            <h1 className="nav-heading">Insta Share</h1>
          </div>

          <button
            type="button"
            className="hamburger-menu"
            onClick={this.onClickHamburgerMenu}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.948 6H20.051C20.573 6 21 6.427 21 6.949V7.051C21 7.573 20.573 8 20.051 8H3.948C3.426 8 3 7.573 3 7.051V6.949C3 6.427 3.426 6 3.948 6ZM20.051 11H3.948C3.426 11 3 11.427 3 11.949V12.051C3 12.573 3.426 13 3.948 13H20.051C20.573 13 21 12.573 21 12.051V11.949C21 11.427 20.573 11 20.051 11ZM20.051 16H3.948C3.426 16 3 16.427 3 16.949V17.051C3 17.573 3.426 18 3.948 18H20.051C20.573 18 21 17.573 21 17.051V16.949C21 16.427 20.573 16 20.051 16Z"
                fill="#262626"
              />
            </svg>
          </button>
        </nav>

        {showMobileMenu && (
          <section className="home-menu-container">
            <div className="list-items-section">
              <Link to="/">
                <p className="list-item">Home</p>
              </Link>

              <p className="list-item">Search</p>
              <Link to="/my-profile">
                <p className="list-item">Profile</p>
              </Link>

              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
            <button
              type="button"
              className="menu-close-button"
              onClick={this.onClickHamburgerMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L8.58579 10L6.29289 12.2929C5.90237 12.6834 5.90237 13.3166 6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071L10 11.4142L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L11.4142 10L13.7071 7.70711C14.0976 7.31658 14.0976 6.68342 13.7071 6.29289C13.3166 5.90237 12.6834 5.90237 12.2929 6.29289L10 8.58579L7.70711 6.29289Z"
                  fill="#262626"
                />
              </svg>
            </button>
          </section>
        )}
      </header>
    )
  }
}

export default withRouter(Header)
