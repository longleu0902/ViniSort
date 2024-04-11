import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@rneui/base';
import Category from './Category';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { favouriterFood } from '../Redux/favouriterReduce';
import { CartStore } from '../Redux/CartReducer';








const Home = () => {
    const cart = useSelector((state) => state.cartReducer.CartStore);
    const dispath = useDispatch();
    const navigate = useNavigation();
    const getData = async () => {
        try {
            const arr = []
            const jsonValue = await AsyncStorage.getItem(`data`);
            const CartList = await AsyncStorage.getItem(`CartList`);

            // console.log("CartList",JSON.parse(CartList) )

            dispath(favouriterFood(JSON.parse(jsonValue)))
            if (CartList !== null) {
                dispath(CartStore(JSON.parse(CartList)))
            } else {
                dispath(CartStore(arr))
            }
            // console.log("check data", jsonValue)
        } catch (e) {
            //error
        }
    };
    useEffect(() => {
        getData();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigate.navigate('Profile')} style={styles.menu}>
                        <Image source={require('../Icon/Menu.png')} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={{ color: '#FC6E2A', fontWeight: "700", fontSize: 14 }}>Deliver to</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ fontSize: 15, color: '#676767' }}>Los Angeles, USA</Text>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginLeft: 5, marginBottom: 5 }}>
                                <Image source={require('../Icon/Polygon 1.png')} />
                            </View>
                        </View>
                    </View>

                </View>
                <TouchableOpacity onPress={() => navigate.navigate('Cart')} style={styles.headerRight}>
                    <View style={styles.cart}>
                        <Image source={require('../Icon/Cart.png')} />
                        <View style={styles.count}>
                            <Text style={{ color: '#fff', fontWeight: "700" }}>{cart?.length || 0}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>

            <View style={styles.search}>
                <Text>Hey Septa,<Text style={{ fontWeight: "700" }}>Good Afternoon!</Text></Text>
                <Button
                    onPress={() => navigate.navigate('Search')}
                    buttonStyle={{
                        borderRadius: 12,
                        paddingVertical: 20,
                        paddingHorizontal: 25,
                        backgroundColor: '#ECF0F4',
                        gap: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}
                    color="#fff">
                    <Image source={require('../Icon/search.png')} />
                    <Text style={{ fontSize: 14, color: '#676767' }}>What will you like to eat?</Text>
                </Button>
            </View>
            <ScrollView>
                <View style={styles.category}>
                    <Category />
                </View>
            </ScrollView>

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
    cart: {
        width: 45,
        height: 45,
        backgroundColor: '#181C2E',
        borderRadius: 50,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
    },
    count: {
        width: 30,
        height: 30,
        backgroundColor: "#FF9800",
        borderRadius: 50,
        position: 'absolute',
        right: -5,
        top: -6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

    },
    search: {
        gap: 10
    },
    headerRight: {

    },
    category: {

    }
})
export default Home;