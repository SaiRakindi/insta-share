import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="logo-header-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662634898/InstaShare/Insta_share_logo_pm2btx.png"
              alt="website logo"
              className="image-logo"
            />
          </Link>
          <h1 className="nav-heading">Insta Share</h1>
        </nav>
      </header>
    )
  }
}

export default Header
