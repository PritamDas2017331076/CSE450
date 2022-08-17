import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'

export default function PrintAdmin({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')

    useEffect(() => {
        axios.get(`http://${ip}:5000/university_admin/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })
    },[])

    const Accept = ()=>{
        const chg = {
            activated: true
        }

        axios.patch(`http://${ip}:5000/university_admin/${id}`,chg)
            .then(res => {
                console.log('data updated in uadmin ',res.data)
                setUse(res.data)
            })

        axios.delete(`http://${ip}:5000/approve/${un}`)
           .then(res => {
                console.log('data deleted in approve ',res.data)
            })
        navigation.goBack();
    }

    const Reject = ()=>{

        axios.delete(`http://${ip}:5000/approve/${un}`)
           .then(res => {
                console.log('data deleted in approve ',res.data)
            })

        axios.delete(`http://${ip}:5000/university_admin/${id}`)
            .then(res => {
                console.log('data deleted in uadmin ',res.data)
            })
        navigation.goBack();
    }

    return(
        <View>
            <Text>Name: {use.name}</Text>
            <Text>Email: {use.email}</Text>
            <Text>Phone: {use.phone}</Text>
            <Text>University: {use.university}</Text>
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