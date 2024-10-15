import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface Consultation {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
  username: string;
}

const ConsultationsListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const userId = '2'; // Substitua pela lógica para obter o userId (ex: AsyncStorage)
        const role = 'user'; // Ou 'admin', dependendo do teste
        
        const response = await axios.get('http://10.0.2.2:3000/api/consultations', {
          headers: { userId, role }, // Enviando as informações do usuário
        });
        setConsultations(response.data.consultations);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as consultas.');
      }
    };

    fetchConsultations();
  }, []);

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <Text>Paciente: {item.username}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Médico: {item.doctor}</Text>
      <Text>Especialidade: {item.specialty}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consultations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  consultationItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default ConsultationsListScreen;
