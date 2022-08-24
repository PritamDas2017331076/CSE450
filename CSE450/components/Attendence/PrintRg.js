import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import {ip} from '../ip'
import { selectUniversity } from '../Loginslice';
import { useSelector, useDispatch } from 'react-redux';


export default function PrintRg({route, navigation}){
    const { section_id, registration_number } = route.params
    const [dist, setDist] = useState([])
    const [loading, setLoading] = useState(true)
    console.log('section id, registration number',section_id,registration_number)
    let fl=1


    useEffect(() => {
        axios.get(`http://${ip}:5000/byreg/srr?section_id=${section_id}&registration_number=${registration_number}`)
          .then(res=>{
            console.log('section info ',section_id,res.data)
            if(fl==1) setDist(res.data.record)
          })
          .catch((error) => console.error('error',error.message))
          .finally(() => {
            setLoading(false)
            fl=0 ;
          });

  }, []);

  const Item = ({ item }) => (
    <View style={styles.item}>
       <View style={{flexDirection:'row'}}>
             <Text style={{marginRight :20}}>{item.date}</Text>
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
            {loading?<Text>loading</Text>
                   :<FlatList
                         data={dist}
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