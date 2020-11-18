import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import {STYLE_AVATAR,COLOR_RIMARY, RED_CLOR, BORDER_COLOR, TEXT_SEEN_COLOR} from '../Style/StyleBox';
import {socket} from '../ConnectSocket/socket';

class CreateGroup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        nameRoom : '',
    }
  }

  onSenName = (nameRoom => {
    socket.emit('client_send_name_room', nameRoom)
    this.props.navigation.navigate('Add')
  })
    render() {
      return (
        <View style={styles.compponent}>
              <View style= {styles.createInput}> 
                  <View style={{flex:1}}>
                      <Image style={{width:55, height:55}} source ={require('../image/teamwork.png')} />
                  </View>
                  <View style={{flex:6,  paddingHorizontal:10}}>
                      <TextInput 
                      placeholder="Đặt tên nhóm" 
                      style={{fontSize:20, marginLeft:30}} 
                      onChangeText = {(text) => this.setState({nameRoom:text})}
                      value={this.state.nameRoom}
                      />
                  </View>
                  <View style={{flex:1}}>
                      <TouchableOpacity onPress ={ () => this.onSenName(this.state.nameRoom)}>
                      <Image style={{width:20, height:20,tintColor:COLOR_RIMARY}} source={  require('../image/checking-mark.png')}/>
                      </TouchableOpacity>
                  </View>
              </View>
              
            <View style={styles.bottomSceen}>
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:COLOR_RIMARY, borderRadius:20}}>
                  <Text style={{fontWeight:'bold', marginVertical:20}}> Add firend in group</Text>
                </View>
                <View style={styles.component2}>
          <View style={styles.imageUsed}>
            <View style={styles.onlineSet}>
              <Image style={STYLE_AVATAR} source={require('../image/nezuko.jpg')} />
              {/* <View style={STYLE_ONLINE_DOTS}></View> */}
            </View>
          </View>
          <View style={styles.borderColor}>
            <View style={styles.nameUser}>
              <Text style={styles.userName}>DED</Text>
              <Text
                // line number ....
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.contenMessage}>
                CC
              </Text>
            </View>

          </View>
        </View>
            </View>
            
      </View>
      )
    };
}

const styles = StyleSheet.create({
  compponent:{
    paddingHorizontal:10,
    flex:1
  },
  createInput:{
      paddingTop:20,
      flexDirection:'row',
      alignItems:'center',
  },
  bottomSceen:{
    marginTop:20,
    flex:1,
  
  },
  component2: {
    height: 70,
    flexDirection: 'row',
    marginTop: 10,
  },
  imageUsed: {
    flex: 1.3,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  online: {
    position: 'relative',
    width: 50,
    height: 50,
  },
  // image: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 50,
  // },
  // online: {
  //   width: 15,
  //   height: 15,
  //   backgroundColor: ONLINE_COLOR,
  //   position: 'absolute',
  //   top: 40,
  //   right: 4,
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   borderColor: '#F3F7F5',
  // },
  nameUser: {
    flex: 6,
    justifyContent: 'center',
    // maxHeight: ,
    padding: 5,
  },
  timeOnline: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '3%',
    flexDirection: 'column',
  },
  textTimeOut: {
    fontSize: 10,
  },
  notibox: {
    width: 30,
    height: 15,
    backgroundColor: RED_CLOR,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  noti: {
    fontSize: 10,
  },
  borderColor: {
    flex: 6.5,
    borderBottomWidth: 0.3,
    borderBottomColor: BORDER_COLOR,
    flexDirection: 'row',
  },

  userName: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 8,
  },
  contenMessage: {
    color: TEXT_SEEN_COLOR,
    fontWeight:'bold'
  },
})

export default CreateGroup;