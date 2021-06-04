import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Client, Home, SensorForm } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sensor" component={SensorForm} />
        <Route path="/client" component={Client} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
