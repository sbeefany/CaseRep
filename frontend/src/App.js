
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import PageResolver from './PageResolver';
import AllProjects from './Projects/components/AllProjects/AllProjects';
import Project from './Projects/components/Project/Project';

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
