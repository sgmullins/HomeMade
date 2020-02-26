import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_MEALS } from '../../queries/index';

import { SearchResultItem } from './SearchResultItem';

export default class Search extends Component {
  state = {
    searchResults: [],
  };
  handleChange = ({ searchMeals }) => {
    this.setState({
      searchResults: searchMeals,
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className='App'>
            <input
              type='search'
              placeholder='Search for Meals'
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_MEALS,
                  variables: { searchTerm: event.target.value },
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(meal => (
                <SearchResultItem key={meal._id} {...meal} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}
