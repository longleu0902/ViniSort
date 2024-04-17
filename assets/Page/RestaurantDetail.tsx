import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';
import { uid } from 'uid';


const Restaurant = ({ route }) => {
    const navigate = useNavigation<any>();
    // const { data } = route.params;
    const dispath = useDispatch();
    const cart: any = useSelector<any>(state => state.cartReducer.CartStore);
    const [favouriter, setFavouriter] = useState(false);

    const defaultBtnGroup = [
        {
            id: 1,
            name: 'Burger',
            status: false
        },
        {
            id: 2,
            name: 'SandWicd',
            status: false
        },
        {
            id: 3,
            name: 'Pizza',
            status: false
        },
        {
            id: 4,
            name: 'Pizza',
            status: false
        },
        {
            id: 5,
            name: 'Burger',
            status: false
        },
    ]
    const [checkBtn, setCheckBtn] = useState(defaultBtnGroup);
    const handleClickTag = (id) => {
        let arr = [...defaultBtnGroup];
        const index = checkBtn.findIndex((item) => item.id == id);
        arr[index]['status'] = true;
        setCheckBtn(arr)
    }
    const listFastFood = [
        {
            id: 1,
            img: require('../Image/burger.png'),
            name: 'european Pizza',
            status: 'Peppe Pizzeria',

        },
        {
            id: 2,
            img: require('../Image/pizza.png'),
            name: 'Buffalo Pizza',
            status: 'Fratelli Figurato',

        },
    ]


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerLeft}>

                    <View style={styles.image}>
                        <Image style={{ width: '100%' }} source={require('../Image/Rectangle 15.png')} />
                        <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                            <Image source={require('../Icon/Back.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={(prev) => setFavouriter(prev => !prev)}
                            style={[styles.menu,
                            { left: 350, backgroundColor: favouriter == true ? '#ccc' : '#fff' }
                            ]}>
                            <Text style={{ fontSize: 20, lineHeight: 17 }}>...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
                <View style={{ gap: 25 }}>
                    <View style={styles.introduction}>
                        <View style={{ flexDirection: 'row', gap: 50 }}>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Image source={require('../Icon/Star 1.png')} />
                                <Text style={{ fontWeight: "700" }}>4.7</Text>
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
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>Jollor Rice & Chicken</Text>
                        <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.selectTag}>
                                {checkBtn.map((item, index) => (
                                    <Button
                                        key={index}
                                        onPress={() => handleClickTag(item.id)}
                                        buttonStyle={
                                            { paddingHorizontal: 20, height: 50, borderRadius: 50, borderWidth: 1, borderColor: '#ccc' }
                                        }
                                        color={item.status == true ? '#F58D1D' : '#fff'}
                                        titleStyle={{ color: '#000' }}
                                    >
                                        {item.name}
                                    </Button>
                                ))}

                            </View>

                        </ScrollView>


                        <View style={styles.fastFood}>
                            <Text style={{ fontSize: 20 }}>Popular Fast food</Text>
                            <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingVertical: 60,

                                }}>
                                <View style={styles.fastFoodItem}>
                                    {listFastFood.map((item, index) => (
                                        <View key={index} style={styles.listCategory}>
                                            <View style={styles.img}>
                                                <Image style={{ width: 120, height: 120 }} source={item.img} />
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, fontWeight: "700" }}>$40</Text>
                                                <TouchableOpacity
                                                    onPress={(prev) => setFavouriter(prev => !prev)}
                                                    style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#F58D1D', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20, lineHeight: 30, color: '#fff', fontWeight: "700" }}>+</Text>

                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{ color: '#646982' }}>{item.status}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>


                                        </View>
                                    ))}
                                </View>

                            </ScrollView>


                        </View>

                    </View>
                </View>

            </ScrollView>

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
        gap: 30
    },
    selectTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },

    scrollView: {
        gap: 10,

    },
    fastFoodItem: {
        flexDirection: 'row',
    },
    listCategory: {
        width: 180,
        height: 150,
        gap: 7,
        ///
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 10,
        paddingHorizontal: 10,
        position: 'relative',
        flexDirection: 'column-reverse',
        paddingVertical: 10,
        marginRight: 15

    },
    img: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        top: -60,
        width: 180,

    },
    fastFood: {
        gap: 20
    }
})
export default Restaurant;