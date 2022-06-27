import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Studentregister({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [rpassword, setRPassword] = useState('')
    const [session, setSession] = useState('')
    const onSubmit = (e) => {
        //e.preventDefault()

        if(!user){
            alert('Please enter user')
            return
        }

        if(!email){
            alert('Please enter email')
            return
        }

        if(!password){
            alert('Please enter password')
            return
        }

        if(!rpassword){
            alert('Please enter password again here')
            return
        }

        if(!session){
            alert('Please enter session again here')
            return
        }

        if(password!==rpassword){
            alert('wrong password entered')
            return
        }

        const studentDetails = {
          user: user,
          email: email,
          session: session,
          password: password,
        }
        
        console.log(studentDetails)


         axios.post('https://localhost:5000/students/add',studentDetails)
          .then(res => {
            console.log(res.data)
            console.log(res.data.token)
            AsyncStorage.setItem('token', res.data.token);
            AsyncStorage.setItem('status', 'students');
            navigation.navigate('Home')
          })
          .catch((error) => {
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setUser('')
        setSession('')
        setEmail('')
        setPassword('')
        setRPassword('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <FormItem
                    label="Email"
                    style={styles.box}
                    isRequired
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    asterik
                  />
                <FormItem
                    label="User"
                    style={styles.box}
                    isRequired
                    value={user}
                    onChangeText={(user) => setUser(user)}
                    asterik
                  />
                <FormItem
                    label="Password"
                    style={styles.box}
                    isRequired
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    asterik
                  />
                  <FormItem
                    label="Repeat Password"
                    style={styles.box}
                    isRequired
                    value={rpassword}
                    onChangeText={(password) => setRPassword(password)}
                    asterik
                  />
                  <Picker
                    items={[
                    { label: '2017-18', value: '2017-18' },
                    { label: '2018-19', value: '2018-19' },
                    { label: '2019-20', value: '2019-20' },
                    { label: '2020-21', value: '2020-21' },
                    { label: '2021-22', value: '2021-22' },
                   ]}
                    label="Pick a number"
                    style={styles.box}
                    selectedValue={session}
                    onSelection={(item) => setSession(item.value)}
                   />
                   
            </Form>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 50,
        padding: 20,
        border: '1px solid black',
        backgroundColor: '#fff',
    },
    text:{
        color: 'red',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    box:{
        //flex: 1,
        width: '100%',
        height: 40,
        margin: 5
    }

})