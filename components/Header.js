import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({title}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  return (
    <View style={[styles.container, {width:windowWidth, height:windowHeight*0.13}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#6C48C5',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'#FDFAD9',
        fontSize:20,
        fontWeight:'bold'
    }
})