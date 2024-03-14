import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';


const OdersList = (props) => {

    const indexProps = props.index

    const [list, setList] = useState([]);



    const ongoing = [
        {
            id: 1,
            img: require('../Image/Rectangle 15.png'),
            name: 'PizzaHut',
            price: '34,5',
            amount: '01',
            category :'Food'

        },
        {
            id: 2,
            img: require('../Image/MC.png'),
            name: 'McDonald',
            price: '40,5',
            amount: '02',
            category :'Food'

        },
        {
            id: 3,
            img: require('../Image/Dink.png'),
            name: 'StarBucks',
            price: '10,2',
            amount: '03',
            category :'Dink'

        },
    ]

    const History = [
        {
            id: 1,
            img: require('../Image/Rectangle 15.png'),
            name: 'PizzaHut',
            price: '34,5',
            amount: '01',
            time: '29 Jan, 12:30',
            category : 'Food',
            status : 'Completed'
        },
        {
            id: 2,
            img: require('../Image/MC.png'),
            name: 'McDonald',
            price: '40,5',
            amount: '01',
            time: '30 Jan, 12:30',
            category : 'Food',
            status : 'Completed'
        },
        {
            id: 3,
            img: require('../Image/Dink.png'),
            name: 'StarBucks',
            price: '10,2',
            amount: '01',
            time: '30 Jan, 14:30',
            category : 'Food',
            status : 'Canceled'
        },
    ]
    useEffect(() => {
        if (indexProps == 0) {
            setList(ongoing)
        } else {
            setList(History)
        }
    }, [indexProps])


    return (
        <ScrollView>
            <View style={styles.container}>

                {list.map((product, index) => (
                    <View key={index} style={styles.container}>
                        <View style={styles.title}>
                            <Text style={{ fontSize: 14 }}>{product.category}</Text>
                            {indexProps == 1 && <Text style={{ color: product.status == 'Completed' ? '#059C6A' : 'red', fontSize: 14 }}>{product?.status}</Text>}
                        </View >
                        <View key={index} style={styles.list}>
                            <Image style={{ width: 74, height: 63, borderRadius: 7 }} source={product.img} />
                            <View style={styles.listItem}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 280 }}>
                                    <Text style={{ fontWeight: 700, fontSize: 14 }}>PizzaHut</Text>
                                    <Text style={{ fontWeight: 700, fontSize: 12, color: '#ccc' }}>#{product.id}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 700, fontSize: 14 }}>${product.price}   </Text>
                                    <Text style={{ fontWeight: 700, fontSize: 12, color: '#ccc' }}>|   {indexProps == 1 ? `${product.time} - ${product.amount}`: product.amount} Item</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: indexProps == 0 ? 'row' : 'row-reverse', justifyContent: 'space-between' }}>
                            <Button
                                onPress={() => navigate.navigate('TrackerOder')}
                                buttonStyle={{ borderRadius: 5, paddingVertical: 15 , width:150 }}
                                color="#FF7622">{indexProps == 0 ? 'Track oders' : 'Re-Order'}
                            </Button>
                            <Button
                                titleStyle={{ color: '#FF7622' }}
                                buttonStyle={{ borderRadius: 5, paddingVertical: 15, width:150, borderWidth: 2, borderColor: '#FF7622' }}
                                color="#fff">{indexProps == 0 ? 'Cancel' : 'Rate'}
                            </Button>
                        </View>


                    </View>
                ))}




            </View>
        </ScrollView>



    )

}

const styles = StyleSheet.create({
    container: {
        gap: 20
    },
    title: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 10,
        gap: 20
    }, list: {
        flexDirection: 'row',
        gap: 10,
    },
    listItem: {
        flexDirection: 'column',
        justifyContent: "space-around"
    }
})
export default OdersList;