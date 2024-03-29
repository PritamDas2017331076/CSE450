import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import Department from './Department'
import { useSelector, useDispatch } from 'react-redux';


export default function University({navigation}){
    const [list, setList] = useState([])
    let f=0
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      let fl=1
      axios.get(`http://${ip}:5000/university_admin`)
        .then(res => {
            console.log(' data ', res.data) 
            setList(res.data)
         })
         .catch((error) => console.error(error))
         .finally(() => {
               setLoading(false)
               fl=0 ;
          });
    }, []);

   console.log('check it out ',f,list)

   const Item = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={{
        backgroundColor: '#f6f6f6',
        }} 
        onPress={()=>navigation.navigate('Department',{
            university: item.university
      })}>
       <Text>{item.university}</Text>
    </TouchableOpacity>
    </View>
  );

   const renderItem = ({ item }) => (
    <Item item={item} />
   );

    return(
        <View>
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={list}
                         renderItem={renderItem}
                         keyExtractor={item => item._id}
                       />
                    }
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });