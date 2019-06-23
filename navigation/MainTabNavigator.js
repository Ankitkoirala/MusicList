import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AlbumScreen from '../screens/AlbumScreen'
import AlbumDetailedScreen from '../screens/AlbumDetailedScreen';
import StorageScreen from '../screens/StorageScreen'
import FavoriteScreen from '../screens/FavoriteScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Album:AlbumScreen,
  AlbumDetail:AlbumDetailedScreen,
  Favorite:FavoriteScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-musical-notes' : 'md-information-circle'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      // name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Storage: StorageScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
 
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});
