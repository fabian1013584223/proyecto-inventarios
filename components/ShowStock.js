import React, { useEffect, useState } from 'react';
import { crearStock, obtenerStocks, actualizarStock, eliminarStock } from './CrudStock';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const ShowStock = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [stockSeleccionado, setStockSeleccionado] = useState(null);

  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };
  const Editmenu = () => {
    setStockSeleccionado(!stockSeleccionado);
  };

  const [stocks, setStocks] = useState([]);
  const [CantidadReal, setCantidadReal] = useState('');
  const [CantidadIdeal, setCantidadIdeal] = useState('');
  const [CantidadMinima, setCantidadMinima] = useState('');
  const [CantidadAlarma, setCantidadAlarma] = useState('');
  const [FechaIngreso, setFechaIngreso] = useState('');
  const [stockEditada, setStockEditada] = useState('');
  const [stockEliminada, setStockEliminada] = useState('');

  useEffect(() => {
    obtenerStocksAPI();
  }, [stockEditada, stockEliminada]);

  const obtenerStocksAPI = async () => {
    try {
      const stocksObtenidas = await obtenerStocks();
      setStocks(stocksObtenidas);
    } catch (error) {
      console.error('Error al obtener los stock:', error);
    }
  };

  const handleCrearStock = async () => {
    try {
      await crearStock({ cantidadReal: CantidadReal, cantidadIdeal: CantidadIdeal, cantidadMinima: CantidadMinima, cantidadAlarma: CantidadAlarma, fechaIngreso: FechaIngreso });
      setCantidadReal('');
      setCantidadIdeal('');
      setCantidadMinima('');
      setCantidadAlarma('');
      setFechaIngreso('');
      obtenerStocksAPI();
    } catch (error) {
      console.error('Error al crear stock:', error);
    }
  };

  const handleActualizarStock = async () => {
    try {
      await actualizarStock(stockSeleccionado.stockId, stockSeleccionado);
      setStockEditada(stockSeleccionado.stockId);
      setStockSeleccionado(null); // Limpiar el stock seleccionado después de actualizar
    } catch (error) {
      console.error('Error al actualizar Stock', error);
    }
  };
  
  const handleEliminarStock = async (id) => {
    try {
      await eliminarStock(id);
      setStockEliminada(id);
    } catch (error) {
      console.error('Error al eliminar Stock:', error);
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
        <View style={{ flex: 1, justifyContent: 'up', alignItems: 'flex-start', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#0a58ca', padding: 25, borderRadius: 1, height: menuHeight }}>
            <Pressable onPress={toggleMenu}>
              <Ionicons name="arrow-back" size={20} color="black" style={{ color: '#FFF', marginBottom: 20 }} />
            </Pressable>
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Derechos')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Derechos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Nosotros')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Productos')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Productos</Text>
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
              <Text style={{ marginLeft: 5, fontSize: '22' }}>Crear Stock</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={CantidadReal}
              onChangeText={setCantidadReal}
              placeholder="Cantidad Real"
            />
            <TextInput
              style={styles.input}
              value={CantidadIdeal}
              onChangeText={setCantidadIdeal}
              placeholder="Cantidad Ideal"
            />
            <TextInput
              style={styles.input}
              value={CantidadMinima}
              onChangeText={setCantidadMinima}
              placeholder="Cantidad Minima"
            />
            <TextInput
              style={styles.input}
              value={CantidadAlarma}
              onChangeText={setCantidadAlarma}
              placeholder="Cantidad Alarma"
            />
            <TextInput
              style={styles.input}
              value={FechaIngreso}
              onChangeText={setFechaIngreso}
              placeholder="Fecha Ingreso"
            />
            <Button title="Crear Stock" onPress={handleCrearStock} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={stockSeleccionado}
        onRequestClose={Editmenu}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={Editmenu}>
              <Ionicons name="arrow-back" size={20} color="black" />
              <Text style={{ marginLeft: 5, fontSize: '22' }}>Actualizar Stock</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              value={stockSeleccionado?.cantidadReal}
              onChangeText={(text) => setStockSeleccionado({ ...stockSeleccionado, cantidadReal: text })}
              placeholder="Cantidad Real"
            />
            <TextInput
              style={styles.input}
              value={stockSeleccionado?.cantidadIdeal}
              onChangeText={(text) => setStockSeleccionado({ ...stockSeleccionado, cantidadIdeal: text })}
              placeholder="Cantidad Ideal"
            />
            <TextInput
              style={styles.input}
              value={stockSeleccionado?.cantidadMinima}
              onChangeText={(text) => setStockSeleccionado({ ...stockSeleccionado, cantidadMinima: text })}
              placeholder="Cantidad Mínima"
            />
            <TextInput
              style={styles.input}
              value={stockSeleccionado?.cantidadAlarma}
              onChangeText={(text) => setStockSeleccionado({ ...stockSeleccionado, cantidadAlarma: text })}
              placeholder="Cantidad Alarma"
            />
            <TextInput
              style={styles.input}
              value={stockSeleccionado?.fechaIngreso}
              onChangeText={(text) => setStockSeleccionado({ ...stockSeleccionado, fechaIngreso: text })}
              placeholder="Fecha Ingreso"
            />
            <Button
              title="Guardar"
              onPress={handleActualizarStock}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
      <Text style={[styles.header, {textAlign: 'center'}]}>Stock</Text>
        <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection:'row',borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
      <FontAwesome name="user-plus" color='white'size={18} />
        <Text style={{ fontSize: 18,color:'white' }}>  Agregar</Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 10 }} />
        <View style={styles.tableContainer}>
          {stocks.map((stock) => (
            <View key={stock.stockId} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardText}>Id: {stock.stockId}</Text>
                <Text style={styles.cardText}>Cantidad Real: {stock.cantidadReal}</Text>
                <Text style={styles.cardText}>Cantidad Ideal: {stock.cantidadIdeal}</Text>
                <Text style={styles.cardText}>Cantidad Minima: {stock.cantidadMinima}</Text>
                <Text style={styles.cardText}>Cantidad Alarma: {stock.cantidadAlarma}</Text>
                <Text style={styles.cardText}>Fecha Ingreso: {stock.fechaIngreso}</Text>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#ffffff', marginBottom: 1 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
                  <TouchableOpacity onPress={() => setStockSeleccionado(stock)}>
                    <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEliminarStock(stock.stockId)}>
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

export default ShowStock;