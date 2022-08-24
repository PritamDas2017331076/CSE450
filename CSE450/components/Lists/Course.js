import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity, selectPost } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Course({route, navigation}){
    const [list, setList] = useState([])
    const post = useSelector(selectPost)
    const { session_id } = route.params
    console.log('session id ',session_id)
    let f=0
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let fl=1
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://${ip}:5000/course/session?session_id=${session_id}`)
            .then(res => {
                console.log(' data ', res.data, session_id) 
                setList(res.data)
             })
             .catch((error) => console.error(error))
             .finally(() => {
               setLoading(false)
               fl=0 ;
             });
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

    const Item = ({ item, university, navigation }) => (
        <View style={styles.item}>
          <Button onPress={()=>section(item._id)} title="section"  />
            <Text>
                {
                    post=='student'?<Button onPress={()=>accept(item._id)} title="access request"/>:''
                }
            </Text>
            <Text>{item.code}</Text>
            <Text>{item.name}</Text>
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

            <Text>
            {
                post=='teacher'?<Button onPress={()=>{
                    navigation.navigate('Create Course',{
                        session_id: session_id
                    })
                }} title="create course"/>:''
            }
            </Text>
            
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
  