import React from 'react';
import _ from 'lodash';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import configureStore, { browserHistory } from 'store';
import PropTypes from 'prop-types';
import Home from 'components/Home';
import Reseller from 'components/Reseller';
import Order from 'components/Order';
import Login from 'components/Login';

const store = configureStore();

const isAuthenticated = () => !_.isEmpty(localStorage.getItem('access-token'));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
    {...rest}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};

const App = () => (
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ConnectedRouter history={browserHistory}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/resellers" component={Reseller} />
          <PrivateRoute exact path="/orders" component={Order} />
          <Route exact path="/login" component={Login} />
          <Route render={() => (<div>404</div>)} />
        </Switch>
      </ConnectedRouter>
    </MuiPickersUtilsProvider>
  </Provider>
);

export default App;
