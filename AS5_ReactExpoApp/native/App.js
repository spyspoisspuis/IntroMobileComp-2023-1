import { NativeBaseProvider } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Main, SignIn, Credit, SignOut, Wrapper } from "./screens";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
// import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons"; // Use MaterialCommunityIcons instead of MaterialIcons

SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    KanitBold: require("./assets/fonts/KanitBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


  
  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <NativeBaseProvider>
        <Drawer.Navigator initialRouteName="Wrapper">
          <Drawer.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="Wrapper"
            component={Wrapper}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen name="Main" component={Main} />
          <Drawer.Screen name="Credit" component={Credit} />
          <Drawer.Screen name="SignOut" component={SignOut} />
        </Drawer.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
