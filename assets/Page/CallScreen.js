import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';




const CallScreen = ({ route }) => {
    const navigate = useNavigation();
    const translateY = useSharedValue(300);
    const { data } = route.params;
    const [renderIndex, setRenderIndex] = useState(0);

    useEffect(() => {
        handleGestureStateChange();

    }, [])

    useEffect(() => {
        const intervalId = setTimeout(() => {
            setRenderIndex(prev => prev + 1)
        }, 1000)
    }, [renderIndex])

    const handleGestureStateChange = event => {
        translateY.value = 100
    };

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value, { overshootClamping: false }) }],
    }));

    const renderView = () => {
        let view = [];
        for (let i = 0; i < renderIndex; i++) {
            view.push(<Text key={i}>.</Text>)
            if (view.length > 4) {
                view = [];
            }
        }
        return view;
    }



    // Confirmation
    return (
        <GestureHandlerRootView style={styles.container}>
            <ImageBackground
                source={require('../Image/image 2182.png')}
                style={styles.image}
            >
                <View style={styles.header}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.back}>
                            <Image source={require('../Icon/Back1.png')} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20 }}>Track Order</Text>
                    </View> */}

                </View>


            </ImageBackground>
            <Animated.View
                style={[styles.body, animatedStyles]}
            >
                <View style={styles.call}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../Image/image 2182.png')} />
                    <Text style={{ fontWeight: 700, fontSize: 25 }}>Robert Fox</Text>
                    <Text style={{ color: '#ccc', fontSize: 16 }}>Connecting {renderView()}</Text>
                    <View style={styles.callOption}>
                        <TouchableOpacity style={styles.callItem}>
                            <Image source={require('../Icon/mic-off.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate.navigate("TrackerOder", { data: data })} style={styles.callItem}>
                            <Image source={require('../Icon/End Icon (1).png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.callItem}>
                            <Image source={require('../Icon/Speaker.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.View>
        </GestureHandlerRootView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        // resizeMode: 'cover',
        // justifyContent: 'center',
        width: '100%',
        height: 600,
        position: 'relative',
        // opacity: 0.8,

    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 600,
        top: 0,
        left: 0,
        opacity: 0.6,
        backgroundColor: '#273F55',
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
    }, call: {
        gap: 30,
        alignItems: 'center',
        marginTop: 10
    },
    callOption: {
        flexDirection: "row",
        gap: 30,
        marginLeft: 30
    },
    callItem: {
        alignItems: 'center',
        flexDirection: 'row',
    }
})

export default CallScreen