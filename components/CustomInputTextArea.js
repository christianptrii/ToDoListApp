import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInputTextArea = ({value, setValue}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  return (
    <View>
        <Text style={styles.labelInput}>Keterangan Rencana</Text>
        <TextInput
            style={[styles.textArea, {width:windowWidth*0.8, height:windowHeight*0.3}]}
            multiline={true}
            numberOfLines={4}
            placeholder="Ketik di sini untuk penjelasan rencana..."
            value={value}
            onChangeText={setValue}
            placeholderTextColor="white"
        />
    </View>
  )
}

export default CustomInputTextArea

const styles = StyleSheet.create({
    textArea: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        textAlignVertical: 'top',
        backgroundColor:'#C68FE6',
        color:'black',
        fontSize:15,
        borderRadius:10
    },
    labelInput:{
      fontSize:18,
      color:'#1230AE',
      fontWeight:'bold',
    },
})