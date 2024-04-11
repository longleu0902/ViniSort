import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import { Tab } from '@rneui/themed';
import OdersList from './OdersList';
import Message from '../Model/Message';
import { fethDataValue, UpdateData, fethDataKey } from "../service/getDataOder";
import { useSelector } from 'react-redux';





const MyOders = () => {
    const user = useSelector(state => state.LoginReducer.payload.username)

    const navigate = useNavigation();
    const [index, setIndex] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toast, setToast] = useState('');
    const [cancel, setCancel] = useState(false);
    const [list, setList] = useState([]);

    const [productRemove, setProductRemove] = useState({});
    const [productData, setProductData] = useState({})
    const [render, setRender] = useState(0)

    const handleClickYes = () => {
        handleConfimCancel()
        setShowToast(false)
    }

    const handleConfimCancel = async () => {
        const remove = list.filter(item => item.id !== productRemove.id)
        const removePrice = list.filter(item => item.id == productRemove.id)
        const key = await fethDataKey(user);
        // console.log("check remove", remove)
        // console.log("check key ", key)
        let _product = { ...productData }
        _product.cart = remove
        _product.total = Number(_product.total) - Number(removePrice[0].price * removePrice[0].amount)
        await UpdateData(key, _product)
        setRender(render + 1)
        // console.log("ok",productRemove )
        // console.log("ok", _product)

        // console.log("ok1",productData )
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
                            <Text style={{ color: '#1A1817', fontWeight: 500, fontSize: 20 }}>My Oders</Text>
                        </View>

                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.menu}>
                            <Text>...</Text>
                        </TouchableOpacity>

                    </View>


                </View>

                <View style={styles.nav}>
                    <Tab value={index} onChange={setIndex} indicatorStyle={{ backgroundColor: '#FF7622' }}>
                        <Tab.Item>
                            <Text style={{ color: index == 0 ? '#FF7622' : '#ccc', fontSize: 14, fontWeight: 700, paddingVertical: 15 }}>
                                OnGoing
                            </Text>
                        </Tab.Item>
                        <Tab.Item>
                            <Text style={{ color: index == 1 ? '#FF7622' : '#ccc', fontSize: 14, fontWeight: 700, paddingVertical: 15 }}>
                                History
                            </Text>
                        </Tab.Item>
                    </Tab>
                </View>

                <View style={styles.list}>
                    {index == 0 ?
                        <OdersList
                            render={render}
                            show={setShowToast}
                            setList={setList}
                            list={list}
                            handleClickYes={handleClickYes}
                            setProductRemove={setProductRemove}
                            setProductData={setProductData}
                            toast={setToast}
                            index={index}
                        />
                        :
                        <OdersList
                            render={render}
                            show={setShowToast}
                            setList={setList}
                            list={list}
                            handleClickYes={handleClickYes}
                            setProductRemove={setProductRemove}
                            setProductData={setProductData}
                            toast={setToast}
                            index={index}
                        />}
                </View>
            </View>
            {showToast &&
                <Message handleClickYes={handleClickYes} show={setShowToast} title={toast} />}

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
})
export default MyOders;