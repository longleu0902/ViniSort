import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database, auth } from '../config/firebaseConfig';
import { uid } from 'uid';
import { sendPasswordResetEmail } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Toast from '../Model/Toast';
import { fethData } from '../service/getDataUser'




const ForgotPassword = () => {
    const dispath = useDispatch();
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false)



    const [toast, showToast] = useState(false);
    const [title, setTitle] = useState('')



    const navigate = useNavigation();


    const validInput = (email) => {
        if (email == '' || email.length < 0) {
            setTitle('Please do not hesitate !!!')
            showToast(true)
            return false;
        }
        return true;
    }

    const handaleUpdate = async () => {
        Keyboard.dismiss()

        if (validInput(email) == false) return;
        try {
            setLoading(true)

            const check = await fethData(email.toLowerCase())

            if (!check) {
                setLoading(false)
                setTitle('Email is not exsit !!')
                showToast(true)
                setEmail('')
                return;
            }
            const userRecord = await sendPasswordResetEmail(auth, email);
            setLoading(false)
            setTitle('Recovery messages are sent via email !');
            showToast(true);
            setEmail('')

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.form}>

                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.input}
                                placeholder='Email' />
                        </View>
                    </View>

                    <Button
                        onPress={handaleUpdate}
                        buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                        color="#E53935">
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Sent</Text>
                    </Button>
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
        // justifyContent: 'center',
        marginHorizontal: 30,
        marginTop: 50,
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
        opacity: 0.7,

    }
})
export default ForgotPassword;