
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './components/Index';
import Nosotros from './components/Nosotros';
import Productos from './components/Productos';
import Administracion from './components/Administracion';
import Bodega from './components/Bodega';
import Caja from './components/Caja';
import InicioSesion from './components/InicioSesion';
import Registrarse from './components/Registrarse';
import IndexAdmin from './components/IndexAdmin';
import IndexBodega from './components/IndexBodega';
import IndexCaja from './components/IndexCaja';
import ShowUsuarios from './components/ShowUsuarios';
import ShowCliente from './components/ShowCliente';
import ShowStock from './components/ShowStock';
import ShowProveedor from './components/ShowProveedor';
import Categoria from './components/Categoria';
import ShowProductos from './components/ShowProductos';
import ShowMetodoPago from './components/ShowMetodoPago';
import IndexFacturas from './components/IndexFacturas';
import ShowFacturaCliente from './components/ShowFacturaCliente';
import ShowFacturaProveedor from './components/ShowFacturaProveedor';
import ShowPrecio from './components/ShowPrecio';
import ShowDetalleFacturaProveedor from './components/ShowDetalleFacturaProveedor';
import ShowDetalleFacturaCliente from './components/ShowDetalleFacturaCliente'; 

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Index" component={Index} 
        options={{ headerShown: false, title: "Index" }}/>
        <Stack.Screen name="Nosotros" component={Nosotros}
        options={{ headerShown: false, title: "Nosotros" }} />
        <Stack.Screen name="Productos" component={Productos}
        options={{ headerShown: false, title: "Productos" }} />
        <Stack.Screen name="Administracion" component={Administracion} 
        options={{ headerShown: false, title: "Administracion" }}/>
        <Stack.Screen name="Bodega" component={Bodega}
        options={{ headerShown: false, title: "Bodega" }} />
       <Stack.Screen name="Caja" component={Caja}
        options={{ headerShown: false, title: "Caja" }} />
        <Stack.Screen name="InicioSesion" component={InicioSesion}
        options={{ headerShown: false, title: "Inicio Sesion" }} />
        <Stack.Screen name="Registrarse" component={Registrarse}
        options={{ headerShown: false, title: "Registrarse" }} />
        <Stack.Screen name="IndexAdmin" component={IndexAdmin}
        options={{headerShown: false, title: "Index Administracion"}}/>
        <Stack.Screen name="IndexBodega" component={IndexBodega}
        options={{headerShown: false, title: "Index Bodega"}}/>
        <Stack.Screen name="IndexCaja" component={IndexCaja}
        options={{headerShown: false, title: "Index Caja"}}/>
         <Stack.Screen name="ShowUsuarios" component={ShowUsuarios}
        options={{headerShown: false, title: "ShowUsuarios"}}/>
        <Stack.Screen name="ShowCliente" component={ShowCliente}
        options={{headerShown: false, title: "ShowCliente"}}/>
         <Stack.Screen name="ShowStock" component={ShowStock}
        options={{headerShown: false, title: "ShowStock"}}/>
        <Stack.Screen name="ShowProveedor" component={ShowProveedor}
        options={{headerShown: false, title: "ShowProveedor"}}/>
        <Stack.Screen name="Categoria" component={Categoria}
        options={{headerShown: false, title: "Categoria"}}/>
        <Stack.Screen name="ShowProductos" component={ShowProductos}
        options={{headerShown: false, title: "ShowProductos"}}/>
        <Stack.Screen name="ShowFacturaProveedor" component={ShowFacturaProveedor}
        options={{headerShown: false, title: "ShowFacturaProveedor"}}/>
        <Stack.Screen name="ShowMetodoPago" component={ShowMetodoPago}
        options={{headerShown: false, title: "ShowMetodoPago"}}/>
        <Stack.Screen name="IndexFacturas" component={IndexFacturas}
        options={{headerShown: false, title: "IndexFacturas"}}/>
        <Stack.Screen name="ShowFacturaCliente" component={ShowFacturaCliente}
        options={{headerShown: false, title: "ShowFacturaCliente"}}/>
        <Stack.Screen name="ShowPrecio" component={ShowPrecio}
        options={{headerShown: false, title: "ShowPrecio"}}/>
        <Stack.Screen name="ShowDetalleFacturaProveedor" component={ShowDetalleFacturaProveedor}
        options={{headerShown: false, title: "ShowDetalleFacturaProveedor"}}/>
        <Stack.Screen name="ShowDetalleFacturaCliente" component={ShowDetalleFacturaCliente}
        options={{headerShown: false, title: "ShowDetalleFacturaCliente"}}/>
      </Stack.Navigator>
        
      

      
    </NavigationContainer>
  );
}

export default App;