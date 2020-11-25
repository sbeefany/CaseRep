
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Projects from './Projects/Projects';
import Tasks from './Tasks/Tasks';

function App() {
  return (
    <div className="App">
      <Redirect to={'/login'}/>
     <Switch>
          <Route path='/login'  component={Login} />
          <Route path='/projects' component={Projects} />
          <Route path='/tasks' component={Tasks} />

      </Switch>
    </div>
  );
}

export default App;
