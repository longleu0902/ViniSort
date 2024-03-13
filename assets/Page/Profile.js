import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { setLogin } from '../Redux/LoginReducer';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const navigate = useNavigation();
    const dispath = useDispatch();

    const Option = [
        {
            id: 1,
            img: require('../Icon/Profile1.png'),
            description: 'Personal Info'
        },
        {
            id: 2,
            img: require('../Icon/Profile2.png'),
            description: 'Addresses'
        },
        {
            id: 3,
            img: require('../Icon/Profile3.png'),
            description: 'Cart'
        },
        {
            id: 4,
            img: require('../Icon/Profile4.png'),
            description: 'Favourite'
        },
        {
            id: 5,
            img: require('../Icon/Profile5.png'),
            description: 'Notification'
        },
        {
            id: 6,
            img: require('../Icon/Profile6.png'),
            description: 'Payment Method'
        },
    ]

    const list = [
        {
            id: 1,
            img: require('../Icon/Profile7.png'),
            description: 'Settings'
        },
        {
            id: 2,
            img: require('../Icon/Profile8.png'),
            description: 'Log Out'
        },
    ]

    const handleClick = (item) => {
        if(item == 'Log Out'){
            const arr = {
                // username : '',
                // token : '',
                // isAuthentication : false

            };
            dispath(setLogin(arr));
        }

    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                        <Image source={require('../Icon/Back.png')} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={{ color: '#1A1817', fontWeight: 500, fontSize: 20 }}>Menu Profile</Text>
                    </View>

                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.menu}>
                        <Text>...</Text>
                    </TouchableOpacity>

                </View>


            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body}>

                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <Image style={{ width: 100, height: 100 }} source={require('../Icon/Profile.png')} />
                        <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: 20 }}>Septa</Text>
                            <Text style={{ fontSize: 14, color: '#ccc' }}>I love fast food</Text>
                        </View>
                    </View>


                    <View style={{ borderRadius: 20, backgroundColor: '#F0F5FA', marginBottom: 20 }}>
                        {Option.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.Item}>
                                <View style={{ flexDirection: 'row', gap: 20 , alignItems : 'center'}}>
                                    <Image source={item.img} />
                                    <Text style={{ fontSize: 20 }}>{item.description}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={require('../Icon/Vector.png')} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ borderRadius: 20, backgroundColor: '#F0F5FA', marginBottom: 20 }}>

                        {list.map((item, index) => (
                            <TouchableOpacity onPress={()=>handleClick(item.description)} key={index} style={[styles.Item]}>
                                <View style={{ flexDirection: 'row', gap: 20 , alignItems :'center'}}>
                                    <Image source={item.img} />
                                    <Text style={{ fontSize: 20 }}>{item.description}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={require('../Icon/Vector.png')} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>




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
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#F0F5FA',
        height: 85,
        paddingHorizontal: 20
    },
    body: {
        gap: 20
    }
})
export default Profile;