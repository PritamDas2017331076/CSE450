import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

export default function Studentlogin(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Teacher login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 80,
        padding: 50,
        backgroundColor: '#fff'
    },
    text:{
        color: 'red',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
    }

})