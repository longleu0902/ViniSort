import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';


const Detail = ({ route }) => {
    const navigate = useNavigation();
    const { data } = route.params;
    const dispath = useDispatch();
    // console.log(data);

    const [favouriter, setFavouriter] = useState(false);
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(data.price);

    const handleMoveCart = () => {
        const arr = {
            name : data.name ,
            img : data.img,
            price : +price ,
            amount : +amount
        }
        dispath(CartStore(arr))
        navigate.navigate('Cart');

    }

    const defaultBtnGroup = [
        {
            id: 1,
            size: '10',
            status: false
        },
        {
            id: 2,
            size: '14',
            status: false
        },
        {
            id: 3,
            size: '16',
            status: false
        },
    ]
    const [checkBtn, setCheckBtn] = useState(defaultBtnGroup);
    const handleClickSize = (id) => {
        let arr = [...defaultBtnGroup];
        const index = checkBtn.findIndex((item) => item.id == id);
        arr[index]['status'] = true;
        setCheckBtn(arr)
    }

    const handleIncrement = () => {
        let a = amount + 1
        setAmount(a);
        setPrice(a * data.price)
    }
    const handleDecrement = () => {
        let a = amount - 1
        if (a < 0) return 1;
        setAmount(a)
        setPrice(a * data.price)
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerLeft}>

                    <View style={styles.image}>
                        <Image source={data.img} />
                        <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                            <Image source={require('../Icon/Back.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={(prev) => setFavouriter(prev => !prev)}
                            style={[styles.menu,
                            { left: 350, backgroundColor: favouriter == true ? '#ccc' : '#fff' }
                            ]}>
                            <Image source={require('../Icon/favouriter.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
                <View style={{ gap: 25 }}>
                    {/* <View style={styles.image}>
                        <Image source={data.img} />
                    </View> */}
                    <View style={styles.address}>
                        <Image source={require('../Icon/logo.png')}></Image>
                        <Text>Restaurant</Text>
                    </View>
                    <View style={styles.introduction}>
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>{data.name}</Text>
                        <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Prosciutto e funghi is a pizza variety that is topped with tomato sauce.</Text>
                        <View style={{ flexDirection: 'row', gap: 50 }}>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Image source={require('../Icon/Star 1.png')} />
                                <Text style={{ fontWeight: 700 }}>4.7</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Image source={require('../Icon/Delivery.png')} />
                                <Text>Free</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Image source={require('../Icon/Clock.png')} />
                                <Text >20.min</Text>
                            </View>
                        </View>
                        <View style={styles.selectSize}>
                            <Text>SIZE:  </Text>
                            {checkBtn.map((item, index) => (
                                <Button
                                    key={index}
                                    onPress={() => handleClickSize(item.id)}
                                    buttonStyle={
                                        { width: 48, height: 48, borderRadius: 50 }
                                    }
                                    color={item.status == true ? '#F58D1D' : '#F0F5FA'}
                                    titleStyle={{ color: '#000' }}
                                >
                                    {item.size}
                                </Button>
                            ))}

                        </View>
                        <Text>Ingridents</Text>
                        <Button buttonStyle={
                            { width: 48, height: 48, borderRadius: 50 }
                        }
                            color='#F0F5FA'>

                        </Button>

                    </View>
                </View>

            </ScrollView>

            <View style={styles.addToCart}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 28 }}>${price}</Text>
                    <View style={styles.count}>
                        <Button
                            onPress={handleDecrement}
                            buttonStyle={{ borderRadius: 50, width: 30, height: 30 }}
                            titleStyle={{ lineHeight: 17 }}
                            color='#ccc'>
                            -
                        </Button>
                        <Text style={{ color: '#fff' }}>{amount}</Text>
                        <Button
                            onPress={handleIncrement}
                            buttonStyle={{ borderRadius: 50, width: 30, height: 30 }}
                            titleStyle={{ lineHeight: 17 }}
                            color='#ccc'>
                            +
                        </Button>
                    </View>
                </View>
                <Button
                    onPress={handleMoveCart}
                    buttonStyle={
                        {
                            height: 60,
                            borderRadius: 12
                        }
                    }
                    titleStyle={{ color: '#fff' }}
                    color="#FF7622">
                    ADD TO CART
                </Button>

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        backgroundColor: '#fff',
        gap: 20
    },
    header: {
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
        backgroundColor: '#fff',
        borderRadius: 50,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        left: 15,
        bottom: 0,
        top: 60,
    },
    body: {
        paddingHorizontal: 20,


    },
    image: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F0F5FA',
        borderRadius: 10,
        height: 330,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'

    },
    address: {
        width: 200,
        height: 47,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 20

    },
    introduction: {
        gap: 20
    },
    selectSize: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },

    scrollView: {
        gap: 10,

    },
    addToCart: {
        backgroundColor: '#F0F5FA',
        height: 200,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 20,
        paddingVertical: 20

    },
    count: {
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: 'center'
    }
})
export default Detail;