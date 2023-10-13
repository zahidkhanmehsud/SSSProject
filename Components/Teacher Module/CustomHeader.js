import React, { useEffect ,useState } from 'react';
import { View, Text, Image, TouchableOpacity ,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { auth } from '../../firebase/firebaseconfig';

const CustomHeader = () => {
    const [userUid, setUserUid] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [image , setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXyoZXpAWph9Vnu9_ZpWgNmn20W4hlBOn-5dLmFQuww8zSfnhRRNQW7B0RRuApO_PFwg&usqp=CAU');

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
            getName(CardID); // Pass the UID to getClass
          }
        } catch (error) {
          console.log('Error checking saved session:', error);
          // Stop loading on error
        }
      };
      function getName(uid) {
        const dbRef = ref(getDatabase());
        const classRef = child(dbRef, `TeacherData/${uid}`);
    
        // Set up a listener for real-time updates
        onValue(classRef, (snapshot) => {
          if (snapshot.exists()) {
            setFName(snapshot.val().firstname);
            setLName(snapshot.val().lastname);
            // setImage(snapshot.val().image);
    
            // Call displayStudents with the class information
            
          } else {
            console.log("No data available");
          }
    
           // Stop loading when data is fetched
        });
      }

    return (
      <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: image }} // Replace with the user's profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.username}>{fname} {lname}</Text> 
      </View>

      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications" size={30} color="white" />
      </TouchableOpacity>
    </View>
        
          
    );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
    backgroundColor: '#0A2558', // Change the background color as desired
    borderRadius:20,
    marginTop:3 ,
    width:'100%'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor:'white'
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Text color
  },
  notificationIcon: {
    padding: 5,

  },
});

export default CustomHeader;
