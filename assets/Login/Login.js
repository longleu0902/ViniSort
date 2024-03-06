import { Button } from '@rneui/base';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Login = () => {

    const navigate = useNavigation();

    const handleSignIn = () => {
        navigate.navigate('Home')
    }


    return (
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
                        <TextInput style={styles.input} placeholder='Email' />
                    </View>
                    <View style={styles.formItem}>
                        <Text style={{ fontSize: 16, fontWeight: 600 }}>Password</Text>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' />
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



    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,


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