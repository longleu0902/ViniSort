import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { database, auth } from '../config/firebaseConfig';
import Toast from '../Model/Toast';
import { Render } from '../Redux/RenderReducer'

interface DataApi {
    id: string,
    cvc: string,
    day: string,
    name: string,
    number : string ,
    type : string
}


const AddCart = ({ route }) => {
    const dispath = useDispatch();
    const navigate = useNavigation<any>();
    const { total } = route.params;
    const { type } = route.params;
    const [showToast, setShowToast] = useState(false);
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [day, setDay] = useState('')
    const [cvc, setCvc] = useState('')


    const validForm = (name, number, day, cvc) => {
        if (!name || !number || !day || !cvc) {
            setShowToast(true)
            setTitle('You do not have enough information !! ')
            return false
        }
        return true
    }


    // Check exsits card from database
    const getCard = async () => {
        try {
            const reponse = await get(ref(database, 'cards'))
            const data = reponse.val();
            if (data == null) return false
            const dataArray: DataApi[] = Object.values(data);
            const check = dataArray.some(item => item.number == number && item.type == type.type)
            if (check) {
                setShowToast(true);
                setTitle('Your card number is exsit !!')
            }
            return check

        } catch (err) {
            console.error(err)
        }

    }


    const handleAddCart = async () => {
        const checkValid = validForm(name, number, day, cvc);
        const checkCard = await getCard();
        if (checkValid == false) return;
        if (checkCard) return;
        try {
            await set(ref(database, 'cards/' + uid()), {
                id: uid(),
                name: name,
                number: number,
                day: day,
                type: type.type,
                cvc: cvc
            })
            setShowToast(true)
            setName('');
            setNumber('');
            setDay('');
            setCvc('')
            setTitle(' Success !! ')
            dispath(Render(uid()))

            setTimeout(() => {
                navigate.navigate('Payment', { total: total })

            }, 1000);


        } catch (err) {
            console.error(err)
        }

    }

    const handlePressScreen = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi chạm vào màn hình
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={handlePressScreen}>
                <View style={{ flex: 1, position: 'relative' }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                                    <Image source={require('../Icon/Back.png')} />
                                </TouchableOpacity>
                                <View style={styles.headerContent}>
                                    <Text style={{ color: '#1A1817', fontWeight: "500", fontSize: 20 }}>Add Card</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.body}>

                            <View style={styles.form}>
                                <Text style={{ color: '#A0A5BA', fontSize: 14 }}>Card holder name</Text>
                                <View style={styles.formStyle}>
                                    <TextInput
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                        style={{ width: '100%', height: '100%' }}
                                        placeholder='Card Name' />
                                </View>
                            </View>

                            <View style={styles.form}>
                                <Text style={{ color: '#A0A5BA', fontSize: 14 }}>Card number</Text>
                                <View style={styles.formStyle}>
                                    <TextInput
                                        value={number}
                                        onChangeText={(text) => setNumber(text)}
                                        style={{ width: '100%', height: '100%' }}
                                        keyboardType="numeric" placeholder='2134 _ _ _ _ _ _ _ _' />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <View style={[styles.form, { width: '47%' }]}>
                                    <Text style={{ color: '#A0A5BA', fontSize: 14 }}>expire date</Text>
                                    <View style={styles.formStyle}>
                                        <TextInput
                                            value={day}
                                            onChangeText={(text) => setDay(text)}
                                            style={{ width: '100%', height: '100%' }}
                                            maxLength={7}
                                            placeholder='mm/yyyy' />
                                    </View>
                                </View>
                                <View style={[styles.form, { width: '47%' }]}>
                                    <Text style={{ color: '#A0A5BA', fontSize: 14 }}>CVC</Text>
                                    <View style={styles.formStyle}>
                                        <TextInput
                                            value={cvc}
                                            onChangeText={(text) => setCvc(text)}
                                            style={{ width: '100%', height: '100%' }}
                                            maxLength={3}
                                            placeholder='***'
                                            keyboardType="numeric" />
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
                    onPress={handleAddCart}
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

            {showToast && <Toast show={setShowToast} title={title} />}

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
    body : {
        
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