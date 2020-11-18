import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLOR_RIMARY,BORDER_COLOR} from '../Style/StyleBox';
import {Image, TouchableOpacity, View, Text} from 'react-native';

import Message from './Message';
import Add from './Add';
// import PhoneBooks from '../ScreensPhone/PhoneBooks';
// import OfficialAccount from '../ScreensPhone/OfficialAccount';

const Stack = createStackNavigator();

const MessageBox = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Message"
            component={Message}
            options={{headerShown: false, title: ''}}
            />
        </Stack.Navigator>
    )
}

// function PhoneBookBox(){
//     return (
//         <Stack.Navigator>
//           <Stack.Screen
//             name="PhoneBook"
//             component={PhoneBooks}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="OfficialAccount"
//             component={OfficialAccount}
//             options={{headerShown: false}}
//           />
//         </Stack.Navigator>
//       );
// }

function AddBox() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Add"
          component={Add}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  const tabOptions = {
    showLabel: false,
    style: {
        height: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 21,
    },
};


  const TabNavigator = () => {
      return(
        <Tab.Navigator
        tabBarOptions={{showLabel:false}}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                const tintColor = focused ? COLOR_RIMARY : BORDER_COLOR;

                switch (route.name) {
                    case "Message":
                        return (
                                <Image
                                source={require('../image/message.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor: tintColor,
                                    width: 25,
                                    height: 25
                                }}
                            />
                        );
                    case "PhoneBook":
                        return (
                            <Image
                                source={require('../image/phonebook.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor: tintColor,
                                    width: 22,
                                    height: 22
                                }}
                            />
                        );   
                    case "Add":
                        return (
                            <Image
                                source={require('../image/group.png')}
                                resizeMode="contain"
                                style={{
                                    tintColor: tintColor,
                                    width: 25,
                                    height: 25
                                }}
                            />
                        );
                }
            }
        })}

        >
            <Tab.Screen
            name="Message"
            component={MessageBox}
            />
            {/* <Tab.Screen
            name="PhoneBook"
            component={PhoneBookBox}
            /> */}
            <Tab.Screen
            name="Add"
            component={AddBox}
            />
        </Tab.Navigator>

      )
  }

  export default TabNavigator;