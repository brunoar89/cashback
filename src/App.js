import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import configureStore, { browserHistory } from 'store';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path="/login" render={() => <div>Login</div>} />
          <Route render={() => (<div>404</div>)} />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
);

export default App;
