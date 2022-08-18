import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import Department from './Department'
import { useSelector, useDispatch } from 'react-redux';


export default function University({navigation}){
    const [list, setList] = useState([])
    let f=0

    useEffect(() => {
        axios.get(`http://${ip}:5000/university_admin`)
        .then(res => {
            console.log('for ',university,' data ', res.data) 
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
                             onPress={()=>navigation.navigate('Department',{
                                university: item.university
                             })}>
                               <Text>{item.university}</Text>
                             </TouchableOpacity>
                        </li>
                    ))
                }
            </ul>
        </View>
    )




}