import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './components/login'
import './styles/globals.css';
import Register from './components/register';
import Home from './components/home';
import { withRouter } from 'react-router';

class App extends React.PureComponent {

  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>

      </>

    )
  }
}

export default withRouter(App)