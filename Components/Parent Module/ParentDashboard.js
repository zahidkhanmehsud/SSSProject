import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';

import Home from './ParentHome';
import Profile from './ParentProfileScreen';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
     
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,
      // tabBarInactiveTintColor: '#444',
      tabBarStyle: styles.tabBarStyle,
      // tabBarActiveTintColor: '#7d5fff',
     
    })}



    
    >
      <Tab.Screen
      
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size ,focused}) => ( 
            <View style={focused?styles.activeBtn:styles.inactiveBtn}>
              <Icon name="home" size={20} color={color= 'white'} />

            </View>

            
      
          ),
          headerShown: false,
          
        }}
        

        
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size ,focused}) => (
            <View style={focused?styles.activeBtn:styles.inactiveBtn}>
            <Icon name="person" size={20} color={color= 'white'} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
    
  );
};


const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor:'#0A2558',
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 70,
   borderRadius:20
    
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#00a3e1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  inactiveBtn: {
    
   
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
