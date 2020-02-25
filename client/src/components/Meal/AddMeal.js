import React from 'react';

export class AddMeal extends React.Component {
  state = {
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
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
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
    } = this.state;
    return (
      <div className='App'>
        <h2 className='App'>Add Recipe</h2>
        <form className='form'>
          <input
            name='title'
            value={title}
            type='text'
            placeholder='Meal Title'
            onChange={this.handleChange}
          />
          <select name='category' value={category} onChange={this.handleChange}>
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
            value={location}
            name='location'
            placeholder='Location?'
            onChange={this.handleChange}
          />
        </form>
        <button className='button-primary' type='submit'>
          Submit
        </button>
      </div>
    );
  }
}
