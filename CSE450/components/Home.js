import React from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'

export default function Home({navigation}){

    const pressHandles = () => {

        navigation.navigate('About')

    }

    return(
        <View style={styles.container}>
          <Text style={styles.text}>This is home screen</Text>
          <Button title='go to about page' style={styles.button} onPress={pressHandles} />
        </View>  
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 80,
        padding: 10,
        backgroundColor: '#fff'
    },
    text:{
        color: 'red',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    button:{
        color: 'coral',
        width: 80,
        justifyContent: 'center',
    }

})