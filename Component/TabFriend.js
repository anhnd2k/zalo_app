import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  STYLE_AVATAR,
  STYLE_ONLINE_DOTS,
  STYLE_ONLINE_CLAN,
} from '../Style/StyleBox';
import UserOnline from './UserOnline';
import {socket} from '../ConnectSocket/socket'
import { connect } from 'react-redux'

class TabFriend extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userOnline : [],
    }
  }

  componentDidMount(){
    socket.on('server-send-list-user-online', (data)=>{
      this.setState({userOnline:data})
    })
  }

  onLickk = (data) => {
    const {idUser} = this.props;
    socket.emit('Click_chatbox_giu_id', data.id)
    socket.emit('client_send_list_chat', {user: data.user, id:data.id, idSend: idUser[0].id, urlImg: data.urlImg })
    this.props.onPress({data})
  }

  render() {
    const {idUser} = this.props;
    const userOnline = this.state.userOnline.map((data, index)=>{
      if(data.id !== idUser[0].id){
      return  (
        <TouchableOpacity key={index--} onPress ={ () => this.onLickk(data)}>
          <UserOnline 
              name = {data.user}
              urlImg = {data.urlImg}
            />
        </TouchableOpacity>
      )}
    })

    return (
      <View>
        <View style={styles.Text}>
          <Text style={styles.Text1}>
            Confide late at night with friends who are accessing
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.boxClan}>
            <View
              style={{
                width: 50,
                height: 50,
                marginBottom: 10,
              }}>
              <Image
                style={STYLE_AVATAR}
                source={require('../image/moon3.jpg')}
              />
              <View style={STYLE_ONLINE_CLAN}>
                <View style={{alignItems: 'center', margin: 6}}>
                  {/* <IconAntDesign name="twitter" size={8} color="#fff" /> */}
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 10, opacity: 0.6}}>Chat</Text>
              <Text style={{fontSize: 10, opacity: 0.6}}>ngẫu nhiên</Text>
            </View>
          </View>
          {/* user online */}
            <View style={{flexDirection:'row'}}> 
            {userOnline}
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
  },
  boxClan: {
    width: 60,
    marginBottom: 20,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  boxOnline: {
    width: 60,
    marginVertical: 10,
    marginHorizontal: 15,
    alignContent: 'center',
  },
  Text: {
    marginVertical: '3%',
    marginLeft: '3%',
  },
  Text1: {
    fontSize: 11,
  },
});

const mapStateToProps = state => {
  return{
    idUser: state.idClient
  }
}

export default connect(mapStateToProps,null) (TabFriend);
