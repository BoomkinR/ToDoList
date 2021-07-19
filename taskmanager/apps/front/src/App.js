import React from 'react'
import LoginBox from './Pages/LoginBox'
import Mainapp from './Pages/Mainapp'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"


function App() {
  return (
<Router>
            <Switch>
                <Route exact path = "/mainapp/" component = {Mainapp} />
                <Route exact path = "/" component = {LoginBox} />
            </Switch>
</Router>
  )
}

export default App;
