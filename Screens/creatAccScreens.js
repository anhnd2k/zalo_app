import React from 'react';
import {View,
        Text,
        StyleSheet,
        Image,
        TextInput,
        Button,
        SafeAreaView,
        TouchableOpacity,
        KeyboardAvoidingView
} from 'react-native';
import {socket} from '../ConnectSocket/socket';

class createAccScreens extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userName : '',
            passWord : '',
            confirmPass :''
            // id:'',
            // name: ''
        }
    }

    onCreat = (data) => {
        if(data.passWord !== data.confirmPass){
            alert('no success')
        }else{
            socket.emit('data_create_acc', {userName: data.userName, passWord: data.passWord})
            this.props.navigation.navigate('login')
        }
    }

    render(){
        return(
                <View style={styles.component}>
                    <View style={styles.up}>
                        <Image source={require('../image/zalo.png')} style={{width:160, height:90}}/>
                    </View>
                    <View style={styles.info}>
                        <TextInput style={styles.textInput}
                            placeholder="Enter username/Email"
                            placeholderTextColor='rgb(134, 146, 153)'
                            keyboardType="email-address"
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText = {(text) => this.setState({userName:text})}
                            value={this.state.text}
                        />
                        <TextInput style={styles.textInput}
                            placeholder="PassWord"
                            placeholderTextColor='rgb(134, 146, 153)'
                            returnKeyType='go'
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText = {(text) => this.setState({passWord:text})}
                            value={this.state.passWord}
                        />
                        <TextInput style={styles.textInput}
                            placeholder="Enter the password"
                            placeholderTextColor='rgb(134, 146, 153)'
                            returnKeyType='go'
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText = {(text) => this.setState({confirmPass:text})}
                            value={this.state.confirmPass}
                        />
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={[styles.btn,{marginBottom:10, width:150, marginHorizontal:10 }]}>
                            <Text style={[styles.text]} >
                            go back to login page
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onCreat(this.state)} style={[styles.btn,{marginBottom:10, width:150, marginHorizontal:10}]}>
                            <Text style={styles.text} >
                            create Account
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
      flex: 1,
      justifyContent:'center',
      backgroundColor:'#0AAAFF'
    },
    up:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    info:{
        height:200,
        flex:2,
        marginHorizontal:20
    },
    textInput:{
      height:40,
      backgroundColor:'rgba(225,225,225,0.4)',
      color:'black',
      marginBottom:20,
      textAlign:'center',
      borderRadius:40,
      marginHorizontal:20,
      marginVertical:20
    },
    btn:{
        backgroundColor:'#074b6d',
        paddingVertical:15,
        borderRadius:40,
        marginVertical:20
    },
    text:{
        textAlign:'center',
        fontWeight:'500',
        color:'#fff'
    }
  });

  export default createAccScreens ;