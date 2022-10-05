import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import LoaderSpinner from '../LoaderSpinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userStories: [],
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userStoriesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userStoriesApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      //   console.log('Fetched Data', fetchedData)

      const updatedData = await fetchedData.users_stories.map(userStory => ({
        storyUrl: userStory.story_url,
        userId: userStory.user_id,
        userName: userStory.user_name,
      }))

      //   console.log('updatedData', updatedData)

      this.setState({
        userStories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="main-container">
      <LoaderSpinner />
    </div>
  )

  renderSlider = () => {
    const {userStories} = this.state

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {userStories.map(eachLogo => {
            const {userId, storyUrl, userName} = eachLogo
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt={userName} />
                <p className="user-story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderSuccessView = () => (
    <div className="main-container">{this.renderSlider()}</div>
  )

  renderFailureView = () => (
    <div className="main-container">
      <h1>Failure View</h1>
      <button type="button">Retry</button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default UserStories
