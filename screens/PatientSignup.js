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
import PwdInput from '../components/PwdInput';

export default function PatientSignup({ navigation }) {
  const [pname, setPName] = useState('');
  const [pemail, setPEmail] = useState('');
  const [pnumber, setPNumber] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!pname) errors.pname = 'Name is required';
    if (!pemail) errors.pemail = 'Email is required';
    if (!pnumber) errors.pnumber = 'Phone Number is required';
    if (!password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      rootStore.updateUserDetails({ pname, pemail, pnumber });
      setPName('');
      setPEmail('');
      setPNumber('');
      setPassword('');
      setErrors({});
      navigation.navigate('Patient');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <Header />

        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <Input
            keyboard="default"
            iconName="user"
            placeholderText="Enter your name"
            propertyName={pname}
            functionName={setPName}
          />
          {errors.pname ? (
            <Text style={styles.error}>{errors.pname}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <Input
            keyboard="email-address"
            iconName="mail"
            placeholderText="Enter your email"
            propertyName={pemail}
            functionName={setPEmail}
          />
          {errors.pemail ? (
            <Text style={styles.error}>{errors.pemail}</Text>
          ) : null}

          <Text style={styles.label}>Phone Number</Text>
          <Input
            keyboard="number-pad"
            iconName="phone"
            placeholderText="Enter your phone number"
            propertyName={pnumber}
            functionName={setPNumber}
          />
          {errors.pnumber ? (
            <Text style={styles.error}>{errors.pnumber}</Text>
          ) : null}

          <Text style={styles.label}>Set Password</Text>
          <PwdInput propertyName={password} functionName={setPassword} />
          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}

          <TouchableOpacity style={styles.signup} onPress={handleSignup}>
            <Text style={styles.signuptext}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.haveAccount}>
            <Text style={styles.haveAccountText1}>Have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PatientSignin')}>
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
