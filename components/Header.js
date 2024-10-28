import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import Ionicons from "react-native-vector-icons/Ionicons";
const logoImg = require('../assets/logo.png');

export default function Header() {

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <Ionicons name={"arrow-back-circle-outline"} color={'black'} size={25} />
      </TouchableOpacity>
      <Image source={logoImg} style={styles.logoImg} />
      <Text style={styles.heading}>DoctorApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40
  },
  heading: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    paddingBottom: 5,
    marginLeft: 5
  },
  logoImg: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    tintColor: 'black',
    marginLeft: 27,
  },
  backArrow: {
    alignSelf: 'start',
    marginRight: 30,
  },
})