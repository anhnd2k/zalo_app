import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TEXT_CONTEN, FONT_SIZE, BGR_TEXT_MES_ME} from '../Style/StyleBox';
import {url} from '../link/url';


class ChatMe extends React.Component {
  render() {
      const {mes, mesImg} = this.props;
      
    return (
      <View style={styles.user2}>
        <View style={[TEXT_CONTEN, styles.textUserMe]}>
          {mes !== null && mesImg == undefined ? <Text style={FONT_SIZE}>{mes}</Text> : 
            <Image style={{width:100, height:100}} source={{uri:(`${url+mesImg}`)}}/>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user2: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  textUserMe: {
    backgroundColor: BGR_TEXT_MES_ME,
    flexDirection:'column',
    position:'relative'
  },
});

export default ChatMe;
