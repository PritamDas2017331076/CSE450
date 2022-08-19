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
        axios.get(`http://${ip}:5000/student/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })

            axios.get(`http://${ip}:5000/access/${un}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setAcc(res.data)
            })
    },[])

    const Accept = ()=>{
        const chg = {
            registration_number: use.registration_number,
            name: use.name,
            id: use._id,
            section_id: acc.section_id,
        }

        axios.post(`http://${ip}:5000/studentlist/add`,chg)
            .then(res => {
                console.log('data added in studentlist ',res.data)
            })

        axios.delete(`http://${ip}:5000/access/${un}`)
           .then(res => {
                console.log('data deleted in approveDh ',res.data)
            })
        navigation.goBack();
    }

    const Reject = ()=>{


        axios.delete(`http://${ip}:5000/access/${id}`)
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
            <Text>University: {use.university}</Text>
            <Text>Department: {use.department}</Text>
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