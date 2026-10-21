import { useState } from 'react';
import CountdownScreen from './components/CountdownScreen';
import PostCountdownNavigationScreen from './components/PostCountdownNavigationScreen';
import { countdownConfig } from './data/countdownConfig';
import { photos } from './data/photos';

function App() {
  const [currentScreen, setCurrentScreen] = useState('countdown');

  const handleCountdownComplete = () => {
    
  };

  const handleNavigateToMusicalButtons = () => {
    setCurrentScreen('musical-buttons');
  };

  const handleReturnToLapis = () => {
    setCurrentScreen('lapis-scene');
  };

  return (
    <>
      {currentScreen === 'countdown' && (
        <CountdownScreen
          targetDate={countdownConfig.targetDate}
          rotationInterval={countdownConfig.rotationInterval}
          photos={photos}
          onCountdownComplete={handleCountdownComplete}
        />
      )}
      {currentScreen === 'lapis-scene' && (
        <PostCountdownNavigationScreen
          label="Pantalla posterior a la cuenta regresiva"
          onDoubleTap={handleNavigateToMusicalButtons}
        />
      )}
      {currentScreen === 'musical-buttons' && (
        <PostCountdownNavigationScreen
          label="Pantalla siguiente"
          onDoubleTap={handleReturnToLapis}
        />
      )}
    </>
  );
}

export default App;
