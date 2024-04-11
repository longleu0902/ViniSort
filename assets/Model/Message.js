import { Button } from '@rneui/base';
import { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const Message = (props) => {
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
    const btnCancel = () => {
        props.handleClickYes()
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
            </View>

            <Animated.View
                style={{
                    width: 300,
                    height: 150,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    transform: [{ translateX: translateX }],
                    // alignItems: 'center',
                    paddingHorizontal: 25,
                    paddingVertical: 20,
                    position: 'absolute'
                }}
            >
                <Text style={{ color: '#F44336', fontWeight: 600, fontSize: 20 }}>{props.title}</Text>
                <View style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'space-around' }}>
                    <Button onPress={btnCancel} buttonStyle={{ marginTop: 20, width: '80%', borderRadius: 20 }} color='#000'>Yes</Button>
                    <Button onPress={() => handleClose()} buttonStyle={{ marginTop: 20, width: '80%', borderRadius: 20 }} color='#F44336'>No</Button>
                </View>


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
export default Message;

