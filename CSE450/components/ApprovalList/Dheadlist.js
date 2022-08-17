import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Dheadlist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    let f=0

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/approveDh?university=${university}`)
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
                             onPress={()=>navigation.navigate('PrintDh',{
                                un: item._id,
                                id: item.id
                             })}>
                               <Text>{item.department}</Text>
                             </TouchableOpacity>
                        </li>
                    ))
                }
            </ul>
        </View>
    )




}