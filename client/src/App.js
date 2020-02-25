import React from 'react';
import './App.css';
import MealItem from './components/Meal/MealItem';

// import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';

// import { Query } from 'react-apollo';
import { GET_ALL_MEALS } from './queries';
function App() {
  const { loading, error, data } = useQuery(GET_ALL_MEALS);
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error{' '}
        <span role='img' aria-label='monkey and poo emoji'>
          🐒💩
        </span>
      </p>
    );

  return (
    <div className='App'>
      {console.log(data.getAllMeals)}
      <h1>Home</h1>
      <ul>
        {data.getAllMeals.map(meal => (
          <MealItem {...meal} key={meal._id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
