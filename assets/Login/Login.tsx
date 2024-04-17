import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { database, auth } from '../config/firebaseConfig';
import { uid } from 'uid';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../Redux/LoginReducer';
import Toast from '../Model/Toast';
import { listStore } from '../Redux/productReducer';



const Login = () => {
    const dispath = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('')

    const [showSignUp, setShowSignUp] = useState(false);

    const [loading, setLoading] = useState(false)



    const [toast, showToast] = useState(false);
    const [title, setTitle] = useState('')



    const navigate = useNavigation<any>();

    const handleSignIn = async () => {
        Keyboard.dismiss()
        const checkValid = validInput(email, password);
        if (checkValid) {
            setLoading(true)
            try {
                const user = await signInWithEmailAndPassword(auth, email, password)
                const tokenResponse = await user.user.getIdToken();
                if (tokenResponse) {
                    const setAuth = {
                        username: email.toLowerCase(),
                        token: tokenResponse,
                        isAuthentication: true,
                        img : ''
                    }
                    const data = await get(ref(database, 'product'))
                    dispath(listStore(data.val()))
                    dispath(setLogin(setAuth))
                    setEmail('')
                    setPassword('')
                    navigate.navigate('Home')
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                setEmail('')
                setPassword('')
                setTitle('Sorry,account or password is incorrect !')
                showToast(true)

            }
        } else {
            setEmail('')
            setPassword('')
        }
    }

    const validInput = (email, password) => {
        if (email == '' || email.length < 0 || password == '') {
            setTitle('Please enter in full !!')
            showToast(true)
            return false;
        }
        if (password.length < 6) {
            setTitle('Password must be more than 6 characters long')
            showToast(true)
            return false;
        }
        return true;
    }

    const handleSignUp = async () => {
        Keyboard.dismiss()
        if (validInput(email, password) == false) return;
        if (password !== rePassword) {
            setTitle('Password not the same !!')
            showToast(true)
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await set(ref(database, 'users/' + uid()), {
                id: uid(),
                username: email.toLowerCase()
            })
            setTitle('Sign Up Success!!');
            showToast(true);
            setEmail('');
            setPassword('');
            setRePassword('');

        } catch (error) {
            // console.error(error);
            setTitle('Email already exists or Malformed !!')
            showToast(true)
            setEmail('');
            setPassword('');
            setRePassword('');
        }
    }



    return (
        <>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ width: 219, gap: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700" }}>Just <Text style={{ color: "#F44336" }}>{!showSignUp ? 'Sign in' : 'Sign up'}</Text>
                            <Text> ,we’ll  prepar your order</Text>
                        </Text>
                        {!showSignUp && <Text style={{ fontSize: 16, fontWeight: "500" }}>If you don’t have an account please
                            <TouchableOpacity onPress={() => setShowSignUp(true)}>
                                <Text style={{ color: "#F44336" }}> Sign up here</Text>
                            </TouchableOpacity>
                        </Text>}
                    </View>


                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>Email address</Text>
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.input}
                                placeholder='Email' />
                        </View>
                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder='Password' />
                        </View>
                        {showSignUp &&
                            <View style={styles.formItem}>
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>Re-password</Text>
                                <TextInput
                                    value={rePassword}
                                    onChangeText={(text) => setRePassword(text)}
                                    secureTextEntry={true}
                                    style={styles.input}
                                    placeholder='Re-password' />
                            </View>

                        }


                        {!showSignUp &&
                            <TouchableOpacity onPress={()=>navigate.navigate('ForgotPassword')} style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 16, color: '#939393', marginTop: 10 }}>Forgot password ?</Text>
                            </TouchableOpacity>
                        }

                    </View>

                    {!showSignUp &&
                        <Button
                            onPress={handleSignIn}
                            buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                            color="#E53935">
                            <Text style={{ fontSize: 16, fontWeight: "700", color: '#fff' }}>SIGN IN</Text>
                        </Button>
                    }

                    {showSignUp &&
                        <>
                            <Button
                                onPress={handleSignUp}
                                buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                                color="#E53935">
                                <Text style={{ fontSize: 16, fontWeight: "700", color: '#fff' }}>SIGN UP</Text>
                            </Button>
                            <Button
                                onPress={() => setShowSignUp(false)}
                                buttonStyle={{ borderRadius: 12, paddingVertical: 23, borderWidth:2 , borderColor:'#ccc' }}
                                color="#fff">
                                <Text style={{ fontSize: 16, fontWeight: "700", color: '#000'  }}>Back to SIGN IN</Text>
                            </Button>
                        </>

                    }


                    {!showSignUp && <View style={styles.connect}>
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
                    </View>}

                </View>
            </View>
            {toast && <Toast show={showToast} title={title} />}
            {loading && <View style={styles.loadding}>
                <ActivityIndicator size="large" />
            </View>}


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
    },
    loadding: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        opacity: 0.7

    },
    form : {

    }
})
export default Login;