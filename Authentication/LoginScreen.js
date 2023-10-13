import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Image,FlatList,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, child, get, getDatabase } from 'firebase/database';
import { auth } from '../firebase/firebaseconfig';
import Icon from 'react-native-vector-icons/FontAwesome';

const logoImageURL = require('../icons/schoollogo2.jpg');

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);

  const elements = [
    { id: 'Parent', icon: 'user', text: 'Parent' },
    { id: 'Security', icon: 'shield', text: 'Security Officer' },
    { id: 'Teacher', icon: 'graduation-cap', text: 'Teacher' },
  ];

  const handleElementPress = (element) => {
    setSelectedElement(element);
  };

  const login = () => {
    if(selectedElement == 'Parent')
    {
      alert('parent Login');
      parentLogin()
    }
    if(selectedElement == 'Security')
    {
      alert('Security Officer Login')
    }
    if (selectedElement == 'Teacher')
    {
      alert('Teacher Login')
      teacherLogin();
    }
    if(selectedElement == null)
    {
      alert('Please Select your role first then you Login')
    }
    
  };

   function teacherLogin()
   {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.emailVerified) {
        getCardUID(user.uid);
      } else {
        alert('Email is not verified. Please Verify Your Email');
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });

   }


   function parentLogin()
   {
    props.navigation.replace('ParentDashboard');

   }


   function securityOfficerLogin()
   {

   }

  function getCardUID(UID) {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `TeacherData/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const id = data.ID;
            const firstName = data.firstname;
            const lastName = data.lastname;
            const newUid = data.uid;

            if (UID == newUid) {
              const session = {
                email,
                password,
                uid: UID,
                CardID: id,
              };
              AsyncStorage.setItem('userSession', JSON.stringify(session))
                .then(() => {
                  alert('Login Successful');
                  props.navigation.replace('teacherDashboard');
                })
                .catch((error) => {
                  console.log('Error saving session:', error);
                });
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.logoContainer}>
        <Image source={logoImageURL} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTitle}>School Security</Text>
        <Text style={styles.subTitle}>Using RFID</Text>
      </View>
      <Text style={styles.roleSelectionText}>Please select your role:</Text>
      <FlatList
        data={elements}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.roleSelectionList}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={[
              styles.roleSelectionItem,
              selectedElement === item.id && styles.selectedRoleSelectionItem,
            ]}
            onPress={() => handleElementPress(item.id)}
          >
            {selectedElement === item.id && (
              <Icon name="check" size={20} color="white" style={styles.checkIcon} />
            )}
            <Icon name={item.icon} size={25} color="black" />
            <Text style={styles.roleSelectionItemText}>{item.text}</Text>
          </TouchableOpacity>

        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordLink}
        onPress={() => {
          props.navigation.navigate('Reset Password');
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View  style={styles.signupView}>
      <Text  style={{fontSize:16}}>Don't have a Parent account?</Text>
      <TouchableOpacity onPress={() => {
          props.navigation.navigate('Signup');}} >
        <Text style={{color:'#800080' , fontWeight:'bold' , fontSize:16 }}> Create account</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#F5F6FA',
    marginTop: 20
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#800080',
  },
  subTitle: {
    fontSize: 18,
    color: '#800080',
  },
  roleSelectionText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 25,
  },
  roleSelectionList: {

    height: 150

  },
  roleSelectionItem: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    margin: 3,
    borderRadius: 10,
  },
  selectedRoleSelectionItem: {
    borderColor: 'green',
  },
  roleSelectionItemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkIcon: {
    position: 'absolute',
    top: 85,
    right: 35,
    backgroundColor: 'green',
    borderRadius: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,

  },
  loginButton: {
    backgroundColor: '#800080',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 16,
  },
  signupView:{
    flexDirection: 'row',
    marginTop:140,


  }
});

export default LoginScreen;
