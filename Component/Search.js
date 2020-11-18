import React from 'react';
import {View, Image, TextInput, StyleSheet} from 'react-native';
import {COLOR_RIMARY} from '../Style/StyleBox';

class Search extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.searchBox}>
          <View style={styles.image}>
            <Image
              style={styles.imageImg}
              source={require('./../image/search.png')}
            />
          </View>
          <TextInput
            placeholder="Search friend,messageeeee..."
            style={styles.textInput}
          />
          <View style={styles.image}>
            <Image
              style={{width:30, height:30,tintColor:'#fff'}}
              source={require('./../image/pluss.png')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    height: 50,
    backgroundColor: COLOR_RIMARY,
    flexDirection: 'row',
  },
  textInput: {
    flex: 6,
    height: '100%',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageImg: {
    width: 20,
    height: 20,
    tintColor:'#fff'
  },
});

export default Search;
