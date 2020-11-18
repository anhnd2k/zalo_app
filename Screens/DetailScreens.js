import React from 'react';
import {View, Image, TextInput, StyleSheet, Text, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLOR_RIMARY} from '../Style/StyleBox';
import {socket} from '../ConnectSocket/socket';
import {url} from '../link/url';

class DetailScreens extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      arrayMesImg:[],
      urlImgShare: null
    }
  }

  componentDidMount(){
    socket.on('CLIENT_SEND_MES', (data) => {
      this.setState({arrayMesImg:data})
    })
  }

  render() {
    const {user, id, urlImg} = this.props.route.params
    const imgShare = this.state.arrayMesImg.map((item, index) => {
      if(item.mes == null && item.mesImg !== null && item.id == id || item.mes == null && item.mesImg !== null && item.idMe == id){
        return(
          <Image key={index ++} style={{width:200, height:200, marginHorizontal:10}} source={{uri:(`${url+item.mesImg}`)}}/>
        )
      }
    })
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'#fcf9f9', paddingBottom:10}}>
        <View style={styles.avatar}>
          <Image style={{width:80, height:80, borderRadius:40}} source={urlImg !== undefined ? {uri:(`${url + urlImg}`)} : require('../image/moon3.jpg')}/>
          <Text style={{fontSize:20, marginVertical:20, fontWeight:'bold'}}>{user}</Text>
        </View>
        {/* sdsdsdsd */}
        <View style={styles.option}>
          <TouchableOpacity style={{alignItems:'center', width:60}}>
            <View style={{backgroundColor:'#efeaea', padding:8, borderRadius: 20}}>
            <Image style={{width:22, height:22}} source={require('../image/search2.png')}/>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={{textAlign:'center',fontSize:12, marginTop:10}}>Tìm tin nhắn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center', width:60}}>
            <View style={{backgroundColor:'#efeaea', padding:8, borderRadius: 20}}>
            <Image style={{width:22, height:22}} source={require('../image/search2.png')}/>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={{textAlign:'center',fontSize:12, marginTop:10}}>Trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('contenMessage', {id: id, status: true})}  style={{alignItems:'center', width:60}}>
            <View style={{backgroundColor:'#efeaea', padding:8, borderRadius: 20}}>
            <Image style={{width:22, height:22}} source={require('../image/search2.png')}/>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={{textAlign:'center',fontSize:12, marginTop:10}}>Đổi hình nền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center', width:60}}>
            <View style={{backgroundColor:'#efeaea', padding:8, borderRadius: 20}}>
            <Image style={{width:22, height:22}} source={require('../image/search2.png')}/>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={{textAlign:'center',fontSize:12, marginTop:10}}>Tắt thông báo</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{marginTop:8, backgroundColor:'#fff'}}>
          <TouchableOpacity style={styles.item}>
            <Image style={{width:20, height:20, marginHorizontal:20}} source={require('../image/search2.png')}/>
            <View style={{width:'100%'}}>
            <Text style={{fontSize:15, lineHeight:40, margin:8}}> Đổi tên gợi nhớ</Text>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#a5a2a2'}}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Image style={{width:20, height:20, marginHorizontal:20}} source={require('../image/search2.png')}/>
            <View style={{width:'100%'}}>
            <Text style={{fontSize:15, lineHeight:40, margin:8}}> Đổi tên gợi nhớ</Text>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#a5a2a2'}}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Image style={{width:20, height:20, marginHorizontal:20}} source={require('../image/search2.png')}/>
            <View style={{width:'100%'}}>
            <Text style={{fontSize:15, lineHeight:40, margin:8}}> Đổi tên gợi nhớ</Text>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#a5a2a2'}}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Image style={{width:20, height:20, marginHorizontal:20}} source={require('../image/search2.png')}/>
            <View style={{width:'100%'}}>
            <Text style={{fontSize:15, lineHeight:40, margin:8}}> Đổi tên gợi nhớ</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* share img */}
        <View style={{marginTop:8, flex:1, backgroundColor:'#fcf9f9'}}>
          <TouchableOpacity style={[styles.item]}>
            <Image style={{width:20, height:20, marginHorizontal:20}} source={require('../image/search2.png')}/>
            <View style={{width:'100%'}}>
            <Text style={{fontSize:15, lineHeight:40, margin:8}}> Ảnh được chia sẻ</Text>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#a5a2a2'}}></View>
            </View>
          </TouchableOpacity>
          <ScrollView horizontal={true} style={{marginTop:20}}>
          {imgShare}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#e5e0e0'
  },
  avatar:{
    alignItems:'center',
    marginTop:20,
  },
  option:{
    flexDirection:'row',
    marginHorizontal:50,
    justifyContent:'space-around',
  },
  item:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fcf9f9',
  }
});

export default DetailScreens;
