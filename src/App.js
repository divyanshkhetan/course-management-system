import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/' component={Home} />
    </Router>
  );
}

export default App;
