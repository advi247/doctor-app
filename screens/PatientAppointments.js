import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {observer} from 'mobx-react'
import rootStore from '../stores/RootStore';
import { useEffect } from 'react';
import ToggleHeader from '../components/ToggleHeader';

const PatientAppointments = observer(() => {

  useEffect(() => {
    rootStore.appointments;
  })

  const getButtonStyle = (status) => {
    return status === 'Confirmed' ? styles.confirmedBtn : styles.pendingBtn;
  };

  const appointmentCard = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{item.time}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Doctor Name</Text>
          <Text style={styles.value}>{item.doctorname}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{item.category}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Clinic</Text>
          <Text style={styles.value}>{item.clinic}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Status</Text>
          <TouchableOpacity style={getButtonStyle(item.status)}>
            <Text style={styles.statusText}>{item.status}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.container}>
        <ToggleHeader screen="PatientSignin" />
        <Text style={styles.heading}>My Appointments</Text>
        <FlatList
          data={rootStore.appointments}
          renderItem={appointmentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </ScrollView>
  );
});

export default PatientAppointments;

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 18,
  },

  appointmentCard: {
    backgroundColor: '#eef7ff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  col: {
    flex: 1,
    margin: 2,
  },
  label: {
    color: '#888',
    fontSize: 12,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },

  confirmedBtn: {
    backgroundColor: '#007104',
    padding: 6,
    marginTop: 7,
    borderRadius: 100,
    justifyContent: 'center',
  },
  pendingBtn: {
    backgroundColor: '#fc6459',
    padding: 6,
    marginTop: 7,
    borderRadius: 100,
    justifyContent: 'center',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  list: {
    paddingBottom: 60,
  },
});
