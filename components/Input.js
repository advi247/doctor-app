import { View, StyleSheet, TextInput} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Input(props) {
  return(
    <View style={styles.input} >
      <AntDesign name={props.iconName} size={18} color={'gray'} />
      <TextInput
        keyboardType={props.keyboard}
        placeholder={props.placeholderText}
        placeholderTextColor='gray'
        value={props.propertyName}
        onChangeText={props.functionName}/>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    gap: 10,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 100
  },
});