import React, { useState } from 'react';
import { View, Text, Input, Button, Select, VStack } from 'native-base';

const NewConsultationScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const [patientName, setPatientName] = useState('');
  const [consultationDate, setConsultationDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    // Criação do objeto de dados da consulta
    const consultationData = {
      patientName,
      consultationDate,
      doctor,
      specialty,
      status,
    };

    console.log(consultationData);
    
    // Chamada ao backend para salvar os dados pode ser feita aqui

    // Adicionar a consulta à lista na tela anterior (opcional)
    const { addConsultation } = route.params; // Pega a função para adicionar a consulta

    if (addConsultation) {
      addConsultation({ ...consultationData, id: Math.random() }); // Gerando um ID aleatório para exemplo
    }

    // Navegar de volta para a tela de consultas
    navigation.navigate('ConsultationsList');
  };

  return (
    <View padding={5}>
      <Text fontSize="xl" marginBottom={4}>Agendar Nova Consulta</Text>
      <VStack space={4}>
        <Input
          placeholder="Nome do Paciente"
          value={patientName}
          onChangeText={setPatientName}
          isRequired
        />
        <Input
          placeholder="Data da Consulta"
          type="date"
          value={consultationDate}
          onChangeText={setConsultationDate}
          isRequired
        />
        <Input
          placeholder="Médico"
          value={doctor}
          onChangeText={setDoctor}
          isRequired
        />
        <Input
          placeholder="Especialidade"
          value={specialty}
          onChangeText={setSpecialty}
          isRequired
        />
        <Select
          placeholder="Status da Consulta"
          selectedValue={status}
          minWidth="200"
          onValueChange={(itemValue) => setStatus(itemValue)}
          accessibilityLabel="Selecione o status"
        >
          <Select.Item label="Agendada" value="Agendada" />
          <Select.Item label="Concluída" value="Concluída" />
          <Select.Item label="Cancelada" value="Cancelada" />
        </Select>
        <Button onPress={handleSubmit}>Cadastrar Consulta</Button>
      </VStack>
    </View>
  );
};

export default NewConsultationScreen;