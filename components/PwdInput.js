import { View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

export default function PwdInput(props) {
  const [secureEntry, setSecureEntry] = useState(true);
  return(
    <View style={styles.input}>
      <AntDesign name={"lock"} size={18} color={'gray'}/>
      <TextInput
        placeholder="Enter your passsword"
        placeholderTextColor='gray'
        value={props.propertyName}
        onChangeText={props.functionName}
        secureTextEntry={secureEntry}/>
      <TouchableOpacity onPress={() => {setSecureEntry((prev) => !prev);}}>
        <Octicons name={"eye"} size={18} color={'gray'} marginLeft={70}/>
      </TouchableOpacity>
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