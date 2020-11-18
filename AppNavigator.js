import React from 'react';

import {View,TouchableOpacity, Image} from 'react-native'
import {COLOR_RIMARY} from './Style/StyleBox';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from './Screens/Login';
import TabNavigator from './Screens/TabNavigator';
import MesGroup from './Screens/MesGroup';
import CreateGroup from './Screens/CreateGroup';
import ContenMessage from './Component/ContenMessage';
import DetailScreens from './Screens/DetailScreens';
import createAccScreens from './Screens/creatAccScreens';

import {socket} from './ConnectSocket/socket';

const Stack = createStackNavigator();

// onClickkkk = (navigation,data) => {
//     navigation.navigate('detail',data)

//     socket.emit('Click_chatbox_giu_id', data.id)
// }


const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="home" component={TabNavigator} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="mesGroup" component={MesGroup}
                    options={ ({navigation, route}) => ({
                        title: route.params.name,
                        headerTintColor: '#fff',
                        headerStyle: {
                            backgroundColor: COLOR_RIMARY,
                        },
                        tabBarVisible: false,
                        headerRight: () => (
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity>
                                    <Image style={{width:22, height:22, tintColor:'#fff'}} source={require('./image/phone1.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image style={{width:25, height:25,tintColor:'#fff', marginHorizontal:25}} source={require('./image/cam1.png')} />
                                </TouchableOpacity>
                            </View>
                            
                        ),
                        headerLeft: () => (
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity onPress= {() => navigation.goBack()}>
                                    <Image style={{width:22, height:22, tintColor:'#fff', marginHorizontal:10}} source={require('./image/back.png')} />
                                </TouchableOpacity>
                            </View>
                            
                        )
                    })}
                />
                <Stack.Screen
                name="contenMessage"
                component={ContenMessage}
                options={({route, navigation}) => ({
                title: route.params.data.user,
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: COLOR_RIMARY,
                },
                headerLeft: () => (
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity onPress= {() => navigation.goBack()}>
                            <Image style={{width:22, height:22, tintColor:'#fff', marginHorizontal:10}} source={require('./image/back.png')} />
                        </TouchableOpacity>
                    </View>
                    
                ),
                headerRight: () => (
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity>
                            <Image style={{width:25, height:25,tintColor:'#fff', marginHorizontal:25}} source={require('./image/cam1.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress ={ () => {navigation.navigate('detail', route.params.data), socket.emit('Click_chatbox_giu_id', route.params.data.id)}} >
                            <Image style={{marginRight:20,width:22, height:22, tintColor:'#fff'}} source={require('./image/menu.png')} />
                        </TouchableOpacity>
                    </View>
                    
                )
                })} 
            />
                <Stack.Screen
                    name ="creactGroup"
                    component = {CreateGroup}
                    options = {({navigation}) => ({
                        headerTintColor: '#fff',
                        title:' Tạo Nhóm Mới',
                        headerStyle: {
                            backgroundColor: COLOR_RIMARY,
                        },
                        headerLeft: () => (
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity onPress= {() => navigation.goBack()}>
                                    <Image style={{width:22, height:22, tintColor:'#fff', marginHorizontal:10}} source={require('./image/back.png')} />
                                </TouchableOpacity>
                            </View>
                            
                        )
                    })}
                />
                <Stack.Screen
                    name ="detail"
                    component = {DetailScreens}
                    options = {({navigation, route}) => ({
                        headerTintColor: '#fff',
                        title: route.params.user,
                        headerStyle: {
                            backgroundColor: COLOR_RIMARY,
                        },
                        headerLeft: () => (
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity onPress= {() => navigation.goBack()}>
                                    <Image style={{width:22, height:22, tintColor:'#fff', marginHorizontal:10}} source={require('./image/back.png')} />
                                </TouchableOpacity>
                            </View>
                            
                        )
                    })}
                />
                <Stack.Screen
                    name ="createAccScreens"
                    component = {createAccScreens}
                    options = {({navigation}) => ({
                        headerShown: false,
                        headerTintColor: '#fff',
                        title:'avcdc',
                        headerStyle: {
                            backgroundColor: COLOR_RIMARY,
                        },
                        headerLeft: () => (
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity onPress= {() => navigation.goBack()}>
                                    <Image style={{width:22, height:22, tintColor:'#fff', marginHorizontal:10}} source={require('./image/back.png')} />
                                </TouchableOpacity>
                            </View>
                            
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>  
    )
}

export default AppNavigator;