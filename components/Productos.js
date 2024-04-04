import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

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
    { id: 1, uri: require('/assets/portatil.jpeg') },
    { id: 2, uri: require('/assets/ComputadorTodoEnUnoHp.webp') },
    { id: 3, uri: require('/assets/Computador.jpg') },
    { id: 4, uri: require('/assets/ComputadorAllinOneLENOVO.jpg') },
  ];

  const imagesaudifonos = [
    { id: 1, uri: require('/assets/Audifonos.jpg') },
    { id: 2, uri: require('/assets/Audifonos3.avif') },
    { id: 3, uri: require('/assets/audifonoIna.jpg') },
    { id: 4, uri: require('/assets/Audifonosrosados.jpg') },
  ];
  const imagestablet = [
    { id: 1, uri: require('/assets/tabletyestuche.webp') },
    { id: 2, uri: require('/assets/tabletlenovo.jpg') },
    { id: 3, uri: require('/assets/tablet2.jpg') },
    { id: 4, uri: require('/assets/tablet3.jpg') },
  ];
  const imagesteclado = [
    { id: 1, uri: require('/assets/TecladoMause.png') },
    { id: 2, uri: require('/assets/teclado2.avif') },
    { id: 3, uri: require('/assets/teclado3.webp') },
    { id: 4, uri: require('/assets/teclado4.webp') },
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
      <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
      <View style={{ marginBottom: 40 }}>
          <Text style={{ color: '#0a58ca', fontSize: 30, textAlign: 'center',lineHeight:'2'}}>Productos</Text>
          <Text style={{ fontSize: 18,textAlign:'center'}}>En nuestra tienda podras encontrar gran variedad de productos de excelente calidad.</Text>  
        </View>
            <View style={{ flex: 1,paddingVertical: 10, paddingHorizontal: 20,alignItems: 'center', justifyContent: 'auto' }}>
                  <Image source={images[currentIndex].uri} style={{ width: 250, height: 200, marginBottom: 2 }} />
                  <Text style={{fontSize: 20,color: '#0a58ca',alignItems:'flex-start'}}>Computadores</Text>
                  <Text style={{ fontSize: 18,fontWeight:'300',textAlign:'left'}}>Descubre nuestra gama de computadores diseñados para superar tus expectativas</Text>
              </View>
            <View style={{flex: 1,paddingVertical: 10, paddingHorizontal: 20,alignItems: 'center', justifyContent: 'center' }} >
                  <Image source={imagesaudifonos[currentIndex].uri} style={{ width: 150, height: 150, marginBottom: 10 }} />
                    <Text style={{fontSize: 20,color: '#0a58ca'}}>Audífonos </Text>
                    <Text style={{ fontSize: 18,fontWeight:'300',textAlign:'left'}}>Descubre nuestros audífonos de alta fidelidad que te transportarán a otra dimensión auditiva.</Text>
                </View>
          <View style={{flex: 1,paddingVertical: 10, paddingHorizontal: 20 ,alignItems: 'center', justifyContent: 'center'  }} >
          <Image source={imagestablet[currentIndex].uri} style={{ width: 250, height: 200, marginBottom: 10}} />
            <Text style={{fontSize: 20,color: '#0a58ca'}}>Tablet's</Text>
            <Text style={{fontSize: 18,fontWeight:'300',textAlign:'left'}}>Descubre nuestra selección de tablets que redefinen la movilidad y la versatilidad en cada uso.</Text>
        </View>
          <View style={{flex: 1,paddingVertical: 10, paddingHorizontal: 20,alignItems: 'center', justifyContent: 'center' }} >
          <Image source={imagesteclado[currentIndex].uri} style={{ width: 250, height: 200, marginBottom: 2 }} />
            <Text style={{fontSize: 20,color: '#0a58ca'}}>Teclados Gamers</Text>
            <Text style={{fontSize: 18,fontWeight:'300',textAlign:'left'}}>Conoce nuestra colección de teclados diseñados para brindarte precisión y confort en cada partida.</Text>
          </View>
      </ScrollView>
      <View style={{ backgroundColor: '#EFEFEF', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#555' }}>Copyright © 2023 Brand</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    width: Dimensions.get('window').width / 3, // Cambia 3 por el número de imágenes que tengas
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colContainer: {
    width: '48%', // Para dos columnas
    marginBottom: 20,
  },
});

export default Index;
