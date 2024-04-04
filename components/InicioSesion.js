import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity,Dimensions, Modal, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;
const Login = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    UserName: '',
    Password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7028/api/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Acceso éxitoso:', data);
        if (data.role === 'Administrador') {
          navigation.navigate('IndexAdmin');
        } else if (data.role === 'Cajero') {
          navigation.navigate('IndexCaja');
        } else if (data.role === 'Bodega') {
          navigation.navigate('IndexBodega');
        } else {
          navigation.navigate('IndexAdmin');
        }
      } else {
        console.error('Error durante el acceso:', data);
        if (response.status === 401) {
          setLoginError('Usuario o contraseña incorrectos');
        } else {
          setLoginError('Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error durante el acceso:', error);
      setLoginError('Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
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
          <TouchableOpacity onPress={() => navigation.navigate('Derechos')}>
            <Text style={{ color: '#FFF', marginBottom: 10 }}>Derechos</Text>
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
      <View style={{ marginBottom: 40 }}>
        <Text style={{ color: '#0a58ca', fontSize: 24, textAlign: 'center'}}>Administrador</Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Inicia sesión para poder ingresar a la administración de la empresa. </Text>
      </View>

      <View style={styles.container}>
        <Ionicons name="person-circle-outline" size={80} color="#0a58ca" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={userData.UserName}
          onChangeText={text => handleInputChange('UserName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={userData.Password}
          onChangeText={text => handleInputChange('Password', text)}
        />
        <Button title="Acceder" onPress={handleLogin} />
        {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
      </View>
      <View style={{ backgroundColor: '#EFEFEF', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#555' }}>Copyright © 2023 Brand</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '35%',
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderColor: '#0a58ca',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '95%',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  icon: {
    marginBottom: 20,
  },
});

export default Login;