import React, { Component } from 'react';
import classes from './Posts.css';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/Actions'

class Posts extends Component {
    componentDidMount(){
        this.props.fetchPosts();
    }

  render() {
    return (
      <div>
        <p className={classes.Post}>Lorem ipsum dolor sit.</p>
      </div>
    )
  }
}
const mapStateToProps = state => ({
    posts: state.posts
})
export default connect(mapStateToProps, { fetchPosts })(Posts);
