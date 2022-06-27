import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Home from './components/Home';
import Navigator from './components/Drawer'
import {NavigationContainer} from '@react-navigation/native';
export default function App() {
  return (
    <View style={styles.container}>
      <Navigator/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 25,
    backgroundColor: '#fff'
},
text:{
    color: 'red',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
}
});
