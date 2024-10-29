import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';

interface Consultation {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
  username: string;
}

const ConsultationsListScreen = ({ navigation }: { navigation: any }) => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

  useEffect(() => {
    fetchConsultations();
  }, []);

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
    } finally {
      setLoading(false); // Sempre desabilitar o carregamento ao final
    }
  };

  const addConsultation = (newConsultation: Consultation) => {
    setConsultations(prevConsultations => [...prevConsultations, newConsultation]);
  };

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <Text style={styles.title}>Paciente: {item.username}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Médico: {item.doctor}</Text>
      <Text>Especialidade: {item.specialty}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando consultas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consultas Agendadas</Text>
      <Button 
        title="Cadastrar Nova Consulta" 
        onPress={() => navigation.navigate('NewConsultation', { addConsultation })} 
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  consultationItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2, // Para adicionar sombra no Android
  },
  title: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default ConsultationsListScreen;
