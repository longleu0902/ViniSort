import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { database, auth } from '../config/firebaseConfig';
import { uid } from 'uid';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../Redux/LoginReducer';
import Toast from '../Model/Toast';
import { listStore } from '../Redux/productReducer';



const Login = () => {
    const dispath = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [toast, showToast] = useState(false);
    const [title, setTitle] = useState('')



    const navigate = useNavigation();

    const handleSignIn = async () => {
        // set(ref(database, 'users/3'), {
        //     name: 'long'
        // })
        //     .then(() => {
        //         // Data saved successfully!
        //         console.log('ok')
        //     })
        //     .catch((error) => {
        //         // The write failed...
        //         console.error(error)
        //     });
        const checkValid = validInput(email, password);
        if (checkValid) {
            try {
                const user = await signInWithEmailAndPassword(auth, email, password)
                const tokenResponse = await user.user.getIdToken();
                if (tokenResponse) {
                    const setAuth = {
                        username: email,
                        token: tokenResponse,
                        isAuthentication: true,
                    }
                    const data = await get(ref(database, 'product'))
                    dispath(listStore(data.val()))
                    dispath(setLogin(setAuth))
                    navigate.navigate('Home')
                }
            } catch (error) {
                console.log(error)
                setTitle('Sorry,account or password is incorrect !')
                showToast(true)
            }
        } else {
            setTitle('Please enter in full');
            showToast(true)
        }
    }

    const validInput = (email, password) => {
        if (email == '' || email.length < 0 || password == '' || password.length < 6)
            return false;
        return true;
    }



    return (
        <>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ width: 219, gap: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: 700 }}>Just <Text style={{ color: "#F44336" }}>Sign in</Text>
                            <Text> ,we’ll  prepar your order</Text>
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>If you don’t have an account please
                            <Text style={{ color: "#F44336" }}> Sign up here</Text>
                        </Text>

                    </View>

                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Email address</Text>
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.input}
                                placeholder='Email' />
                        </View>
                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder='Password' />
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, color: '#939393', marginTop: 10 }}>Forgot password ?</Text>
                        </View>
                    </View>

                    <Button
                        onPress={handleSignIn}
                        buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                        color="#E53935">
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>SIGN IN</Text>
                    </Button>

                    <View style={styles.connect}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, marginVertical: 30 }}>Or</Text>
                        </View>
                        <Button
                            onPress={() => navigate.navigate("Home")}
                            buttonStyle={{ borderRadius: 12, paddingVertical: 17, borderWidth: 2, borderColor: '#9F9F9F', gap: 10 }}
                            color="#fff">
                            <Image source={require('../Icon/facebook.png')} />
                            <Text style={{ fontSize: 14, color: '#000' }}>Connect with facebook</Text>
                        </Button>
                        <Button
                            buttonStyle={{ borderRadius: 12, paddingVertical: 17, borderWidth: 2, borderColor: '#9F9F9F', gap: 10 }}
                            color="#fff">
                            <Image source={require('../Icon/google.png')} />
                            <Text style={{ fontSize: 14, color: '#000' }}>Connect with Google</Text>
                        </Button>
                    </View>
                </View>
            </View>
            {toast && <Toast show={showToast} title={title} />}
        </>




    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        position: 'relative'


    },
    body: {
        flexDirection: 'column',
        gap: 30

    },
    formItem: {
        gap: 8
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderColor: '#DEDEDE',
        backgroundColor: '#DEDEDE'
    },
    connect: {
        gap: 20
    }
})
export default Login;