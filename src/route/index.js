import React from 'react'
import Home from '../screen/home'
import { Route} from 'react-router-dom'
import History from '../screen/history'
import Profile from '../screen/profile'
import {PREFIX} from "../constant/variable";

export const Main = () => (

        <div>
            <Route exact path={PREFIX+"/student(|/Booking)"} component={Home}/>
            <Route exact path={PREFIX+"/student/History"} component={History}/>
            <Route exact path={PREFIX+"/student/Profile"} component={Profile}/>
        </div>

)
