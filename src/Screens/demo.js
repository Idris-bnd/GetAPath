import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { GOOGLE_MAPS_APIKEY } from './GoogleMapApiKey';
import { StyleSheet, Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps/lib/MapView';
import { Marker } from 'react-native-maps';

export default function App() {

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
