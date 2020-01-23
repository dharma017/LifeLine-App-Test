import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// components
import Map from './../component/Map';
import SearchBox from './../component/SearchBox';
import SearchList from './../component/SearchList';

import { MAPBOX_API_KEY } from 'react-native-dotenv';

function searchLocation(keyword) {
  console.log('keyword:', keyword);
  geocoder(keyword);
}

function geocoder(keyword) {
  const wordsList = keyword.split(' ').join('+');

  console.log(wordsList);

  // GET request
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${wordsList}.json?country=np&access_token=${MAPBOX_API_KEY}`,
    {
      method: 'GET'
      //Request Type
    }
  )
    .then(response => response.json())
    //If response is in json then in success
    .then(responseJson => {
      //Success
      console.log('response:', responseJson);
    })
    //If response is not in json then in error
    .catch(error => {
      //Error
      console.error('error:', error);
    });
}

function renderContent(params) {
  if (params.isTyping) {
    return <SearchList keyword={params.keyword} />;
  } else {
    return <Map userInfo={params.userInfo} />;
  }
}

function MapScreen(props) {
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <SearchBox setIsTyping={setIsTyping} setKeyword={setKeyword} />
      </View>
      {renderContent({
        isTyping,
        keyword,
        userInfo: props.navigation.getParam('userInfo')
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  searchArea: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottomWidth: 2
  }
});

export default MapScreen;