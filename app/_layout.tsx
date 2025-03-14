import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "home" }} />
      <Drawer.Screen name="playlist/index" options={{ title: "Playlist" }} />
    </Drawer>
  );
}
