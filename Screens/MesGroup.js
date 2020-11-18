import React from 'react';
import {View,Text, StyleSheet, TextInput, ScrollView, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {COLOR_ICON, COLOR_RIMARY} from '../Style/StyleBox';
import MesMeGroup from '../OutPutChat/MesMeGroup';
import MesGuestGroup from '../OutPutChat/MesGuestGroup';
import {socket} from '../ConnectSocket/socket';
import { connect } from 'react-redux';
import {PickImg} from '../pickImg/PickImg';
import RNFetchBlob from 'rn-fetch-blob';

class MesGroup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      mesSendInGroup: null,
      mapMes : [],
      avatarSource: null,
      data: null,
      typingStatus: false,
      typingUser: ''
    }
}

componentDidMount() {
  const nameRooms = this.props.route.params.name;
  socket.on('server_send_mes_den_room', (data) => {
    for(let i=0; i<data.length; i++){
      if(data[i].room === nameRooms){
        this.setState({mapMes:data})
        break; 
      }
    }
  })
  // socket.on('sendId_thang_vua gui', (data)=>{
  //   id = data
  // })
  socket.on('server_send_typing', (data) => {
    const nameRooms = this.props.route.params.name;
    const {idUser} = this.props;
    if(data.nameroom === nameRooms && data.idMe !== idUser[0].id){
      this.setState({typingStatus:true, typingUser: data.nameUser})
    }
  })

  socket.on('server_send_typing_false', (data) => {
    const nameRooms = this.props.route.params.name;
    const {idUser} = this.props;
    if(data.nameroom === nameRooms && data.idMe !== idUser[0].id){
      this.setState({typingStatus:false})
    }
  })
}

onSendMes = (mes,nameRooms) => {
  const {idUser} = this.props;
  if(mes !== null){
  socket.emit('send_mes_in_group',{mes: mes, nameRooms: nameRooms, urlImg: idUser[0].urlImg})
  }if(mes == null && this.state.data == null){
    alert('nodata input')
  }
  if(this.state.data !== null){
    RNFetchBlob.fetch('POST', 'http://10.10.105.91:4000/', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [ { name : 'nameRoom',data : nameRooms} ,{ name : 'id',data : idUser[0].id},{ name : 'name',data : idUser[0].name},{ name : 'imgFrom',data : 'mesFromGroup'},
      { name : 'avatar',filename : 'avatar.png', type:'image/png', data: this.state.data}
])
  }
  this.setState({mesSendInGroup: null})
  this.setState({data:null})

}

uploadImg(){
  PickImg((source, data) => {this.setState({avatarSource: source, data:data})})
}

//typinggg
focusRecevied = (nameroom, nameTyping, idMe) => {
  socket.emit('typing_user_from_chat_room', {nameroom: nameroom, nameUser: nameTyping, idMe: idMe})
}
focusLost = (nameroom, nameTyping, idMe) => {
  socket.emit('typing_lost_from_chat_room', {nameroom: nameroom, nameUser: nameTyping, idMe: idMe})
}

    render(){
      const {idUser} = this.props;
      const nameRooms = this.props.route.params.name;
      const chatConten = this.state.mapMes.map((data, index) => {
        if(data.room === nameRooms){
          if(data.id == idUser[0].id){
            return (
              <MesMeGroup key={index++} mes = {data.mes} name = {data.name} mesImg = {data.mesImg}/>
          )
          }else{
            return <MesGuestGroup key={index--} mes = {data.mes} name = {data.name} mesImg = {data.mesImg} urlImg = {data.urlImg}/>
          }
        }
      })
        return(
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.conten}>
              <ScrollView>
                {chatConten}
              </ScrollView>
            </View>
            {/* input text */}
            <View style={this.state.typingStatus ? {justifyContent:'center', alignItems:'center',marginBottom:0, width:150, height:20, borderTopRightRadius:10, borderBottomRightRadius:10,backgroundColor:'#c9c3c3'} : {display:'none'}}>
              <Text> {this.state.typingUser} + typing.... </Text>
            </View>
            <View style={styles.input}>
              <TouchableOpacity onPress = { () => this.uploadImg()} style={styles.icon1}>
                    <Image source = {require('../image/icon1.png')} style={{width:30, height:30}} />
                </TouchableOpacity>
                <View style={styles.inputComponent}>
                    <View style={styles.textInput}>
                        <TextInput
                            style={styles.text}
                            placeholder="Message"
                            autoCorrect={false}
                            onChangeText = {(text) => this.setState({mesSendInGroup:text})}
                            value={this.state.mesSendInGroup}
                            onFocus={() => this.focusRecevied(nameRooms, idUser[0].name, idUser[0].id)}
                            onBlur={() => this.focusLost(nameRooms, idUser[0].name, idUser[0].id) }
                        />
                    </View>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress = {() => this.onSendMes(this.state.mesSendInGroup, nameRooms)}>
                        <Image
                            source={ require('../image/sendIcon.jpg')}
                            style={{width:20, height:20, tintColor:COLOR_RIMARY}}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          </KeyboardAvoidingView>
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E2E9F1',
  },
  //conten
  conten:{
    flex:1,
    marginTop:10
  },
  input: {
    height:70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal:15
  },
  //input
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -5,
  },
  inputComponent: {
    flex: 6,
    flexDirection: 'row',
  },
  textInput: {
    flex: 5,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
  },
  name:{
    position:'absolute',
    bottom:-8,
    right:10,
    marginTop:10
  }
});

const mapStateToProps = state => {
  return{
    idUser: state.idClient
  }
}

export default connect(mapStateToProps,null) (MesGroup);
