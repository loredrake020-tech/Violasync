import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './frontend/redux/store';
import HomeScreen from './frontend/screens/HomeScreen';
import SettingsScreen from './frontend/screens/SettingsScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import TodoListScreen from './frontend/screens/TodoListScreen';
import WeatherDashboardScreen from './frontend/screens/WeatherDashboardScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'TodoList') {
                iconName = focused ? 'checkbox' : 'checkbox-outline';
              } else if (route.name === 'Weather') {
                iconName = focused ? 'cloud' : 'cloud-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Tab.Screen 
            name="TodoList" 
            component={TodoListScreen}
            options={{ title: 'To-Do List' }}
          />
          <Tab.Screen 
            name="Weather" 
            component={WeatherDashboardScreen}
            options={{ title: 'Weather' }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}