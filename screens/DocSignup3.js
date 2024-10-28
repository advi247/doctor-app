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

export default function DocSignup3({ route, navigation }) {
  const { dname, category, speciality, qual, experience } = route.params;

  const [clinic, setClinic] = useState('');
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [timing, setTiming] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!clinic) errors.clinic = 'This field is required';
    if (!location) errors.location = 'This field is required';
    if (!days) errors.days = 'This field is required';
    if (!timing) errors.timing = 'This field is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      rootStore.updateUserDetails({
        dname,
        category,
        speciality,
        qual,
        experience,
        clinic,
        location,
        days,
        timing,
      });
      setClinic('');
      setLocation('');
      setDays('');
      setTiming('');
      setErrors({});
      navigation.navigate('Doctor');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <Header />

        <Text style={styles.title}>Almost there</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Clinic Name</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="Enter your clinic's name"
            propertyName={clinic}
            functionName={setClinic}
          />
          {errors.clinic ? (
            <Text style={styles.error}>{errors.clinic}</Text>
          ) : null}

          <Text style={styles.label}>Location</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="In which area is your clinic located?"
            propertyName={location}
            functionName={setLocation}
          />
          {errors.location ? (
            <Text style={styles.error}>{errors.location}</Text>
          ) : null}

          <Text style={styles.label}>Working Days</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="On what days are you open?"
            propertyName={days}
            functionName={setDays}
          />
          {errors.days ? <Text style={styles.error}>{errors.days}</Text> : null}

          <Text style={styles.label}>Timings</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="Enter the timings"
            propertyName={timing}
            functionName={setTiming}
          />
          {errors.timing ? <Text style={styles.error}>{errors.timing}</Text> : null}

          <TouchableOpacity style={styles.signup} onPress={handleSignup}>
            <Text style={styles.signuptext}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.haveAccount}>
            <Text style={styles.haveAccountText1}>Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DocSignin')}>
              <Text style={styles.haveAccountText2}>Sign in</Text>
            </TouchableOpacity>
          </View>
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
  error: {
    color: 'red',
    marginBottom: 10,
  },

  signup: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginVertical: 8,
  },
  signuptext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },

  haveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    gap: 2,
  },
  haveAccountText1: {
    color: 'black',
    fontSize: 15,
  },
  haveAccountText2: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
