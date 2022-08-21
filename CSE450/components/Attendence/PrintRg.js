import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, CheckBox, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintRg({route, navigation}){
    const { section_id, registration_number } = route.params
    const [dist, setDist] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/byreg/srr?section_id=${section_id}&registration_number=${registration_number}`)
          .then(res=>{
            console.log(section_id,res.data)
            setDist(res.data.record)
          })

  }, []);
    


    return(
        <View>
            <View>
            <ul>
                {
                    dist.map((item,index) =>(
                        <li key={index}>
                            <View style={{flexDirection:'row'}}>
                               <Text style={{marginRight :20}}>{item.date}</Text>
                               <Text>
                               {
                                item.status?'Present':'Absent'
                               }
                               </Text>
                            </View>
                           
                           
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