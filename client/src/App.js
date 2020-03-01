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
  if (error) return <p>Error: {error}</p>;

  console.log(data);
  return (
    <div className='App'>
      <h1 className='main-title'>
        Find A Meal Made For <strong>You</strong>
      </h1>
      <ul className='cards'>
        {data.getAllMeals.map(meal => (
          <MealItem {...meal} key={meal._id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
