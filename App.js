import { Provider } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { rootStore } from './stores/RootStore';

import Splash from './screens/Splash';
import DocSignin from './screens/DocSignin';
import DocSignup1 from './screens/DocSignup1';
import DocSignup2 from './screens/DocSignup2';
import DocSignup3 from './screens/DocSignup3';
import DocProfile from './screens/DocProfile';
import EditDocProfile from './screens/EditDocProfile';
import DocPendAppointments from './screens/DocPendAppointments';
import DocViewAppointments from './screens/DocViewAppointments';

import PatientSignin from './screens/PatientSignin';
import PatientSignup from './screens/PatientSignup';
import PatientMainHome from './screens/PatientMainHome';
import PatientCatHome from './screens/PatientCatHome';
import MakeRequestHome from './screens/MakeRequestHome';
import ViewDocProfileHome from './screens/ViewDocProfileHome';
import FindDocsManual from './screens/FindDocsManual';
import FindDocsAI from './screens/FindDocsAI';
import FindDocsMakeRequest from './screens/FindDocsMakeRequest';
import FindDocsViewProfile from './screens/FinDocsViewProfile';
import PatientAppointments from './screens/PatientAppointments';
import PatientProfile from './screens/PatientProfile';
import EditPatientProfile from './screens/EditPatientProfile';


import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function ProfileDoc() {
  return (
    <Stack.Navigator initialRouteName="MainDocProfile">
      <Stack.Screen
        component={DocProfile}
        name="MainDocProfile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EditDocProfile}
        name="EditDocProfile"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Doctor() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#eef7ff',
        drawerContentStyle: { marginTop: 40 },
        drawerLabelStyle: { fontSize: 18, marginLeft: -15 },
      }}>
      <Drawer.Screen
        component={ProfileDoc}
        name="Profile"
        options={{ drawerIcon: () => <Ionicons name={'person'} size={20} /> }}
      />
      <Drawer.Screen
        component={DocViewAppointments}
        name="View Appointments"
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name={'clipboard-list'} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        component={DocPendAppointments}
        name="Pending Requests"
        options={{
          drawerIcon: () => <MaterialCommunityIcons name={'clock'} size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function PatientHome() {
  return (
    <Stack.Navigator initialRouteName="MainHome">
      <Stack.Screen
        component={PatientMainHome}
        name="MainHome"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={PatientCatHome}
        name="CatHome"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={MakeRequestHome}
        name="MakeRequestHome"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ViewDocProfileHome}
        name='ViewDocProfileHome'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function FindDocs() {
  return (
    <Stack.Navigator initialRouteName="FindDocsManual">
      <Stack.Screen
        component={FindDocsManual}
        name="FindDocsManual"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={FindDocsAI}
        name="FindDocsAI"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={FindDocsMakeRequest}
        name="FindDocsMakeRequest"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={FindDocsViewProfile}
        name='FindDocsViewProfile'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


function ProfilePatient() {
  return (
    <Stack.Navigator initialRouteName="MainPatientProfile">
      <Stack.Screen
        component={PatientProfile}
        name="MainPatientProfile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EditPatientProfile}
        name="EditPatientProfile"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Patient() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#eef7ff',
        drawerContentStyle: { marginTop: 40 },
        drawerLabelStyle: { fontSize: 18, marginLeft: -15 },
      }}>
      <Drawer.Screen
        component={PatientHome}
        name="Home"
        options={{
          drawerIcon: () => <Ionicons name={'home'} size={20} />,
        }}
      />
      <Drawer.Screen
        component={FindDocs}
        name="Find Doctors"
        options={{
          drawerIcon: () => <Ionicons name={'search-circle'} size={25} />,
        }}
      />
      <Drawer.Screen
        component={PatientAppointments}
        name="My Appointments"
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name={'clipboard-list'} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        component={ProfilePatient}
        name="Profile"
        options={{
          drawerIcon: () => <Ionicons name={'person'} size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider rootStore={rootStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Splash} name="Splash" />
          <Stack.Screen component={DocSignin} name="DocSignin" />
          <Stack.Screen component={DocSignup1} name="DocSignup1" />
          <Stack.Screen component={DocSignup2} name="DocSignup2" />
          <Stack.Screen component={DocSignup3} name="DocSignup3" />
          <Stack.Screen component={Doctor} name="Doctor" />
          <Stack.Screen component={PatientSignin} name="PatientSignin" />
          <Stack.Screen component={PatientSignup} name="PatientSignup" />
          <Stack.Screen component={Patient} name="Patient" />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
