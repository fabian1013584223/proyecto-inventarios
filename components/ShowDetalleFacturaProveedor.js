import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { crearDetalleFacturaProveedor, obtenerDetalleFacturaProveedor, actualizarDetalleFacturaProveedor, eliminarDetalleFacturaProveedor } from './CrudDetalleFacturaProveedor';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const ShowDetalleFacturaProveedor = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [detalleProveedorSeleccionado, setdetalleProveedorSeleccionado] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalProduct, setAdditionalProduct] = useState('');
  const [additionalCantidad, setAdditionalCantidad] = useState('');

  const navigation = useNavigation();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };
  const Editmenu = () => {
    setdetalleProveedorSeleccionado(!detalleProveedorSeleccionado);
  };
  const [detallesProveedor, setDetallesProveedor] = useState([]);
  const [fecha, setFecha] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [iva, setIva] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [total, setTotal] = useState('');
  const [detalleProveedorEditada, setDetalleProveedorEditada] = useState('');
  const [detalleProveedorEliminada, setDetalleProveedorEliminada] = useState('');

  useEffect(() => {
    obtenerDetallesAPI();
  }, [detalleProveedorEditada, detalleProveedorEliminada]);

  const obtenerDetallesAPI = async () => {
    try {
      const detallesProveedorObtenidas = await obtenerDetalleFacturaProveedor();
      setDetallesProveedor(detallesProveedorObtenidas);
    } catch (error) {
      console.error('Error al obtener los detalles factura proveedor:', error);
    }
  };

  const handleCrearDetalleFacturaProveedor = async () => {
    try {
      const nuevoDetalle = {
        fecha,
        producto,
        cantidad,
        precio,
        iva,
        subtotal,
        total,
      };
      const detalleCreado = await crearDetalleFacturaProveedor(nuevoDetalle);
      if (detalleCreado) {
        setFecha('');
        setProducto('');
        setCantidad('');
        setPrecio('');
        setIva('');
        setSubtotal('');
        setTotal('');
        obtenerDetallesAPI();
      }
    } catch (error) {
      console.error('Error al crear detalle factura proveedor:', error);
    }
  };

  const handleActualizarDetalleFacturaProveedor = async (id, nuevoDetalle) => {
    try {
      await actualizarDetalleFacturaProveedor(id, nuevoDetalle);
      setDetalleProveedorEditada(id);
      setDetalleProveedorSeleccionado(null); 
    } catch (error) {
      console.error('Error al actualizar el detalle del proveedor:', error);
    }
  };

  const handleEliminarDetalleProveedor = async (id) => {
    try {
      await eliminarDetalleFacturaProveedor(id);
      setDetalleProveedorEliminada(id);
    } catch (error) {
      console.error('Error al eliminar el detalle factura proveedor:', error);
    }
  };

  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
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
              value={fecha}
              onChangeText={setFecha}
              placeholder="Fecha"
            />
            <Text style={[styles.header, { textAlign: 'center', fontSize: 16 }]}>Detalle Factura</Text>
            <TextInput
              style={styles.input}
              value={producto}
              onChangeText={setProducto}
              placeholder="Producto"
            />
            <TextInput
              style={styles.input}
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="Cantidad"
            />
            <TouchableOpacity onPress={toggleAdditionalFields} style={{ flexDirection: 'row', borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginTop: 10 }}>
              <FontAwesome name="plus" color='white' size={18} />
              <View style={{ marginBottom: 10 }} />
              <Text style={{ fontSize: 18, color: 'white' }}> Agregar Producto y Cantidad</Text>
            </TouchableOpacity>
            {showAdditionalFields && (
              <>
                <TextInput
                  style={styles.input}
                  value={additionalProduct}
                  onChangeText={setAdditionalProduct}
                  placeholder="Producto Adicional"
                />
                <TextInput
                  style={styles.input}
                  value={additionalCantidad}
                  onChangeText={setAdditionalCantidad}
                  placeholder="Cantidad Adicional"
                />
              </>
            )}
            <TextInput
              style={styles.input}
              value={precio}
              onChangeText={setPrecio}
              placeholder="Precio"
            />
            <TextInput
              style={styles.input}
              value={iva}
              onChangeText={setIva}
              placeholder="Iva"
            />
            <TextInput
              style={styles.input}
              value={subtotal}
              onChangeText={setSubtotal}
              placeholder="Subtotal"
            />
            <TextInput
              style={styles.input}
              value={total}
              onChangeText={setTotal}
              placeholder="Total"
            />
            <TouchableOpacity onPress={() => navigation.navigate('ShowMetodoPago')} style={{ flexDirection: 'row', borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginTop: 10 }}>
              <FontAwesome name="credit-card" color='white' size={18} />
              <Text style={{ fontSize: 18, color: 'white' }}> Método de Pago</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 8 }} />
            <Button title="Crear Factura Proveedor" onPress={handleCrearDetalleFacturaProveedor} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={detalleProveedorSeleccionado !== null}
        onRequestClose={Editmenu}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 10 }}>
            <Pressable onPress={Editmenu}>
              <Ionicons name="arrow-back" size={20} color="black" style={{ marginBottom: 20 }} />
            </Pressable>
            <TextInput
              style={styles.input}
              value={detalleProveedorSeleccionado?.nombre}
              onChangeText={(text) => setdetalleProveedorSeleccionado({ ...detalleProveedorSeleccionado, nombre: text })}
              placeholder="Nombre"
            />
            <Button
              title="Guardar"
              onPress={() => {
                const nuevoDetalle = { ...detalleProveedorSeleccionado, nombre: detalleProveedorSeleccionado.nombre };
                handleActualizarDetalleFacturaProveedor(detalleProveedorSeleccionado.id, nuevoDetalle);
              }}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        <Text style={[styles.header, { textAlign: 'center' }]}>Factura Proveedor</Text>
        <TouchableOpacity onPress={toggleAddModal} style={{ flexDirection: 'row', borderRadius: 8, padding: 5, color: "white", backgroundColor: 'rgba(33, 150, 243, 1)', marginLeft: 'auto' }}>
          <FontAwesome name="user-plus" color='white' size={18} />
          <Text style={{ fontSize: 18, color: 'white' }}> Agregar</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }} />
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Fecha</Text>
            <Text style={styles.headerText}>Detalle Id</Text>
            <Text style={styles.headerText}>Factura Id</Text>
            <Text style={styles.headerText}>Producto Id</Text>
            <Text style={styles.headerText}>Producto</Text>
            <Text style={styles.headerText}>Cantidad</Text>
            <Text style={styles.headerText}>Precio</Text>
            <Text style={styles.headerText}>Iva</Text>
            <Text style={styles.headerText}>Subtotal</Text>
            <Text style={styles.headerText}>Total</Text>
          </View>
          {detallesProveedor.map((detalleProveedor) => (
            <View key={detalleProveedor.id} style={styles.row}>
              <Text style={styles.cell}>{detalleProveedor.fecha}</Text>
              <Text style={styles.cell}>{detalleProveedor.detalleId}</Text>
              <Text style={styles.cell}>{detalleProveedor.facturaId}</Text>
              <Text style={styles.cell}>{detalleProveedor.productoId}</Text>
              <Text style={styles.cell}>{detalleProveedor.producto}</Text>
              <Text style={styles.cell}>{detalleProveedor.cantidad}</Text>
              <Text style={styles.cell}>{detalleProveedor.precio}</Text>
              <Text style={styles.cell}>{detalleProveedor.iva}</Text>
              <Text style={styles.cell}>{detalleProveedor.subtotal}</Text>
              <Text style={styles.cell}>{detalleProveedor.total}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 1 }}>
                <TouchableOpacity onPress={() => setdetalleProveedorSeleccionado(detalleProveedor)}>
                  <FontAwesome name="edit" size={32} color="rgba(33, 150, 243, 1)" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEliminarDetalleProveedor(detalleProveedor.id)}>
                  <FontAwesome name="trash" size={32} color="rgba(33, 150, 243, 1)" />
                </TouchableOpacity>
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

export default ShowDetalleFacturaProveedor;