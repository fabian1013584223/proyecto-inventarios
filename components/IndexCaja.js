import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,TextInput,Button, Modal, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;
const IndexCaja= () => {
    const navigation = useNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Constants.StatusBarHeight, backgroundColor: '#0a58ca', height: 119 }}>
      <Image source={require('/assets/imagenproyecto.png')} 
      style={{ width: 70, height: 80 }} />
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
            <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Cerrar Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ padding: 20 }}>
      <View style={{ marginBottom: 40 }}>
          <Text style={{ color: '#0a58ca', fontSize: 24, textAlign: 'center',lineHeight:'2'}}>Caja</Text>
          <Text style={{ fontSize: 18,textAlign:'center'}}>Seleccione el tipo de registro que desee visualizar del control de inventarios de la empresa.  </Text>
      </View>
          {/* <View 
          style={{ alignItems: 'center',alignSelf:'center',width: 150,marginBottom: 32,paddingBottom: 25,
          BottomWidth:4,borderRadius:5,backgroundColor: '#0d6efd' }}>
                <TouchableOpacity onPress={() => navigation.navigate('ShowPrecio')}>
                    <Text style={{ textAlign: 'center', color: '#FFFFFF',fontSize:17,lineHeight:'2' }}>Precios</Text>
                </TouchableOpacity>
            </View> */}
            
          <View 
          style={{ alignItems: 'center',alignSelf:'center',width: 150,marginBottom: 32,paddingBottom: 25,
          BottomWidth:4,borderRadius:5,backgroundColor: '#0d6efd' }}>
        <TouchableOpacity onPress={() => navigation.navigate('ShowProductos')}>
                    <Text style={{ textAlign: 'center', color: '#FFFFFF',fontSize:17,lineHeight:'2' }}>Productos</Text>
                </TouchableOpacity>
            </View>
            <View 
          style={{ alignItems: 'center',alignSelf:'center',width: 150,marginBottom: 32,paddingBottom: 25,
          BottomWidth:4,borderRadius:5,backgroundColor: '#0d6efd' }}>
            <TouchableOpacity onPress={() => navigation.navigate('ShowMetodoPago')}>
                    <Text style={{ textAlign: 'center', color: '#FFFFFF',fontSize:17,lineHeight:'2' }}>Metodo de pago</Text>
                </TouchableOpacity>
            </View>
           
            <View 
          style={{ alignItems: 'center',alignSelf:'center',width: 150,marginBottom: 32,paddingBottom: 25,
          BottomWidth:4,borderRadius:5,backgroundColor: '#0d6efd' }}>
            <TouchableOpacity onPress={() => navigation.navigate('ShowStock')}>
                    <Text style={{ textAlign: 'center', color: '#FFFFFF',fontSize:17,lineHeight:'2' }}>Stock</Text>
                </TouchableOpacity>
                </View>
      </ScrollView>
      <View style={{ backgroundColor: '#EFEFEF', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#555' }}>Copyright © 2023 Brand</Text>
      </View>
    </View>
  );
};


export default IndexCaja;
