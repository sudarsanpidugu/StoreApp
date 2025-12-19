import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const AddVehical = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const [showPicker, setShowPicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const resetFields = () => {
    setName("");
    setModel("");
    setYear("");
    setFuelType("");
    setVehicleNumber("");
    setExpiryDate(null);
  };

  const handleExpirySelect = (event, date) => {
    if (event.type === "dismissed") return setShowPicker(false);
    setShowPicker(false);
    setExpiryDate(date);
  };

  const handleSaveVehicle = () => {
    if (!name || !model || !year || !fuelType || !vehicleNumber || !expiryDate) {
      Alert.alert("Missing Details", "Please fill all fields");
      return;
    }

    if (editMode) {
      const updated = vehicles.map((v) =>
        v.id === selectedId
          ? { ...v, name, model, year, fuelType, vehicleNumber, expiryDate: expiryDate.toDateString() }
          : v
      );
      setVehicles(updated);
    } else {
      const newVehicle = {
        id: Date.now(),
        name,
        model,
        year,
        fuelType,
        vehicleNumber,
        expiryDate: expiryDate.toDateString(),
      };
      setVehicles([...vehicles, newVehicle]);
    }

    setModalVisible(false);
    setEditMode(false);
    resetFields();
  };

  const handleDeleteVehicle = (id) => {
    Alert.alert("Delete Vehicle", "Are you sure want to delete this vehicle?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setVehicles(vehicles.filter((v) => v.id !== id)),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient colors={["#0F3C91", "#518EFF"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }} style={styles.headerGradient} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Service</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setModalVisible(true);
              setEditMode(false);
            }}
          >
            <Ionicons name="car-outline" size={22} color="#fff" />
            <Text style={styles.addText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>

        {/* VEHICLE LIST */}
        <ScrollView style={{ paddingHorizontal: 18 }}>
          {vehicles.map((item) => (
            <View key={item.id} style={styles.vehicleCard}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  setEditMode(true);
                  setSelectedId(item.id);
                  setName(item.name);
                  setModel(item.model);
                  setYear(item.year);
                  setFuelType(item.fuelType);
                  setVehicleNumber(item.vehicleNumber);
                  setExpiryDate(new Date(item.expiryDate));
                  setModalVisible(true);
                }}
              >
                <Text style={styles.vehicleTitle}>{item.name} - {item.model}</Text>
                <Text style={styles.vehicleText}>Fuel Type: {item.fuelType}</Text>
                <Text style={styles.vehicleText}>Vehicle Number: {item.vehicleNumber}</Text>
                <Text style={styles.vehicleText}>Year: {item.year}</Text>
                <Text style={styles.vehicleText}>Expiry: {item.expiryDate}</Text>
              </TouchableOpacity>

              <View style={styles.iconRow}>
                {/* EDIT ICON */}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    setEditMode(true);
                    setSelectedId(item.id);
                    setName(item.name);
                    setModel(item.model);
                    setYear(item.year);
                    setFuelType(item.fuelType);
                    setVehicleNumber(item.vehicleNumber);
                    setExpiryDate(new Date(item.expiryDate));
                    setModalVisible(true);
                  }}
                >
                  <Ionicons name="create-outline" size={22} color={colors.primary} />
                </TouchableOpacity>

                {/* DELETE ICON */}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDeleteVehicle(item.id)}
                >
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* MODAL */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => {
                  setModalVisible(false);
                  setEditMode(false);
                  resetFields();
                }}
              >
                <Ionicons name="close" size={26} color="#333" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{editMode ? "Edit Vehicle" : "Add Vehicle Details"}</Text>

              {/* FORM */}
              <TextInput placeholder="Vehicle Name" style={styles.modalInput} value={name} onChangeText={setName} />
              <TextInput placeholder="Vehicle Model" style={styles.modalInput} value={model} onChangeText={setModel} />
              <TextInput placeholder="Manufactured Year (Ex:2020)" style={styles.modalInput} value={year} onChangeText={setYear} keyboardType="numeric" maxLength={4} />
              <TextInput placeholder="Fuel Type" style={styles.modalInput} value={fuelType} onChangeText={setFuelType} />
              <TextInput placeholder="Vehicle Number" style={styles.modalInput} value={vehicleNumber} onChangeText={setVehicleNumber} autoCapitalize="characters" maxLength={10} />

              <TouchableOpacity style={styles.modalInput} onPress={() => setShowPicker(true)}>
                <Text style={{ color: expiryDate ? "#000" : "#777" }}>
                  {expiryDate ? expiryDate.toDateString() : "Expiry Date"}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker mode="date" value={expiryDate || new Date()} onChange={handleExpirySelect} />
              )}

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveVehicle}>
                <Text style={styles.saveText}>{editMode ? "Update Vehicle" : "Save Vehicle"}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default AddVehical;

const styles = StyleSheet.create({
  headerGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Platform.OS === "android" ? StatusBar.currentHeight + 110 : 130,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerArea: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    flex: 1,
  },

  addBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  addText: { fontSize: 16, fontWeight: "700", color: "#fff" },

  vehicleCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vehicleTitle: { fontSize: 16, fontWeight: "800", color: colors.primary },
  vehicleText: { marginTop: 4, fontSize: 14, color: "#444", fontWeight: "600" },

  iconRow: { flexDirection: "row", alignItems: "center" },
  iconButton: { padding: 6 },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalCard: {
    width: "88%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: "#eee",
    borderRadius: 20,
  },

  modalTitle: { fontSize: 20, fontWeight: "800", color: colors.primary, marginBottom: 14, textAlign: "center" },
  modalInput: {
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
