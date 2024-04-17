import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';




const PaymentSuccess = ({ route }) => {
    const navigate = useNavigation();
    const dispath = useDispatch();
    const getData = async () => {
        try {
            const arr = [];
            dispath(CartStore(arr))
            await AsyncStorage.setItem(`CartList`, JSON.stringify(arr));

        } catch (e) {
            console.error(e)
        }
    };
    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                        <Image source={require('../Icon/remove1.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <Image style={{ marginBottom: 20 }} source={require('../Icon/success.png')} />
                <Text style={{ fontSize: 24, fontWeight: 700 }}>Congratulations!</Text>
                <Text style={{ color: '#B0A9A2', fontSize: 16 }}>You successfully maked a payment, </Text>
                <Text style={{ color: '#B0A9A2', fontSize: 16 }}>enjoy our service!!</Text>
            </View>
        </View>




    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        gap: 20
    },

    header: {
        marginTop: 60,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'


    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    menu: {
        width: 45,
        height: 45,
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headerContent: {
        flexDirection: 'column'
    },
    body: {
        height: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    }
})

export default PaymentSuccess;