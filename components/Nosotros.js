import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;
const Nosotros = () => {
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
          </View>
        </View>
      </Modal>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 40 }}>
          <Text style={{ color: '#0a58ca', fontSize: 28, fontWeight:'500',textAlign:'center'}}>Nosotros </Text>
          <Text style={{ fontFamily: 'sans-serif', fontSize: 16, fontWeight: 16, lineHeigth:24,textAlign:'center'}}>SISI es una empresa creada en el año 2010, dirigida a la tecnología, otorgando a la sociedad los mejores productos tecnológicos de calidad y con un muy buen precio en el mercado. Actualmente nos encontramos ubicados en la localidad de Chapinero en la zona comercial de la ciudad y tenemos una distribución en toda la ciudad de Bogotá. </Text>
        </View>
        <View style={{ padding: 8}}>
            <Text style={{fontFamily: 'sans-serif', fontSize: 20, fontWeight: 20, lineHeigth:20,textAlign:'center'}}> "Descubre el poder de la tecnología en nuestras manos"</Text>
        </View>
        <View style={{ padding: 5 }}>
            <Text style={{color:'#0a58ca', fontSize: 28, textAlign:'center', fontWeight:'450'}}>Contacto</Text>
            <Text style={{ fontFamily: 'sans-serif', fontSize: 17, fontWeight: 16,textAlign:'center', lineHeigth:24}}>Estamos pendientes de tus necesidades o peticiones. </Text>
        </View>
        
        <View  style={{ flexDirection: 'row', alignSelf: 'auto',padding:10 }}>
          <Ionicons name="logo-whatsapp" size={35} color="#0a58ca" style={{ marginRight: 20 }} />
            <View>
              <Text style={{ marginBottom:2,fontSize:'18px'}}>Whatsapp</Text>
              <Text style={{ marginBottom: 2, fontSize:'15px' }}>+57 3101234567</Text>
            </View>
        </View>

        <View  style={{ flexDirection: 'row', alignSelf: 'auto',padding:10 }}>
          <Ionicons name="call" size={35} color="#0a58ca" style={{ marginRight: 20 }} />
            <View>
              <Text style={{ marginBottom: 2, fontSize:'18px' }}>Telefono</Text>
              <Text style={{ marginBottom: 2, fontSize:'15px' }}>+57 310 1234567</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'auto',padding:10 }}>
      <Ionicons name="mail" size={35} color="#0a58ca" style={{ marginRight: 20 }} />
      <View>
        <Text style={{ marginBottom: 2, fontSize:'18px'}}>Email</Text>
        <Text style={{ marginBottom: 2,fontSize:'15px' }}>info_tecnologia@sisi.com</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', alignSelf: 'auto',padding:10 }}>
      <Ionicons name="location" size={35} color="#0a58ca" style={{ marginRight: 20 }} />
      <View>
        <Text style={{ marginBottom: 2,fontSize:'18px' }}>Ubicación</Text>
        <Text style={{ marginBottom: 2,fontSize:'15px' }}>Carrera 13 #64-10, local 302 Chapinero, Bogotá, Colombia</Text>
      </View>
    </View>
      </ScrollView>
      <View style={{ backgroundColor: '#EFEFEF', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#555' }}>Copyright © 2023 Brand</Text>
        {/* Redes sociales */}
        {/* Enlaces */}
      </View>
    </View>
  );
};

export default Nosotros;
