import React from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DrugItem({ name, onPress }){
  return(
    <TouchableOpacity style {styles.button} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 16,
  },
});

