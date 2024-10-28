import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import rootStore from '../stores/RootStore';
import { useNavigation } from "@react-navigation/native"

export default function ManualSearch() {
  const navigation = useNavigation();

  const categories = rootStore.categories;

  const handlePress = (category) => {
    rootStore.setSelectedCategory(category);
    navigation.navigate('FindDocsCat');
  };

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
    <View style={{ marginBottom: 25 }}>
      <FlatList
        numColumns={2}
        data={categories}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.category}
                key={item.id}
                onPress={() => handlePress(item.category)}>
                <Image source={images[item.img]} style={styles.categoryImg} />
                <Text style={styles.categoryText}>{item.category}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    width: 160,
    height: 130,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 10,
  },
  categoryImg: {
    height: 55,
    width: 55,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  categoryText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
  },
});
