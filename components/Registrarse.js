import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const menuHeight = windowHeight * 10;

const Registrarse = () => {
    const url = 'https://localhost:7028/api/authentication';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roles, setRoles] = useState('');
    const navigation = useNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const validar = async () => {
        const usuario = {
            FirstName: firstName,
            LastName: lastName,
            UserName: userName,
            Password: password,
            Email: email,
            PhoneNumber: phoneNumber,
            Roles: roles,
        };

        try {
            await axios.post(url, usuario);
            show_alerta('Usuario registrado exitosamente');
            clearFields();
        } catch (error) {
            if (error.response) {
                show_alerta('Error al registrar el usuario: ' + error.response.data.message);
            } else {
                show_alerta('Error al registrar el usuario: ' + error.message);
            }
            console.error(error);
        }
    };

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setUserName('');
        setPassword('');
        setEmail('');
        setPhoneNumber('');
        setRoles('');
    };

    const show_alerta = (mensaje) => {
        Alert.alert(
            'Mensaje',
            mensaje,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
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
                        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                            <Text style={{ color: '#FFF', marginBottom: 10 }}>Inicio</Text>
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
            <ScrollView style={{ padding: 20 }}>
                <View style={{ marginBottom: 40 }}>
                    <Text style={{ color: '#0a58ca', fontSize: 24, textAlign: 'center' }}>Registrate</Text>
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Ingresa tus datos y disfruta de una experiencia mas agradable. </Text>
                </View>
                <View style={{ padding: 20, flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', maxWidth: 300, paddingTop: '0px', marginTop: '-30px' }}>
                        <Text style={{ fontWeight: '250', fontSize: 18 }}>Nombre:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5, color: '#000000' }}
                            placeholder="Digite su nombre"
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                        />
                        <Text style={{ fontWeight: '250', fontSize: 18, color: '#000000' }}>Apellido:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5 }}
                            placeholder="Digite su apellido"
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                        <Text style={{ fontWeight: '250', fontSize: 18, color: '#000000' }}>Nombre de usuario:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5 }}
                            placeholder="Digite un nombre de usuario"
                            value={userName}
                            onChangeText={text => setUserName(text)}
                        />
                        <Text style={{ fontWeight: '250', fontSize: 18, color: '#000000' }}>Contraseña:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5 }}
                            placeholder="Digite una contraseña válida"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                        />
                        <Text style={{ fontWeight: '250', fontSize: 18, color: '#000000' }}>Correo electrónico:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5 }}
                            placeholder="Digite su email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <Text style={{ fontWeight: '250', fontSize: 18, color: '#000000' }}>Número de teléfono:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5 }}
                            placeholder="Digite su número de teléfono"
                            value={phoneNumber}
                            onChangeText={text => setPhoneNumber(text)}
                        />
                        <Text style={{ fontWeight: '250', fontSize: 18, color: '#000000' }}>Roles:</Text>
                        <TextInput
                            style={{ height: 40, borderWidth: 1, marginBottom: 20, borderRadius: 6, paddingLeft: 5 }}
                            placeholder="Seleccione un rol"
                            value={roles}
                            onChangeText={text => setRoles(text)}
                        />
                        <Button
                            title="Guardar"
                            onPress={validar}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: '#EFEFEF', padding: 20 }}>
                <Text style={{ textAlign: 'center', color: '#555' }}>Copyright © 2023 Brand</Text>
            </View>
        </View>
    );
};

export default Registrarse;