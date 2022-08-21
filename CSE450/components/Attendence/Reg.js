import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, CheckBox, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Date({route, navigation}){
    const { section_id } = route.params
    const [dist,setDist]=useState([])

    useEffect(() => {
        axios.get(`http://${ip}:5000/section/${section_id}`)
          .then(res=>{
            console.log(section_id,res.data)
            setDist(res.data.students)
          })

  }, []);


    return(
        <View>
            <View>
            <ul>
                {
                    dist.map((item,index) =>(
                        <li key={index}>
                            <TouchableOpacity style={{backgroundColor:'#f6f6f6',margin:20}} 
                                              onPress={()=>navigation.navigate('PrintRg',{
                                                                   section_id: section_id,
                                                                   registration_number: item.registration_number
                             })}>
                               <Text>{item.registration_number}</Text>
                            </TouchableOpacity>
                        </li>
                       ))
                }
            </ul>
            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
      marginRight:20
    },
    label: {
      margin: 8,
    },
  });