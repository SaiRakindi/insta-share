import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662209429/InstaShare/erroring_1_e1efs1.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found. <br />
        Please go back to the home page
      </p>
      <Link to="/">
        <button type="button" className="not-found-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
