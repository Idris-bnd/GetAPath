import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import AddressPickup from '../components/AddressPickup';
import CustomBtn from '../components/CustomBtn';

const ChooseLocation = (props) => {
    const navigation = useNavigation();

    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {},
    });
    const { pickupCords, destinationCords } = state;

    const onDone = () => {
        props.route.params.getCordinates({
            pc: pickupCords,
            dc: destinationCords
        });
        navigation.goBack();
    }

    const fetchAddressCoords = (lat, lng) => {
        setState({
            ...state,
            pickupCords:{
                latitude: lat,
                longitude: lng
            }
        });
    }
    const fetchDestinationCoords = (lat, lng) => {
        setState({
            ...state,
            destinationCords:{
                latitude: lat,
                longitude: lng
            }
        });
    }
    return (
      <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ padding: 24}}
            >
            <AddressPickup placeholderText="Où situez-vous ?" fetchAddress={fetchAddressCoords} />
            <View style={{ marginBottom: 16 }} />
            <AddressPickup placeholderText="Où voulez-vous aller ?" fetchAddress={fetchDestinationCoords} />

            <CustomBtn
                btnText="Rechercher"
                btnStyle={{ marginTop: 26 }}
                onPress={onDone}
            />
          </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0F1A20',
      color: '#FFF',
    },
})

export default ChooseLocation;