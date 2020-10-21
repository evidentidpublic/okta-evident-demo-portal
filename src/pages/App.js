import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Success from './Success'

const App = () => (
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/success' component={Success}/>
        </Switch>
      </main>
    </div>
)

export default App