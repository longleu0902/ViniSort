import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';



const TrackerOder = () => {
    const navigate = useNavigation();

    const [show, setShow] = useState(false)


    // Confirmation
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../Image/Confirmation.png')}
                style={styles.image}
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.back}>
                            <Image source={require('../Icon/Back1.png')} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20 }}>Track Order</Text>
                    </View>

                </View>


            </ImageBackground>
            <View style={[styles.body, { bottom: show == false ? -370 : 0 }]}>
                <TouchableOpacity onPress={() => setShow(prev => !prev)} style={styles.headerModal}>
                    <View style={{ width: 72, height: 7, backgroundColor: '#ccc', borderRadius: 20 }}></View>
                </TouchableOpacity>
                {/* <View style={{height:50 , backgroundColor:'#000'}}></View>
                <View style={{height:50 , backgroundColor:'#000'}}></View>
                <View style={{height:50 , backgroundColor:'#000'}}></View>
                <View style={{height:50 , backgroundColor:'#000'}}></View>
                <View style={{height:50 , backgroundColor:'#000'}}></View>
                <View style={{height:50 , backgroundColor:'#000'}}></View>
                <View style={{height:50 , backgroundColor:'#000'}}></View> */}

            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        position: 'relative'
    },
    header: {
        position: 'absolute',
        width: 300,
        height: 50,
        // backgroundColor : "#ccc",
        top: 60,
        left: 30,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    back: {
        width: 45,
        height: 45,
        backgroundColor: '#1A1817',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        height: 550,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 10

    },
    headerModal: {
        alignItems: 'center',
        height:50,
        width:'100%',
        // backgroundColor:'#000'
    }
})

export default TrackerOder