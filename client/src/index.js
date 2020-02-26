import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './index.css';
import App from './App';
import SignIn from './components/Auth/SignIn';
// import SignInHook from './components/Auth/SignInHook';
import SignUp from './components/Auth/SignUp';
// import SignUpHook from './components/Auth/SignUpHook';
import { NavBar } from './components/NavBar/NavBar';
import Search from './components/Meal/Search';
import SearchHook from './components/Meal/SearchHook';
import AddMeal from './components/Meal/AddMeal';
import Profile from './components/Profile/Profile';
import MealPage from './components/Meal/MealPage';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
// import { withSession } from './components/Auth/withSession';
import { withSessionHook } from './components/Auth/withSessionHook';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: async operation => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <NavBar session={session} />
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/search' component={SearchHook} />
      <Route path='/signin' render={() => <SignIn refetch={refetch} />} />
      <Route path='/signup' render={() => <SignUp refetch={refetch} />} />
      {/* <Route path='/signup' exact component={SignUpHook} /> */}
      <Route
        exact
        path='/meal/add'
        render={() => <AddMeal session={session} />}
      />
      <Route
        exact
        path='/profile'
        render={() => <Profile session={session} />}
      />
      <Route path='/meal/:_id' component={MealPage} />
      <Redirect to='/' />
    </Switch>
  </Router>
);

const RootWithSession = withSessionHook(Root);
ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root'),
);
