import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';



const AddCart = ({ route }) => {
    const navigate = useNavigation();
    const { total } = route.params;
    const { type } = route.params;

    console.log(type)


    const handlePressScreen = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi chạm vào màn hình
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={handlePressScreen}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                                    <Image source={require('../Icon/Back.png')} />
                                </TouchableOpacity>
                                <View style={styles.headerContent}>
                                    <Text style={{ color: '#1A1817', fontWeight: 500, fontSize: 20 }}>Add Card</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.body}>

                            <View style={styles.form}>
                                <Text style={{ color: '#A0A5BA', fontSize: 14 }}>Card holder name</Text>
                                <View style={styles.formStyle}>
                                    <TextInput placeholder='Card Name' />
                                </View>
                            </View>

                            <View style={styles.form}>
                                <Text style={{ color: '#A0A5BA', fontSize: 14 }}>Card number</Text>
                                <View style={styles.formStyle}>
                                    <TextInput keyboardType="numeric" placeholder='2134 _ _ _ _ _ _ _ _' />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <View style={[styles.form, { width: '47%' }]}>
                                    <Text style={{ color: '#A0A5BA', fontSize: 14 }}>expire date</Text>
                                    <View style={styles.formStyle}>
                                        <TextInput placeholder='mm/yyyy' />
                                    </View>
                                </View>
                                <View style={[styles.form, { width: '47%' }]}>
                                    <Text style={{ color: '#A0A5BA', fontSize: 14 }}>CVC</Text>
                                    <View style={styles.formStyle}>
                                        <TextInput placeholder='***' keyboardType="numeric" />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>




            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Total:
                        <Text style={{ fontSize: 25, color: "#000" }}>  ${total}</Text>
                    </Text>
                </View>

                <Button
                    // onPress={handleMoveCart}
                    buttonStyle={
                        {
                            height: 60,
                            borderRadius: 12
                        }
                    }
                    titleStyle={{ color: '#fff' }}
                    color="#FF7622">
                    ADD & MAKE PAYMENT
                </Button>

            </View>

        </>

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
    form: {
        gap: 15
    },
    formStyle: {
        height: 60,
        backgroundColor: '#F0F5FA',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    footer: {
        backgroundColor: '#fff',
        height: 200,
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 35,
        paddingVertical: 20,

    },
})

export default AddCart;