import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectDepartment } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Studentlist({navigation}){
    const [list, setList] = useState([])
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    let f=0

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/approveS?university=${university}&department=${department}`)
            .then(res => {
                console.log('for ',university, department,' data ', res.data) 
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
                                margin: 20
                             }} 
                             onPress={()=>navigation.navigate('PrintS',{
                                un: item._id,
                                id: item.id
                             })}>
                               <Text>{item.name}</Text>
                               <Text>{item.email}</Text>
                               <Text>{item.registration_number}</Text>
                             </TouchableOpacity>
                        </li>
                    ))
                }
            </ul>
        </View>
    )




}