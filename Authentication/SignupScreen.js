import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createUserWithEmailAndPassword ,sendEmailVerification} from 'firebase/auth';
import { ref, child, get, getDatabase } from 'firebase/database';
import { auth } from '../firebase/firebaseconfig';

const SignupScreen = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cnic, setCNIC] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
     
    const user = userCredential.user;
    console.log('create Account Successfully')
    sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log('send verification email');
  });



 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-230}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Create Parent Account</Text>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
        />

        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
        />

        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
        />

        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
        />

        <TextInput
          label="CNIC Number"
          value={cnic}
          onChangeText={setCNIC}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          outlineColor="#3366FF"
          theme={{ colors: { primary: '#3366FF' } }}
          secureTextEntry={true}
        />

        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          
        >
          Sign Up
        </Button>
        <View style={styles.signupView}>
          <Text style={{ fontSize: 16 }}>Aleardy have an account?</Text>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('Login');
          }} >
            <Text style={{ color: '#800080', fontWeight: 'bold', fontSize: 16 }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor:'#800080'
  },
  signupView: {
    flexDirection: 'row',
    marginTop: 100,
  }
});

export default SignupScreen;
