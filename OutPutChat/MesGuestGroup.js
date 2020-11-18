import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {TEXT_CONTEN, TEXT_CONTEN_USER, STYLE_AVATAR, FONT_SIZE} from '../Style/StyleBox';
import {url} from '../link/url';

const {width}  = Dimensions.get('window')
class MesGuestGroup extends React.Component {
  render() {
    const {mes, name, mesImg, urlImg} = this.props;
    return (
      <View style={styles.user1}>
        {/* img user */}
        <View style={styles.avatar}>
          <Image style={STYLE_AVATAR} source={urlImg !== undefined ? {uri:(`${url + urlImg}`)} : require('../image/moon3.jpg')} />
        </View>
        <View style={{position:'relative',}}>
          <View style={{position:'absolute',minWidth:10, top:0,backgroundColor:'#fff', alignItems:'center', borderTopRightRadius:10, borderBottomRightRadius:10,padding: 4, marginTop:5}}>
           <Text style={{fontSize:10, color:'#fc5a0f'}}>{name}</Text>
          </View>
          <View style={{marginTop:30, maxWidth:width/3*2, backgroundColor:'#fff', borderRadius:15, padding: 10, borderColor:'#BDC1C3', borderWidth:0.3}}>
            {mes !== null && mesImg == undefined ? <Text style={{fontSize: 20, color: '#3B4950',}}>{mes}</Text>: 
            <Image style={{width:100, height:100}} source={{uri:(`${url+mesImg}`)}}/>
          }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user1: {
    alignItems: 'flex-start',
    marginBottom: 10,
    flexDirection: 'row',
    position:'relative'
  },
  avatar: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  borderText:{
  backgroundColor: '#FFFFFF',
  maxWidth:'70%',
  borderRadius: 15,
  padding: 7,
  borderWidth: 0.5,
  alignItems:'center'
  }
});

export default MesGuestGroup;
