import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import ToggleHeader from '../components/ToggleHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const DocViewAppointments = observer(() => {

  useEffect(() => {
    rootStore.appointments;
  }, [])

  const appointments = rootStore.appointments.filter((data) => data.status == 'Confirmed')
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [selectedFilter, setSelectedFilter] = useState('Appointments');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    setShowDropdown(false);

    const today = moment().startOf('day');
    const endOfWeek = moment().endOf('week');
    const endOfMonth = moment().endOf('month');

    let filtered = rootStore.appointments.filter((data) => data.status == 'Confirmed');

    switch (filter) {
      case 'Today':
        filtered = appointments.filter((appointment) =>
          moment(appointment.date, 'YYYY-MM-DD').isSame(today, 'day')
        );
        break;
      case 'This Week':
        filtered = appointments.filter((appointment) =>
          moment(appointment.date, 'YYYY-MM-DD').isBetween(
            today,
            endOfWeek,
            null,
            '[]'
          )
        );
        break;
      case 'This Month':
        filtered = appointments.filter((appointment) =>
          moment(appointment.date, 'YYYY-MM-DD').isBetween(
            today,
            endOfMonth,
            null,
            '[]'
          )
        ); 
        break;
      case 'All Appointments':
        filtered = rootStore.appointments.filter((data) => data.status == 'Confirmed')
        break;
    }
    setFilteredAppointments(filtered);
  }

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
          <Text style={[styles.label, { marginBottom: 5 }]}>Status</Text>
          <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
            <MaterialIcons
              name={'phone'}
              size={13}
              color={'white'}
              marginTop={2}
              alignSelf={'center'}
            />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}></View>
    </View>
  );

  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.container}>
        <ToggleHeader screen="DocSignin" />
        <View style={styles.header}>
          <Text style={styles.heading}>{selectedFilter}</Text>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
            <Octicons
              name={'triangle-down'}
              size={35}
              color={'black'}
              alignSelf={'center'}
            />
          </TouchableOpacity>
        </View>

        {showDropdown && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={() => handleFilter('All Appointments')}>
              <Text style={styles.dropdownOption}>All Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('Today')}>
              <Text style={styles.dropdownOption}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('This Week')}>
              <Text style={styles.dropdownOption}>This Week</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('This Month')}>
              <Text style={styles.dropdownOption}>This Month</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={filteredAppointments}
          renderItem={appointmentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </ScrollView>
  );
});

export default DocViewAppointments;

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    gap: 10,
  },
  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 18,
  },

  dropdownContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    padding: 5,
  },
  dropdownOption: {
    fontSize: 14,
    paddingVertical: 5,
    textAlign: 'center',
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

  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  callButton: {
    backgroundColor: '#007104',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  list: {
    paddingBottom: 60,
  },
});


