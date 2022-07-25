import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import usuariosActions from '../redux/actions/usuariosActions';
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';

export default function SignUp() {
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [imagen, setImagen] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const signUpSubmit = async () => {
		const data = {
			nombre: nombre,
			apellido: apellido,
			email: email,
			contraseña: password,
			imagen: imagen,
			from: "formulario-registro"
		}
		let res = await dispatch(usuariosActions.registrarse(data))
        let errorSignUp = res.data.message
        if (res.data.from === "validator") {
            errorSignUp.forEach(e => {
							Toast.show({
								type: 'error',
								text1: 'Ingreso incorrecto de datos',
								text2: e.message
							});
            })
        }else{
					if (res?.data.success) {
						Toast.show({
							type: 'success',
							text1: 'Registro exitoso',
							text2: res.data.message
						});
						navigation.navigate('inicio de sesión')

					} else {
						Toast.show({
							type: 'error',
							text1: 'Registro incorrecto',
							text2: res.data.message
						});
					}
				} 
	}
	return (
		<ScrollView style={styles.container}>
			<LinearGradient
			style={styles.top}
        // Button Linear Gradient
        colors={['#e7a696', '#e79985', '#ee947d']}
				>
					<Text style={styles.titleCircle}>Querés iniciar sesión?</Text>
					<Text style={styles.subtitleCircle}>Iniciá sesión para seguir regalando momentos inolvidables</Text>
					<TouchableOpacity onPress={() => navigation.navigate('inicio de sesión')}>
						<Text style={styles.buttonCircle}>Inicia Sesión</Text>
					</TouchableOpacity>
				</LinearGradient>
				<TextInput
        style={styles.form}
        onChangeText={setNombre}
        value={nombre}
        placeholder="Nombre"
      />
			<TextInput
        style={styles.form}
        onChangeText={setApellido}
        value={apellido}
        placeholder="Apellido"
      />
			<TextInput
        style={styles.form}
        onChangeText={setImagen}
        value={imagen}
        placeholder="Imagen"
      />
			<TextInput
        style={styles.form}
        onChangeText={setEmail}
        value={email}
        placeholder="Email address"
      />
			<TextInput
        style={styles.form}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
				secureTextEntry={true}
      />

			<TouchableOpacity onPress={signUpSubmit}>
				<Text style={styles.button}>Registrate</Text>
			</TouchableOpacity>
			
		</ScrollView>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
	form:{
		alignSelf: 'center',
		marginBottom: 20,
		backgroundColor: '#f0f0f0',
		padding: 10,
		paddingLeft: 10,
		borderRadius: 30,
		width: '80%',
		
	},
	top:{
		alignSelf: 'flex-end',
		alignItems: 'center',	
		width: 300,
		height: 300,
		padding: 10,
		backgroundColor: 'red',
		borderBottomLeftRadius: 300,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		marginBottom: 20,
	},
	button:{
		alignSelf: 'center',
		backgroundColor: '#111827',
		color: 'white',
		padding: 10,
		fontSize: 17,
		borderRadius: 10,
		marginBottom: 100,
	},
	titleCircle:{
		marginTop: 30,
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	subtitleCircle:{
		marginTop: 5,
		textAlign: 'center',
		color: 'white',
		fontSize: 14,
	},
	buttonCircle:{
		marginTop: 10,
		alignSelf: 'center',
		color: 'white',
		padding: 7,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 10,
	}
});