import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
const CustomInput = ({ value, setValue }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Judul Rencana</Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Masukkan Judul"
          placeholderTextColor="#FFF7F7"
          style={[styles.input,{width:windowWidth*0.8}]}
          keyboardType='text'
        />
      </View>
    );
};
export default CustomInput;

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginVertical: 5,
      marginBottom: 10,
    },
    title:{
      fontSize:18,
      color:'#1230AE',
      fontWeight:'bold'
    },
    input: {
      color: 'black',
      fontSize: 16,
      padding: 8,
      borderRadius: 10,
      backgroundColor:'#C68FE6'
    },
});