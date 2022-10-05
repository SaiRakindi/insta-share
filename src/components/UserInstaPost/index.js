import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsHeart, BsHeartFill} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

class UserInstaPost extends Component {
  state = {
    isLiked: false,
  }

  toggleLike = async () => {
    await this.setState(prevState => ({isLiked: !prevState.isLiked}))

    const {userPost} = this.props
    const {postId} = userPost
    const {isLiked} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const likedRequestBody = {
      like_status: isLiked,
    }

    const likedPostUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likedRequestBody),
    }

    const response = await fetch(likedPostUrl, options)
    const fetchedData = await response.json()

    console.log(fetchedData)
  }

  render() {
    const {userPost} = this.props
    const {
      profilePic,
      userName,
      userId,
      likesCount,
      comments,
      createdAt,
      postDetails,
    } = userPost

    const {isLiked} = this.state

    return (
      <li className="user-post-list-item">
        <Link to={`/users/${userId}`} className="profile-link">
          <div className="profile-section">
            <div className="image-container">
              <img
                src={profilePic}
                alt="post author profile"
                className="profile-pic"
              />
            </div>
            <p className="profile-user-name">{userName}</p>
          </div>
        </Link>
        <img src={postDetails.image_url} alt="post" className="profile-post" />
        <div className="post-detail-and-stats-container">
          <div>
            {!isLiked && (
              <button
                type="button"
                onClick={this.toggleLike}
                className="user-post-button"
                // data-testid="likeIcon"
              >
                <BsHeart size={20} color="#262626" />
              </button>
            )}
            {isLiked && (
              <button
                type="button"
                onClick={this.toggleLike}
                className="user-post-button"
              >
                <BsHeartFill size={20} color="red" />
              </button>
            )}
            <button type="button" className="user-post-button">
              <FaRegComment size={20} color="#475569" />
            </button>
            <button type="button" className="user-post-button">
              <BiShareAlt size={20} color="475569" />
            </button>
          </div>
          <p className="likes">{isLiked ? likesCount + 1 : likesCount} likes</p>
          <p className="caption">{postDetails.caption}</p>
          {comments.map(comment => (
            <p key={comment.user_id} className="comments">
              <span className="commented-user">{comment.user_name} </span>
              <span className="user-comment">{comment.comment}</span>
            </p>
          ))}
          <p className="created-date">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserInstaPost
