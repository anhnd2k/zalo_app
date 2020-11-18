import React from 'react';
import {View,Text,StyleSheet, TextInput,SafeAreaView, Button, FlatList, ScrollView, Image, StatusBar} from 'react-native';
import Search from '../Component/Search';
import {COLOR_RIMARY, BORDER_COLOR} from '../Style/StyleBox';
import ChatBox from '../Component/ChatBox';
import TabFriend from '../Component/TabFriend';
import { connect } from 'react-redux'
import {socket} from '../ConnectSocket/socket'

class Message extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userOnline : []
    }
  }

  componentDidMount(){
    socket.on('server_send_user_chat', (data) => {
      this.setState({userOnline : data})
    } )
  }

  onClick = (data) => {
    socket.emit('Click_chatbox_giu_id', data.id)
    this.props.navigation.navigate('contenMessage', {data})
  }

  render() {
    const {idUser} = this.props;
    const chatBox = this.state.userOnline.map((data, index) => {
      if(data.idSend == idUser[0].id){
        return <ChatBox 
              key={index--}
              onPress={() => this.onClick(data)}
              nameOnline = {data.user}
              urlImg = {data.urlImg}
              id = {data.id}
              />
      }
    })
    return (
      <SafeAreaView style={styles.component}>
        {/* <StatusBar backgroundColor='red'/> */}
        <View>
        <Search/>
            <ScrollView>
                <View style={styles.update}>
                    <View style={styles.iconUpdate}>
                    <Image source={require('../image/sendIcon.jpg')} style={{width:20, height:20, tintColor:COLOR_RIMARY}}/>
                    </View>
                    <View style={styles.updateText}>
                    <Text tyle={{fontSize: 12}}>Update infomation from friend</Text>
                    </View>
                    <View style={styles.updateBtn}>
                    <Text style={{fontSize: 12, color:'#fff'}}>update</Text>
                    </View>
                </View>
            {/* friend online */}
            <View style={styles.Friend}>
              <TabFriend onPress={({data}) => this.props.navigation.navigate('contenMessage', {data})}/>
            </View>
                {chatBox}
                <View style={this.state.userOnline.length >=1 ? {display:'none'} : {marginVertical:150, alignItems:'center'}}>
                  <Image style={{width:140, height:140}} source={require('../image/dark-data.png')}/>
                <Text style={{width: 230, marginTop:10, textAlign:'center', color:"#afaaaa", fontWeight:'bold'}}>You are not in any conversation, start chatting with any friends ...</Text>
              </View>
            </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    marginBottom: 50,
    // backgroundColor:'#0AAAFF'
  },
  update: {
    margin: 5,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: BORDER_COLOR,
  },
  iconUpdate: {
    flex: 1,
    alignItems: 'center',
  },
  updateText: {
    flex: 7,
    alignItems: 'center',
  },
  updateBtn: {
    flex: 1,
    backgroundColor: COLOR_RIMARY,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  Friend: {
    borderBottomWidth: 0.5,
    borderColor: BORDER_COLOR,
    alignContent: 'center',
  },
  update: {
    margin: 5,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: BORDER_COLOR,
  },
  iconUpdate: {
    flex: 1,
    alignItems: 'center',
  },
  updateText: {
    flex: 7,
    alignItems: 'center',
  },
  updateBtn: {
    flex: 1,
    backgroundColor: COLOR_RIMARY,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  Friend: {
    borderBottomWidth: 0.5,
    borderColor: BORDER_COLOR,
    alignContent: 'center',
  },
});

const mapStateToProps = state => {
  return{
    idUser: state.idClient
  }
}

export default connect(mapStateToProps,null) (Message);
