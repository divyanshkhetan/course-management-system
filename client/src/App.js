import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import CoursePage from './components/CoursePage';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/course/:courseid' component={CoursePage} />
    </Router>
  );
}

export default App;
