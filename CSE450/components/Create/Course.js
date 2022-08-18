import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux';
import {ip} from '../ip'
import {
  updateEmail,
  updateName,
  updateToken,
  updatePost,
  updateUniversity,
  updateDepartment,
  selectEmail,
  selectName,
  selectToken,
  selectPost,
  selectUniversity,
  selectDepartment
  } from '../Loginslice'

export default function UAdminRegister(route, {navigation}){
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const {session} = route.params

    
    const onSubmit = (e) => {
        //e.preventDefault()

        if(!session){
            alert('Please enter session')
            return
        }

        


        const Details = {
          session: session,
          university: university,
          department: department,
          code: code,
          name: name
        }
        console.log(Details,ip)

         axios.post(`http://${ip}:5000/course/add`,Details)
          .then(res => {
            console.log('dhead data ',res.data)
               navigation.navigate('Home')
             })
          .catch((error) => {
            console.log(error.message)
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setCode('')
        setName('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
                
                <FormItem
                    label="Course Code"
                    style={styles.box}
                    isRequired
                    value={code}
                    onChangeText={(code) => setSession(code)}
                    asterik
                  />
                <FormItem
                    label="Course Name"
                    style={styles.box}
                    isRequired
                    value={name}
                    onChangeText={(name) => setSession(name)}
                    asterik
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