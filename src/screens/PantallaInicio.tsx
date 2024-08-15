import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../navigator/StackNavigator';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR } from '../commons/constant';
import { BodyComponent } from '../components/BodyComponent';
import { InputComponent } from '../components/InputComponent';
import { styles } from '../../theme/appTheme';
import { ButtonComponent } from '../components/ButtonComponent';


//interface - props
interface Props {
    users: User[]
}

//interface - objeto
interface FormLogin {
    email: string;
    password: string;
}

export const LoginScreen = ({ users }: Props) => {
    //hook useState: manipular el estado del formulario
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });
    //hook useState: permitir que se haga visible/no visible el contenido del password
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //hook useNavigation(): navega de una pantalla a otra
    const navigation = useNavigation();

    //función para actualizar el estado del formulario
    const handleSetValues = (name: string, value: string) => {
        //Cambiar el estado del formLogin
        //... operador de propagación | spread: crear una copia del objeto
        setFormLogin({ ...formLogin, [name]: value });
    }

    //función para iniciar sesión
    const handleSignIn = () => {
        //Validando que los campos estén llenos
        if (!formLogin.email || !formLogin.password) {
            Alert.alert(
                'Error',
                'Por favor, ingrese valores en todos los campos!'
            );
            return;
        }
        //Validando que el usuario exista
        if (!verifyUser()) {
            Alert.alert(
                'Error',
                'Correo y/o contraseña incorrecta!'
            );
            return;
        }
        //Si inicio sesión sin problemas, vamos al Home Screen
        navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
        //console.log(formLogin);

    }

    //función verificar si existe el correo y contraseña (usuario)
    const verifyUser = (): User => {
        const existUser = users.filter(user => user.email === formLogin.email && user.password === formLogin.password)[0];
        return existUser;
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            
            <BodyComponent>
                <View>
                    <Text style={styles.titleHeaderBody}>Bienvenido de nuevo!</Text>

                    <Text style={styles.textBody}>Realiza tus compras de manera rápida y segura</Text>
                </View>
                <View style={styles.contentInput}>
                    <InputComponent
                        placeholder='Correo'
                        handleSetValues={handleSetValues}
                        name='email' />
                    <InputComponent
                        placeholder='Contraseña'
                        handleSetValues={handleSetValues}
                        name='password'
                        isPassword={hiddenPassword}
                        hasIcon={true}
                        setHiddenPaswword={() => setHiddenPassword(!hiddenPassword)} />
                </View>
                <ButtonComponent textButton='Iniciar' onPress={handleSignIn} />
                <TouchableOpacity
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
                    <Text style={styles.textRedirection}>No tienes una cuenta? Regístrate ahora</Text>
                </TouchableOpacity>
            </BodyComponent>
        </View>
    )
}