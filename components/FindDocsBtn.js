import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import ai from '../assets/ai-icon.png';

export default function FindDocsBtn(props) {
  
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: 'black' }]}
        onPress={() => navigation.navigate(props.screen1)}>
        <Ionicons
          style={styles.icon1}
          name={'search'}
          color={'white'}
          size={20}
        />
        <Text style={styles.search}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate(props.screen2)}>
        <Image source={ai} style={styles.icon2} />
        <Text style={styles.ai}>AI Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'black',
    width: '80%',
    height: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
    gap: 7,
  },

  icon1: {
    marginLeft: 15,
  },
  icon2: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },

  search: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  ai: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginRight: 15,
  },
});
