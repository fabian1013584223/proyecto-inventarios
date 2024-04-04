import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { obtenerProductos, crearProductos, actualizarProductos, eliminarProductos } from './CrudProductos';
import DateTimePicker from '@react-native-community/datetimepicker';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 0.4;

const ShowProductos = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [lugar, setLugar] = useState('');
  const [productoEditada, setProductoEditada] = useState('');
  const [productoEliminada, setProductoEliminada] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductosAPI();
  }, [productoEditada, productoEliminada]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const handleEditProduct = (producto) => {
    setProductoSeleccionado(producto);
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setPrecio(producto.precio);
    setEstado(producto.estado);
    setLugar(producto.lugar);
    toggleEditModal();
  };

  const obtenerProductosAPI = async () => {
    try {
      const productosObtenidas = await obtenerProductos();
      if (Array.isArray(productosObtenidas)) {
        setProductos(productosObtenidas);
      } else {
        console.error('Error al obtener los productos: La respuesta no es un array');
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleCrearProductos = async () => {
    try {
      await crearProductos({ nombre, cantidad, precio, estado, lugar });
      setNombre('');
      setCantidad('');
      setPrecio('');
      setEstado('');
      setLugar('');
      obtenerProductosAPI();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  const handleActualizarProductos = async () => {
    try {
      await actualizarProductos(productoSeleccionado.productoId, { nombre, cantidad, precio, estado, lugar });
      setProductoEditada(productoSeleccionado.productoId);
      setProductoSeleccionado(null);
      toggleEditModal();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await eliminarProductos(id);
      setProductoEliminada(id);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Encabezado */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Constants.statusBarHeight, backgroundColor: '#0a58ca', height: 119 }}>
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
            {/* Otras opciones de menú */}
          </View>
        </View>
      </Modal>

      {/* Modal de Agregar Producto */}
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
              <Text style={{ marginLeft: 5, fontSize: '22' }}>Crear Producto</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="Cantidad"
            />
            <TextInput
              style={styles.input}
              value={precio}
              onChangeText={setPrecio}
              placeholder="Precio"
            />
            <TextInput
              style={styles.input}
              value={estado}
              onChangeText={setEstado}
              placeholder="Estado"
            />
            <TextInput
              style={styles.input}
              value={lugar}
              onChangeText={setLugar}
              placeholder="Lugar"
            />
            <Button title="Crear producto" onPress={handleCrearProductos} />
          </View>
        </View>
      </Modal>

      {/* Modal de Editar Producto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={toggleEditModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={toggleEditModal}>
              <Ionicons name="arrow-back" size={20} color="black" />
              <Text style={{ marginLeft: 5, fontSize: '22' }}>Editar Producto</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="Cantidad"
            />
            <TextInput
              style={styles.input}
              value={precio}
              onChangeText={setPrecio}
              placeholder="Precio"
            />
            <TextInput
              style={styles.input}
              value={estado}
              onChangeText={setEstado}
              placeholder="Estado"
            />
            <TextInput
              style={styles.input}
              value={lugar}
              onChangeText={setLugar}
              placeholder="Lugar"
            />
            <Button title="Actualizar producto" onPress={handleActualizarProductos} />
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <Text style={[styles.header, { textAlign: 'center' }]}>Productos</Text>
        <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection: 'row', borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
          <FontAwesome name="user-plus" color='white' size={18} />
          <Text style={{ fontSize: 18, color: 'white' }}> Agregar</Text>
        </TouchableOpacity>

        <View style={styles.tableContainer}>
          {productos.map((producto) => (
            <View key={producto.productoId} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardText}>Id: {producto.productoId}</Text>
                <Text style={styles.cardText}>Nombre: {producto.nombre}</Text>
                <Text style={styles.cardText}>Cantidad: {producto.cantidad}</Text>
                <Text style={styles.cardText}>Precio: {producto.precio}</Text>
                <Text style={styles.cardText}>Estado: {producto.estado}</Text>
                <Text style={styles.cardText}>Lugar: {producto.lugar}</Text>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#ffffff', marginBottom: 1 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
                  <TouchableOpacity onPress={() => handleEditProduct(producto)}>
                    <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEliminarProducto(producto.productoId)}>
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

export default ShowProductos;