import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LayOut from './assets/LayOut/LayOut';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './assets/Redux/Store';


export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <View style={styles.container}>
            <LayOut />
          </View>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


// react-navigation/native

// react-navigation/native-stack