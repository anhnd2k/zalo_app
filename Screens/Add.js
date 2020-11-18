import React from 'react';
import {View,Text,StyleSheet, TextInput, Button,TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native';
import Search from '../Component/Search';
import {STYLE_AVATAR,COLOR_RIMARY_2,COLOR_RIMARY_1} from '../Style/StyleBox';
import Group from '../Component/Group';
import {socket} from '../ConnectSocket/socket';

class Add extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            room : [],
        }
    }
    componentDidMount(){
        socket.on('server_send_name_room', (nameRoom) => {
            this.setState({room: nameRoom})
        })
    }

    onClick = (name) => {
        this.props.navigation.navigate('mesGroup',{name})
        socket.emit('client_send_name_room_muon_vao',name)
      }


  render() {
    const group = this.state.room.map((name, index) => {
        return <Group
                key ={index --}
                name = {name}
                onPress={()=> this.onClick(name)}
            />
    })

    return (
      <SafeAreaView style={styles.component}>
            <View style={{backgroundColor:'#efe8e8', flex: 1}}>
            <Search/>
            <ScrollView>
                <TouchableOpacity onPress = { () => this.props.navigation.navigate('creactGroup')}>
                    <View style = {styles.createRoom} >
                        <View style={{ flex:1, alignItems:'center'}}>
                            <Image  style = {STYLE_AVATAR} source={require('../image/addFriend.png')} />
                        </View>
                        <View style={{flex:6, marginHorizontal:7}}>
                            <Text> Tạo nhóm mới</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{position:'relative'}}> 
                    <View style = {styles.suggestions} >
                        <Text style={{fontWeight:'500', paddingVertical:10}}> Gợi ý cho bạn</Text>
                        <View style={{paddingBottom:30, paddingTop:10}} >
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <View style={{ flex:1, alignItems:'center'}}>
                                    <Image  style = {STYLE_AVATAR} source={require('../image/womenDay.jpg')} />
                                </View>
                                <View style={{flex:6, marginHorizontal:7}}>
                                    <Text style={{fontSize:17}}> Tạo nhóm chuẩn bị 20/10</Text>
                                    <Text style={{fontSize:12, color: '#898484'}}> Lên kế hoach tạo bất ngờ cho chị em</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.create}>
                            <Text style={{fontSize:11, color:COLOR_RIMARY_1, fontWeight:'500'}}>
                                TẠO NHÓM NGAY !
                            </Text>
                    </View>
                </View>
                <View style = {styles.salientFeatures}>
                    <Text style={{fontWeight:'500'}}>Tính năng nổi bật</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity>
                        <View style={styles.box}>
                            <View style={{paddingBottom:10}}>
                                <Image style={{width:50, height:50}} source={require('../image/calendar.png')} />
                            </View>
                            <Text>
                                Lịch
                            </Text>
                        </View>
                        </TouchableOpacity>
                        <View style={styles.box}>
                            <View style={{paddingBottom:10}}>
                                <Image style={{width:50, height:50}} source={require('../image/reminder.png')} />
                            </View>
                            <Text>
                                Nhắc hẹn
                            </Text>
                        </View>
                        <View style={styles.box}>
                            <View style={{paddingBottom:10}}>
                                <Image style={{width:50, height:50}} source={require('../image/images.png')} />
                            </View>
                            <Text>
                                Shear ảnh
                            </Text>
                        </View>
                        <View style={styles.box}>
                            <View style={{paddingBottom:10}}>
                                <Image style={{width:50, height:50}} source={require('../image/working-at-home.png')} />
                            </View>
                            <Text>
                                Nhóm online
                            </Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.group}>
                    <Text style={{fontWeight:'500', marginVertical:10}}>Nhóm đang tham gia (10)</Text>
                    {group}
                </View>
                </ScrollView>
            </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  component:{
    flex:1,
    backgroundColor:'#efe8e8',
    flexDirection:'column'

  },
  createRoom:{
    paddingVertical:10,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 10,
    backgroundColor:'#fff',

  },
  suggestions:{

    backgroundColor:'blue',
    marginVertical:10,
    backgroundColor:'#fff',
    justifyContent:'center',
    paddingHorizontal:10,
  },
  create:{
      position:'absolute',
      bottom:15,
      right:10,
      backgroundColor:COLOR_RIMARY_2,
      borderRadius:10,
      padding:5
  },
  salientFeatures :{
    height:150,
    backgroundColor:'#fff',
    flexDirection:'column',
    justifyContent:'space-around',
    paddingHorizontal:10,
    marginBottom: 10
  },
  group:{
    flex: 1,
    paddingHorizontal:10,
    backgroundColor:'#fff'
  },
  box:{
    flexDirection:'column',
    alignItems:'center',
  }
})


export default Add;
