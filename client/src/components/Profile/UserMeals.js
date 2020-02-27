import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_MEALS,
  DELETE_USER_MEAL,
  GET_ALL_MEALS,
  GET_CURRENT_USER,
} from '../../queries/index';

class UserMeals extends React.Component {
  state = {
    _id: '',
    title: '',
    instructions: '',
    category: '',
    description: '',
    allergens: '',
    amount: '',
    price: '',
    location: '',
    username: '',
    ingredients: '',
    imageURL: '',
    modal: false,
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDelete = deleteUserMeal => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this meal?',
    );
    if (confirmDelete) {
      deleteUserMeal()
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  loadMealDataForUpdate = meal => {
    this.setState({ ...meal, modal: true });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_MEALS} variables={{ username }}>
        {({ data, loading, error }) => {
          console.log(data);
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          return (
            <ul>
              {modal && (
                <EditRecipeModal
                  meal={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              )}
              <h3>Your Meals</h3>
              {!data.getUserMeals.length && <p>You have not made any meals</p>}
              {data.getUserMeals.map(meal => (
                <li key={meal._id}>
                  <Link to={`/meal/${meal._id}`}>
                    <p>{meal.title}</p>
                  </Link>
                  <p style={{ marginBottom: 0 }}>Likes: {meal.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_MEAL}
                    variables={{ _id: meal._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_MEALS }, //to refresh data on home page with most current items
                      { query: GET_CURRENT_USER }, //in case we delete a favorite recipe
                    ]}
                    update={(cache, { data: { deleteUserMeal } }) => {
                      const { getUserMeals } = cache.readQuery({
                        query: GET_USER_MEALS,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_MEALS,
                        variables: { username },
                        data: {
                          getUserMeals: getUserMeals.filter(
                            meal => meal._id !== deleteUserMeal._id,
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserMeal, attrs = {}) => (
                      <div>
                        <button
                          className='button-primary'
                          onClick={() => this.loadMealDataForUpdate(meal)}
                        >
                          Update Meal
                        </button>
                        <p
                          className='delete-button'
                          onClick={() => this.handleDelete(deleteUserMeal)}
                        >
                          {attrs.loading ? 'Deleting Meal ...' : 'X'}
                        </p>
                      </div>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

const EditRecipeModal = ({ meal, handleChange, closeModal }) => (
  <div className='modal modal-open'>
    <div className='modal-inner'>
      <div className='modal-content'>
        <form className='modal-content-inner'>
          <h4>Edit Meal</h4>
          <label htmlFor='title'>Meal Title</label>
          <input name='title' onChange={handleChange} value={meal.title} />
          <label htmlFor='category'>Meal Category</label>
          <select name='category' onChange={handleChange} value={meal.category}>
            <option value='Breakfast'>Breakfast</option>
            <option value='Lunch '>Lunch</option>
            <option value='Dinner'>Dinner</option>
            <option value='AllDay'>AllDay</option>
          </select>
          <label htmlFor='description'>Meal Description</label>
          <textarea
            value={meal.description}
            name='description'
            type='text'
            onChange={handleChange}
          ></textarea>
          <label htmlFor='instructions'>Pickup/Dropoff Instructions</label>
          <textarea
            value={meal.instructions}
            name='instructions'
            type='text'
            onChange={handleChange}
          ></textarea>
          <label htmlFor='ingredients'>Meal Ingredients</label>
          <textarea
            value={meal.ingredients}
            name='ingredients'
            type='text'
            onChange={handleChange}
          ></textarea>
          <label htmlFor='allergens'>Potential Allergens in Meal</label>
          <input
            name='allergens'
            type='text'
            onChange={handleChange}
            value={meal.allergens}
          />
          <label htmlFor='amount'>Amount available</label>
          <input
            value={meal.amount}
            name='amount'
            type='number'
            min='1'
            step='1'
            onChange={handleChange}
          />
          <label htmlFor='price'>Price Per Meal</label>
          <input
            value={meal.price}
            name='price'
            type='number'
            min='0.5'
            step='0.01'
            datatype='currency'
            onChange={handleChange}
          />
          <label htmlFor='imageURL'>Add an image URL</label>
          <input
            type='text'
            name='imageURL'
            onChange={handleChange}
            value={meal.imageURL}
          />
          <label htmlFor='location'>Available Location</label>
          <input
            type='text'
            name='location'
            onChange={handleChange}
            value={meal.location}
          />
          <hr />
          <div className='modal-buttons'>
            <button className='button-primary' type='submit'>
              Update
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default UserMeals;
