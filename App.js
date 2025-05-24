import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, useSelector } from "react-redux";

import CategoryScreen from './src/screens/CategoryScreen';
import DrugInCategoryScreen from './src/screens/DrugInCategoryScreen';
import DrugDetailScreen from './src/screens/DrugDetailScreen';
import LearningList from "./src/screens/LearningList";
import LearningScreen from "./src/screens/LearningScreen";
import store from "./src/redux/store";
import AuthForm from "./src/components/sign_in&out";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const DrugStack = createStackNavigator();
const LearningStack = createStackNavigator();


function DrugStackScreens() {
  return (
    <DrugStack.Navigator initialRouteName= "Categories">
        <DrugStack.Screen name = "Categories" component = {CategoryScreen} options={{title: 'Drugs', headerTitleAlign: 'left',}}/>
        <DrugStack.Screen name =  "Drug List" component = {DrugInCategoryScreen} options={{headerTitle: '', headerBackTitle: 'Drugs in Category',}}/>
        <DrugStack.Screen name = "Drug Details" component = {DrugDetailScreen} options = {{headerTitle: '',headerBackTitle: 'Drug Details'}}/>
    </DrugStack.Navigator>
  );
}

function LearningStackScreens() {
  return (
    <LearningStack.Navigator>
      <LearningStack.Screen name="LearningList" component={LearningList} options={{ headerShown: false }} />
      <LearningStack.Screen name="LearningScreen" component={LearningScreen} options={{headerTitle: '',headerBackTitle: 'Learning'}} />
    </LearningStack.Navigator>
  );
}

function BottomTabs() {
  const currentCount = useSelector(state => state.learning.current.length);


  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Tabs.Screen
      name ="Drugs" 
      component={DrugStackScreens}
      options={{
        tabBarIcon: ({size, color}) => (
          <Ionicons name="medkit" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen 
      name ="Learning" 
      component={LearningStackScreens} 
      options={{
        title: 'Learning',
        tabBarIcon: ({ size, color}) => (
          <Ionicons name="home" size={size} color={color} />
        ),
        tabBarBadge: currentCount > 0 ? currentCount : null,
      }}/>
      <Tabs.Screen
      name = "Community"
      component={() => <View />}
      options={{
        tabBarIcon: ({ size, color}) => (
          <Ionicons name="people" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen
      name="Profile"
      component={() => <View />}
      options={{
        tabBarIcon: ({ size, color}) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      }} />
    </Tabs.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return() => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return(
      <View style={styles.splashContainer}>
          <ActivityIndicator size='large' color='#4287f5' style={{ marginTop: 20 }} />
        <Text style={styles.loadingText}>Loading Drug Speak...</Text>
      </View>
    );
  }


  return(
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          {!isLoggedIn ? (
            <MainStack.Screen name="Auth">
              {() => <AuthForm onLoginSuccess={() => setIsLoggedIn(true)} />}
            </MainStack.Screen>
          ):(
            <MainStack.Screen name="HomeTabs" component={BottomTabs} />
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    alignContent: 'center',
    fontSize: 16,
    color: '#666',
  },
});