import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigation';
import store from './src/store';
import {requestLocationPermission} from './src/components/Permissions';

const App = () => {
  React.useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
