import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseconfig';

function ParentCheckStatus(props) {
  
  return (
    <View style={styles.container}>
        <Text>Status</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA', // Change the background color to your desired color
  },
  image: {
    width: 200,
    height: 200, // Adjust the image height as needed
    marginBottom: 20, // Adjust the margin as needed
  },
  logoName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#800080', // Text color
    marginBottom: 10, // Adjust the margin as needed
  },
  spinner: {
    marginBottom: 100, // Adjust the margin as needed
    backgroundColor: '#a83902', // Make the background transparent
    borderRadius: 20,
    marginTop:20
  },
  subTitle: {
    fontSize: 18,
    color: '#800080', // Purple color for the subtitle
  },
});

export default ParentCheckStatus;
