import React, { useEffect, useState } from 'react';
import { crearCliente, obtenerClientes, actualizarCliente, eliminarCliente } from './CrudCliente';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const ShowCliente = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };
  const Editmenu =() => {
    setClienteSeleccionado(!clienteSeleccionado);
  };

  const [clientes, setClientes] = useState([]);
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contacto, setContacto] = useState('');
  const [clienteEditada, setClienteEditada] = useState('');
  const [clienteEliminada, setClienteEliminada] = useState('');

  useEffect(() => {
    obtenerClientesAPI();
  }, [clienteEditada, clienteEliminada]);

  const obtenerClientesAPI = async () => {
    try {
      const clientesObtenidas = await obtenerClientes();
      setClientes(clientesObtenidas);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleCrearCliente = async () => {
    try {
      await crearCliente({ documento: documento, nombre: nombre, apellido: apellido, correo: correo, contacto: contacto });
      setDocumento('');
      setNombre('');
      setApellido('');
      setCorreo('');
      setContacto('');
      obtenerClientesAPI();
    } catch (error) {
      console.error('Error al crear clientte:', error);
    }
  };

  const handleActualizarCliente = async () => {
    try {
      await actualizarCliente(clienteSeleccionado.idCliente, clienteSeleccionado);
      setClienteEditada(clienteSeleccionado.idCliente);
      setClienteSeleccionado(null); // Limpiar el proveedor seleccionado después de actualizar
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  const handleEliminarCliente = async (id) => {
    try {
      await eliminarCliente(id);
      setClienteEliminada(id);
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  return (
     <View style={{ flex: 1 }}>
      {/* Encabezado */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Constants.StatusBarHeight, backgroundColor: '#0a58ca', height: 119 }}>
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
        }}
      >
        <View style={{ flex: 1, justifyContent: 'up', alignItems: 'flex-start', backgroundColor: 'rgba(0,0,0,0.5)'}}>

          <View style={{ backgroundColor: '#0a58ca', padding: 25, borderRadius: 1,height: menuHeight}}>
            <Pressable onPress={toggleMenu}>
              <Ionicons name="arrow-back" size={20} color="black" style={{ color: '#FFF', marginBottom: 20 }} />    
            </Pressable>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
          <Text style={{ color: '#FFF', marginBottom: 10 }}>Inicio</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={toggleAddModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
        <Pressable onPress={toggleAddModal}>
              <Ionicons name="arrow-back" size={20} color="black"  />
            <Text style={{ marginLeft: 5 ,fontSize:'22'}}>Crear Cliente</Text>
        </Pressable>
            <TextInput
              style={styles.input}
              value={documento}
              onChangeText={setDocumento}
              placeholder="Escriba su numero de documento"
            />
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Escriba su nombre"
            />
            <TextInput
              style={styles.input}
              value={apellido}
              onChangeText={setApellido}
              placeholder="Escriba su apellido"
            />
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              placeholder="Escriba su correo electronico"
            />
            <TextInput
              style={styles.input}
              value={contacto}
              onChangeText={setContacto}
              placeholder="Escriba su numero de contacto"
            />
            <Button title="Crear Cliente" onPress={handleCrearCliente} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={clienteSeleccionado}
        onRequestClose={Editmenu}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={Editmenu}>
              <Ionicons name="arrow-back" size={20} color="black"  />
            <Text style={{ marginLeft: 5 ,fontSize:'22'}}>Actualizar Cliente</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={clienteSeleccionado?.documento}
              onChangeText={(text) => setClienteSeleccionado({ ...clienteSeleccionado, documento: text })}
              placeholder="Escriba su numero de documento"
            />
            <TextInput
              style={styles.input}
              value={clienteSeleccionado?.nombre}
              onChangeText={(text) => setClienteSeleccionado({ ...clienteSeleccionado, nombre: text })}
              placeholder="Escriba su nombre"
            />
            <TextInput
              style={styles.input}
              value={clienteSeleccionado?.apellido}
              onChangeText={(text) => setClienteSeleccionado({ ...clienteSeleccionado, apellido: text })}
              placeholder="Escriba su apellido"
            />
            <TextInput
              style={styles.input}
              value={clienteSeleccionado?.correo}
              onChangeText={(text) => setClienteSeleccionado({ ...clienteSeleccionado, correo: text })}
              placeholder="Escriba su Correo electronico"
            />
            <TextInput
              style={styles.input}
              value={clienteSeleccionado?.contacto}
              onChangeText={(text) => setClienteSeleccionado({ ...clienteSeleccionado, contacto: text })}
              placeholder="Escriba su numero de contacto"
            />
            <Button
              title="Guardar"
              onPress={handleActualizarCliente}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
      <Text style={[styles.header, { textAlign: 'center' }]}>Clientes</Text>
      <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection:'row',borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
      <FontAwesome name="user-plus" color='white'size={18} />
        <Text style={{ fontSize: 18,color:'white' }}>  Agregar</Text>
      </TouchableOpacity>
      <View style={styles.tableContainer}>
        {clientes.map((cliente) => (
          <View key={cliente.idCliente} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardText}>Documento: {cliente.documento}</Text>
              <Text style={styles.cardText}>Nombre: {cliente.nombre}</Text>
              <Text style={styles.cardText}>Apellido: {cliente.apellido}</Text>
              <Text style={styles.cardText}>Correo: {cliente.correo}</Text>
              <Text style={styles.cardText}>Contacto: {cliente.contacto}</Text>
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#ffffff', marginBottom:1}} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
              <TouchableOpacity onPress={() => setClienteSeleccionado(cliente)}>
                <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEliminarCliente(cliente.idCliente)}>
                <FontAwesome name="trash" size={32} color="rgba(33, 150, 243, 1)" />
              </TouchableOpacity>
            </View>
            </View>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome name="arrow-left" size={20} color="#0a58ca" />
            <Text style={{ marginLeft: 5, color: '#0d6efd' }}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
 
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'rgba(204, 219, 236, 1)',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(204, 219, 236, 1)',
    padding: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    padding: 8,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    paddingHorizontal: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

    container: {
      flex: 1,
      backgroundColor: '#FFF', 
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 16,
    },
    tableContainer: {
      padding: 16,
    },
    cardContainer: {
      backgroundColor: 'white', 
      borderRadius: 8,
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
  
});

export default ShowCliente;