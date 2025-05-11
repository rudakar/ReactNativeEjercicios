import React, { Component } from "react";
import Constants from "expo-constants";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import { Platform, View, StyleSheet, Image, Text } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Contacto from "./ContactoComponent";
import QuienesSomos from "./QuienesSomosComponent";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
});

// Creación de stacks y drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

// Stack para la navegación de Calendario
function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={({ navigation }) => ({
          title: "Calendario Gaztaroa",
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color="white"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
        })}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{ title: "Detalle Excursión" }} // no usar headerLeft aquí
      />
    </Stack.Navigator>
  );
}

// Stack para la navegación de Quiénes somos
function QuienesSomosNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="PantallaQuienesSomos"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="PantallaQuienesSomos"
        component={QuienesSomos}
        options={({ navigation }) => ({
          title: "¿Quiénes somos?",
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color="white"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

// Stack para la navegación de Contacto
function ContactoNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="PantallaContacto"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="PantallaContacto"
        component={Contacto}
        options={({ navigation }) => ({
          title: "Contacto",
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color="white"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

// Stack para la navegación de Home
function HomeNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Campo Base",
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color="white"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

// Drawer principal
function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorGaztaroaClaro,
        },
      }}
    >
      <Drawer.Screen
        name="Campo base"
        component={HomeNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name='home' type='font-awesome' size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Calendario"
        component={CalendarioNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name='calendar' type='font-awesome' size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactoNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name='address-card' type='font-awesome' size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Quiénes somos"
        component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name='info-circle' type='font-awesome' size={24} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

// Componente principal que envuelve la navegación
class Campobase extends Component {
  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          }}
        >
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default connect(null, mapDispatchToProps)(Campobase);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#015afc',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
