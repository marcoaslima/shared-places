import React from 'react';
import { Button } from 'react-native';

const fecthLocation = props => {
    return(
        <Button title="Get Location" onPress={props.onGetLocation}></Button>
    );
}

export default fecthLocation;