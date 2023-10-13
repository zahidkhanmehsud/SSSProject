import React,{useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from './CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { ref, child, get, getDatabase, onValue } from "firebase/database";
import { auth } from '../../firebase/firebaseconfig';


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







  


  const  HeaderTop =  () =>
  {
    return(
      <View style={{backgroundColor:'#0A2558' ,width:'100%' ,justifyContent:'center',alignItems:'center',height:50,borderBottomLeftRadius:12,borderBottomRightRadius:12}}>
<Text style={{color:'white' ,fontWeight:'bold',fontStyle:"italic",fontSize:20}} >Parent Account</Text>
</View>
        
       
  
    )
  }




 



  
const Home = (props) => {
  const [students, setStudents] = useState([]);

  const modules = [
    { id : '1', name: 'Attendance',onPress :handleAttendance, icon: 'person' },
    { id : '2', name: 'Leave',onPress: handleLeave, icon: 'event' },
    { id : '3', name: 'New Card',onPress: handleNewCard, icon: 'add-box' },
  ];


  function handleAttendance (){
    console.log('a');
    props.navigation.navigate('ParentAttendance')
  }
  function handleLeave (){
    console.log('l');
    props.navigation.navigate('ParentLeave')
  
  }
  function handleNewCard (){
    console.log('r');
    props.navigation.navigate('ParentNewCard')
  }

  const renderItem = ({ item }) => (
   
   

    <TouchableOpacity style={styles.moduleButton} onPress={item.onPress}>
      <Icon name={item.icon} size={30} color="white" />
      <Text style={styles.moduleButtonText}>{item.name}</Text>
    </TouchableOpacity>
   
  );

  return (
    <LinearGradient
  colors={['#0074e4', '#00a3e1']}
  
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.container}>
    
   
    {/* <View style={styles.container} > */}

        <HeaderTop/>
      
        <CustomHeader/>
      

      {/* <Text style={styles.headerText}>School Dashboard</Text> */}

      <View style={styles.gridContainer} >
      <FlatList
        data={modules}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3} // Display three items per row
        // contentContainerStyle={styles.gridContainer}// Style for the grid container
      />
      </View>
    {/* </View> */}
    </LinearGradient>
   
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%' , 
    height:'100%',
    alignItems:'center',
   
    
    
  

   
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    justifyContent: 'space-between', // Align items evenly
    flexGrow: 0,
  
    
    width:'100%',
    marginTop:3
    

    
    
   
},
  moduleButton: {
    backgroundColor: '#054f96',
    padding: 15,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '70', // Adjust the width as needed for three items per row
    height: "70",
    marginTop:12
     // Fixed height for each grid item
    
  },
  moduleButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 10,
    alignItems:'center'
  },
  
});

export default Home;
