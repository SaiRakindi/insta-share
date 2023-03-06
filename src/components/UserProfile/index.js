import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'
import LoaderSpinner from '../LoaderSpinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userProfileData: [],
  }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {userId} = params

    const jwtToken = Cookies.get('jwt_token')

    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userProfileUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const formattedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }

      this.setState({
        userProfileData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loading-view-container">
      <LoaderSpinner />
    </div>
  )

  onClickTryAgainButton = () => {
    this.getUserProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        onClick={this.onClickTryAgainButton}
        className="failure-view-retry-button"
      >
        Try Again
      </button>
    </div>
  )

  renderNoPostsView = () => (
    <div className="no-posts-container">
      <div className="camera-container">
        <BiCamera size={30} className="camera-icon" />
      </div>
      <h1 className="no-posts-heading">No Posts Yet</h1>
    </div>
  )

  renderPostsView = () => {
    const {userProfileData} = this.state

    return (
      <div>
        <ul className="posts-view-container">
          {userProfileData.posts.map(post => (
            <li className="post-image-list-item" key={post.id}>
              <img src={post.image} alt="user post" className="post-image" />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {userProfileData} = this.state

    return (
      <div className="user-profile-success-view-container">
        <div className="user-details-section">
          <h1 className="mobile-user-name">{userProfileData.userName}</h1>
          <div className="user-profile-pic-and-stats-container">
            <img
              src={userProfileData.profilePic}
              alt="user profile"
              className="user-profile-pic"
            />

            <div className="mobile-user-stats-container">
              <div className="stats-heading-desc">
                <span className="user-stats-heading">
                  {userProfileData.postsCount}
                </span>
                <span className="user-stats-description">posts</span>
              </div>
              <div className="stats-heading-desc">
                <span className="user-stats-heading">
                  {userProfileData.followersCount}
                </span>
                <span className="user-stats-description">followers</span>
              </div>
              <div className="stats-heading-desc">
                <span className="user-stats-heading">
                  {userProfileData.followingCount}
                </span>
                <span className="user-stats-description">following</span>
              </div>
            </div>

            <div className="desktop-user-details">
              <h1 className="desktop-user-name-heading">
                {userProfileData.userName}
              </h1>

              <div className="desktop-user-stats-container">
                <p className="stats-type">
                  <span className="stats-numbers">
                    {userProfileData.postsCount}
                  </span>{' '}
                  posts
                </p>
                <p className="stats-type">
                  <span className="stats-numbers">
                    {userProfileData.followersCount}
                  </span>{' '}
                  followers
                </p>
                <p className="stats-type">
                  <span className="stats-numbers">
                    {userProfileData.followingCount}
                  </span>{' '}
                  following
                </p>
              </div>

              <p className="user-id">{userProfileData.userId}</p>
              <p className="user-bio">{userProfileData.userBio}</p>
            </div>
          </div>
          <div className="user-id-bio-container">
            <p className="user-id">{userProfileData.userId}</p>
            <p className="user-bio">{userProfileData.userBio}</p>
          </div>
          <div className="user-stories-container">
            <ul className="stories-list-container">
              {userProfileData.stories.map(story => (
                <li key={story.id} className="story-item">
                  <div className="story-image-container">
                    <img
                      src={story.image}
                      alt="user story"
                      className="story-image"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="divider-line" />
        <div className="user-profile-posts-section">
          <div className="posts-icon-and-heading-container">
            <BsGrid3X3 className="posts-grid-icon" />
            <h1 className="posts-heading">Posts</h1>
          </div>
          {userProfileData.posts.length === 0
            ? this.renderNoPostsView()
            : this.renderPostsView()}
        </div>
      </div>
    )
  }

  renderUserProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-container">
          {this.renderUserProfileView()}
        </div>
      </>
    )
  }
}

export default UserProfile
