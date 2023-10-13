import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ScrollView, ImageBackground, TouchableOpacity, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { auth } from '../../firebase/firebaseconfig';
import LinearGradient from 'react-native-linear-gradient';

const HeaderTop = () => {
  return (
    <View style={{ backgroundColor: '#0A2558', width: '100%', justifyContent: 'center', alignItems: 'center', height: 50, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontStyle: "italic", fontSize: 20 }} >Profile</Text>
    </View>
  )
}

const ProfileScreen = (props) => {
  const [userUid, setUserUid] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXyoZXpAWph9Vnu9_ZpWgNmn20W4hlBOn-5dLmFQuww8zSfnhRRNQW7B0RRuApO_PFwg&usqp=CAU');

  useEffect(() => {
    getUID();
  }, []);

  const getUID = async () => {
    try {
      const sessionString = await AsyncStorage.getItem('userSession');
      if (sessionString) {
        const session = JSON.parse(sessionString);
        const { CardID } = session;
        setUserUid(CardID);
        getName(CardID);
      }
    } catch (error) {
      console.log('Error checking saved session:', error);
    }
  };

  function getName(uid) {
    const dbRef = ref(getDatabase());
    const classRef = child(dbRef, `TeacherData/${uid}`);

    onValue(classRef, (snapshot) => {
      if (snapshot.exists()) {
        setFName(snapshot.val().firstname);
        setLName(snapshot.val().lastname);
        // setImage(snapshot.val().image);
      } else {
        console.log("No data available");
      }
    });
  }

  const logOut = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userSession');
              console.log('Data with key has been removed.');
              props.navigation.replace('Login');
              
            } catch (error) {
              console.error('Error removing data:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView >
      <View style={styles.c}></View>
      <LinearGradient
        colors={['#0074e4', '#00a3e1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <HeaderTop />
        <View style={styles.imageView}>
          <Image
            source={{ uri: image }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.uploadIcon}
            onPress={() => {
              // Handle profile picture upload here
            }}
          >
            <FontAwesomeIcon name="upload" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{fname} {lname}</Text>
        <View style={styles.listContainer}>
          <TouchableHighlight
            style={styles.listItem}
            underlayColor="#DDDDDD"
            onPress={() => {
              // Handle Setting button press
            }}
          >
            <View style={styles.listItemContent}>
              <Icon color={'white'} name="settings" type="ionicon" size={25} />
              <Text style={{ color: 'white' }} > Setting</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.listItem}
            underlayColor="#DDDDDD"
            onPress={() => {
              // Handle Privacy button press
            }}
          >
            <View style={styles.listItemContent}>
              <Icon2 color={'white'} name="locked" type="material" size={25} />
              <Text style={{ color: 'white' }}>  Privacy and policy</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ paddingVertical: 10, }}
            underlayColor="#DDDDDD"
            onPress={logOut}
          >
            <View style={styles.listItemContent}>
              <Icon3 color={'red'} name="logout" type="material" size={25} />
              <Text style={{ color: 'red', }}> Logout</Text>
            </View>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 800,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 12,
    overflow: 'hidden',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    color: 'white',
  },
  listContainer: {
    width: '96%',
    borderRadius: 10,
    backgroundColor: '#054f96',
    height: 167,
    margin: 7
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#a0a7b0',
    paddingVertical: 10,
    margin: 2,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 20,
  },
  imageView: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#0A2558',
    marginTop: 5,
  }
});

export default ProfileScreen;
