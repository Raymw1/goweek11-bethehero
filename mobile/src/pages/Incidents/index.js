import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";

import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) return;
    if (total > 0 && incidents.length === total) return;
    setLoading(true);
    const { data, headers } = await api.get("/incidents", { params: { page } });
    setIncidents([...incidents, ...data]);
    setTotal(headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} incidents</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>
        Choose on of the incidents below and save the day!
      </Text>
      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={(item) => String(item.id)}
        // showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>INCIDENT:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>More details</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
