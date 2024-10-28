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

export default function DocSignin({ navigation }) {
  const [dname, setDName] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!dname) errors.dname = 'Name is required';
    if (!password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignin = () => {
    if (validateForm()) {
      rootStore.updateUserDetails({ dname });
      setDName('');
      setPassword('');
      setErrors({});
      navigation.navigate('Doctor');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <Header />

        <Text style={styles.title1}>Hey Doc,</Text>
        <Text style={styles.title2}>Welcome Back!</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <Input
            keyboard="default"
            iconName="user"
            placeholderText="Enter your name"
            propertyName={dname}
            functionName={setDName}
          />
          {errors.dname ? (
            <Text style={styles.error}>{errors.dname}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <PwdInput propertyName={password} functionName={setPassword} />
          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}

          <TouchableOpacity style={styles.signin} onPress={handleSignin}>
            <Text style={styles.signintext}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.noAccount}>
            <Text style={styles.noAccountText1}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DocSignup1')}>
              <Text style={styles.noAccountText2}>Sign up</Text>
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

  title1: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
  },
  title2: {
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

  signin: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginVertical: 8,
  },
  signintext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },

  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    gap: 2,
  },
  noAccountText1: {
    color: 'black',
    fontSize: 15,
  },
  noAccountText2: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
