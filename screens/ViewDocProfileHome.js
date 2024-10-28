import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import rootStore from '../stores/RootStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Header from '../components/Header';

export default function ViewDocProfileHome({navigation}) {
  const {
    name,
    category,
    speciality,
    qual,
    experience,
    clinic,
    location,
    days,
    timing,
  } = rootStore.doctorDetails;

  const handleCall = () => {
    Alert.alert(`Place call to ${name}?`);
  }

  const handleMsg = () => {
    Alert.alert(`Message ${name}?`);
  }

  return (
    <View style={styles.profileContainer}>
      <Header />

      <View style={styles.header}>
        <Text style={styles.doctorName}>{name}</Text>
      </View>

      <View style={styles.imageContainer}>
        {/* Placeholder for the profile image */}
        <View style={styles.profileImage}></View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={[styles.actionButton, styles.editButton]}
        onPress={() => navigation.navigate('MakeRequestHome')}>
          <View style={styles.buttons}>
            <View style={styles.icon}>
              <Octicons
                name={'pencil'}
                size={14}
                color={'white'}
                marginTop={2}
              />
              <Text style={styles.buttonText}>Make A</Text>
            </View>
            <Text style={styles.buttonText}>Request</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.actionButton, styles.confirmedButton]}
        onPress={handleCall}>
          <View style={styles.buttons}>
            <View style={styles.icon}>
              <MaterialIcons
                name={'phone'}
                size={14}
                color={'white'}
                marginTop={2}
              />
              <Text style={styles.buttonText}>Call</Text>
            </View>
            <Text style={styles.buttonText}>Doctor</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.actionButton, styles.pendingButton]}
        onPress={handleMsg}>
          <View style={styles.buttons}>
            <View style={styles.icon}>
              <MaterialIcons
                name={'message'}
                size={14}
                color={'white'}
                marginTop={2}
              />
              <Text style={styles.buttonText}>Message</Text>
            </View>
            <Text style={styles.buttonText}>Doctor</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>{category}</Text>
      <Text style={styles.speciality}>{speciality}</Text>
      <Text style={styles.clinic}>
        {clinic}, {location}
      </Text>
      <Text style={styles.daytime}>
        {days} : {timing}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsText}>Experience</Text>
          <Text style={styles.statsText}>{experience} Years</Text>
        </View>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsText}>Qualifications</Text>
          <Text style={styles.statsText}>{qual}</Text>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About Dr. {name}</Text>
        <Text style={styles.aboutText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. when an unknown printer took a galley
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  header: {
    width: '100%',
    padding: 7,
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -5,
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
  },
  buttons: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    flexDirection: 'row',
    gap: 5,
    marginTop: -2,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '33%',
  },
  editButton: {
    backgroundColor: '#00ADEF',
  },
  confirmedButton: {
    backgroundColor: '#007104',
  },
  pendingButton: {
    backgroundColor: '#fc6459',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 25,
  },
  speciality: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  clinic: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  daytime: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    marginBottom: 30,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 15,
    gap: 50,
  },
  statsSubContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },

  aboutSection: {
    width: '100%',
    marginTop: 15,
    padding: 5,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
  },
});
