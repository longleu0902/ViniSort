import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from 'react-native-reanimated';




const TrackerOder = ({ route }) => {
    const navigate = useNavigation();
    const translateY = useSharedValue(400);

    const { data } = route.params;

    const [showBorder, setShowBoder] = useState(false);

    const handleGestureStateChange = event => {
        if (translateY.value == 400) {
            translateY.value = 10
            setShowBoder(true)

        } else if (translateY.value == 10) {
            translateY.value = 400
            setShowBoder(false)

        }
    };

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value, { overshootClamping: false }) }],
    }));

    const renderTiming = [
        {
            id: 1,
            title: 'Your order has been received',
            status: 'success',
            img: require('../Icon/ok1.png'),

        },
        {
            id: 2,
            title: 'The restaurant is preparing your food',
            status: 'loading',
            img: require('../Icon/loader.png'),


        },
        {
            id: 3,
            title: 'Your order has been picked up for delivery',
            status: 'none',
            img: require('../Icon/ok1.png'),


        },
        {
            id: 4,
            title: 'Order arriving soon!',
            status: 'done',
            img: require('../Icon/ok1.png'),

        },
    ]


    // Confirmation
    return (
        <GestureHandlerRootView style={styles.container}>
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
            <Animated.View
                style={[styles.body, animatedStyles]}
            >

                <View style={styles.headerModal}>
                    <PanGestureHandler onHandlerStateChange={(event) => handleGestureStateChange(event)} >
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ width: 72, height: 7, backgroundColor: '#ccc', borderRadius: 20 }} >
                            </View>
                            <View style={{ height: "100%", width: '100%' }}></View>
                        </View>
                    </PanGestureHandler>
                </View>
                <View style={styles.info}>
                    <View style={{ height: 65, width: 65 }}>
                        <Image style={{ height: 65, width: 65 }} source={{uri : data?.img}} />
                    </View>
                    <View style={styles.infomation}>
                        <Text style={{ fontSize: 20 }}>{data?.name}</Text>
                        <Text style={{ fontSize: 15, color: '#ccc' }}>Orderd at 06 Sept, 10:00pm</Text>
                        <Text style={{ fontSize: 13 }}>2x Burger</Text>
                        <Text style={{ fontSize: 13 }}>4x Sanwitch</Text>

                    </View>

                </View>
                <View style={styles.time}>
                    <View style={{ alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 700 }}>20 min</Text>
                        <Text style={{ fontSize: 20, color: '#ccc' }}>Estimated delivery time</Text>
                    </View>
                    {renderTiming.map((item, index) => (
                        <View key={index} style={[styles.status, {
                            borderLeftColor: item.status == 'success' || item.status == 'loading' ? '#FF7622' : '#ccc',
                            borderLeftWidth: item.status == 'done' ? 0 : 2

                        }]}>
                            <View style={
                                [
                                    styles.timing,
                                    {
                                        backgroundColor: item.status == 'success' || item.status == 'loading' ? '#FF7622' : '#ccc',
                                    }
                                ]
                            }>
                                <Image style={{ width: 10, height: 10 }} source={item.img} />
                            </View>
                            <Text style={{
                                marginLeft: 20,
                                color: item.status == 'success' || item.status == 'loading' ? '#FF7622' : '#ccc'

                            }} >{item.title}</Text>

                        </View>
                    ))}

                </View>

            </Animated.View>
            <View style={[styles.contact, { borderWidth: showBorder == false ? 0 : 1 }]}>
                <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../Icon/Profile.png')} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>Robert F.</Text>
                        <Text style={{ fontSize: 14 }}>Courier</Text>
                    </View>
                </View>

                <View style={{ gap: 20, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigate.navigate('CallScreen',{data : data})} style={{ width: 50, height: 85, alignItems: 'center' }}>
                        <Image source={require('../Icon/Call.png')} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 17, width: 50, height: 50 }}>
                        <Image source={require('../Icon/Chat.png')} />
                    </View>
                </View>
            </View>


        </GestureHandlerRootView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingVertical: 10,

    },
    headerModal: {
        alignItems: 'center',
        height: 40,
        width: '100%',
        // backgroundColor:'#000',
        // left: 0
    },
    info: {
        flexDirection: 'row',
        gap: 20,


    },
    infomation: {
        gap: 5,

    },
    status: {
        borderLeftWidth: 2,
        borderLeftColor: '#ccc',
        flexDirection: 'row',
        position: 'relative',
        height: 50
    },
    time: {
        marginTop: 20,
    },
    timing: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: 'red',
        position: 'absolute',
        left: -8,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contact: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 30

    }
})

export default TrackerOder