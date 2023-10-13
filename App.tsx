import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebaseconfig';

import SignupScreen from './Authentication/SignupScreen';
import LoginScreen from './Authentication/LoginScreen';
import teacherDashboard from './Components/Teacher Module/Dashboard';
import teacherAttendance from './Components/Teacher Module/Attendance';
import WhiteScreen from './Components/Teacher Module/WhiteScreen';
import teacherStudenTable from './Components/Teacher Module/StudentTable';
import teacherNewCard from './Components/Teacher Module/NewCard';
import ResetPassword from './Authentication/ResetPassword';

import ParentDashboard from './Components/Parent Module/ParentDashboard'
import ParentAttendance from './Components/Parent Module/ParentAttendance'
import ParentNewCard from './Components/Parent Module/ParentNewCard'
import ParentCheckStatus from './Components/Parent Module/ParenCheckStatus'
import ParentLeave from './Components/Parent Module/ParentLeave'

const Stack = createNativeStackNavigator();




function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WhiteScreen" component={WhiteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />

        <Stack.Screen name="teacherDashboard" component={teacherDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="teacherAttendance" component={teacherAttendance} options={{ headerShown: false }} />
        <Stack.Screen name="teacherStudentTable" component={teacherStudenTable} options={{ headerShown: false }} />
        <Stack.Screen name="teacherNewCard" component={teacherNewCard} options={{ headerShown: false }} />
        <Stack.Screen name="Reset Password" component={ResetPassword} options={{ headerShown: false }} />

        {/* Parent Screens */}
        <Stack.Screen name="ParentDashboard" component={ParentDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="ParentAttendance" component={ParentAttendance} options={{ headerShown: false }} />
        <Stack.Screen name="ParentNewCard" component={ParentNewCard} options={{ headerShown: false }} />
        <Stack.Screen name="ParentLeave" component={ParentLeave} options={{ headerShown: false }} />
        <Stack.Screen name="ParentCheckStatus" component={ParentCheckStatus} options={{ headerShown: false }} />
        {/* Security Officer rrr*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
