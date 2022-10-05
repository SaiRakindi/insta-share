import {Component} from 'react'
import Header from '../Header'
import UserPosts from '../UserPosts'
import UserStories from '../UserStories'

import './index.css'

class Home extends Component {
  render() {
    return (
      <main className="home-container">
        <Header />
        <UserStories />
        <UserPosts />
      </main>
    )
  }
}

export default Home
