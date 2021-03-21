import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <PrivateRoute path="/destination/:name">
          <Destination></Destination>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
        <Home></Home>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
