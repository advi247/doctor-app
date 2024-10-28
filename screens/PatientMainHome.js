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
import ToggleHeader from '../components/ToggleHeader';
import img2 from '../assets/main-2.jpg';

export default function PatientMainHome({ navigation }) {
  const { pname } = rootStore.userDetails;
  const categories = rootStore.categories;
  const toprated = rootStore.toprated;

  const handlePress = (category) => {
    rootStore.setSelectedCategory(category);
    navigation.navigate('CatHome');
  };

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
    pulmonologist: require('../assets/category-icons/pulmonologist.png'),
    surgeon: require('../assets/category-icons/surgeon.png'),
    female: require('../assets/doc-face/female.png'),
    male: require('../assets/doc-face/male.png'),
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <ToggleHeader screen="PatientSignin" />

        <Text style={styles.heading}>Hey {pname}!</Text>
        <Image source={img2} style={styles.image} />

        <Text style={styles.subheading}>Categories</Text>
        <View style={{ marginBottom: 25 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.category}
                    key={item.id}
                    onPress={() => handlePress(item.category)}>
                    <Image
                      source={images[item.img]}
                      style={styles.categoryImg}
                    />
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.subheading}>Top Rated Doctors</Text>
        <View
          style={{
            marginBottom: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={toprated}
            renderItem={({ item }) => {
              return (
                <View style={styles.ratedDoc}>
                  <View>
                    <Text style={styles.ratedText1}>{item.name}</Text>
                    <Text style={styles.ratedText2}>{item.category}</Text>
                    <Text style={styles.ratedText3}>({item.speciality})</Text>
                    <Text style={styles.ratedText4}>
                      {item.clinic} - {item.location}
                    </Text>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#00ADEF' }]}
                        onPress={() => makeRequest(
                          {
                            name: item.name,
                            category: item.category,
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
                            category: item.category,
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
                  <Image source={images[item.image]} style={styles.ratedImg} />
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 18,
  },
  image: {
    width: 300,
    height: 250,
    alignSelf: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  subheading: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 15,
  },
  category: {
    width: 120,
    height: 95,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  categoryImg: {
    height: 45,
    width: 45,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  categoryText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
  },

  ratedDoc: {
    width: 400,
    height: 200,
    backgroundColor: '#eef7ff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 15,
  },
  ratedImg: {
    height: 55,
    width: 55,
  },
  ratedText1: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  ratedText2: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  ratedText3: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  ratedText4: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9,
    marginLeft: 5,
  },
  button: {
    borderRadius: 50,
    padding: 7,
    width: 135,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});
