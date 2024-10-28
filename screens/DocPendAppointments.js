import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import ToggleHeader from '../components/ToggleHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useEffect } from 'react';

const DocPendAppointments = observer(() => {

  useEffect(() => {
    rootStore.appointments;
  })

  const pending = rootStore.appointments.filter((data) => data.status == 'Pending')

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
          <Text style={styles.label}>Patient Name</Text>
          <Text style={styles.value}>{item.patientname}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>{item.patientage}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{item.patientgender}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Number</Text>
          <Text style={styles.value}>{item.patientnumber}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
        onPress={() => rootStore.acceptAppointment(item.id)}
        style={[styles.actionButton, styles.acceptButton]}>
          <View style={styles.icon}>
            <Octicons
              name={'check-circle'}
              size={13}
              color={'white'}
              marginTop={2}
            />
            <Text style={styles.buttonText}>Accept</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.rescheduleButton]}>
          <View style={styles.icon}>
            <MaterialIcons
              name={'schedule'}
              size={13}
              color={'white'}
              marginTop={2}
            />
            <Text style={styles.buttonText}>Reschedule</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
          <View style={styles.icon}>
            <Octicons
              name={'x-circle'}
              size={13}
              color={'white'}
              marginTop={2}
            />
            <Text style={styles.buttonText}>Decline</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.container}>
        <ToggleHeader screen="DocSignin" />
        <Text style={styles.heading}>Pending Requests</Text>
        <FlatList
          data={pending}
          renderItem={appointmentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </ScrollView>
  );
});
export default DocPendAppointments;

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
    marginVertical: 15,
    marginHorizontal: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    gap: 19,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 11,
  },
  col: {
    flex: 1,
    margin: 3,
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

  icon: {
    flexDirection: 'row',
    gap: 5,
    marginTop: -2,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
    width: '31%',
  },
  acceptButton: {
    backgroundColor: '#00ADEF',
  },
  rescheduleButton: {
    backgroundColor: '#007104',
  },
  declineButton: {
    backgroundColor: '#fc6459',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  list: {
    paddingBottom: 60,
  },
});
