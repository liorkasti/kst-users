import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import RootStackScreen from './navigation';

const App = () => {
  return (
    <Provider store={store}>
      <RootStackScreen />
    </Provider>
  );
};

export default App;
