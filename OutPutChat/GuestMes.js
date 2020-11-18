import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TEXT_CONTEN, STYLE_AVATAR, FONT_SIZE} from '../Style/StyleBox';
import {url} from '../link/url';

class GuestMes extends React.Component {
  render() {
    const {mes, mesImg, urlImg} = this.props;
    return (
      <View style={styles.user1}>
        {/* img user */}
        <View style={styles.avatar}>
          <Image style={STYLE_AVATAR} source={urlImg !== undefined ? {uri:(`${url + urlImg}`)} : require('../image/moon3.jpg')} />
        </View>

        <View style={TEXT_CONTEN}>
          {mes !== null && mesImg == undefined ? <Text style={FONT_SIZE}>{mes}</Text> : 
            <Image style={{width:100, height:100}} source={{uri:(`${url+mesImg}`)}}/>
          }
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
  },
  avatar: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default GuestMes;
