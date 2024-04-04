import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const ShowUsuarios = ({ navigation }) => {
  const url = 'https://localhost:7028/api/authentication/users'; // Endpoint de la API

  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    // Función asíncrona para obtener la lista de usuarios al cargar el componente
    const getUsuarios = async () => {
      try {
        const response = await axios.get(url); // Realizar la solicitud GET a la API
        setUsuarios(response.data); // Actualizar el estado con los datos de la respuesta
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    getUsuarios(); // Llamar a la función para obtener la lista de usuarios
  }, [url]); // Dependencia de useEffect para volver a obtener la lista de usuarios si la URL cambia

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    setMenuHeight(isMenuVisible ? 0 : 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a58ca', height: 119 }}>
        <Image source={require('/assets/imagenproyecto.png')} style={{ width: 70, height: 80 }} />
        <Text style={{ color: '#FFF', fontSize: 23, fontWeight: 'bold', marginLeft: 'auto' }}>Servicio tecnológico</Text>
        <TouchableOpacity onPress={toggleMenu} style={{ marginLeft: 'auto', marginRight: 10 }}>
          <Ionicons name="menu" size={29} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => {
          setIsMenuVisible(!isMenuVisible);
          setMenuHeight(0);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{ backgroundColor: '#0a58ca', padding: 25, borderRadius: 1, height: menuHeight }}>
            <Pressable onPress={toggleMenu}>
              <Ionicons name="arrow-back" size={20} color="white" style={{ color: '#FFF', marginBottom: 20 }} />    
            
              </Pressable>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
          <Text style={{ color: '#FFF', marginBottom: 10 }}>Inicio</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Derechos')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Derechos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>navigation.navigate('Nosotros')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Productos')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Productos</Text>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#FFF', marginBottom:1}} />
            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Iniciar Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.tableContainer}>
          <Text style={styles.title}>Lista de Usuarios</Text>
          {usuarios.map((usuario, index) => (
            <View key={index} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardText}>Nombre de Usuario: {usuario.userName}</Text>
                <Text style={styles.cardText}>Nombre: {usuario.firstName}</Text>
                <Text style={styles.cardText}>Apellido: {usuario.lastName}</Text>
                <Text style={styles.cardText}>Correo Electrónico: {usuario.email}</Text>
                <Text style={styles.cardText}>Número de Teléfono: {usuario.phoneNumber}</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color="#0a58ca" />
            <Text style={{ marginLeft: 5, color: '#0d6efd' }}>Atrás</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'rgba(204, 219, 236, 1)', 
    borderRadius: 8,
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default ShowUsuarios;