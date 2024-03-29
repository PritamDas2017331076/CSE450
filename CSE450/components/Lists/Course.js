import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import {
    selectEmail,
    selectName,
    selectToken,
    selectPost,
    selectUniversity,
    selectDepartment,
    selectId,
    } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function Course({route, navigation}){
    const [list, setList] = useState([])
    const post = useSelector(selectPost)
    const email = useSelector(selectEmail)
    const name = useSelector(selectName)
    const university = useSelector(selectUniversity)
    const department = useSelector(selectDepartment)
    const id = useSelector(selectId)
    const { session_id } = route.params
    console.log('session id ',session_id)
    let f=0
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let fl=1
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('in course it is working')
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

    const accept = (item)=>{

        axios.get(`http://${ip}:5000/access`)
         .then(res=>{
            let data=res.data
            data=data.filter(ele => (ele.course_id==item._id && ele.teacher==item.teacher_id && ele.id==id))
            if(data.length==0){
                navigation.navigate('Sectionform',{
                    course_id: item._id,
                 })
            }else{
                alert('you have already requested')
            }
         })

        


    }

    const section = (id)=>{
        navigation.navigate('Section List',{
            course_id: id,
         })

    }

    const fun = (col)=>{
        col = col.filter(ele => (ele.id==id))
        if(col.length==0) return false
        else return true
    }

    const colab = (item)=>{
        axios.get(`http://${ip}:5000/approveCo/`)
         .then(res =>{
            let data=res.data
            data=data.filter(ele=>(ele.course_id==item._id && ele.teacher==item.teacher_id && ele.id==id))
            if(data.length==0){
                const dat = {
                    id: id,
                    name: name,
                    email: email, 
                    university: university,
                    department: department,
                    course_id: item._id,
                    course_name: item.name,
                    teacher: item.teacher_id
                }
        
                axios.post(`http://${ip}:5000/approveCo/add`,dat)
                  .then(res=>{
                    console.log('approval for colaboration',res.data)
                  })
                  .catch(err=>{
                    console.log('error while colab approval',err)
                  })
            }
            else{
                alert('you have requested already')
            }

         })


    }

    const colas = (ele) => {
        const course_id=ele._id
        let student=ele.student;
        student = student.filter(item =>{
            return (item.id==id)
        })
        student.forEach(item => {
            let section = item.section
            let registration_number = item.registration_number
            axios.get(`http://${ip}:5000/byreg/srro?course_id=${course_id}&section=${section}&registration_number=${registration_number}`)
             .then(res=>{
                const data=res.data
                console.log(data)
                navigation.navigate('PrintRg',{
                    record: data.record,
                    course_id: course_id,
                    section: section
                })
             })
        })
    }

    const Item = ({ item, university, navigation }) => (
        <View style={styles.item}>
            {
                post=='teacher' ? (id==item.teacher_id || fun(item.collaborator)) 
                ?<Button onPress={()=>section(item._id)} title="section"  />:<Text></Text>:<Text></Text>
            }
            {
                post ==='teacher' ? !(id==item.teacher_id || fun(item.collaborator))
                ?<Button onPress={()=>colab(item)} title="collaboration access"  />:<Text>op</Text>:<Text>op</Text>
            }
            {
                post=='student' ? fun(item.student)
                ?<Button onPress={()=>colas(item)} title="student record"  />:<Text></Text>:<Text>ljl</Text>
            }
            {
                post=='student' ? !fun(item.student)
                ?<Button onPress={()=>accept(item)} title="access request"/>:<Text></Text>:<Text></Text>
            }
            {
                post!='student' ? post !='teacher'
                ?<Button onPress={()=>section(item._id)} title="section"/>:<Text></Text> :<Text></Text>
            }
           
        
            <Text>{item.code}</Text>
            <Text>{item.name}</Text>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return(
     
     <View>
        <Text>
            Hello world
        </Text>
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
  