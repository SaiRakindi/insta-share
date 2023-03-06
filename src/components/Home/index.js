import {Component} from 'react'
import UserPosts from '../UserPosts'
import UserStories from '../UserStories'

import './index.css'

class Home extends Component {
  render() {
    return (
      <main className="home-container">
        <UserStories />
        <UserPosts />
      </main>
    )
  }
}

export default Home
