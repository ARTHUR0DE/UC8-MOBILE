import { StatusBar } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CustomDrawerContent = () => {
  const router = useRouter();
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        onPress={() => router.push("/Home")}
        icon={({ color }) => (
          <FontAwesome name="home" size={24} color="black" />
        )}
      />

      <DrawerItem
        label="Perfil"
        onPress={() => router.push("/Perfil")}
        icon={({ color }) => (
          <FontAwesome name="user" size={24} color="black" />
        )}
      />
    </DrawerContentScrollView>
  );
};

export default function RootLayout() {
  return (
    <>
      <StatusBar />
      <Drawer
        drawerContent={() => <CustomDrawerContent />}
        ScreenOptions={{
          headerStyle: { backgroundColor: "#e94560" },
          headerTintColor: "#fff",
        }}
      ></Drawer>
    </>
  );
}
