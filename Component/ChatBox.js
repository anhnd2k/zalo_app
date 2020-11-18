import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BORDER_COLOR,
  TEXT_SEEN_COLOR,
  RED_CLOR,
  ONLINE_COLOR,
  STYLE_AVATAR,
  STYLE_ONLINE_DOTS,
} from '../Style/StyleBox';
import {socket} from '../ConnectSocket/socket';
import {url} from '../link/url';

class ChatBox extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      notiMes :'',
      statusMe: true
    }
  }

  componentDidMount(){
    socket.on('CLIENT_SEND_NOTI_MES', (data)=>{
      const id = this.props.id
      if(data.idMe == id || data.id == id){
        this.setState({notiMes:data.mes})
        if(data.idMe == id){
          this.setState({statusMe : true})
        }
        else{
          this.setState({statusMe : false})
        }
      }
    })
  }
  render() {
    const {onPress, nameOnline, urlImg} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.component}>
          <View style={styles.imageUsed}>
            <View style={styles.onlineSet}>
              <Image style={STYLE_AVATAR} source={urlImg !== undefined ? {uri:(`${url + urlImg}`)} : require('../image/moon3.jpg')} />
              {/* <View style={STYLE_ONLINE_DOTS}></View> */}
            </View>
          </View>
          <View style={styles.borderColor}>
            <View style={styles.nameUser}>
              <Text style={styles.userName}>{nameOnline}</Text>
              <Text
                // line number ....
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.contenMessage}>
                {this.state.statusMe ? '' : 'You:'}  {this.state.notiMes}
              </Text>
            </View>
            <View style={styles.timeOnline}>
              <Text style={styles.textTimeOut}>1 house</Text>
              <View style={styles.notibox}>
                <Text style={styles.noti}>2+</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  component: {
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
});

export default ChatBox;
