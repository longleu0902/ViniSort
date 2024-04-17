import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


const Search = () => {
    const defaultKeyWord = ['Burger', 'SandWich', 'Pizza', 'Pizza Hut', 'Each'];
    const navigate = useNavigation<any>();
    const [keyWord, setKeyWord] = useState(defaultKeyWord);

    const defaultListSearch = [
        {
            img: require('../Image/Group 8198.png'),
            name: 'Pansi Restaurant',
            rate: '4.7'
        },
        {
            img: require('../Image/Mask Group 1.png'),
            name: 'Cafenio Coffee Club',
            rate: '4.3'
        },
        {
            img: require('../Image/Mask Group.png'),
            name: 'American Spicy Burger Shop',
            rate: '4.0'
        },
    ]
    const listFastFood = [
        {
            id: 1,
            img: require('../Image/pizza.png'),
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
                    <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                        <Image source={require('../Icon/Back.png')} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={{ color: '#1A1817', fontWeight: "500", fontSize: 20 }}>Search</Text>
                    </View>

                </View>
                <View style={styles.headerRight}>
                    <View style={styles.cart}>
                        <Image source={require('../Icon/Cart.png')} />
                        <View style={styles.count}>
                            <Text style={{ color: '#fff', fontWeight: "700" }}>3</Text>
                        </View>
                    </View>

                </View>


            </View>

            <View style={styles.search}>
                <View
                    style={{
                        borderRadius: 12,
                        paddingVertical: 20,
                        paddingHorizontal: 25,
                        backgroundColor: '#ECF0F4',
                        gap: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',

                    }}
                >
                    <Image source={require('../Icon/search.png')} />
                    <TextInput placeholder='Pizza' style={{ fontSize: 14, color: '#676767', height: '100%', width: '100%' }} />
                </View>
            </View>

            <View style={styles.keyword}>
                <Text style={{ fontSize: 20 }}>Recent Keywords</Text>
                <View style={styles.tag}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                        {keyWord.map((item, index) => (
                            <Button
                                key={index}
                                color="#fff"
                                titleStyle={{ color: '#000' }}
                                buttonStyle={
                                    {
                                        borderWidth: 1,
                                        borderColor: '#EDEDED',
                                        // width:72,
                                        height: 46,
                                        borderRadius: 30
                                    }}
                            >
                                {item}
                            </Button>

                        ))}

                    </ScrollView>

                </View>

            </View>

            <View style={styles.listSearch}>
                <Text style={{ fontSize: 20 }}>Suggested Restaurants</Text>
                <ScrollView>
                    {defaultListSearch.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.listSearchItem}>
                            <Image source={item.img} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={require('../Icon/Star 1.png')} />
                                    <Text>{item.rate}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                </ScrollView>



            </View>

            <View style={styles.fastFood}>
                <Text style={{ fontSize: 20 }}>Popular Fast food</Text>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 60,

                    }}>
                    <View style={styles.fastFoodItem}>
                        {listFastFood.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.listCategory}>
                                <View style={styles.img}>
                                    <Image style={{ width: 120, height: 120 }} source={item.img} />
                                </View>
                                <Text style={{ color: '#646982' }}>{item.status}</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>


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
    keyword: {
        gap: 20
    },
    scrollView: {
        gap: 10,

    },
    listSearch: {
        gap: 10
    },
    listSearchItem: {
        flexDirection: 'row',
        gap: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15


    },
    fastFoodItem: {
        flexDirection: 'row',
    },
    listCategory: {
        width: 180,
        height: 110,
        // backgroundColor: '#000',
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
    },
    headerRight: {

    },
    tag: {

    }
})
export default Search;