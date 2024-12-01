import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import AddressPickup from '../components/AddressPickup';

const ChooseLocation = () => {
    return (
      <View style={styles.container}>
          <AddressPickup placeholderText="Où voulez vous aller ?" />
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