import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Section({route, navigation}){
    const [list, setList] = useState([])
    const { course_id } = route.params
    const post= useSelector(selectPost)
    let f=0

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/section/cid?course_id=${course_id}`)
            .then(res => {
                console.log(' data ', res.data) 
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
                             onPress={()=>navigation.navigate('Student List',{
                                section_id: item._id
                             })}>
                               <Text>{item.section}</Text>
                             </TouchableOpacity>
                        </li>
                    ))
                }
            </ul>
            <Text>
            {
                post=='teacher'?<Button onPress={()=>{
                    navigation.navigate('Create Section',{
                        course_id: course_id
                    })
                }} />:''
            }
            </Text>
        </View>
    )




}