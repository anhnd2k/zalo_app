import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './AppNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './redux/reducer/index';

const store = createStore(
  appReducers
)

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
      <AppNavigator/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor:'#0AAAFF'
  },
});

export default App;