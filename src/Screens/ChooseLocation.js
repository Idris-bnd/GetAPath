import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import AddressPickup from '../components/AddressPickup';
import CustomBtn from '../components/CustomBtn';
import { FlatList } from 'react-native';
import { showError, showSuccess } from '../helper/helperFunction';

const ChooseLocation = (props) => {
    const navigation = useNavigation();

    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {},
    });
    const { pickupCords, destinationCords } = state;

    const checkValid = () => {
        if (Object.keys(pickupCords).length === 0) {
            showError("Veuillez entrer votre lieu de départ");
            return false;
        }
        if (Object.keys(destinationCords).length === 0) {
            showError("Veuillez entrer votre lieu d'arrivée");
            return false;
        }
        return true;
    }

    const onDone = () => {
        const isValid = checkValid();

        if (isValid) {
            props.route.params.getCordinates({
                pc: pickupCords,
                dc: destinationCords
            });
            showSuccess("Voici votre trajet");
            navigation.goBack();
        }
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

    const data = [
        { key: 'addressPickup1', component: <AddressPickup placeholderText="Où situez-vous ?" fetchAddress={fetchAddressCoords} /> },
        { key: 'spacer', component: <View style={{ marginBottom: 16 }} /> },
        { key: 'addressPickup2', component: <AddressPickup placeholderText="Où voulez-vous aller ?" fetchAddress={fetchDestinationCoords} /> },
        { key: 'customBtn', component: <CustomBtn btnText="Rechercher" btnStyle={{ marginTop: 26 }} onPress={onDone} /> },
    ];


    return (
      <View style={styles.container}>
          
        <FlatList
            keyboardShouldPersistTaps="handled"
            style={{ padding: 24}}

            data={data}
            renderItem={({ item }) => item.component}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="handled"
        />
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