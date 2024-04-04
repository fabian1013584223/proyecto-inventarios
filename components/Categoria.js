import React, { useEffect, useState } from 'react';
import { crearCategoria, obtenerCategorias, actualizarCategoria, eliminarCategoria } from './categorias';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const Categoria = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };
  const Editmenu = () => {
    setCategoriaSeleccionada(!categoriaSeleccionada);
  };

  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categoriaEditada, setCategoriaEditada] = useState('');
  const [categoriaEliminada, setCategoriaEliminada] = useState('');

  useEffect(() => {
    obtenerCategoriasAPI();
  }, [categoriaEditada, categoriaEliminada]);

  const obtenerCategoriasAPI = async () => {
    try {
      const categoriasObtenidas = await obtenerCategorias();
      setCategorias(categoriasObtenidas);
    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  };

  const handleCrearCategoria = async () => {
    try {
      await crearCategoria({ nombre: nuevaCategoria });
      setCategorias([]);
      setNuevaCategoria('');
      obtenerCategoriasAPI();
    } catch (error) {
      console.error('Error al crear la categoria:', error);
    }
  };

  const handleActualizarCategoria = async () => {
    try {
      await actualizarCategoria(categoriaSeleccionada.categoriaId, categoriaSeleccionada);
      setCategoriaEditada(categoriaSeleccionada.categoriaId);
      setCategoriaSeleccionada(null); // Limpiar el proveedor seleccionado después de actualizar
    } catch (error) {
      console.error('Error al actualizar la categoria:', error);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await eliminarCategoria(id);
      setCategoriaEliminada(id);
    } catch (error) {
      console.error('Error al eliminar la categoria:', error);
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

      {/* Modal del Menú */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => {
          setIsMenuVisible(!isMenuVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'up', alignItems: 'flex-start', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#0a58ca', padding: 25, borderRadius: 1, height: menuHeight }}>
            <Pressable onPress={toggleMenu}>
              <Ionicons name="arrow-back" size={20} color="black" style={{ color: '#FFF', marginBottom: 20 }} />
            </Pressable>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Nosotros')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Productos')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Administracion')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Administracion</Text>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#FFF', marginBottom: 1 }} />
            <TouchableOpacity onPress={() => navigation.navigate('Bodega')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Bodega</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Caja')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Caja</Text>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#FFF', marginBottom: 1 }} />
            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Iniciar Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Agregar Categoría */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={toggleAddModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={toggleAddModal}>
              <Ionicons name="arrow-back" size={20} color="black" />
              <Text style={{ marginLeft: 5, fontSize: '22' }}>Crear Categoria</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={nuevaCategoria}
              onChangeText={setNuevaCategoria}
              placeholder="Escriba la categoria"
            />
            <Button title="Crear Categoria" onPress={handleCrearCategoria} />
          </View>
        </View>
      </Modal>

      {/* Modal de Editar Categoría */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoriaSeleccionada}
        onRequestClose={Editmenu}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={Editmenu}>
              <Ionicons name="arrow-back" size={20} color="black" />
              <Text style={{ marginLeft: 5, fontSize: '22' }}>Actualizar Categoria</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={categoriaSeleccionada?.nombre}
              onChangeText={(text) => setCategoriaSeleccionada({ ...categoriaSeleccionada, nombre: text })}
              placeholder="Escriba el nombre de la categoria"
            />
            <Button
              title="Guardar"
              onPress={handleActualizarCategoria}
            />
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <Text style={[styles.header, { textAlign: 'center' }]}>Categorias</Text>
        <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection: 'row', borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
          <FontAwesome name="user-plus" color='white' size={18} />
          <Text style={{ fontSize: 18, color: 'white' }}> Agregar</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }} />
        <View style={styles.tableContainer}>
          {categorias.map((categoria) => (
            <View key={categoria.categoriaId} style={styles.cardContainer}>
              <View style={styles.card}>
              <Text style={styles.cardText}>Id: {categoria.categoriaId}</Text>
                <Text style={styles.cardText}>Nombre: {categoria.nombre}</Text>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#ffffff', marginBottom: 1 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
                  <TouchableOpacity onPress={() => setCategoriaSeleccionada(categoria)}>
                    <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEliminarCategoria(categoria.categoriaId)}>
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

export default Categoria;