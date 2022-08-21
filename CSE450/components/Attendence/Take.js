import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, TouchableOpacity, CheckBox, TextInput } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Take({route, navigation}){
    const { section_id,list } = route.params
    const [date, setDate]=useState('')
    const [dist, setDist] = useState(list)
    const [record,setRecord]=useState([])
    const [lost,setLost]=useState([])
    console.log('dist',dist)
    let f=0

    useEffect(() => {
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      setDate(`${year}-${month}-${date}`)

  }, []);

   const Submit = ()=>{
    console.log('hello')
    console.log('record',record)
    const data={
      date: date,
      record: dist,
      section_id: section_id
    }
    axios.post(`http://${ip}:5000/bydate/add`,data)
     .then(res=>{
       console.log('recorded data',res.data)
     })
     dist.map((ele)=>{
      const chg={
        date: date,
        status: ele.status
      }
      axios.patch(`http://${ip}:5000/byreg/sr?section_id=${section_id}&registration_number=${ele.registration_number}`,chg)
        .then(res=>{
          console.log('for each ',res.data)
        })
    })
     navigation.goBack()

   }

   const setVal = (id)=>{
    setDist(
        dist.map((item) =>
                // Here you accept a id argument to the function and replace it with hard coded 🤪 2, to make it dynamic.
                item.id === id
                    ? { ...item, status: !item.status }
                    : { ...item }
            )
    )
   }


    return(
        <View>
            {/*<ul>
                {
                    list.map(item =>(
                        <li key={item._id}>
                            {item.registration_number}
                        </li>
                    ))
                }
            </ul>*/}
            <TextInput
              style={{height: 40}}
              placeholder="enter date"
              onChangeText={newText => setDate(newText)}
              defaultValue={date}
            />
            <View>
            <ul>
                {
                    dist.map((item,index) =>(
                        <li key={index}>
                           
                               <View style={styles.checkboxContainer}>
                               <CheckBox
                                  value={item.status}
                                  onValueChange={()=>setVal(item.id)}
                                  style={styles.checkbox}
                                />
                                  <Text>{item.registration_number}</Text>
                                </View>
                        </li>
                       ))
                }
            </ul>
            </View>
            <Button onPress={Submit} title="Submit" />
            <Text>haha</Text>
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