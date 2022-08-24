import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';

export default function PrintAc({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')
    const [acc, setAcc] = useState('')

    useEffect(() => {
        let fl=1
      if(fl==1){axios.get(`http://${ip}:5000/student/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })

            axios.get(`http://${ip}:5000/access/${un}`)
            .then(res => {
                console.log('data for this acc ',res.data)
                setAcc(res.data)
            })}
            return () => {
                fl=0
                };
    },[])

    const Accept = ()=>{
        const chg = {
            registration_number: use.registration_number,
            id: use._id
        }

        const chk = {
            section_id: acc.section_id,
            registration_number: use.registration_number,
            record: []
        }

        axios.patch(`http://${ip}:5000/section/${acc.section_id}`,chg)
            .then(res => {
                console.log('data added in studentlist ',res.data)
            })

        axios.post(`http://${ip}:5000/byreg/add`,chk)
            .then(res => {
                console.log('data added in byreg ',res.data)
            })

        axios.delete(`http://${ip}:5000/access/${un}`)
           .then(res => {
                console.log('data deleted in approveDh ',res.data)
            })
        navigation.goBack();
    }

    const Reject = ()=>{


        axios.delete(`http://${ip}:5000/access/${un}`)
            .then(res => {
                console.log('data deleted in teacher ',res.data)
            })
        navigation.goBack();
    }

    return(
        <View>
            <Text>Name: {use.name}</Text>
            <Text>Registration Number: {use.registration_number}</Text>
            <Text>Email: {use.email}</Text>
            <Text>Phone: {use.phone}</Text>
            <Text>Course Name: {acc.course_name}</Text>
            <Text>Post: {use.post}</Text>
            <TextInput
              onChangeText={onChangeText}
              value={text}
            />
            <Button
              title="Accept"
              onPress={Accept}
            />
            <Button
              title="Reject"
              onPress={Reject}
            />
        </View>
    )



}