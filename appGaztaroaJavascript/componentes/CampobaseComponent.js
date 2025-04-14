import React, { Component } from "react";
import Constants from "expo-constants";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import { Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";

// Creación de stacks y drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack para la navegación de Calendario
function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{ title: "Calendario Gaztaroa" }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{ title: "Detalle Excursión" }}
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
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Campo Base" }}
      />
    </Stack.Navigator>
  );
}

// Drawer principal
function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#c2d3da" },
      }}
    >
      <Drawer.Screen name="Campo base" component={HomeNavegador} />
      <Drawer.Screen name="Calendario" component={CalendarioNavegador} />
    </Drawer.Navigator>
  );
}

// Componente principal que envuelve la navegación
class Campobase extends Component {
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

export default Campobase;
