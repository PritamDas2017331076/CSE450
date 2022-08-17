import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux';
import {ip} from '../ip'
import {
    toggleLoggedin, 
    updateLoggedinUser,
    updateEntity,
    updateToken,
    selectIsLoggedin,
    selectLoggedinUser,
    selectEntity,
    selectToken,
  } from '../Loginslice'
export default function Studentregister({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [university, setUniversity] = useState('')
    const [session, setSession] = useState('')
    const [reg, setReg] = useState('')
    const [department, setDepartment] = useState('')
    const [rpassword, setRPassword] = useState('')

    const dispatch = useDispatch()
    const onSubmit = (e) => {
        //e.preventDefault()

        
        if(!name){
          alert('Please enter name')
          return
      }

      if(!phone){
          alert('Please enter phone')
          return
      }

      if(!university){
          alert('Please enter university')
          return
      }

      if(!department){
          alert('Please enter department')
          return
      }

      if(!email){
          alert('Please enter email')
          return
      }

      if(!session){
        alert('Please enter session')
        return
      }

      if(!reg){
        alert('Please enter registration number')
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


      if(password!==rpassword){
          alert('wrong password entered')
          return
      }

        const studentDetails = {
          name: name,
          registration_number: reg,
          email: email,
          phone: phone,
          university: university,
          session: session,
          department: department,
          password: password,
        }
        
        console.log(studentDetails,ip)

         axios.post(`http://${ip}:5000/student/add`,studentDetails)
          .then(res => {
                  console.log(res.data)
                  navigation.navigate('Home')
          })
          .catch((error) => {
            console.log(error.message)
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setName('')
        setPhone('')
        setUniversity('')
        setDepartment('')
        setEmail('')
        setPassword('')
        setRPassword('')
        setSession('')
        setReg('')
        

        
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
                    label="Registration Number"
                    style={styles.box}
                    isRequired
                    value={reg}
                    onChangeText={(email) => setReg(email)}
                    asterik
                  />
                <FormItem
                    label="Name"
                    style={styles.box}
                    isRequired
                    value={name}
                    onChangeText={(user) => setName(user)}
                    asterik
                  />
                <FormItem
                    label="Phone"
                    style={styles.box}
                    isRequired
                    value={phone}
                    onChangeText={(user) => setPhone(user)}
                    asterik
                  />
                <Picker
                    items={[
                    { label: 'SUST', value: 'SUST' },
                    { label: 'BUET', value: 'BUET' },
                    { label: 'KUET', value: 'KUET' },
                    { label: 'RUET', value: 'RUET' },
                    { label: 'CUET', value: 'CUET' },
                   ]}
                    label="Pick a University"
                    style={styles.box}
                    selectedValue={university}
                    onSelection={(item) => setUniversity(item.value)}
                   />
                <Picker
                    items={[
                    { label: '2017-18', value: '2017-18' },
                    { label: '2018-19', value: '2018-19' },
                    { label: '2019-20', value: '2019-20' },
                    { label: '2020-21', value: '2020-21' },
                    { label: '2021-22', value: '2021-22' },
                   ]}
                    label="Pick a session"
                    style={styles.box}
                    selectedValue={session}
                    onSelection={(item) => setSession(item.value)}
                   />
                <Picker
                    items={[
                    { label: 'Computer Science & Engineering', value: 'CSE' },
                    { label: 'Electronics & Electrical Engineering', value: 'EEE' },
                    { label: 'Civil Engineering', value: 'CE' },
                    { label: 'Mechanical Engineering', value: 'ME' },
                    { label: 'Chemical Engineering', value: 'CHE' }
                   ]}
                    label="Pick a Department"
                    style={styles.box}
                    selectedValue={department}
                    onSelection={(item) => setDepartment(item.value)}
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