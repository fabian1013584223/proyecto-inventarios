import React, { useEffect, useState } from 'react';
import { crearProveedor, obtenerProveedores, actualizarProveedor, eliminarProveedor } from './CrudProveedor';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const ShowProveedor = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };
  const Editmenu = () => {
    setProveedorSeleccionado(!proveedorSeleccionado);
  };

  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState('');
  const [NitProveedor, setNitProveedor] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contacto, setContacto] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [proveedorEditada, setProveedorEditada] = useState('');
  const [proveedorEliminada, setProveedorEliminada] = useState('');

  useEffect(() => {
    obtenerProveedoresAPI();
  }, [proveedorEditada, proveedorEliminada]);

  const obtenerProveedoresAPI = async () => {
    try {
      const proveedoresObtenidas = await obtenerProveedores();
      setProveedores(proveedoresObtenidas);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleCrearProveedor = async () => {
    try {
      await crearProveedor({ nombre: nuevoProveedor, nitProveedor: NitProveedor, direccion: Direccion, apellido: Apellido, correo: Correo, contacto: Contacto });
      setNuevoProveedor('');
      setNitProveedor('');
      setDireccion('');
      setApellido('');
      setCorreo('');
      setContacto('');
      obtenerProveedoresAPI();
    } catch (error) {
      console.error('Error al crear clientte:', error);
    }
  };

  const handleActualizarProveedor = async () => {
    try {
      if (proveedorSeleccionado && proveedorSeleccionado.idProveedor) {
        // Verificar que proveedorSeleccionado tenga los campos necesarios
        if (proveedorSeleccionado.nitProveedor && proveedorSeleccionado.direccion && proveedorSeleccionado.nombre && proveedorSeleccionado.apellido && proveedorSeleccionado.correo && proveedorSeleccionado.contacto) {
          await actualizarProveedor(proveedorSeleccionado.idProveedor, proveedorSeleccionado);
          setProveedorEditada(proveedorSeleccionado.idProveedor);
          setProveedorSeleccionado(null); // Limpiar el proveedor seleccionado después de actualizar
        } else {
          console.error('Faltan campos obligatorios para actualizar el proveedor.');
        }
      } else {
        console.error('Proveedor seleccionado inválido.');
      }
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
    }
  };  

  const handleEliminarProveedor = async (id) => {
    try {
      await eliminarProveedor(id);
      setProveedorEliminada(id);
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
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
            <Text style={{ marginLeft: 5 ,fontSize:'22'}}>Crear Proveedor</Text>
        </Pressable>
            <TextInput
              style={styles.input}
              value={NitProveedor}
              onChangeText={setNitProveedor}
              placeholder="Nit Proveedor"
            />
            <TextInput
              style={styles.input}
              value={Direccion}
              onChangeText={setDireccion}
              placeholder="Direccion"
            />
            <TextInput
              style={styles.input}
              value={nuevoProveedor}
              onChangeText={setNuevoProveedor}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={Apellido}
              onChangeText={setApellido}
              placeholder="Apellido"
            />
            <TextInput
              style={styles.input}
              value={Correo}
              onChangeText={setCorreo}
              placeholder="Correo"
            />
            <TextInput
              style={styles.input}
              value={Contacto}
              onChangeText={setContacto}
              placeholder="Contacto"
            />
            <Button title="Crear Proveedor" onPress={handleCrearProveedor} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={proveedorSeleccionado}
        onRequestClose={Editmenu}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={Editmenu}>
              <Ionicons name="arrow-back" size={20} color="black"  />
            <Text style={{ marginLeft: 5 ,fontSize:'22'}}>Actualizar Proveedor</Text>
            </Pressable>
            
            <TextInput
              style={styles.input}
              value={proveedorSeleccionado?.nitProveedor}
              onChangeText={(text) => setProveedorSeleccionado({ ...proveedorSeleccionado, nitProveedor: text })}
              placeholder="Nit Proveedor"
            />
            <TextInput
              style={styles.input}
              value={proveedorSeleccionado?.direccion}
              onChangeText={(text) => setProveedorSeleccionado({ ...proveedorSeleccionado, direccion: text })}
              placeholder="Dirección"
            />
            <TextInput
              style={styles.input}
              value={proveedorSeleccionado?.nombre}
              onChangeText={(text) => setProveedorSeleccionado({ ...proveedorSeleccionado, nombre: text })}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={proveedorSeleccionado?.apellido}
              onChangeText={(text) => setProveedorSeleccionado({ ...proveedorSeleccionado, apellido: text })}
              placeholder="Apellido"
            />
            <TextInput
              style={styles.input}
              value={proveedorSeleccionado?.correo}
              onChangeText={(text) => setProveedorSeleccionado({ ...proveedorSeleccionado, correo: text })}
              placeholder="Correo"
            />
            <TextInput
              style={styles.input}
              value={proveedorSeleccionado?.contacto}
              onChangeText={(text) => setProveedorSeleccionado({ ...proveedorSeleccionado, contacto: text })}
              placeholder="Contacto"
            />
            <Button
              title="Guardar"
              onPress={handleActualizarProveedor}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
      <Text style={[styles.header, {textAlign: 'center'}]}>Proveedores</Text>
      <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection:'row',borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
      <FontAwesome name="user-plus" color='white'size={18} />
        <Text style={{ fontSize: 18,color:'white' }}>  Agregar</Text>
      </TouchableOpacity>
      <View style={styles.tableContainer}>
        {proveedores.map((proveedor) => (
          <View key={proveedor.idProveedor} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardText}>Nit Proveedor: {proveedor.nitProveedor}</Text>
              <Text style={styles.cardText}>Direccion: {proveedor.direccion}</Text>
              <Text style={styles.cardText}>Nombre: {proveedor.nombre}</Text>
              <Text style={styles.cardText}>Apellido: {proveedor.apellido}</Text>
              <Text style={styles.cardText}>Correo: {proveedor.correo}</Text>
              <Text style={styles.cardText}>Contacto: {proveedor.contacto}</Text>
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#ffffff', marginBottom:1}} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
              <TouchableOpacity onPress={() => setProveedorSeleccionado(proveedor)}>
                <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEliminarProveedor(proveedor.idProveedor)}>
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

export default ShowProveedor;