import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fethDataValue, UpdateData, fethDataKey } from "../service/getDataOder";
import { useSelector } from 'react-redux';


const OdersList = (props) => {
    const user = useSelector(state => state.LoginReducer.payload.username)
    const navigate = useNavigation()
    const indexProps = props.index
    const getData = async () => {
        const req = await fethDataValue(user)
        const key = await fethDataKey(user);
        if (req && req.cart) {
            props.setList([...req.cart])
            props.setProductData({ ...req })
        }else{
            props.setList([])

        }
    }



    const handleClick = (product) => {

        navigate.navigate("TrackerOder", { data: product })

    }

    const handleCancel = async (product) => {
        props.show(true);
        props.toast(`Do you have cancel ${product.name} orders ?`)
        props.setProductRemove(product)

    }

    const History = [
        {
            id: 1,
            // img: require('../Image/Rectangle 15.png'),
            name: 'PizzaHut',
            price: '34,5',
            amount: '01',
            time: '29 Jan, 12:30',
            category: 'Food',
            status: 'Completed'
        },
        {
            id: 2,
            // img: require('../Image/MC.png'),
            name: 'McDonald',
            price: '40,5',
            amount: '01',
            time: '30 Jan, 12:30',
            category: 'Food',
            status: 'Completed'
        },
        {
            id: 3,
            // img: require('../Image/Dink.png'),
            name: 'StarBucks',
            price: '10,2',
            amount: '01',
            time: '30 Jan, 14:30',
            category: 'Food',
            status: 'Canceled'
        },
    ]
    useEffect(() => {

        if (indexProps == 0) {
            getData();
        } else {
            props.setList(History)
        }
    }, [indexProps , props.render])


    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {props.list.map((product, index) => (
                        <View key={index} style={styles.container}>
                            <View style={styles.title}>
                                <Text style={{ fontSize: 14 }}>{product?.category}</Text>
                                {indexProps == 1 && <Text style={{ color: product.status == 'Completed' ? '#059C6A' : 'red', fontSize: 14 }}>{product?.status}</Text>}
                            </View >
                            <View key={index} style={styles.list}>
                                <Image style={{ width: 74, height: 63, borderRadius: 7 }} source={{ uri: product?.img }} />
                                <View style={styles.listItem}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 280 }}>
                                        <Text style={{ fontWeight: 700, fontSize: 14 }}>{product?.name}</Text>
                                        <Text style={{ fontWeight: 700, fontSize: 12, color: '#ccc' }}>{product?.id}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 700, fontSize: 14 }}>${product?.price}   </Text>
                                        <Text style={{ fontWeight: 700, fontSize: 12, color: '#ccc' }}>|   {indexProps == 1 ? `${product.time} - ${product.amount}` : product?.amount} Item</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: indexProps == 0 ? 'row' : 'row-reverse', justifyContent: 'space-between' }}>
                                <Button
                                    onPress={() => handleClick(product)}
                                    buttonStyle={{ borderRadius: 5, paddingVertical: 15, width: 150 }}
                                    color="#FF7622">{indexProps == 0 ? 'Track oders' : 'Re-Order'}
                                </Button>
                                <Button
                                    onPress={() => handleCancel(product)}
                                    titleStyle={{ color: '#FF7622' }}
                                    buttonStyle={{ borderRadius: 5, paddingVertical: 15, width: 150, borderWidth: 2, borderColor: '#FF7622' }}
                                    color="#fff">{indexProps == 0 ? 'Cancel' : 'Rate'}
                                </Button>
                            </View>


                        </View>
                    ))}




                </View>

            </ScrollView>
        </>




    )

}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        flex: 1
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