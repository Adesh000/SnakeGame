import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Game from './src/components/Game';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Game />
    </GestureHandlerRootView>
  );
}

export default App;
