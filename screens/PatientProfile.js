import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import rootStore from '../stores/RootStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import ToggleHeader from '../components/ToggleHeader';

export default function PatientProfile({navigation}) {
  const { pname, pemail, pnumber } = rootStore.userDetails;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ToggleHeader screen="PatientSignin" />
      <Text style={styles.header}>Profile</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={[styles.actionButton, styles.editButton]}
        onPress={() => navigation.navigate('EditPatientProfile')}>
          <View style={styles.buttons}>
            <View style={styles.icon}>
              <Octicons
                name={'pencil'}
                size={14}
                color={'white'}
                marginTop={2}
              />
              <Text style={styles.buttonText}>Edit</Text>
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.actionButton, styles.confirmedButton]}
        onPress={() => navigation.navigate('My Appointments')}>
          <View style={styles.buttons}>
            <View style={styles.icon}>
              <Octicons
                name={'checklist'}
                size={14}
                color={'white'}
                marginTop={2}
              />
              <Text style={styles.buttonText}>View</Text>
            </View>
            <Text style={styles.buttonText}>Appointments</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.actionButton, styles.pendingButton]}
        onPress={() => navigation.navigate('Home')}>
          <View style={styles.buttons}>
            <View style={styles.icon}>
              <MaterialIcons
                name={'schedule'}
                size={14}
                color={'white'}
                marginTop={2}
              />
              <Text style={styles.buttonText}>Make A</Text>
            </View>
            <Text style={styles.buttonText}>Request</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.input}>{pname}</Text>
        <Text style={styles.input}>{pemail}</Text>
        <Text style={styles.input}>{pnumber}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
    alignSelf: 'center',
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

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  input: {
    width: '90%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#eef7ff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
