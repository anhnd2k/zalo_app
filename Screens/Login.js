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
import { connect } from 'react-redux'
import * as action from '../redux/action/index';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName : '',
            passWord : '',
            // id:'',
            // name: ''
        }
    }

    onClickNext = (data) => {
        socket.emit('SEND_DATA_LOGIN', {name: data.userName, pass: data.passWord})
        socket.on('LOGIN_SUSSCES' + this.state.passWord, (data) => {
            this.props.navigation.navigate('home',)
            this.setState({id : data.id, name : data.name})
            this.props.saveId(data.id, data.name, data.urlImg)
        })
        socket.on('LOGIN_FALSE' + this.state.passWord, (data)=>{
            alert(data)
        })
    }

    render(){
        return(
            <SafeAreaView style={styles.component}>
            <KeyboardAvoidingView keyboardVerticalOffset={80} style={styles.component} behavior='padding'>
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
                        <TouchableOpacity style={[styles.btn,{marginBottom:10}]} 
                            onPress={() => this.onClickNext(this.state)}
                        >
                            <Text style={styles.text} >
                                Login
                            </Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity style={[{marginBottom:10, width:150, marginHorizontal:10 }]}>
                            <Text style={[styles.text]} >
                            Forgot password
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('createAccScreens')} style={[{marginBottom:10, width:150, marginHorizontal:10}]}>
                            <Text style={styles.text} >
                            create Account
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>
           
        </SafeAreaView>
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
      flex:4,
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
    borderRadius:40
  },
  btn:{
      backgroundColor:'#074b6d',
      paddingVertical:15,
      borderRadius:40
  },
  text:{
      textAlign:'center',
      fontWeight:'500',
      color:'#fff'
  }
});

const mapDispatchToProps = (dispatch, props) => {
    return{
        saveId: (id, name, urlImg) => {
            dispatch(action.saveId(id, name, urlImg))
        }
    }
}

export default connect(null, mapDispatchToProps) (Login);
