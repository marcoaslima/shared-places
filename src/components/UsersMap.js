import React from 'react';
import { View, StyleSheet } from 'react-native';

import MapView from 'react-native-maps';

const usersMaps = props =>
{
    let userLocationMarker = null;
    let usersMarkers = null;

    if(props.userLocation)
    {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation} />
    }

    if(props.userPlaces)
    {
        usersMarkers = props.userPlaces.map(userPlace => 
            (<MapView.Marker coordinate={userPlace} key={userPlace.id}/> )
        );
    }

    return (
        <View style={styles.mapContainer}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 51.507351,
                    longitude: -0.127758,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.421
                }}
                region={props.userLocation}>
                { userLocationMarker }
                { usersMarkers }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200
    },
    map:{
        width: '100%',
        height: '100%'
    }
});

export default usersMaps;