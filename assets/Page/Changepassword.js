import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database, auth } from '../config/firebaseConfig';
import { uid } from 'uid';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import Toast from '../Model/Toast';




const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [toast, showToast] = useState(false);
    const [title, setTitle] = useState('')




    const validInput = (password, newPassword) => {
        if (newPassword == '' || newPassword.length < 0 || password == '') {
            setTitle('Please enter in full !!')
            showToast(true)
            return false;
        }
        if (newPassword.length < 6) {
            setTitle('Password must be more than 6 characters long')
            showToast(true)
            return false;
        }
        return true;
    }

    const handaleUpdate = async () => {
        Keyboard.dismiss()

        if (validInput(password, newPassword) == false) return;
        if (newPassword !== rePassword) {
            setTitle('Password not the same !!')
            showToast(true)
            return;
        }
        try {
            setLoading(true)
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                user.email,
                password
            )

            const result = await reauthenticateWithCredential(
                user,
                credential
            )

            if (!result) return;

            await updatePassword(user, newPassword)
            setLoading(false)
            setTitle('Update Success!!');
            showToast(true);
            setNewPassword('');
            setPassword('');
            setRePassword('');

        } catch (error) {
            // console.error(error);
            setLoading(false)
            setTitle('Old password is incorrect!!')
            showToast(true)
            setNewPassword('');
            setPassword('');
            setRePassword('');
        }
    }



    return (
        <>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.form}>

                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder='Password' />
                        </View>
                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>New Password</Text>
                            <TextInput
                                value={newPassword}
                                onChangeText={(text) => setNewPassword(text)}
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder='New Password' />
                        </View>
                        <View style={styles.formItem}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Re-New password</Text>
                            <TextInput
                                value={rePassword}
                                onChangeText={(text) => setRePassword(text)}
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder='Re-password' />
                        </View>
                    </View>

                    <Button
                        onPress={handaleUpdate}
                        buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                        color="#E53935">
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Update</Text>
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
export default ChangePassword;