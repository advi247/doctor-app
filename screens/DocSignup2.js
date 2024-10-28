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

export default function DocSignup2({ route, navigation }) {
  const { dname } = route.params;

  const [category, setCategory] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [qual, setQual] = useState('');
  const [experience, setExperience] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!category) errors.category = 'This field is required';
    if (!speciality) errors.speciality = 'This field is required';
    if (!qual) errors.qual = 'This field is required';
    if (!experience) errors.experience = 'This field is required';
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
      });
      setCategory('');
      setSpeciality('');
      setQual('');
      setExperience('');
      setErrors({});
      navigation.navigate('DocSignup3', {
        dname,
        category,
        speciality,
        qual,
        experience,
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <Header />

        <Text style={styles.title}>Let's get to know you</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Category</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="Eg. Cardiologist/Dentist/Gynecologist"
            propertyName={category}
            functionName={setCategory}
          />
          {errors.category ? (
            <Text style={styles.error}>{errors.category}</Text>
          ) : null}

          <Text style={styles.label}>Speciality</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="Enter your Speciality"
            propertyName={speciality}
            functionName={setSpeciality}
          />
          {errors.speciality ? (
            <Text style={styles.error}>{errors.speciality}</Text>
          ) : null}

          <Text style={styles.label}>Qualification (Min: 1, Max: 3)</Text>
          <Input
            keyboard="default"
            iconName=""
            placeholderText="Enter your qualification(s)"
            propertyName={qual}
            functionName={setQual}
          />
          {errors.qual ? <Text style={styles.error}>{errors.qual}</Text> : null}

          <Text style={styles.label}>Experience (Min: 2)</Text>
          <Input
            keyboard="number-pad"
            iconName=""
            placeholderText="Enter the number of years"
            propertyName={experience}
            functionName={setExperience}
          />
          {errors.experience ? (
            <Text style={styles.error}>{errors.experience}</Text>
          ) : null}

          <TouchableOpacity style={styles.signup} onPress={handleSignup}>
            <Text style={styles.signuptext}>Next</Text>
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
