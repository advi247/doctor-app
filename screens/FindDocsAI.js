import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import ToggleHeader from '../components/ToggleHeader';
import FindDocsBtn from '../components/FindDocsBtn';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import { observer } from 'mobx-react';
import rootStore from '../stores/RootStore';
import chatbot from '../assets/chatbot.png';

const FindDocsAI = observer(() => {
  const navigation = useNavigation();
  
  const images = {
    female: require('../assets/doc-face/female.png'),
    male: require('../assets/doc-face/male.png'),
  };

  const [text, setText] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSpeciality, setSelectedSpeciality] = useState();

  const handleSubmit = () => {
    const inputSymptoms = text.toLowerCase();

    rootStore.symptomMapping.forEach((categoryItem) => {
      categoryItem.specialities.forEach((specialityItem) => {
        specialityItem.keywords.forEach((keyword) => {
          if (inputSymptoms.includes(keyword.toLowerCase())) {
            setSelectedCategory(categoryItem.category),
            setSelectedSpeciality(specialityItem.speciality);
          }
        });
      });
    });
    setText('');
  };

  useEffect(() => {
    if (selectedCategory) {
      const doctors = rootStore.doctors.find(
        (doc) => doc.category === selectedCategory
      );
      if (doctors) {
        const finalDocs = doctors.alldocs.filter(
          (doc) => doc.speciality === selectedSpeciality
        );
        setFilteredDoctors(finalDocs);
      }
    }
  }, [selectedCategory, selectedSpeciality]);

  const makeRequest = (doctor) => {
    rootStore.setSelectedDoctor(doctor);
    navigation.navigate('FindDocsMakeRequest');
  };

  const viewProfile = (doctor) => {
    rootStore.setSelectedDoctor(doctor);
    navigation.navigate('FindDocsViewProfile');
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <ToggleHeader screen="PatientSignin" />

        <FindDocsBtn screen1="FindDocsManual" screen2="FindDocsAI" />

        <View style={styles.chatbot}>
          <Image source={chatbot} style={styles.chatbotImg} />
          <Text style={styles.chatbotText}>
            Hi! Tell me your symptoms, and I will suggest the best doctors for
            you
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your symptoms here..."
          placeholderTextColor="gray"
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submittext}>Submit</Text>
        </TouchableOpacity>

        {filteredDoctors.length > 0 && (
          <View>
            <Text style={styles.label}>
              Based on your symptoms, here is the doctor I suggest you visit:{' '}
            </Text>
            <FlatList
              numColumns={1}
              data={filteredDoctors}
              renderItem={({ item }) => {
                return (
                  <View style={styles.displayDoc}>
                    <Image
                      source={images[item.image]}
                      style={styles.displayImg}
                    />
                    <Text style={styles.displayText1}>{item.name}</Text>
                    <Text style={styles.displayText3}>({item.speciality})</Text>
                    <Text style={styles.displayText4}>
                      {item.clinic} - {item.location}
                    </Text>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#00ADEF' }]}
                        onPress={() =>
                          makeRequest({
                            name: item.name,
                            category: selectedCategory,
                            speciality: item.speciality,
                            qual: item.qual,
                            experience: item.experience,
                            clinic: item.clinic,
                            location: item.location,
                            days: item.days,
                            timing: item.timing,
                          })
                        }>
                        <Text style={styles.buttonText}>Make A Request</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#007104' }]}
                        onPress={() =>
                          viewProfile({
                            name: item.name,
                            category: selectedCategory,
                            speciality: item.speciality,
                            qual: item.qual,
                            experience: item.experience,
                            clinic: item.clinic,
                            location: item.location,
                            days: item.days,
                            timing: item.timing,
                          })
                        }>
                        <Text style={styles.buttonText}>View Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  chatbot: {
    width: '80%',
    height: 100,
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  chatbotImg: {
    width: 75,
    height: 75,
    alignSelf: 'start',
  },
  chatbotText: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'italic',
  },

  input: {
    backgroundColor: '#f0f0f0',
    color: 'black',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    height: 150,
  },

  submit: {
    backgroundColor: '#00ADEF',
    borderRadius: 100,
    marginVertical: 8,
    marginTop: 35,
    width: '50%',
    alignSelf: 'center',
  },
  submittext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },

  label: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  displayDoc: {
    alignSelf: 'center',
    width: 330,
    height: 275,
    marginBottom: 25,
    backgroundColor: '#eef7ff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayImg: {
    height: 55,
    width: 55,
  },
  displayText1: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
  displayText3: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  displayText4: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9,
    marginLeft: 5,
    marginBottom: 5,
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

export default FindDocsAI;
