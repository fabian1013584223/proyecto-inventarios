import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,TextInput,Button, Modal, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;
const Bodega= () => {
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
            <TouchableOpacity onPress={() => navigation.navigate('Administracion')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Administracion</Text>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#FFF', marginBottom:1}} />
            <TouchableOpacity onPress={() => navigation.navigate('Bodega')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Bodega</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Caja')}>
              <Text style={{ color: '#FFF', marginBottom: 10 }}>Caja
              </Text>
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
          <Text style={{ color: '#0a58ca', fontSize: 24, textAlign: 'center'}}>Bodega</Text>
          <Text style={{ fontSize: 18,textAlign:'center'}}>Inicia sesión para poder ingresar a la administración de la empresa. </Text>
      </View>
      <View style={{ backgroundColor: '#FFF',alignSelf: 'center',padding: 2,borderRadius: 15, elevation: 2,width:'40%',alignItems: 'center'}}>
        <View style={{marginLeft:'180'}}>
        <Ionicons name="person-circle-outline" size={100} color="#0d6efd"  />
        </View>
            <View style={{ marginBottom: 10, width: '50%',alignSelf: 'center' }}>
            <TextInput 
              style={{borderWidth: 1,borderColor: '#0a58ca',borderRadius: 15,paddingHorizontal: 5,paddingVertical: 5,}} placeholder="Email" />
            </View>
          <View style={{ marginBottom: 10, width: '50%' ,alignSelf: 'center'}}>
            <TextInput
              style={{borderWidth: 1,borderColor: '#0a58ca',borderRadius: 15,paddingHorizontal: 5,paddingVertical: 5,}}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <View 
          style={{borderRadius:15,padding:10,color:"#0d6efd",backgroundColor: '#0d6efd'}}>
                <TouchableOpacity onPress={() => navigation.navigate('IndexBodega')}>
                    <Text>Login</Text>
                    </TouchableOpacity>
        </View >
        <View style={{height:20}}>
            <Text>Forgot your password?</Text></View>
          
      </View>

      </ScrollView>
      <View style={{ backgroundColor: '#EFEFEF', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#555' }}>Copyright © 2023 Brand</Text>
        {/* Redes sociales */}
        {/* Enlaces */}
      </View>N
    </View>
  );
};


export default Bodega;
