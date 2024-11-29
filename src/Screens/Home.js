import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../GoogleMapApiKey';

const Home = ({ navigation }) => {
    
  const [state, setState] = useState({
    pickupCords: {
      latitude: 43.4601984,
      longitude: 6.766592,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: {
      latitude: 43.4158602,
      longitude: 6.8067538,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const {pickupCords, dropLocationCords} = state;
  const mapRef = useRef();

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        ref={mapRef}
        initialRegion={pickupCords}
      >
        <Marker
          coordinate={pickupCords}
        />
        <Marker
          coordinate={dropLocationCords}
        />
        <MapViewDirections
          origin={pickupCords}
          destination={dropLocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="red"
          optimizeWayPoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100
              }
            })
          }}
        />
      </MapView>

    <TouchableOpacity
    onPress={() => navigation.navigate('ChooseLocation')}
    >
    <Text>Go to chooselocation screen</Text>
    <Text>Hello Zoé</Text>
    </TouchableOpacity>
    </View>
  );
    // return (
    //   <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChooseLocation')}
          >
            <Text> textInComponent fef </Text>
          </TouchableOpacity>
    //   </View>
    // )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
export default Home;