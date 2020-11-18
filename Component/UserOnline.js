import React from 'react';
import{View, Image, StyleSheet, Text} from 'react-native';
import { STYLE_ONLINE_DOTS,STYLE_AVATAR } from '../Style/StyleBox';
import {url} from '../link/url';
class UserOnline extends React.Component{
    render(){
      const{name, urlImg} = this.props;
        return(
            <View style={styles.boxOnline}>
              <View style={{width: 50, height: 50, marginBottom: 10}}>
                <Image
                  style={STYLE_AVATAR}
                  source={urlImg !== undefined ? {uri:(`${url + urlImg}`)} : require('../image/moon3.jpg')}
                />
                <View style={STYLE_ONLINE_DOTS}></View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{textAlign:'center'}} numberOfLines={2} ellipsizeMode="tail">
                  {name}
                </Text>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boxOnline: {
        width: 70,
        marginVertical: 10,
        marginHorizontal: 15,
        alignItems: 'center',
      },
})

export default UserOnline;