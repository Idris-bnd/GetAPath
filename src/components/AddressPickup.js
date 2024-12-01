import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../constants/googleMapApiKey';

const AddressPickup = ({ placeholderText }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={placeholderText ? placeholderText : 'Default'}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'fr',
            }}
            currentLocation={true}
        />
    )
}

const styles = StyleSheet.create({})
export default AddressPickup;