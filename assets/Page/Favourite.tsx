import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Favouriter = () => {

    const navigate = useNavigation<any>();

    const list : any = useSelector<any>(state => state.favouriterReduce.favouriterFood)
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigate.navigate('Profile')} style={styles.menu}>
                        <Image source={require('../Icon/Back.png')} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={{ color: '#1A1817', fontWeight: '500', fontSize: 20 }}>Favourite Food</Text>
                    </View>
                </View>

            </View>

            <ScrollView>
                {list.map((item, index) => (
                    <View style={styles.list} key={index}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.like}>
                                <Image source={require('../Icon/favouriter.png')} />
                                <Text style={{ color: '#fff' }}>Fourtite</Text>
                            </View>
                            <Text style={{ color: '#4feb34' }}>{item.status}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 20, paddingVertical: 20 }}>
                            <Image style={{ width: '30%', height: 100 }} source={{ uri: item.img }} />
                            <View style={{width:'65%'}}>
                                <Text style={{ fontSize: 20, paddingVertical: 10 }}>{item.name}</Text>
                                <Text>Price : ${item.price}</Text>
                                <View style={{flexDirection:'row' , justifyContent:'space-between' }}>
                                <View style={styles.ship} >
                                    <Text style={{ color: '#34ebdc' }}>Freeship</Text>         
                                </View>
                                <TouchableOpacity onPress={() => navigate.navigate("Detail", { data: item })} style={styles.pay}>
                                        <Text style={{ fontSize: 15, color: '#fff' }}>Buy now</Text>
                                    </TouchableOpacity>
                                </View>
                               
                            </View>
                        </View>



                    </View>
                ))}
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
    list: {
        width: '100%',
        // flexDirection:'row'
        borderBottomWidth : 1,
        paddingVertical:10,
        borderColor:'#eee'


    },
    like: {
        width: 100,
        height: 17,
        backgroundColor: '#eb3a34',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 7,
        paddingHorizontal: 10,
        borderRadius:10
    },
    ship: {
        width: 100,
        height: 20,
        borderWidth: 1,
        borderColor: "#34ebdc",
        borderStyle: 'dashed',
        alignItems: 'center',
        marginTop: 15,
    },
    pay: {
        backgroundColor: '#eb3a34',
        padding: 15,
        borderRadius: 15
    }
})
export default Favouriter  