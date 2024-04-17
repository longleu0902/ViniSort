import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const Category = () => {


    const list : any = useSelector<any>(state => state.productReducer.listStore);
    const navigate = useNavigation<any>();
    const handleClickProduct = (Data) => {
        navigate.navigate('Detail', { data: Data })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20 }}>All Categories</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 16 }}>See All</Text>
                    <Image source={require('../Icon/Vector.png')} />
                </View>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {list.map((item, index) => (
                    <TouchableOpacity onPress={() => handleClickProduct(item)} key={index} style={styles.listCategory}>
                        <View style={styles.img}>
                            <Image style={{ width: 120, height: 120 }} source={{ uri: item.img }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Text>{item.status}</Text>
                            <Text>${item.price}</Text>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.name}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>

            <View style={styles.header}>
                <Text style={{ fontSize: 20 }}>Open Restaurants</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 16 }}>See All</Text>
                    <Image source={require('../Icon/Vector.png')} />
                </View>
            </View>

            <TouchableOpacity onPress={() => navigate.navigate('Restaurant')} style={styles.restaurent}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ width: 300, height: 150 }} source={require('../Image/burger1.png')} />
                </View>
                <Text style={{ fontSize: 20 }}>Rose garden restaurant</Text>
                <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Burger - Chiken - Riche - Wings</Text>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Image source={require('../Icon/Star 1.png')} />
                        <Text style={{ fontWeight: '700' }}>4.7</Text>
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
            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 30

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listCategory: {
        width: 160,
        height: 160,
        // backgroundColor: '#000',
        borderRadius: 20,
        gap: 20,
        ///
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 10,
        paddingHorizontal: 10,
        position: 'relative',
        flexDirection: 'column-reverse',

    },
    img: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        top: -30,
        width: 160,

    },
    scrollView: {
        flexDirection: 'row',
        // position: 'relative',
        gap: 20,
        paddingVertical: 30

    },
    restaurent: {
        gap: 10
    }
})
export default Category;