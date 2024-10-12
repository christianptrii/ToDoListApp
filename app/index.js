import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function splash (){
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={{width:windowWidth*0.7, height:windowWidth*0.7}}/>
      <Text style={styles.text}>Tekan untuk memulai rencana menuju kenyataan!</Text>
      <TouchableOpacity onPress={()=>navigation.replace('home')} style={[styles.button, {width:windowWidth*0.5, height:windowHeight*0.07}]}>
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFF7F7',
    paddingHorizontal:5
  },
  text:{
    color:'#1230AE',
    fontSize:20,
    fontWeight:'bold',
    marginVertical:10,
    textAlign:'center'
  },
  buttonText:{
    color:'#FFF7F7',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  button:{
    backgroundColor:'#6C48C5',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  }
})