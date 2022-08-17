import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {ip} from '../ip'

export default function PrintT({route, navigation}){
    const {un, id} = route.params

    const [use, setUse] = useState('')
    const [text, onChangeText] = useState('')

    useEffect(() => {
        axios.get(`http://${ip}:5000/teacher/${id}`)
            .then(res => {
                console.log('data for this id ',res.data)
                setUse(res.data)
            })
    },[])

    const Accept = ()=>{
        const chg = {
            activated: true
        }

        axios.patch(`http://${ip}:5000/teacher/${id}`,chg)
            .then(res => {
                console.log('data updated in dhead ',res.data)
                setUse(res.data)
            })

        axios.delete(`http://${ip}:5000/approveT/${un}`)
           .then(res => {
                console.log('data deleted in approveDh ',res.data)
            })
        navigation.goBack();
    }

    const Reject = ()=>{

        axios.delete(`http://${ip}:5000/approveT/${un}`)
           .then(res => {
                console.log('data deleted in approve ',res.data)
            })

        axios.delete(`http://${ip}:5000/teacher/${id}`)
            .then(res => {
                console.log('data deleted in teacher ',res.data)
            })
        navigation.goBack();
    }

    return(
        <View>
            <Text>Name: {use.name}</Text>
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