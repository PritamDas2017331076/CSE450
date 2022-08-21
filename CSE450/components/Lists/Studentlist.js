import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function StudentlistL({route, navigation}){
    const [list, setList] = useState([])
    const { section_id } = route.params
    const [one, setOne]=useState(false)
    const [two, setTwo]=useState(false)
    const [three, setThree]=useState(false)
    const [date, setDate]=useState(new Date())
    let f=0

    useEffect(() => {
        axios.get(`http://${ip}:5000/section/${section_id}`)
        .then(res => {
            console.log(' data ', res.data)
            setList(res.data.students.map((item,index)=>{
                return {registration_number:item.registration_number,status:false,id:index}
            }))
       }) ;
    }, []);

   console.log('check it out ',f,list)
   const funone = ()=>{
    setOne(true)
    setTwo(false)
    setThree(false)
   }

   const funtwo = ()=>{
    setOne(false)
    setTwo(true)
    setThree(false)
   }

   const funthree = ()=>{
    setOne(false)
    setTwo(false)
    setThree(true)
   }




    return(
        <View>
            <View>
                <Button onPress={()=>navigation.navigate('Take',{
                    section_id: section_id,
                    list: list
                })} title="take attendence" />
                <Button onPress={()=>navigation.navigate('Date',{
                    section_id: section_id,
                })} title="show dates" />
                <Button onPress={()=>navigation.navigate('Reg',{
                    section_id: section_id,
                })} title="show registration numbers" />
            </View>
            {/*<ul>
                {
                    list.map(item =>(
                        <li key={item._id}>
                            {item.registration_number}
                        </li>
                    ))
                }
            </ul>*/}
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