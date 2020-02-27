import React, { useState, useEffect, createRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SEARCH_MEALS } from '../../queries/index';

import { SearchResultItemHook } from './SearchResultItemHook';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useQuery(SEARCH_MEALS, {
    variables: { searchTerm },
  });
  const inputRef = createRef();

  // automatically focuses on the search field on render
  useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  const renderMeals = () => {
    return !error && loading ? (
      <p>Loading...</p>
    ) : error && !loading ? (
      <p>Error while searching for meals!</p>
    ) : (
      <SearchResultItemHook searchMeals={data.searchMeals} />
    );
  };

  return (
    <div className='App'>
      <h4>
        <label>Search for a Meal</label>
      </h4>
      <input
        type='text'
        ref={inputRef}
        placeholder='Meal'
        onChange={event => setSearchTerm(event.target.value)}
        value={searchTerm}
      />
      <div>{renderMeals()}</div>
    </div>
  );
};

export default Search;
