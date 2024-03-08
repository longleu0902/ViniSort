import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';



const Cart = () => {
    const navigate = useNavigation();
    const [total, setToltal] = useState(0)
    const cart = useSelector(state => state.cartReducer.CartStore);
    // console.log("check cart", cart);
    const dispath = useDispatch();

    const getTotal = () => {
        const _cart = [...cart];
        let toltal = _cart.reduce((a, b) => {
            return Number(a) + Number(b.price) * Number(b.amount)
        }, 0)
        setToltal(toltal)

    }
    useEffect(() => {
        getTotal();

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

    const handleIncrement = (id , size) => {
        const _cartList = [...cart]
        const Idx = _cartList.findIndex(item => item.id == id && item.size == size)
        _cartList[Idx] = { ..._cartList[Idx], amount: _cartList[Idx].amount + 1 }

        if (_cartList[Idx].amount == 0) {
            _cartList[Idx].amount = 1
        }
        // console.log("check cartlist" , _cartList)
        dispath(CartStore(_cartList));
    }

    const removeItem = (product) => {
        const _cartList = [...cart];
        const remove = _cartList.filter(item => item.id != product.id || item.size !== product.size);
        dispath(CartStore(remove));

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
                    {cart.map((item, index) => (
                        <View key={index} style={styles.body}>
                            <View style={styles.img}>
                                <Image style={{ width: 110, height: 100 }} source={item.img} />
                            </View>
                            <View style={styles.infomation}>
                                <View style={styles.info}>
                                    <View style={{ gap: 10 }}>
                                        <Text style={{ fontSize: 16, width: 120 }}>{item.name}</Text>
                                        <Text style={{ fontWeight: 700, fontSize: 20 }}>${item.price * item.amount}</Text>
                                        <Text style={{ fontSize: 16 }}>Size : {item.size}</Text>
                                    </View>
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


            <View style={styles.addToCart}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Delivery Address</Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#FF7622', textDecorationLine: 'underline', paddingRight: 10 }}
                        >EDIT</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 14, color: '#A0A5BA' }}>2118 Thornridge Cir. Syracuse</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Total:
                        <Text style={{ fontSize: 25, color: "#000" }}>  ${total}</Text>
                    </Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#FF7622', paddingRight: 10 }}
                        >Breakdown</Text>
                        <Image source={require('../Icon/Vector.png')} />
                    </TouchableOpacity>
                </View>

                <Button
                    onPress={()=>navigate.navigate('Payment',{total : total})}
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
        gap: 10
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
        width: '48%',
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
        height: 300,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 30,
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 35,
        paddingVertical: 20,

    },
})
export default Cart;