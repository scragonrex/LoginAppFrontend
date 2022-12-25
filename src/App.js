import './App.css';
import Homepage from'./components/Homepage.js'
import Login from'./components/Login.js'
import Register from './components/Register.js'
import React,{useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
function App() {
    const [user, setLoginUser] = useState({})
return(
    <div>
    <Router>
        <Switch>
            <Route exact path="/">
                {
                    user && user._id ? <Homepage userData={user}/> : <Login setLoginUser={setLoginUser}/>
                }
            </Route>
        <Route exact path="/login"><Login setLoginUser={setLoginUser}/></Route>
            <Route exact path="/register"><Register/></Route>
        </Switch>
    </Router>
    </div>
)
}
export default App;
