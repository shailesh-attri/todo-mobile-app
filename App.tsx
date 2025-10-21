import React from 'react';
import RootNavigation from './src/Navigation/rootNavigation';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskContextProvider } from './src/hooks/taskContext';
import { AuthProvider } from './src/hooks/authContext';
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <AuthProvider>
    <TaskContextProvider>
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
    </TaskContextProvider>
    <Toast /> 
    </AuthProvider>
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
