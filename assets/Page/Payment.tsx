import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../Redux/CartReducer';
import { Picker } from '@react-native-picker/picker';
import { fethDataCard } from '../service/getDataUser';
import Toast from '../Model/Toast';
import { database, auth } from '../config/firebaseConfig';
import { ref, set } from "firebase/database";
import { uid } from 'uid';
import { fethDataValue, UpdateData, fethDataKey } from "../service/getDataOder";







const Payment = ({ route }) => {
    const navigate = useNavigation<any>();
    const renderComponet = useSelector<any>(state => state.RenderReducer.Render)
    const cart : any = useSelector<any>(state => state.cartReducer.CartStore);
    const user = useSelector<any>(state => state.LoginReducer.payload.username)
    const { total, address, phone } = route.params;
    const [show, setShow] = useState(false);
    const [renderCash, setRenderCash] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toast, setToast] = useState('');
    const [defaultCash, setDefaultCash] = useState([]);
    const defaultValue = [
        {
            id: 1,
            img: require('../Icon/Cash.png'),
            status: false,
            type: 'Cash'
        },
        {
            id: 2,
            img: require('../Icon/Visa.png'),
            status: false,
            type: 'Visa'

        },
        {
            id: 3,
            img: require('../Icon/Master.png'),
            status: false,
            type: 'MasterCard'

        },
        {
            id: 4,
            img: require('../Icon/Paypal.png'),
            status: false,
            type: 'Paypal'

        },

    ]

    const showModal = () => {
        setShow(prev => !prev);

        // match defaultCash and defaultValue of the same type and get that tag icon
        const _renderCash = [...defaultCash];
        const combinedList = _renderCash.map(item => {
            const correspondingImg = defaultValue.find(imgItem => imgItem.type === item.type);
            return {
                ...item,
                img: correspondingImg ? correspondingImg.img : null,
                status: true
            };
        });
        setRenderCash([...combinedList])
    }

    // get data cash from database
    const getData = async () => {
        const data = await fethDataCard();
        if (data == undefined) return;
        setDefaultCash(data)

    }
    useEffect(() => {
        getData()
    }, [renderComponet])



    const [list, setList] = useState(defaultValue);
    const [listCash, setListCash] = useState([]);
    const [statusList, setStatusList] = useState<any>([])

    // console.log("check status", statusList)

    const handleActive = (product : any) => {
        const _list : any = [...defaultValue];
        const Idx = _list.findIndex(item => item.id == product.id);
        _list[Idx].status = true;
        setList(_list);
        setStatusList(_list[Idx])
        const idxListCash = defaultCash?.filter(item => item.type == product.type)
        setListCash(idxListCash)

    }

    // console.log("check list cash", listCash)


    const handleSelectCash = (data : any) => {
        const _list : any = [...defaultValue];
        const Idx = _list.findIndex(item => item.type == data.type);
        _list[Idx].status = true
        setList(_list);
        setStatusList(_list[Idx])
        showModal();
        setListCash([{ ...data }])


    }

    const handleAddNewCard = () => {
        if (listCash == null || listCash.length == 0) {
            showAlert()
            return;
        }

        navigate.navigate('AddCard', { total: total, type: statusList })
    }

    const showAlert = () => {
        Alert.alert(
            'Notify',
            `You don't choose the card type !!`,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        );
    };

    const handleConfirm = async () => {
        if (total == 0) {
            setToast("You don't have oders !!!");
            setShowToast(true)
            return;
        }
        if (address == '') {
            setToast("Please give me the address !!!");
            setShowToast(true)
            return;
        }
        if (phone == '') {
            setToast("Please give me the number phone !!!");
            setShowToast(true)
            return;
        }
        if (listCash.length > 0) {
            const cartWithId = cart.map((item, index) => {
                return { ...item, id: uid() };
            });
            const key = await fethDataKey(user);
            // console.log("check key", key)
            if (key == undefined) {
                await set(ref(database, 'buy/' + uid()), {
                    username: user,
                    address: address,
                    total: total,
                    phone: phone,
                    cart: [...cartWithId]
                })
            } else {
                const data = await fethDataValue(user)
                // console.log("check data", data.cart)
                await UpdateData(key, {
                    username: user,
                    address: address,
                    total: data.total + total,
                    phone: phone,
                    cart: data.cart ? [...data.cart, ...cartWithId] : [...cartWithId]

                })
            }

            navigate.navigate('PaymentSuccess')
        } else {
            setToast("Please choose card !!!");
            setShowToast(true)
        }


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
                            <Text style={{ color: '#1A1817', fontWeight: "500", fontSize: 20 }}>Payment</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.list}>
                    {list.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => handleActive(item)}
                            key={index}
                            style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}
                        >
                            <View style={[styles.listItem,
                            {
                                borderWidth: item.status == true ? 1 : 0,
                                borderColor: item.status == true ? '#FF7622' : ''
                            }]}>
                                <Image source={item.img} />
                                {item.status && <Image style={styles.active} source={require('../Icon/ok.png')} />}
                            </View>
                            <Text>{item.type}</Text>
                        </TouchableOpacity>

                    ))}
                </View>

                {listCash && listCash.length > 0 ? (
                    <ScrollView>
                        <TouchableOpacity onPress={() => showModal()} >
                            <View style={[styles.listCash, { backgroundColor: '#F0F5FA' }]}>
                                <View style={styles.cashItem}>
                                    <Text style={{ fontSize: 16, fontWeight: "700" }}>{statusList?.type}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                        <View style={{ backgroundColor: '#fff', width: 50, height: 30, alignItems: 'center', paddingHorizontal: 20, flexDirection: 'column', justifyContent: 'center', borderRadius: 5 }}>
                                            <Image source={statusList?.img} />
                                        </View>
                                        <Text>*********{listCash[0]?.number.slice(-3)}</Text>
                                    </View>
                                </View>
                                <Image source={require('../Icon/Polygon 1.png')} />
                            </View>

                            {show && <>
                                {renderCash && renderCash.length > 0 && renderCash.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleSelectCash(item)} style={[styles.listCash]}>
                                        <View style={styles.cashItem}>
                                            <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.type}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                                <View style={{ backgroundColor: '#fff', width: 50, height: 30, alignItems: 'center', paddingHorizontal: 20, flexDirection: 'column', justifyContent: 'center', borderRadius: 5 }}>
                                                    <Image source={item.img} />
                                                </View>
                                                <Text>*********{item.number.slice(-3)}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                ))}


                            </>

                            }
                        </TouchableOpacity>
                    </ScrollView>



                ) : (
                    <View style={styles.addCart}>
                        <Image style={styles.imgParrent} source={require('../Icon/Clipped.png')} />
                        <View style={styles.imgChildren}>
                            <Image source={require('../Icon/Master.png')} />
                            <View style={{ width: 140, height: 20, opacity: 0.5, backgroundColor: '#faf7f5' }}></View>
                            <View style={{ gap: 2 }}>
                                <View style={{ width: 53, height: 10, backgroundColor: '#FAF7F5', opacity: 0.5, }}></View>
                                <View style={{ width: 40, height: 10, backgroundColor: '#FAF7F5', opacity: 0.5, }}></View>
                            </View>




                        </View>
                        <Text>No master card added</Text>
                        <Text style={{ color: '#2D2D2D' }}> You can add a mastercard and save it for later</Text>
                    </View>
                )}

                <Button
                    onPress={handleAddNewCard}
                    buttonStyle={{ borderWidth: 1, borderColor: '#F0ECE9', height: 60, borderRadius: 10 }}
                    titleStyle={{ color: '#FF7622' }}
                    color='#fff'

                >+ Add New</Button>
            </View>


            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#A0A5BA' }}>Total:
                        <Text style={{ fontSize: 25, color: "#000" }}>  ${total}</Text>
                    </Text>
                </View>

                <Button
                    onPress={() => handleConfirm()}
                    buttonStyle={
                        {
                            height: 60,
                            borderRadius: 12
                        }
                    }
                    titleStyle={{ color: '#fff' }}
                    color="#FF7622">
                    PAY & CONFIRM
                </Button>

            </View>

            {showToast && <Toast show={setShowToast} title={toast} />}


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
        gap: 10,
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
        flexDirection: 'row',
        gap: 10
    },
    listItem: {
        width: 85,
        height: 72,
        backgroundColor: "#F0F5FA",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    active: {
        position: 'absolute',
        right: -2,
        top: -10

    },
    addCart: {
        height: 300,
        backgroundColor: '#F0F5FA',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    imgParrent: {
        position: 'relative'
    },
    imgChildren: {
        position: 'absolute',
        gap: 12,
        top: 70,
        left: 110
    },
    footer: {
        backgroundColor: '#fff',
        height: 200,
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 35,
        paddingVertical: 20,

    },

    listCash: {
        backgroundColor: '#ccc2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        // borderRadius: 10,
        alignItems: 'center'

    },
    cashItem: {
        gap: 10
    }
})

export default Payment;