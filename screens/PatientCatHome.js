import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import rootStore from '../stores/RootStore';
import Header from '../components/Header';

export default function PatientCatHome({ navigation }) {
  const category = rootStore.selectedCategory;
  const doctors = rootStore.getDoctorsbyCategory(category);

  const makeRequest = (doctor) => {
    rootStore.setSelectedDoctor(doctor);
    navigation.navigate('MakeRequestHome');
  };

  const viewProfile = (doctor) => {
    rootStore.setSelectedDoctor(doctor);
    navigation.navigate('ViewDocProfileHome');
  }

  const images = {
    cardiologist: require('../assets/category-icons/cardiologist.png'),
    dentist: require('../assets/category-icons/dentist.png'),
    dermatologist: require('../assets/category-icons/dermatologist.png'),
    diabetologist: require('../assets/category-icons/diabetologist.png'),
    endocrinologist: require('../assets/category-icons/endocrinologist.png'),
    ent: require('../assets/category-icons/ent.png'),
    generalphysician: require('../assets/category-icons/generalphysician.png'),
    gynecologist: require('../assets/category-icons/gynecologist.png'),
    neurologist: require('../assets/category-icons/neurologist.png'),
    oncologist: require('../assets/category-icons/oncologist.png'),
    ophthalmologist: require('../assets/category-icons/ophthalmologist.png'),
    orthopedician: require('../assets/category-icons/orthopedician.png'),
    pediatrician: require('../assets/category-icons/pediatrician.png'),
    physiotherapist: require('../assets/category-icons/physiotherapist.png'),
    psychologist: require('../assets/category-icons/psychologist.png'),
    surgeon: require('../assets/category-icons/surgeon.png'),
    female: require('../assets/doc-face/female.png'),
    male: require('../assets/doc-face/male.png'),
  };

  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.container}>
        <Header />

        <Text style={styles.subheading}>{category}s</Text>
        <View
          style={{
            marginBottom: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            numColumns={1}
            data={doctors}
            renderItem={({ item }) => {
              return (
                <View style={styles.docContainer}>
                  <Image source={images[item.image]} style={styles.docImg} />
                  <Text style={styles.docText1}>{item.name}</Text>
                  <Text style={styles.docText3}>{item.speciality}</Text>
                  <Text style={styles.docText4}>{item.clinic}</Text>
                  <Text style={styles.docText4}>{item.location}</Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#00ADEF' }]}
                      onPress={() => makeRequest(
                        {
                          name: item.name,
                          category: category,
                          speciality: item.speciality,
                          qual: item.qual,
                          experience: item.experience,
                          clinic: item.clinic,
                          location: item.location,
                          days: item.days,
                          timing: item.timing
                        })}>
                      <Text style={styles.buttonText}>Make A Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#007104' }]}
                      onPress={() => viewProfile(
                        {
                          name: item.name,
                          category: category,
                          speciality: item.speciality,
                          qual: item.qual,
                          experience: item.experience,
                          clinic: item.clinic,
                          location: item.location,
                          days: item.days,
                          timing: item.timing
                        })}>
                      <Text style={styles.buttonText}>View Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  subheading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 15,
    marginLeft: 5,
  },

  docContainer: {
    width: 330,
    height: 280,
    backgroundColor: '#eef7ff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  docImg: {
    height: 55,
    width: 55,
    marginTop: 10,
  },
  docText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  docText3: {
    fontSize: 18,
    fontWeight: 'light',
    color: 'black',
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 17,
  },
  docText4: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9,
    marginLeft: 5,
  },
  button: {
    borderRadius: 100,
    padding: 10,
    width: 150,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});
