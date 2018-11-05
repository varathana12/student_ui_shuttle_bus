import React, { Component } from 'react';
import { Provider } from "react-redux";
import {Main} from './route'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom'
import {BottomNavigator,NavBar} from './root'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {randomColor,success,danger} from "./constant/color";
import {isMobile} from 'react-device-detect'
import store from './store/index'
injectTapEventPlugin();

let randomColors = randomColor()
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: success,
            dark: success,
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: danger,
            dark: '#ba000d',
            contrastText: '#fff',
        },
    },
});
class App extends Component {

    componentDidMount(){
        console.log(isMobile)
        if(!isMobile){
            let g = document.createElement('div');
            g.setAttribute("id", "background");
            document.getElementsByTagName('body')[0].appendChild(g)
            const root = document.getElementById('root').style
            const body = document.getElementsByTagName('body')[0].style
            root.minHeight = (window.outerHeight - 56)+"px"
            root.maxWidth ="500px"
            root.backgroundColor = "white"
            root.width = "100%"
            root.zIndex = "1"
            body.display = "flex"
        }
    }


  render() {
    return (
    <Provider store={store}>
        <MuiThemeProvider theme={theme} >
            <Router>
                <div >
                    <NavBar/>
                        <Main/>
                    <BottomNavigator/>
                </div>
            </Router>

        </MuiThemeProvider>
    </Provider>

    );
  }
}

export default App;
