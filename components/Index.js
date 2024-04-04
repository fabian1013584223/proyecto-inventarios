import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;
const Index = () => {
    const navigation = useNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const images = [
    { id: 1, uri: require('/assets/Celular.webp') },
    { id: 2, uri: require('/assets/TecladoMause.png') },
    { id: 3, uri: require('/assets/Computador.jpg') },
    { id: 4, uri: require('/assets/Audifonosrosados.jpg') },
  ];

  const imagesdestacados = [
    { id: 1, uri: require('/assets/celular2.webp') },
    { id: 2, uri: require('/assets/tabletlenovo.jpg') },
    { id: 3, uri: require('/assets/portatil.jpeg') },
    { id: 4, uri: require('/assets/celular4.jpg') },
  ];
  const imagesofertas = [
    { id: 1, uri: require('/assets/teclado4.webp') },
    { id: 2, uri: require('/assets/tabletlenovo.jpg') },
    { id: 2, uri: require('/assets/Audifonos3.avif') },
    { id: 3, uri: require('/assets/audifonoIna.jpg') },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Cambia 2000 por el tiempo en milisegundos que deseas entre cada cambio de imagen

    return () => clearInterval(interval);
  }, []);
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
      <ScrollView style={{ padding: 20 ,backgroundColor: 'white' }}>
        <View style={{ marginBottom: 40 }}>
          <Text style={{ color: '#0a58ca', fontSize: 35, textAlign:'center', fontWeight:'500'}}>Descubre</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <Image source={images[currentIndex].uri} style={{ width: 250, height: 200, marginBottom: 2 }} />
          <Text style={{fontSize: 20,color: '#0a58ca'}}>Categoria</Text>
          <Text style={{ fontFamily: 'sans-serif', fontSize: 18, fontWeight: 20, lineHeigth:24,textAlign:'center'}}>Explora nuestra selección tecnológica de primer nivel</Text>
       </View>
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 }} >
          <Image source={imagesdestacados[currentIndex].uri} style={{ width: 250, height: 200, marginBottom: 10 }} />
            <Text style={{fontSize: 20,color: '#0a58ca'}}>Destacados </Text>
            <Text style={{ fontFamily: 'sans-serif', fontSize: 18, fontWeight: 20, lineHeigth:24,textAlign:'center'}}>Descubre los mejores productos tecnológicos en un solo lugar.</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding:8  }} >
          <Image source={imagesofertas[currentIndex].uri} style={{ width: 200, height: 200, marginBottom: 10}} />
            <Text style={{fontSize: 20,color: '#0a58ca'}}>Ofertas</Text>
            <Text style={{ fontFamily: 'sans-serif', fontSize: 18, fontWeight: 20, lineHeigth:24,textAlign:'center'}}>Aprovecha nuestras irresistibles ofertas tecnológicas.</Text>
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


export default Index;
