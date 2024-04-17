import { Button } from '@rneui/base';
import { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const Toast = (props) => {
    const translateX = useSharedValue(-300);

    const handlePress = () => {
        translateX.value = withSpring(0);
    };
    useEffect(() => {
        handlePress();
    })

    const handleClose = () => {
        props.show(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.background}>
            </View>

            <Animated.View
                style={{
                    width: 300,
                    height: 300,
                    backgroundColor: '#fff',
                    borderRadius: 30,
                    transform: [{ translateX: translateX }],
                    alignItems: 'center',
                    paddingHorizontal: 25,
                    paddingVertical: 20,
                    position:'absolute'
                }}
            >
                <Image style={{ width: 150, height: 150 }} source={require('../Image/sorry.png')} />
                <Text style={{ color: '#F44336', fontWeight: "600", fontSize: 20 }}>{props.title}</Text>
                <Button onPress={() => handleClose()} buttonStyle={{ marginTop: 20, width: '100%', borderRadius: 20 }} color='#F44336'>Close</Button>


            </Animated.View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#000',
        // opacity: 0.6
    },
    background: {
        backgroundColor: '#000',
        opacity: 0.6, 
        width: '100%',
        height: '100%',
    }
})
export default Toast;

