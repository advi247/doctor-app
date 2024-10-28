import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const logoImg = require('../assets/logo1.jpg');
const bannerImg = require('../assets/main-1.jpg');

export default function Splash() {
  const navigation = useNavigation();
  const handleDoc = () => {
    navigation.navigate('DocSignin');
  };
  const handlePatient = () => {
    navigation.navigate('PatientSignin');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={logoImg} style={styles.logoImg} />

        <Image source={bannerImg} style={styles.bannerImg} />

        <Text style={styles.heading}>Lorem Ipsum Dolor</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'black' }]}
            onPress={handleDoc}>
            <Text style={styles.signin}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePatient}>
            <Text style={styles.signup}>Patient</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  logoImg: {
    width: 200,
    height: 70,
    marginTop: 50,
    marginBottom: 25,
    alignSelf: 'center',
  },
  bannerImg: {
    width: 290,
    height: 295,
    borderRadius: 100,
    alignSelf: 'center',
  },

  heading: {
    color: 'black',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 5,
  },
  subtitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'black',
    width: '80%',
    height: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
  },
  signin: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  signup: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
});
