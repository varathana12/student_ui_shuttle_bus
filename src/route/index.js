import React from 'react'
import Home from '../screen/home'
import { Route} from 'react-router-dom'
import History from '../screen/history'
import Profile from '../screen/profile'
export const Main = () => (

        <div>
            <Route exact path="/student(|/booking)" component={Home}/>
            <Route exact path="/student/history" component={History}/>
            <Route exact path="/student/profile" component={Profile}/>
        </div>

)