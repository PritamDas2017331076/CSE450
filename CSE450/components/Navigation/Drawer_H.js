import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home'
import {ip} from '../ip'
import About from '../About'
import Uadminlist from '../ApprovalList/Uadminlist'
import Teacherlist from '../ApprovalList/Teacherlist'
import PrintT from '../Print/PrintT'
import Studentlist from '../ApprovalList/Studentlist'
import PrintS from '../Print/PrintS'
import Sessions from '../Create/Session'
import PrintAdmin from '../Print/PrintAdmin'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Department from '../Lists/Department'
import Session from '../Lists/Session'
import Course from '../Lists/Course'
import Courses from '../Create/Course'
import Section from '../Lists/Section'
import StudentlistL from '../Lists/Studentlist'
import Sectionform from '../Lists/Sectionform'
import {
  updateEmail,
  updateName,
  updateToken,
  updatePost,
  updateUniversity,
  updateDepartment,
  selectEmail,
  selectName,
  selectToken,
  selectPost,
  selectUniversity,
  selectDepartment
  
} from '../Loginslice'

const Stack = createStackNavigator();

function ApprovalList(){
  return(
      <Stack.Navigator>
          <Stack.Screen name="Teacher List" component={Teacherlist} />
          <Stack.Screen name="PrintT" component={PrintT} />
      </Stack.Navigator>
  )
}

function NavList(){
  const uni = useSelector(selectUniversity)
  return(
      <Stack.Navigator>
          <Stack.Screen name="Department List" component={Department} initialParams={{university: uni}} />
          <Stack.Screen name="Session List" component={Session} />
          <Stack.Screen name="Course List" component={Course} />
          <Stack.Screen name="Section List" component={Section} />
          <Stack.Screen name="Student List" component={StudentlistL} />
      </Stack.Navigator>
  )
}

function ApprovalListS(){
  return(
      <Stack.Navigator>
          <Stack.Screen name="Student List" component={Studentlist} />
          <Stack.Screen name="PrintS" component={PrintS} />
      </Stack.Navigator>
  )
}


  
export default function Drawer_H({navigation}){
    const token = useSelector(selectToken)
    const post = useSelector(selectPost)
    const name = useSelector(selectName)
    const email = useSelector(selectEmail)
    const dispatch = useDispatch()
    console.log(token)

    const logoutClick = ()=>{
      console.log(post,token)
      console.log('token ',token)
      axios.get(`http://${ip}:5000/${post}/logout`, {
          headers: {
            'Authorization': token
          }
        })
      .then(
          res => {
              console.log(res.data)
              dispatch(updatePost(''))
              dispatch(updateName(''))
              dispatch(updateEmail(''))
              dispatch(updateUniversity(''))
              dispatch(updateDepartment(''))
              dispatch(updateToken(''))
          }
       ) 
       .catch(err =>{
           console.log(err)
       })
  }
    const Drawer = createDrawerNavigator()

    const CustomDrawer = (props)=>{
      return (
            <View style={{flex:1}}>
              <DrawerContentScrollView {...props}>
              <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              backgroundColor:"#f6f6f6",
              marginBottom: 20
            }}>
              <View>
                <Text>{name}</Text>
                <Text>{email}</Text>
              </View>
            </View>
            <DrawerItemList {...props} />
           </DrawerContentScrollView>
           <TouchableOpacity style={{
              backgroundColor: '#f6f6f6',
              right:0,
              left:0,
              bottom:50,
              padding:20,
              
           }} 
           onPress={logoutClick}>
             <Text>Logout</Text>

           </TouchableOpacity>
            </View>
      )
    }
    const DrawerNavigator = ()=>{
      const university= useSelector(selectUniversity)
      return (
        <Drawer.Navigator drawerContent = {(props)=><CustomDrawer {...props} />} >
          <Drawer.Screen component={NavList} name="Departments" />
          <Drawer.Screen component={Home} name="Home" />
          <Drawer.Screen component={About} name="About" />
          <Drawer.Screen component={ApprovalList} name="Approve Teachers" />
          <Drawer.Screen component={ApprovalListS} name="Approve Students" />
          <Drawer.Screen component={Sessions} name="Create Session" />
        </Drawer.Navigator>
      )
    }

    return (
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>

    )
}