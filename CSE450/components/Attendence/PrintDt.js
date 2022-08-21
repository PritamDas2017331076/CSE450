import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, CheckBox, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintDt({route, navigation}){
    const { record } = route.params
    


    return(
        <View>
            <View>
            <ul>
                {
                    record.map((item,index) =>(
                        <li key={index}>
                            <View style={{flexDirection:'row'}}>
                               <Text style={{marginRight :20}}>{item.registration_number}</Text>
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