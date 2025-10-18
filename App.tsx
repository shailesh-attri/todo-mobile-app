import React from 'react';
import RootNavigation from './src/Navigation/rootNavigation';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ImageBackground
          source={require('./src/assets/bgImage.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <RootNavigation />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:-1
  },
});
