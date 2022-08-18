import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Session({route, navigation}){
    const [list, setList] = useState([])
    const { session_id } = route.params
    let f=0

    useEffect(() => {
        axios.get(`http://${ip}:5000/course?session_id=${session_id}`)
        .then(res => {
            console.log(' data ', res.data)
            setList(res.data)
       }) ;
    }, []);

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
                             onPress={()=>navigation.navigate('Section',{
                                course_id: item._id,
                             })}>
                               <Text>{item.session}</Text>
                             </TouchableOpacity>
                        </li>
                    ))
                }
            </ul>
        </View>
    )




}