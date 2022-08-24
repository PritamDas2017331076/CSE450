import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintDt({route, navigation}){
    const { record } = route.params

    const Item = ({ item }) => (
      <View style={styles.item}>
         <View style={{flexDirection:'row'}}>
               <Text style={{marginRight :20}}>{item.registration_number}</Text>
                  <Text>
                  {
                    item.status?'Present':'Absent'
                  }
               </Text>
          </View>
      </View>
    );
  
    const renderItem = ({ item }) => (
      <Item item={item}  />
     );
    


    return(
        <View>
            <View>
            {/*<ul>
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
            </ul>*/}
              <FlatList
                  data={record}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />
            </View>
       
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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