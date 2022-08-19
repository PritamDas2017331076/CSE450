import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { useSelector, useDispatch } from 'react-redux';
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
    selectDepartment,
    selectId
} from '../Loginslice'


export default function Accesslist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    const id= useSelector(selectId)
    let f=0

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/access/teacher?teacher=${id}`)
            .then(res => {
                console.log('for ',university,' data ', res.data) 
                f=1
                setList(res.data)
           }) ;
        });
    
        return unsubscribe;
      }, [navigation]);

   console.log('check it out ',f,list)

    return(
        <View>
            <ul>
                {
                    list.map(item =>(
                        <li key={item._id}>
                            <TouchableOpacity style={{
                                backgroundColor: '#f6f6f6',
                             }} 
                             onPress={()=>navigation.navigate('PrintAc',{
                                un: item._id,
                                id: item.id
                             })}>
                               <Text>{item.registration_number}</Text>
                               <Text>{item.name}</Text>
                             </TouchableOpacity>
                        </li>
                    ))
                }
            </ul>
        </View>
    )




}