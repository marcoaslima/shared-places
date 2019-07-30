import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Fetchlocation from './src/components/FetchLocation';
import UsersMap from './src/components/UsersMap';

export default class App extends React.Component{

  state = {
    userLocation: null,
    userPlaces: null
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.421
        }
      });
      
      fetch('https://share-places-f799e.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }).then(res => console.log(res))
      .catch(err => console.log(err));

    }, err => {
      alert(err);
    });
  }

  getUserPlaces = () =>
  {
    fetch('https://share-places-f799e.firebaseio.com/places.json')
    .then(res=>res.json())
    .then(parsedRes => {
      const placesArray = [];

      for(const key in parsedRes)
      {
        placesArray.push({
          latitude: parsedRes[key].latitude,
          longitude: parsedRes[key].longitude,
          id: key
        });
      }

      this.setState({
        userPlaces: placesArray
      });
    })
    .catch(err => console.log(err));
  };

  render()
  {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Button title="Get User Places" onPress={this.getUserPlaces}/>
        </View> 
        <Fetchlocation onGetLocation={this.getUserLocationHandler}/>
        <UsersMap userLocation={this.state.userLocation} userPlaces={this.state.userPlaces}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
