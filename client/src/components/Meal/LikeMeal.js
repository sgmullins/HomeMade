import React, { Component } from 'react';
import { withSessionHook } from '../Auth/withSessionHook';
import { LIKE_MEAL } from '../../queries/index';
import { Mutation } from 'react-apollo';

class LikeMeal extends Component {
  state = {
    username: '',
    liked: false,
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked = favorites.findIndex(
        favorite => favorite._id === _id > -1,
      );
      this.setState({
        liked: prevLiked,
        username,
      });
    }
  }
  handleClick = likeMeal => {
    this.setState(
      prevState => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeMeal),
    );
  };

  handleLike = likeMeal => {
    if (this.state.liked) {
      //handle like
      likeMeal()
        .then(async ({ data }) => {
          console.log(data);
          await this.props.refetch();
        })
        .catch(err => console.log(err));
    } else {
      //handle unlike
      console.log('unlike');
    }
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    return (
      <Mutation mutation={LIKE_MEAL} variables={{ _id, username }}>
        {likeMeal => {
          return (
            username && (
              <button onClick={() => this.handleClick(likeMeal)}>
                {liked ? 'Liked' : 'Like'}
              </button>
            )
          );
        }}
      </Mutation>
    );
  }
}

export default withSessionHook(LikeMeal);
