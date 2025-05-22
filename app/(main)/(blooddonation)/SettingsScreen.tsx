import React from "react";
import { View, Text, StyleSheet, Switch, Alert, Button } from "react-native";

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleSwitch = () => setNotificationsEnabled((prev) => !prev);

  const handleLogout = () => {
    Alert.alert("Logout", "You have been logged out.");
    // You can add navigation or auth reset logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleSwitch}
          thumbColor={notificationsEnabled ? "#d11a2a" : "#888"}
        />
      </View>

      <View style={styles.settingItem}>
        <Button title="Logout" color="#d11a2a" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#d11a2a",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
