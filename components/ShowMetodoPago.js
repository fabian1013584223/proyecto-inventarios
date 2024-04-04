import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const ShowMetodoPago = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [tipoMetodo, setTipoMetodo] = useState('');
  const [monto, setMonto] = useState('');
  const [nombreEntidad, setNombreEntidad] = useState('');

  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
    setFechaSeleccionada('');
    setTipoMetodo('');
    setMonto('');
    setNombreEntidad('');
  };
  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const [metodos, setMetodos] = useState([]);
  const [IdMetodoPago, setIdMetodoPago] = useState('');
  const [metodoEditado, setMetodoEditado] = useState('');
  const [metodoEliminado, setMetodoEliminado] = useState('');

  useEffect(() => {
    obtenerMetodosAPI();
  }, [metodoEditado, metodoEliminado]);

  const obtenerMetodosAPI = async () => {
    try {
      // Obtener métodos de pago desde la API o donde sea que los obtengas
      const metodosObtenidos = [
        { IdMetodoPago: 1, fechadepago: '2024-03-17', tipoMetodo: 'Efectivo', monto: '100', nombreEntidad: '' },
        { IdMetodoPago: 2, fechadepago: '2024-03-18', tipoMetodo: 'Entidad bancaria', monto: '', nombreEntidad: 'Banco XYZ' },
      ];
      setMetodos(metodosObtenidos);
    } catch (error) {
      console.error('Error al obtener métodos:', error);
    }
  };

  const handleCrearMetodo = async () => {
    try {
      // Aquí iría la lógica para crear un nuevo método de pago
      console.log('Crear método de pago:', fechaSeleccionada, tipoMetodo, monto, nombreEntidad);
      // Lógica para agregar el nuevo método de pago a la lista
      const nuevoMetodo = {
        IdMetodoPago: metodos.length + 1, // ID único para el nuevo método
        fechadepago: fechaSeleccionada,
        tipoMetodo: tipoMetodo,
        monto: monto,
        nombreEntidad: nombreEntidad
      };
      setMetodos([...metodos, nuevoMetodo]); // Agregar el nuevo método a la lista existente
      toggleAddModal(); // Cerrar modal
    } catch (error) {
      console.error('Error al crear método de pago:', error);
    }
  };

  const handleActualizarMetodo = async () => {
    try {
      // Aquí iría la lógica para actualizar un método de pago existente
      console.log('Actualizar método de pago:', metodoSeleccionado.IdMetodoPago, fechaSeleccionada, tipoMetodo, monto, nombreEntidad);
      setMetodoEditado(metodoSeleccionado.IdMetodoPago);
      setMetodoSeleccionado(null); // Limpiar selección
      toggleEditModal(); // Cerrar modal de edición
    } catch (error) {
      console.error('Error al actualizar método de pago:', error);
    }
  };

  const handleEliminarMetodo = async (IdMetodoPago) => {
    try {
      // Aquí iría la lógica para eliminar un método de pago
      console.log('Eliminar método de pago:', IdMetodoPago);
      setMetodoEliminado(IdMetodoPago);
    } catch (error) {
      console.error('Error al eliminar método de pago:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
              <Ionicons name="arrow-back" size={20} color="black" style={{ marginBottom: 20 }} />
            </Pressable>
            <TextInput
              style={styles.input}
              placeholder="Fecha de pago"
              value={fechaSeleccionada}
              onChangeText={setFechaSeleccionada}
              editable={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Efectivo/Entidad Bancaria"
              value={tipoMetodo}
              onChangeText={setTipoMetodo}
              editable={true}
            />
            {tipoMetodo === 'Efectivo' && (
              <TextInput
                style={styles.input}
                placeholder="Monto a pagar"
                value={monto}
                onChangeText={setMonto}
                editable={true}
              />
            )}
            {tipoMetodo === 'Entidad Bancaria' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre entidad"
                  value={nombreEntidad}
                  onChangeText={setNombreEntidad}
                  editable={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Monto a pagar"
                  value={monto}
                  onChangeText={setMonto}
                  editable={true}
                />
              </>
            )}
            <Button title="Crear Método de Pago" onPress={handleCrearMetodo} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={toggleEditModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'rgba(203, 218, 236, 0.92)', padding: 25, borderRadius: 10 }}>
            <Pressable onPress={toggleEditModal}>
              <Ionicons name="arrow-back" size={20} color="black" style={{ marginBottom: 20 }} />
            </Pressable>
            <TextInput
              style={styles.input}
              placeholder="Fecha de pago"
              value={fechaSeleccionada}
              onChangeText={setFechaSeleccionada}
              editable={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Efectivo/Entidad Bancaria"
              value={tipoMetodo}
              onChangeText={setTipoMetodo}
              editable={true}
            />
            {tipoMetodo === 'Efectivo' && (
              <TextInput
                style={styles.input}
                placeholder="Monto a pagar"
                value={monto}
                onChangeText={setMonto}
                editable={true}
              />
            )}
            {tipoMetodo === 'Entidad Bancaria' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre entidad"
                  value={nombreEntidad}
                  onChangeText={setNombreEntidad}
                  editable={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Monto a pagar"
                  value={monto}
                  onChangeText={setMonto}
                  editable={true}
                />
              </>
            )}
            <Button
              title="Guardar"
              onPress={handleActualizarMetodo}
            />
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <Text style={[styles.header, { textAlign: 'center' }]}>Metodo de pago</Text>
        <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection: 'row', borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
          <FontAwesome name="user-plus" color='white' size={18} />
          <Text style={{ fontSize: 18, color: 'white' }}> Agregar</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }} />
        <View style={styles.tableContainer}>
          {metodos.map((metodo) => (
            <View key={metodo.IdMetodoPago} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardText}>Fecha de pago: {metodo.fechadepago}</Text>
                <Text style={styles.cardText}>Tipo de método: {metodo.tipoMetodo}</Text>
                <Text style={styles.cardText}>Monto: {metodo.monto}</Text>
                <Text style={styles.cardText}>Nombre entidad: {metodo.nombreEntidad}</Text>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#ffffff', marginBottom: 1 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
                  <TouchableOpacity onPress={() => {
                    setMetodoSeleccionado(metodo);
                    toggleEditModal();
                  }}>
                    <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEliminarMetodo(metodo.IdMetodoPago)}>
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

export default ShowMetodoPago;