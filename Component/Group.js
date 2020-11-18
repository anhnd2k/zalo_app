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

class Group extends React.Component {
  render() {
    const {onPress, name} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
            <View style={styles.component}>
                <View style={styles.imageUsed}>
                    <View style={styles.onlineSet}>
                        <Image style={STYLE_AVATAR} source={require('../image/mobile.jpg')} />
                    </View>
                </View> 
                        <View style={styles.borderColor}>
                            <View style={styles.nameUser}>
                            <Text style={styles.userName}>{name}</Text>
                                <Text
                                    // line number ....
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.contenMessage}>
                                    Click to joid group
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
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  online: {
    position: 'relative',
    width: 50,
    height: 50,
  },
  nameUser: {
    flex: 6,
    justifyContent: 'center',
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
  },
});

export default Group;
