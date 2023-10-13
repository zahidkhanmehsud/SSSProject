import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, FlatList, TouchableOpacity, StyleSheet ,ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { auth } from '../../firebase/firebaseconfig';
import LinearGradient from 'react-native-linear-gradient';

const  HeaderTop =  () =>
  {
    return(
      <View style={{backgroundColor:'#0A2558' ,width:'100%' ,justifyContent:'center',alignItems:'center',height:50,borderBottomLeftRadius:12,borderBottomRightRadius:12}}>
<Text style={{color:'white' ,fontWeight:'bold',fontStyle:"italic",fontSize:20}} >Attendance</Text>
</View>
        
       
  
    )
  }

const Attendance = () => {
  const [userUid, setUserUid] = useState('');
  const [cl, setCl] = useState('');
  const [students, setStudents] = useState([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [attendance, setAttendance] = useState({});
 

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check internet connection and load data
    if (isConnected) {
      getUID();
    } else {
      setIsLoading(false); // No internet, stop loading
      Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
    }
  }, [isConnected]);

  useEffect(() => {
    // Initialize attendance object with all students as absent
    const initialAttendance = {};
    students.forEach((student) => {
      initialAttendance[student.id] = false;
    });
    setAttendance(initialAttendance);
  }, [students]);

  const getUID = async () => {
    try {
      const sessionString = await AsyncStorage.getItem('userSession');
      if (sessionString) {
        const session = JSON.parse(sessionString);
        const { CardID } = session;
       
        setUserUid(CardID);
        getClass(CardID); // Pass the UID to getClass
      }
    } catch (error) {
      console.log('Error checking saved session:', error);
      setIsLoading(false); // Stop loading on error
    }
  };

  function getClass(uid) {
    const dbRef = ref(getDatabase());
    const classRef = child(dbRef, `TeacherData/${uid}/class`);

    // Set up a listener for real-time updates
    onValue(classRef, (snapshot) => {
      if (snapshot.exists()) {
        const myclass = snapshot.val();
        setCl(myclass);

        // Call displayStudents with the class information
        displayStudents(myclass);
      } else {
        console.log("No data available");
      }

      setIsLoading(false); // Stop loading when data is fetched
    });
  }

  function displayStudents(cl) {
    var index = 0;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `ClassRoom/${cl}/Students/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const studentList = [];

          snapshot.forEach((childSnapshot) => {
            index=index+1;
            const data = childSnapshot.val();
            const id = data.ID;
            const firstName = data.firstName;
            const lastName = data.lastName;

            // Create a student object with a number and add it to the list
            
            const student = {
              number: index,
              id,
              firstName,
              lastName,
            };
            studentList.push(student);
          });

          // Update the state with the student data
          setStudents(studentList);
          setIsStudentsLoaded(true); // Mark students as loaded
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Function to toggle student attendance
  const toggleAttendance = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId],
    }));
  };

  // Function to save attendance (you can implement this)
  const saveAttendance = () => {
    // Implement code to save attendance data to your backend or storage
    // You can use the 'attendance' state object to get the attendance status for each student
    // Make an API call or perform any necessary actions to save the data
  };

  // Styling
  // Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#0A2558',
  },
  classText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color:'white'
  },
  studentItem: {
    flexDirection: 'row',
     // Increase vertical margin for more spacing
    padding: 10, // Increase padding for larger student items
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    marginBottom:3,
    
    
     // Align items evenly horizontally
  },
  studentNumber: {
    marginRight: 10,
    fontSize: 16,
    fontWeight:'bold'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    width: 15,
    height: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  uncheckedBox: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10, // Increase padding for a larger button
    borderRadius: 5,
    marginTop: 6,
    width: '100%', // Make the button span the width
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  id : {
    fontSize:15,
    fontStyle:'italic',
    fontWeight: 'bold'
  },
  name :{
    fontSize : 15,
    fontStyle: 'italic',
    fontWeight:'bold',
    

  }
});

  // Function to render each student item
  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentNumber}>{item.number}</Text>
      <Text style={styles.id}>{item.id}</Text>
      <Text style={styles.name}> {item.firstName} {item.lastName}</Text>
      

      {/* Checkbox to mark attendance */}
      <TouchableOpacity onPress={() => toggleAttendance(item.id)}>
        <View style={styles.checkbox}>
          {attendance[item.id] ? (
            <View style={styles.checkedBox} />
          ) : (
            <View style={styles.uncheckedBox} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
   
   
    <LinearGradient
  colors={['#0074e4', '#00a3e1']}
  
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.container}>
    <HeaderTop/>
 
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View>
          <Text style={styles.classText}>Class: {cl}</Text>
          <Text style={{color:'white'}}>Date and Time: {new Date().toLocaleString()}</Text>
        </View>
      )}



      {isStudentsLoaded ? (
        
       <View stylle={{padding:10}}>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudentItem}
          
        />
        </View>
    
        
        
        
       
      ) : null}

<TouchableOpacity onPress={saveAttendance}>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Attendance</Text>
        </View>
      </TouchableOpacity>
      
     
      </LinearGradient>
    
  );
};

export default Attendance;
