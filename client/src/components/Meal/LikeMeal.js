import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { LIKE_MEAL, GET_ONE_MEAL, UNLIKE_MEAL } from '../../queries/index';
import { withSessionHook } from '../Auth/withSessionHook';

class LikeMeal extends React.Component {
  state = {
    liked: false,
    username: '',
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        liked: prevLiked,
        username,
      });
    }
  }

  handleClick = (likeMeal, unlikeMeal) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeMeal, unlikeMeal),
    );
  };

  handleLike = (likeMeal, unlikeMeal) => {
    if (this.state.liked) {
      likeMeal().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      unlikeMeal().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeMeal } }) => {
    const { _id } = this.props;
    const { getMeal } = cache.readQuery({
      query: GET_ONE_MEAL,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_ONE_MEAL,
      variables: { _id },
      data: {
        getMeal: { ...getMeal, likes: likeMeal.likes + 1 },
      },
    });
  };

  updateUnlike = (cache, { data: { unlikeMeal } }) => {
    const { _id } = this.props;
    const { getMeal } = cache.readQuery({
      query: GET_ONE_MEAL,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_ONE_MEAL,
      variables: { _id },
      data: {
        getMeal: { ...getMeal, likes: unlikeMeal.likes - 1 },
      },
    });
  };

  render() {
    const { liked, username } = this.state;
    const { _id } = this.props;
    return (
      <Mutation
        mutation={UNLIKE_MEAL}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeMeal => (
          <Mutation
            mutation={LIKE_MEAL}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeMeal =>
              username && (
                <button
                  className='like-button'
                  onClick={() => this.handleClick(likeMeal, unlikeMeal)}
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSessionHook(LikeMeal);
