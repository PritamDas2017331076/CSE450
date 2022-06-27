import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet} from 'react-native'
import { Form, FormItem } from 'react-native-form-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Studentlogin({navigation}){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const onSubmit = (e) => {
       // e.preventDefault()

        if(!user){
            alert('Please enter user')
            return
        }

        if(!password){
            alert('Please enter password')
            return
        }
        /* onAdd({user,email,password,passwordr}) */

        const studentDetails = {
            user: user,
            password: password
          }

        console.log(studentDetails)

        axios.post('http://192.168.0.106:5000/students/login',studentDetails)
          .then(
              async res => {
                  await AsyncStorage.setItem('@token', res.data.token);
                  await AsyncStorage.setItem('@status', 'students');
                  await AsyncStorage.setItem('@log', 1);
               //   dispatch({type:"USER",payload:user})
                //  console.log(state)
                  console.log(res.data)
                  console.log(res.data.token)
                  console.log('show our data',await AsyncStorage.getItem('@token'),await AsyncStorage.getItem('@status'))
                  navigation.navigate('Home')
              }
           ) 
           .catch(err =>{
                console.log('hah')
               console.log(err)
           })

        setUser('')
        setPassword('')

        
    }
    return(
        <View style={styles.container}>
            <Form onButtonPress={onSubmit}>
            <FormItem
                label="User"
                isRequired
                value={user}
                onChangeText={(email) => setUser(email)}
                asterik
              />
            <FormItem
                label="Password"
                isRequired
                value={password}
                onChangeText={(password) => setPassword(password)}
                asterik
              />
            </Form>
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