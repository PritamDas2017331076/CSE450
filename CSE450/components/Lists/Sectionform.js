import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet,ScrollView} from 'react-native'
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector, useDispatch } from 'react-redux';
import {ip} from '../ip'
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

export default function Sectionform({route, navigation}){
    const [registration_number, setRG] = useState('')
    const [name, setName] = useState('')
    const [came, setCame] = useState('')
    const [id, setId] = useState('')
    const [idd,setIdd]=useState('')
    const [list, setList] = useState([])
    const [dist, setDist] = useState('')
    const [teacher, setTeacher] = useState('')
    const university = useSelector(selectUniversity)
    const post = useSelector(selectPost)
    const token = useSelector(selectToken)
    const {course_id} = route.params

    useEffect(() => {
        axios.get(`http://${ip}:5000/section/cid?course_id=${course_id}`)
        .then(res => {
            console.log(' data ', res.data)
            setList(res.data.map( (s) => {
                return {value:s._id, label:s.section}
            }))
       }) ;

       axios.get(`http://${ip}:5000/${post}/me`,{
          headers:{ 'Authorization': token }
        })
        .then(res=>{
            //console.log('logged in person ',res.data)
            setName(res.data.name)
            setId(res.data._id)
            setRG(res.data.registration_number)
        })
        .catch((err)=>{console.log(err,'error in authentication') })

        axios.get(`http://${ip}:5000/course/${course_id}`)
        .then(res=>{
           // console.log('course teacher ',res.data)
            setTeacher(res.data.teacher_id)
            setCame(res.data.name)
        })
        .catch((error) => {
            console.log(error.message)
            alert('error in finding course')
          })
    }, []);

    
    const onSubmit = (e) => {
        //e.preventDefault()

        if(!dist){
            alert('Please enter section')
            return
        }

       /* axios.get(`http://${ip}:5000/${post}/me`,{
          headers:{ 'Authorization': token }
        })
        .then(res=>{
            console.log('logged in person ',res.data)
            setName(res.data.name)
            setId(res.data._id)
            setRG(res.data.registration_number)
        })
        .catch((err)=>{console.log(err,'error in authentication') })

        axios.get(`http://${ip}:5000/course/${course_id}`)
        .then(res=>{
            console.log('course teacher ',res.data)
            setTeacher(res.data.teacher_id)
            setCame(res.data.name)
        })
        .catch((error) => {
            console.log(error.message)
            alert('error in finding course')
          })*/

          const st=`http://${ip}:5000/section/cids?course_id=${course_id}&section=${dist}`
          console.log(st)

         /* const sendGetRequest = () => {
            try {
                const resp =  axios.get(`http://${ip}:5000/section/cids?course_id=${course_id}&section=${dist}`);
                console.log('teast it',resp.data);
                setIdd(resp.data._id)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest()*/
        console.log('idd ',idd)

        const details = {
          section_id: idd,
          section: dist,
          teacher: teacher,
          name: name, // student name
          registration_number: registration_number,
          id: id, // student id
          course_name: came,
          university: university,

        }
        console.log('details ',details)
        axios.post(`http://${ip}:5000/access/add`,details)
        .then(res=>{
          console.log(res.data)

        })
        .catch((error) => {
          console.log(error.message)
          alert('error in sending request to teacher')
        })

        /*axios.get(`http://${ip}:5000/section/cids?course_id=${course_id}&section=${dist}`)
          .then( (res) => {
                //  console.log('res ',res)
                  console.log(JSON.stringify(res.data))
                  const idd=res.data._id
                  console.log('section id',idd)
                  const details = {
                    section_id: idd,
                    section: dist,
                    teacher: teacher,
                    name: name, // student name
                    registration_number: registration_number,
                    id: id, // student id
                    course_name: came,
                    university: university,

                  }
                  console.log('details ',details)
                  axios.post(`http://${ip}:5000/access/add`,details)
                  .then(res=>{
                    console.log(res.data)

                  })
                  .catch((error) => {
                    console.log(error.message)
                    alert('error in sending request to teacher')
                  })

          })
          .catch((error) => {
            console.log(error.message)
            alert('error in getting section _id')
          })*/

        



        


        

        setDist('')
        

        
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Form onButtonPress={onSubmit}>
            <Picker
                items={list}
                label="Pick a section"
                style={styles.box}
                selectedValue={dist}
                onSelection={(item) => {
                  console.log(item)
                  setDist(item.value)
                  const bs=item
                  console.log(bs)
                  setIdd(bs.value)
                }}
                />
            </Form>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      height: 50,
      padding: 20,
      border: '1px solid black',
      backgroundColor: '#fff',
  },
  text:{
      color: 'red',
      fontSize: 20,
      justifyContent: 'center',
      fontWeight: 'bold',
  },
  box:{
      //flex: 1,
      width: '100%',
      height: 40,
      margin: 5
  }

})