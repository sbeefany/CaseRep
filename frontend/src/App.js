import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import PageResolver from './PageResolver';


function App() {
  return (
    <div className="App">
      <Redirect to={'/login'}/>
     <Switch>
          <Route path='/login'  component={Login} />
          <Route path='/' component={PageResolver} />
      </Switch>
    </div>
  );
}

export default App;
