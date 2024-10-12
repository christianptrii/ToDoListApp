import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import CustomInput from '@/components/CustomInput'
import CustomInputTextArea from '@/components/CustomInputTextArea'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import * as Device from 'expo-device';
import { FIRESTORE_DB } from '../FirebaseConfig'

export default function Add (){
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleAdd = async () => {
      try {
          const deviceId = Device.osBuildId || Device.osInternalBuildId;
          const listRef = collection(FIRESTORE_DB, 'To Do List', deviceId, 'list');

          await addDoc(listRef, {
              taskName: title,
              taskDescription: text,
              completed: false,
              createdAt: new Date()
          });

          setTitle('');
          setText('');

          navigation.reset({
              index: 0,
              routes: [{ name: 'index' }],
          });
      } catch (error) {
          console.error('Error adding document: ', error);
      }
  };

  return (
      <View style={styles.container}>
          <Header title="Tambahkan List" />
          <CustomInput value={title} setValue={setTitle} />
          <CustomInputTextArea value={text} setValue={setText} />
          <TouchableOpacity
              style={[styles.button, { width: windowWidth * 0.8, height: windowHeight * 0.07, marginTop: windowHeight * 0.1 }]}
              onPress={handleAdd}
          >
              <Text style={styles.buttonText}>Tambahkan</Text>
          </TouchableOpacity>
      </View>
  );
};



const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#FFF7F7'
    },
    button:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#6C48C5',
      borderRadius:10
    },
    buttonText:{
      color:'#FFF7F7',
      fontSize:15,
      fontWeight:'bold'
    }
})