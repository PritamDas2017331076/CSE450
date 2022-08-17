import React from 'react'
import {useState} from 'react'
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

export default function UAdminRegister({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [university, setUniversity] = useState('')
    const [rpassword, setRPassword] = useState('')
    const [activated, setActivated] = useState(false)

    const onSubmit = (e) => {
        //e.preventDefault()

        if(!name){
            alert('Please enter name')
            return
        }

        if(!email){
            alert('Please enter email')
            return
        }

        if(!phone){
            alert('Please enter phone number')
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


        const Details = {
          name: name,
          email: email,
          phone: phone,
          university: university,
          department: department,
          password: password,
        }
        
        console.log(Details,ip)

         axios.post(`http://${ip}:5000/department_head/add`,Details)
          .then(res => {
            console.log('dhead data ',res.data)
               navigation.navigate('Home')
             })
          .catch((error) => {
            console.log(error.message)
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setName('')
        setPhone('')
        setEmail('')
        setPassword('')
        setDepartment('')
        setRPassword('')
        setUniversity('')
        

        
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
                    label="Name"
                    style={styles.box}
                    isRequired
                    value={name}
                    onChangeText={(name) => setName(name)}
                    asterik
                  />
                <FormItem
                    label="Phone Number"
                    style={styles.box}
                    isRequired
                    value={phone}
                    onChangeText={(phone) => setPhone(phone)}
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