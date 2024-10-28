import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import AppointmentScreen from '../components/AppointmentScreen';

export default function FindDocsMakeRequest() {
  
  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.container}>
        <Header />
        <AppointmentScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: -20,
  },
});
