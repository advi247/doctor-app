import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import rootStore from '../stores/RootStore';
import { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Octicons from 'react-native-vector-icons/Octicons';

export default function EditPatientProfile({ navigation }) {
  const [selectedParam, setSelectedParam] = useState('Select Here');
  const [newValue, setNewValue] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const handleParam = (param) => {
    setSelectedParam(param);
    setShowDropdown(false);

    let property;

    switch (param) {
      case 'Name':
        property = 'pname';
        break;
      case 'Email':
        property = 'pemail';
        break;
      case 'Number':
        property = 'pnumber';
        break;
    }
    setSelectedProperty(property);
  };

  const validateForm = () => {
    let errors = {};
    if (!newValue) errors.newValue = 'This is  required field';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    if (validateForm()) {
      rootStore.editUserDetails(selectedProperty, newValue);
      setErrors({});
      navigation.navigate('PatientSignin');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <Header />

        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Which Field do you want to Edit?</Text>
            <View style={styles.input}>
              <Text style={{ color: 'gray' }}>{selectedParam}</Text>
              <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
                <Octicons name={'triangle-down'} size={18} color={'gray'} />
              </TouchableOpacity>
            </View>
            {showDropdown && (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={() => handleParam('Name')}>
                  <Text style={styles.dropdownOption}>Name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleParam('Email')}>
                  <Text style={styles.dropdownOption}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleParam('Number')}>
                  <Text style={styles.dropdownOption}>Number</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.label}>Enter the new value</Text>
          <Input
            keyboard="default"
            placeholderText={`Enter here`}
            propertyName={newValue}
            functionName={setNewValue}
          />
          {errors.newValue ? (
            <Text style={styles.error}>{errors.property}</Text>
          ) : null}

          <TouchableOpacity style={styles.edit} onPress={handleEdit}>
            <Text style={styles.edittext}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },

  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 35,
  },

  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  input: {
    flexDirection: 'row',
    gap: 10,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 100,
  },

  dropdownContainer: {
    width: 250,
    backgroundColor: '#fff',
    marginBottom: 25,
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

  error: {
    color: 'red',
    marginBottom: 10,
  },

  edit: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginVertical: 8,
  },
  edittext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
});
