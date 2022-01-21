import {Provider} from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './redux/store/store'
import './App.css';
import Home from './components/Home';
// import Adduser from './components/';
import Edituser from './components/Edituser';
import Adduser from './components/Adduser';


function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/adduser'>
          <Adduser/>
          </Route>
          <Route exact path='/edituser/:id'>
          <Edituser/>
          </Route>
        </Switch>
    </Router>
    </Provider> 



    </>
    
  );
}

export default App;
