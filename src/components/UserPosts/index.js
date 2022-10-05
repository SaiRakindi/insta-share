import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'
import LoaderSpinner from '../LoaderSpinner'
import UserInstaPost from '../UserInstaPost'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {
    userPosts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userPostsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userPostsUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.posts.map(eachPost => ({
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: eachPost.post_details,
        comments: eachPost.comments,
        caption: eachPost.caption,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        userPosts: updatedData,
      })
    }

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => <LoaderSpinner />

  onClickTryAgainButton = () => {
    this.getUserPosts()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again.
      </h1>
      <button
        type="button"
        onClick={this.onClickTryAgainButton}
        className="failure-view-button"
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {userPosts} = this.state

    return (
      <div>
        <ul className="user-posts-view">
          {userPosts.map(post => (
            <UserInstaPost key={post.postId} userPost={post} />
          ))}
        </ul>
      </div>
    )
  }

  renderUserPostsView = () => {
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
    return <div className="main-container">{this.renderUserPostsView()}</div>
  }
}

export default UserPosts
