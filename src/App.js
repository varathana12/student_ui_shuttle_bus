import React, { Component } from 'react';
import { Provider } from "react-redux";
import {Main} from './route'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom'
import {BottomNavigator,NavBar} from './root'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {randomColor,success,danger} from "./constant/color";
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
