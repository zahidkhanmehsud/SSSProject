import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, FlatList, TouchableOpacity, StyleSheet ,ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { auth } from '../../firebase/firebaseconfig';
import LinearGradient from 'react-native-linear-gradient';

const NewCard = (props) => {


  

  return (
   <View style={styles.container}>
      <Text style={styles.heading}>Under Development</Text>
      <Text style={styles.description}>
        We're working hard to bring you this feature. It will be available soon!
      </Text>
   </View>
  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3498db', // Background color
    },
    heading: {
      fontSize: 32, // Larger font size
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#ffffff', // Text color
    },
    description: {
      fontSize: 18, // Slightly larger font size
      textAlign: 'center',
      paddingHorizontal: 20,
      color: '#ffffff', // Text color
    },
  });

export default NewCard;
