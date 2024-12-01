import React, { useRef, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../constants/googleMapApiKey';
import imagePath from '../constants/imagePath';

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

    const onPressLocation = () => {
        navigation.navigate('ChooseLocation', { getCordinates: fetchValues });
    }

    const fetchValues = (data) => {
        console.log("=========>", data);
        setState({
            pickupCords:{
                ...state.pickupCords,
                latitude: data.pc.latitude,
                longitude: data.pc.longitude
            },
            dropLocationCords:{
                ...state.dropLocationCords,
                latitude: data.dc.latitude,
                longitude: data.dc.longitude
            },
        })
    }


    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    ref={mapRef}
                    initialRegion={pickupCords}
                >
                    <Marker
                    coordinate={pickupCords}
                    image={imagePath.icCurLoc}
                    />
                    <Marker
                    coordinate={dropLocationCords}
                    image={imagePath.icGreenMarker}
                    />
                    <MapViewDirections
                    origin={pickupCords}
                    destination={dropLocationCords}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="pink"
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

            <View
                style={styles.bottomCard}
            >
                <Text>Where are you going ?</Text>
                <TouchableOpacity
                    onPress={onPressLocation}
                style={styles.inputStyle}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View>
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
    bottomCard: {
        backgroundColor: "White",
        width: "100%",
        padding: 30,
        borderTopStartRadius: 24,
        borderTopEndRadius: 24
    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000",
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center'
    }
  });
  
export default Home;