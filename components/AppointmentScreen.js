import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react'
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';

const AppointmentScreen = observer(() => {
  
  useEffect(() => {
    rootStore.addAppointments;
  })

  const { pname, pnumber } = rootStore.userDetails;
  const { name, category, clinic } = rootStore.doctorDetails;
  const [selectedDate, setSelectedDate] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const validateForm = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date.');
      return false;
    }
    if (!selectedSlot) {
      Alert.alert('Error', 'Please select a time slot.');
      return false;
    }
    if (!age || isNaN(age) || age <= 0) {
      Alert.alert('Error', 'Please enter a valid age.');
      return false;
    }
    if (!gender) {
      Alert.alert('Error', 'Please select your gender.');
      return false;
    }
    return true;
  };

  const handleConfirmAppointment = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        `Appointment booked for ${selectedDate} between ${selectedSlot}`
      );
      const appointment = {
        patientname: pname,
        patientage: age,
        patientgender: gender,
        patientnumber: pnumber,
        doctorname: name,
        category: category,
        clinic: clinic,
        date: selectedDate,
        time: selectedSlot,
        status: 'Pending'
      };
      rootStore.addAppointment(appointment);
      console.log (rootStore.appointments);
      setSelectedDate(''),
      setSelectedSlot(null),
      setAge(''),
      setGender(null)
    }
  };

  return (
    <View>
      <Text style={styles.header}>Make A Request</Text>
      <Text style={styles.subheader}>{name} - {category}</Text>

      <Calendar
        style={styles.calendar}
        current={new Date().toISOString().split('T')[0]}
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          calendarBackground: '#eef7ff',
          monthTextColor: 'black',
          textMonthFontWeight: '500',
          textMonthFontSize: 17,

          textSectionTitleColor: 'black',
          textDayHeaderFontSize: 15,

          textDisabledColor: '#bcbcbc',
          dayTextColor: 'black',
          textDayFontWeight: '400',

          selectedDayBackgroundColor: '#00ADEF',
          todayTextColor: '#00ADEF',

          arrowColor: '#00ADEF',
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#00ADEF' },
        }}
      />

      <Text style={styles.label}>Available Slots:</Text>
      <View style={styles.slotsContainer}>
        {['9 AM - 12 PM', '12 PM - 3 PM', '3 PM - 6 PM', '6 PM - 9P M'].map(
          (slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.slotButton,
                selectedSlot === slot ? styles.selectedSlot : null,
              ]}
              onPress={() => setSelectedSlot(slot)}>
              <Text
                style={[
                  styles.slotButtonText,
                  selectedSlot === slot ? styles.selectedSlotText : null,
                ]}>
                {slot}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <Text style={styles.label}>Patient Name:</Text>
      <Text style={[styles.input, { color: '#ccc' }]}>{pname}</Text>

      <Text style={styles.label}>Patient Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => setAge(text)}
      />

      <Text style={styles.label}>Select Gender:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            { borderColor: '#006CFF' },
            gender === 'Male' ? { backgroundColor: '#006CFF' } : null,
          ]}
          onPress={() => setGender('Male')}>
          <FontAwesome
            name="male"
            size={24}
            color={gender === 'Male' ? '#fff' : '#006CFF'}
          />
          <Text
            style={[
              styles.genderText,
              { color: '#006CFF' },
              gender === 'Male' ? styles.selectedText : null,
            ]}>
            Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            { borderColor: '#ff0064' },
            gender === 'Female' ? { backgroundColor: '#ff0064' } : null,
          ]}
          onPress={() => setGender('Female')}>
          <FontAwesome
            name="female"
            size={24}
            color={gender === 'Female' ? '#fff' : '#ff0064'}
          />
          <Text
            style={[
              styles.genderText,
              { color: '#ff0064' },
              gender === 'Female' ? styles.selectedText : null,
            ]}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmAppointment}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
});

export default AppointmentScreen;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 5,
  },
  subheader: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 30,
    marginLeft: 5
  },

  calendar: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 25,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },

  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slotButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    width: '45%',
    alignItems: 'center',
  },
  slotButtonText: {
    color: 'black',
    fontWeight: '500',
  },
  selectedSlot: {
    backgroundColor: '#fc6459',
  },
  selectedSlotText: {
    color: '#fff',
    fontWeight: '500',
  },

  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    width: '40%',
    justifyContent: 'center',
  },
  genderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
  },

  confirmButton: {
    backgroundColor: '#007104',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
