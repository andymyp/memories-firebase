import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/redux/reducers';

import Loading from './src/components/Loading';
import Navigation from './src/navigations';
import AppProvider from './src/contexts/AppProvider';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppProvider>
          <Navigation />
        </AppProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
