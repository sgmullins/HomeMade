import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_MEAL, GET_ALL_MEALS, GET_USER_MEALS } from '../../queries/index';
import { withRouter } from 'react-router-dom';
import Error from '../Error';
import { withAuthHook } from '../Auth/withAuthHook';

const initialState = {
  title: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  allergens: '',
  amount: '',
  price: '',
  location: '',
  username: '',
  ingredients: '',
  images: '',
};
class AddMeal extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  validateForm = () => {
    const {
      title,
      category,
      description,
      ingredients,
      instructions,
      amount,
      price,
      location,
    } = this.state;
    const isInvalid =
      !title ||
      !category ||
      !description ||
      !ingredients ||
      !instructions ||
      !amount ||
      !price ||
      !location;

    return isInvalid;
  };

  handleSubmit = (e, addMeal) => {
    e.preventDefault();
    addMeal()
      .then(({ data }) => {
        console.log(data);
        this.clearState();
        this.props.history.push('/');
      })
      .catch(err => console.log(`handle Submit error: ${err}`));
  };
  updateCache = (cache, { data: { addMeal } }) => {
    const { getAllMeals } = cache.readQuery({ query: GET_ALL_MEALS });

    cache.writeQuery({
      query: GET_ALL_MEALS,
      data: {
        getAllMeals: [addMeal, ...getAllMeals],
      },
    });
  };

  render() {
    const {
      title,
      category,
      description,
      allergens,
      ingredients,
      instructions,
      amount,
      price,
      location,
      username,

      images,
    } = this.state;
    return (
      <Mutation
        mutation={ADD_MEAL}
        update={this.updateCache}
        refetchQueries={() => [
          { query: GET_USER_MEALS, variables: { username } },
        ]} //updates homepage with new recipe
        variables={{
          title,
          category,
          description,
          allergens,
          ingredients,
          instructions,
          amount,
          price,
          location,
          username,
          images,
        }}
      >
        {(addMeal, { data, loading, error }) => {
          return (
            <div className='App'>
              <h2 className='App'>Add Recipe</h2>
              <form
                className='form'
                onSubmit={e => this.handleSubmit(e, addMeal)}
              >
                <input
                  name='title'
                  value={title}
                  type='text'
                  placeholder='Meal Title'
                  onChange={this.handleChange}
                />
                <select
                  name='category'
                  value={category}
                  onChange={this.handleChange}
                >
                  <option value='Breakfast'>Breakfast</option>
                  <option value='Lunch '>Lunch</option>
                  <option value='Dinner'>Dinner</option>
                  <option value='AllDay'>AllDay</option>
                </select>
                <textarea
                  name='description'
                  type='text'
                  value={description}
                  placeholder='Add Description'
                  onChange={this.handleChange}
                ></textarea>
                <textarea
                  name='instructions'
                  type='text'
                  value={instructions}
                  placeholder='Add pickup instructions'
                  onChange={this.handleChange}
                ></textarea>
                <textarea
                  name='ingredients'
                  type='text'
                  value={ingredients}
                  placeholder='Ingredients'
                  onChange={this.handleChange}
                ></textarea>
                <input
                  name='allergens'
                  value={allergens}
                  type='text'
                  placeholder='Potential Allergens?'
                  onChange={this.handleChange}
                />
                <input
                  name='amount'
                  value={amount}
                  type='number'
                  min='1'
                  step='1'
                  placeholder='Amount Available'
                  onChange={this.handleChange}
                />
                <input
                  name='price'
                  value={price}
                  type='number'
                  min='0.5'
                  step='0.01'
                  placeholder='$price per meal'
                  datatype='currency'
                  onChange={this.handleChange}
                />

                <input
                  type='text'
                  value={images}
                  name='images'
                  placeholder='img url'
                  onChange={this.handleChange}
                />
                <input
                  type='text'
                  value={location}
                  name='location'
                  placeholder='location'
                  onChange={this.handleChange}
                />
                <button
                  disabled={loading || this.validateForm()}
                  className='button-primary'
                  type='submit'
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuthHook(session => session && session.getCurrentUser)(
  withRouter(AddMeal),
);
