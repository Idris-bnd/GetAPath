import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../constants/googleMapApiKey';

const AddressPickup = ({ placeholderText, fetchAddress }) => {

    const onPressAddress = (data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const lat = details.geometry.location.lat;
        const lng = details.geometry.location.lng;
        fetchAddress(lat, lng);
    }
    return (
        <GooglePlacesAutocomplete
            placeholder={placeholderText ? placeholderText : 'Default'}
            onPress={onPressAddress}
            fetchDetails={true}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'fr',
            }}
            currentLocation={true}
            styles={{
                textInputContainer: styles.containerStyle,
                textInput: styles.inputStyle
            }}
        />
    )
}

const styles = StyleSheet.create({
    containerStyle:{

    },
    inputStyle:{
        color: "#000"
    }
})
export default AddressPickup;