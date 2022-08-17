import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home'
import About from '../About'
import Login from '../EntityLogin/Login'
import Teacherregister from '../EntityRegister/Teacherregister'
import Studentregister from '../EntityRegister/Studentregister'
import { TouchableOpacity } from 'react-native-gesture-handler';
import UAdminRegister from '../EntityRegister/UAdminRegister';
import DheadRegister from '../EntityRegister/DheadRegister'


  
export default function Drawerout({navigation}){
  
  const [input, setInput]=useState('')
  const [cur, setCur] = useState('')
  const [use, setUse]=useState('')

  const readData = async()=>{
    try{
      setInput(await AsyncStorage.getItem('token'))
      setCur(await AsyncStorage.getItem('status'))
      console.log('details near are',input,cur)
      axios.get(`http://192.168.0.106:5000/${cur}/me`,{
      headers: {
          'Authorization': input
        }
  })
  .then(async res => {
      console.log('present user exists');
      console.log('new user logged in',res.data,res.data.user) ;
      setUse(res.data.user)
      console.log('And our userrrr is',use) 
  })
  .catch(error => {
      console.log('error,no one logged in here')
  })
    }catch{
      console.log('failed to get it')
    }

  }
  useEffect(()=>{
     //setInterval(()=>readData(),5000)
      readData()
      console.log('details on to the char',input,cur)

  },[])

    const logoutClick = ()=>{
      console.log('logout',cur,input)
      axios.get(`http://localhost:5000/${cur}/logout`, {
          headers: {
            'Authorization': input
          }
        })
      .then(
          res => {
              console.log(res.data)
              dispatch(toggleLoggedin())
              window.location.href = "/Home";
          }
       ) 
       .catch(err =>{
           console.log(err)
       })
  }
    const Drawer = createDrawerNavigator()

    const CustomDrawer = (props)=>{
      return (
        <View>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        
        </View>
        

      )
    }
    const DrawerNavigatorout = ()=>{
      return (
        <Drawer.Navigator screenOptions={{
          headerShown: true,
          headerStyle : { 
            backgroundColor: 'transparent',
            elevation: 0, 
            shadowOpacity: 0
          },
          headerTitle: ''
        }} drawerContent = {(props)=><CustomDrawer {...props} />} >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About" component={About}  />
          <Drawer.Screen name="Studentregister" component={Studentregister}  />
          <Drawer.Screen name="Teacherregister" component={Teacherregister}  />
        </Drawer.Navigator>
      )
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          headerShown: true,
          headerStyle : { 
            backgroundColor: 'transparent',
            elevation: 0, 
            shadowOpacity: 0
          },
          headerTitle: ''
        }}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About" component={About}  />
          <Drawer.Screen name="Studentregister" component={Studentregister}  />
          <Drawer.Screen name="University Admin Register" component={UAdminRegister}  />
          <Drawer.Screen name="Department Head Register" component={DheadRegister}  />
          <Drawer.Screen name="Teacherregister" component={Teacherregister}  />
          <Drawer.Screen name="Login" component={Login}  />
        </Drawer.Navigator>
      </NavigationContainer>

    )
}