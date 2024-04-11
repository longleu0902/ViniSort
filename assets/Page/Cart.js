import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';
import { text } from '@fortawesome/fontawesome-svg-core';
import { fethData, UpdateData, fethDataValue } from '../service/getDataUser';
import Toast from '../Model/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Cart = () => {
    const navigate = useNavigation();
    const [total, setToltal] = useState(0)
    const cart = useSelector(state => state.cartReducer.CartStore);
    const user = useSelector(state => state.LoginReducer.payload.username)
    const [edit, setEdit] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toast, setToast] = useState('');

    // console.log("check cart", cart);
    const dispath = useDispatch();

    const getDataUser = async () => {
        const data = await fethDataValue(user)
        if (data && data.address && data.phone) {
            setAddress(data.address)
            setPhone(data.phone)
        }
    }

    const getTotal = () => {
        if(cart !== null){
            const _cart =  [...cart];
            let toltal = _cart.reduce((a, b) => {
                return Number(a) + Number(b.price) * Number(b.amount)
            }, 0)
            setToltal(toltal)
        }
   

    }
    useEffect(() => {
        getTotal();
        getDataUser();

    }, [cart]);

    const handleDecrement = (id, size) => {
        const _cartList = [...cart]
        const Idx = _cartList.findIndex(item => item.id == id && item.size == size)
        _cartList[Idx] = { ..._cartList[Idx], amount: _cartList[Idx].amount - 1 }

        if (_cartList[Idx].amount == 0) {
            _cartList[Idx].amount = 1
        }
        // console.log("check cartlist" , _cartList)
        dispath(CartStore(_cartList));
    }

    const handleIncrement = (id, size) => {
        const _cartList = [...cart]
        const Idx = _cartList.findIndex(item => item.id == id && item.size == size)
        _cartList[Idx] = { ..._cartList[Idx], amount: _cartList[Idx].amount + 1 }

        if (_cartList[Idx].amount == 0) {
            _cartList[Idx].amount = 1
        }
        // console.log("check cartlist" , _cartList)
        dispath(CartStore(_cartList));
    }

    const removeItem = async (product) => {
        const _cartList = [...cart];
        const remove = _cartList.filter(item => item.id != product.id || item.size !== product.size);
        await AsyncStorage.setItem(`CartList`, JSON.stringify(remove));
        dispath(CartStore(remove));



    }

    const handleMovePayment = () => {

        if (total == 0) {
            setShowToast(true)
            setToast("You don't have any orders")
            return;
        }
        if (address == '') {
            setShowToast(true)
            setToast("You don't have address")
            return;
        }
        if (phone == '') {
            setShowToast(true)
            setToast("You don't have number phone")
            return;
        }
        navigate.navigate('Payment', { total: total, address: address, phone: phone })
    }

    const handleSave = async () => {
        const userID = await fethData(user)
        await UpdateData(userID, {
            address: address,
            phone: phone
        })
        setEdit(prev => !prev)
    }
    const handleOpenEdit = () => {
        setEdit(prev => !prev)
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                            <Image source={require('../Icon/Back.png')} />
                        </TouchableOpacity>
                        <View style={styles.headerContent}>
                            <Text style={{ color: '#1A1817', fontWeight: 500, fontSize: 20 }}>Cart</Text>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {cart?.map((item, index) => (
                        <View key={index} style={styles.body}>
                            <TouchableOpacity onPress={() => navigate.navigate("Detail", { data: item })} style={styles.img}>
                                <Image style={{ width: 110, height: 100 }} source={{ uri: item.img }} />
                            </TouchableOpacity>
                            <View style={styles.infomation}>
                                <View style={styles.info}>
                                    <TouchableOpacity onPress={() => navigate.navigate("Detail", { data: item })} style={{ gap: 10 }}>
                                        <Text style={{ fontSize: 16, width: 120 }}>{item.name}</Text>
                                        <Text style={{ fontWeight: 700, fontSize: 20 }}>${item.price * item.amount}</Text>
                                        <Text style={{ fontSize: 16 }}>Size : {item.size}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => removeItem(item)}>
                                        <Image source={require('../Icon/remove.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={styles.count}>
                                        <Button
                                            onPress={() => handleDecrement(item.id, item.size)}
                                            titleStyle={{ lineHeight: 17, color: '#000', fontWeight: 700 }}
                                            color='#fff'>
                                            -
                                        </Button>
                                        <Text style={{ color: '#000', fontWeight: 700 }}>{item.amount}</Text>
                                        <Button
                                            onPress={() => handleIncrement(item.id, item.size)}
                                            titleStyle={{ lineHeight: 17, color: '#000', fontWeight: 700 }}
                                            color='#fff'>
                                            +
                                        </Button>
                                    </View>
                                </View>


                            </View>
                        </View>
                    ))}

                </ScrollView>
            </View>


            <View style={[styles.addToCart, { height: !edit ? 300 : "50%" }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {!edit && <>
                        <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Adress : {address}</Text>
                        <TouchableOpacity
                            onPress={() => handleOpenEdit()}>
                            <Text style={{ color: '#FF7622', textDecorationLine: 'underline', paddingRight: 10 }}
                            >EDIT</Text>
                        </TouchableOpacity>
                    </>}

                    {edit && <>
                        <TextInput
                            autoFocus={true}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            placeholder='Change to address'
                            style={{ width: '80%', backgroundColor: '#fff', borderRadius: 5, padding: 5 }}
                        />
                        <TouchableOpacity onPress={() => handleSave()}>
                            <Text style={{ color: '#FF7622', textDecorationLine: 'underline', paddingRight: 10 }}
                            >Save</Text>
                        </TouchableOpacity>

                    </>}


                </View>
                {!edit &&
                    <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Phone : {phone}</Text>
                }
                {edit &&
                    <TextInput
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        placeholder='Phone'
                        style={{ width: '80%', backgroundColor: '#fff', borderRadius: 5, padding: 5 }}
                    />
                }

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Total:
                        <Text style={{ fontSize: 25, color: "#000" }}>  ${total}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => navigate.navigate('MyOders')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#FF7622', paddingRight: 10 }}
                        >Breakdown</Text>
                        <Image source={require('../Icon/Vector.png')} />
                    </TouchableOpacity>
                </View>

                <Button
                    onPress={() => handleMovePayment()}
                    buttonStyle={
                        {
                            height: 60,
                            borderRadius: 12
                        }
                    }
                    titleStyle={{ color: '#fff' }}
                    color="#FF7622">
                    PLACE ORDER
                </Button>

            </View>
            {showToast && <Toast show={setShowToast} title={toast} />}


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
    body: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15

    },
    info: {
        flexDirection: 'row',
        gap: 30
    },
    img: {
        backgroundColor: '#ccc',
        width: '46%',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 10

    },
    infomation: {
        width: '50%',
        flex: 'column',
        justifyContent: 'space-around'
    },
    count: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        width: 150,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    addToCart: {
        backgroundColor: '#F0F5FA',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 30,
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 35,
        paddingVertical: 20,

    },
})
export default Cart;