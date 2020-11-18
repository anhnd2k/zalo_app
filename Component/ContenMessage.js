import React from 'react';
import {View, StyleSheet, TextInput, Text,ScrollView, Image, KeyboardAvoidingView,Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import {COLOR_ICON, COLOR_RIMARY} from '../Style/StyleBox';
import ChatMe from '../OutPutChat/ChatMe';
import GuestMes from '../OutPutChat/GuestMes';
import {socket} from '../ConnectSocket/socket';
import {PickImg} from '../pickImg/PickImg';
import RNFetchBlob from 'rn-fetch-blob';
import { connect } from 'react-redux';
import {url} from '../link/url';
import { FlatList } from 'react-native-gesture-handler';

const {width}  = Dimensions.get('window')
const img = [
  {
    key:1,
    uri: require('../image/bgrImg.png')
  },
  {
    key:2,
    uri: require('../image/bgrImg1.png')
  },
  {
    key:3,
    uri: require('../image/bgrImg2.png')
  },
  {
    key:4,
    uri: require('../image/bgrImg3.png')
  },

]


class ContenMessage extends React.Component{

    constructor(props){
      super(props);
      this.state = {
          message : null,
          mesOnServer : [],
          typingStatus: false,
          typingName: '',
          avatarSource: '',
          data: null,
          urlImg: '',
          statusSetBgrImg: true,
          keyBgr: null
      }
  }

  componentDidMount(){
    socket.on('CLIENT_SEND_MES', (data) => {
      const id = this.props.route.params.data.id;
      for(var i=0; i< data.length; i++){
        if(data[i].id == id || data[i].idMe == id){
          this.setState({mesOnServer: data})
          break;
        }
      }
    })
    socket.on('server_send_typing', (data) => {
      const id = this.props.route.params.data.id;
      if(data.id_user_typing == id){
        this.setState({typingStatus:true, typingName:data.name_typing})
      }
    })
    
    socket.on('server_send_typing_false', (data) => {
      const id = this.props.route.params.data.id;
      if(data.id_user_typing == id){
        this.setState({typingStatus:false})
      }
    })
  
    //nhan img background
    
    socket.on('server_send_bgr', (data) => {
      const id = this.props.route.params.data.id;
      const {idUser} = this.props;
      if(data.idfFrom == id && data.idTo == idUser[0].id){
        this.setState({keyBgr:data.imgName})
      }
    })


  }

  onClick = (mes, id, idUser) => {
    if(mes !== null){
      socket.emit('mesConten_id',{mes: mes, id: id} )
    }if(mes == null && this.state.data == null){
      alert('nodata input')
    }
    // this.setState({ message:'' })
    //post image
    if(this.state.data !== null) {
      RNFetchBlob.fetch('POST', `${url}`, {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [ { name : 'id',data : id} ,{ name : 'idUser',data : idUser},{ name : 'imgFrom',data : 'mesOneOne'},
      { name : 'avatar',filename : 'avatar.png', type:'image/png', data: this.state.data}
])
    }

  this.setState({ message: null })
  this.setState({data: null})
  }

  focusRecevied = (id) => {
    socket.emit('typing_user', id)
  }

  focusLost = (id) => {
    socket.emit('typing_lost',id)
  }

  uploadImg(){
    PickImg((source, data) => {this.setState({avatarSource: source, data:data})})
  }

  onClost = () => {
    this.setState({statusSetBgrImg: false, keyBgr:''})
  }
  onOk = (idfFrom, idTo) => {
    this.setState({statusSetBgrImg: false})
    socket.emit('send_img_bgr', {imgName: this.state.keyBgr,idfFrom: idfFrom,idTo:idTo } )
  }
    render(){
      const {idUser} = this.props;
      const id = this.props.route.params.data.id;
      const urlImg = this.props.route.params.data.urlImg
      const chat = this.state.mesOnServer.map((data, index) => {
        if(data.id == id){
          return <ChatMe key={(index++)} mes = {data.mes} mesImg = {data.mesImg}/>
        }if(data.idMe == id){
          return <GuestMes key={(index--)} mes = {data.mes} mesImg = {data.mesImg} urlImg = {urlImg}/>
        }
    })

      const imgBgr = img.map((item, index) => {
        return(
          <TouchableOpacity key={index + item.key} onPress={() => this.setState({keyBgr:item.uri})} >
            <Image style={{width:200, height:200, marginHorizontal:15, marginTop:30}} source={item.uri} />
          </TouchableOpacity>
        )
      })
        return(
            <KeyboardAvoidingView keyboardVerticalOffset={80} behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                <ImageBackground style={{flex:1, resizeMode: "cover", justifyContent: "center"}} source={this.state.keyBgr}>
            <View style={styles.conten}>
            <View style={this.props.route.params.status == true && this.state.statusSetBgrImg == true 
                ? {overflow:'hidden', alignItems:'center',zIndex:10,position: 'absolute',left:10, right:100, top:10,width: width-20, height:300, backgroundColor:'rgba(0, 0, 0, 0.1)', borderRadius:20}: 
                {display:'none'}}>
            <View style={{height:100, backgroundColor: COLOR_RIMARY, flex:1, width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <TouchableOpacity onPress={() => this.onClost()} style={{width:70, height:'100%', justifyContent:"center", alignItems:'center'}}>
                <Text style={{color:'#fff', fontWeight:'bold'}}>X</Text>
              </TouchableOpacity>
              <Text style={{color:'#fff', fontWeight:'bold'}}>
                Đổi hình nền
              </Text>
              <TouchableOpacity onPress={() => this.onOk(idUser[0].id, id)} style={{width:70, height:'100%', justifyContent:"center", alignItems:'center'}}>
              <Text style={{color:'#fff', fontWeight:'bold'}}>Xong</Text>
              </TouchableOpacity>
            </View>
              <ScrollView horizontal={true}>
              {imgBgr}
              </ScrollView>
            </View>
              <ScrollView style={{paddingTop:10}}>
              {chat}
              </ScrollView>
            </View>
            {/* typingggg */}
            <View style={this.state.typingStatus ? {justifyContent:'center', alignItems:'center',marginBottom:0, width:150, height:20, borderTopRightRadius:10, borderBottomRightRadius:10,backgroundColor:'#c9c3c3'}: {display:'none'}}>
              <Text> {this.state.typingName}dang nhap.... </Text>
            </View>
             {/* input text */}
            <View style={styles.input}>
              <TouchableOpacity onPress = { () => this.uploadImg()} style={styles.icon1} >
                    <Image source = {require('../image/icon1.png')} style={{width:30, height:30}} />
                </TouchableOpacity>
                <View style={styles.inputComponent}>
                    <View style={styles.textInput}>
                        <TextInput
                            style={styles.text}
                            placeholder="Message"
                            autoCorrect={false}
                            onChangeText = {(text) => this.setState({message:text})}
                            value={this.state.message}
                            onFocus={() => this.focusRecevied(id)}
                            onBlur={() => this.focusLost(id) }
                        />
                    </View>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={() => this.onClick(this.state.message, id, idUser[0].id)}>
                        <Image
                            source={ require('../image/sendIcon.jpg')}
                            style={{width:20, height:20, tintColor:COLOR_RIMARY}}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ImageBackground>
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
    // paddingTop:10
  },
  input: {
    height:70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal:15,
    alignItems:'center'
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
});

const mapStateToProps = state => {
  return{
    idUser: state.idClient
  }
}

export default connect(mapStateToProps,null) (ContenMessage);
