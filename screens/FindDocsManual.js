import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import rootStore from '../stores/RootStore';
import ToggleHeader from '../components/ToggleHeader';
import FindDocsBtn from '../components/FindDocsBtn';
import Octicons from 'react-native-vector-icons/Octicons';

export default function FindDocsManual({ navigation }) {
  const images = {
    female: require('../assets/doc-face/female.png'),
    male: require('../assets/doc-face/male.png'),
  };

  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [selectedSpeciality, setSelectedSpeciality] = useState('Select Speciality');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSpecialityDropdown, setShowSpecialityDropdown] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleCat = (category) => {
    setSelectedCategory(category);
    setSelectedSpeciality('Select Speciality');
    setShowCategoryDropdown(false);
  };

  const handleSpeciality = (speciality) => {
    setSelectedSpeciality(speciality);
    setShowSpecialityDropdown(false);
  };

  const getSpecialities = () => {
    const categoryData = rootStore.search.find(
      (item) => item.category === selectedCategory
    );
    return categoryData ? categoryData.specialities : [];
  };

  const handleSubmit = () => {
    if (
      selectedCategory === 'Select Category' ||
      selectedSpeciality === 'Select Speciality'
    ) {
      alert('Please select both category and speciality');
      return;
    }

    const doctors = rootStore.doctors.find(
      (doc) => doc.category === selectedCategory
    );
    console.log(doctors);

    if (doctors) {
      if (selectedSpeciality === 'All') {
        setFilteredDoctors(doctors.alldocs);
      } else {
        const filteredDocs = doctors.alldocs.filter(
          (doc) => doc.speciality === selectedSpeciality
        );
        setFilteredDoctors(filteredDocs);
      }
    }
  };

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

        <View>
          <Text style={styles.label}>Select Category</Text>
          <View style={styles.input}>
            <Text
              style={{
                color:
                  selectedCategory === 'Select Category' ? 'gray' : 'black',
              }}>
              {selectedCategory}
            </Text>
            <TouchableOpacity
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}>
              <Octicons name={'triangle-down'} size={23} color={'gray'} />
            </TouchableOpacity>
          </View>
          {showCategoryDropdown && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={rootStore.search}
                keyExtractor={(item) => item.category}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleCat(item.category)}>
                    <Text style={styles.dropdownOption}>{item.category}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Select Speciality</Text>
          <View style={styles.input}>
            <Text
              style={{
                color:
                  selectedSpeciality === 'Select Speciality' ? 'gray' : 'black',
              }}>
              {selectedSpeciality}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (selectedCategory === 'Select Category') {
                  alert('Please select a category first');
                } else {
                  setShowSpecialityDropdown(!showSpecialityDropdown);
                }
              }}>
              <Octicons name={'triangle-down'} size={23} color={'gray'} />
            </TouchableOpacity>
          </View>
          {showSpecialityDropdown && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={getSpecialities()}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSpeciality(item)}>
                    <Text style={styles.dropdownOption}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submittext}>Submit</Text>
        </TouchableOpacity>

        {filteredDoctors.length > 0 && (
          <View>
            <Text style={styles.label}>Doctors:</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  dropdownContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    padding: 5,
  },
  dropdownOption: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'left',
  },

  submit: {
    backgroundColor: '#00ADEF',
    borderRadius: 100,
    marginVertical: 8,
    marginTop: 20,
    marginBottom: 35,
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
