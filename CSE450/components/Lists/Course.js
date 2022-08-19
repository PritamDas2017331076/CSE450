import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Course({route, navigation}){
    const [list, setList] = useState([])
    const post = useSelector(selectPost)
    const { session_id } = route.params
    console.log('session id ',session_id)
    let f=0

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/course/session?session_id=${session_id}`)
            .then(res => {
                console.log(' data ', res.data) 
                setList(res.data)
           }) ;
        });
    
        return unsubscribe;
    }, [navigation]);

   console.log('check it out ',f,list)

    const accept = (id)=>{

        navigation.navigate('Sectionform',{
            course_id: id,
         })


    }

    const section = (id)=>{
        navigation.navigate('Section List',{
            course_id: id,
         })

    }

    return(
        <View>
            <ul>
                {
                    list.map(item =>(
                        <li key={item._id}>
                            <Button onPress={()=>section(item._id)} title="section"  />
                            <Text>
                                {
                                    post=='student'?<Button onPress={()=>accept(item._id)} title="access request"/>:''
                                }
                            </Text>
                            <Text>{item.code}</Text>
                            <Text>{item.name}</Text>
                        </li>
                    ))
                }
            </ul>

            <Text>
            {
                post=='teacher'?<Button onPress={()=>{
                    navigation.navigate('Create Course',{
                        session_id: session_id
                    })
                }} />:''
            }
            </Text>
            
        </View>
    )




}