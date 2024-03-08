import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';



const Tracker = () => {
    const navigate = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.img}>
                <Image style={{ width: '100%' }} source={require('../Image/Tracker.png')} />
            </View>
            <View style={styles.title}>
                <Text style={{ fontSize: 30 }}>TRACK YOUR ORDER</Text>
                <Text style={{ fontSize: 15, color: '#646982' }}>Enter your tracking number below</Text>
            </View>
            <View style={styles.formStyle}>
                <TextInput placeholder='Tracking number' />
            </View>

            <Button
                onPress={()=> navigate.navigate('TrackerOder')}
                buttonStyle={{ borderRadius: 12, paddingVertical: 23 , marginHorizontal:20 }}
                color="#FF7622">PAY & CONFIRM</Button>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        gap: 50

    },
    img: {


    },
    title: {
        alignItems: 'center',
        gap: 10
    },
    formStyle: {
        height: 60,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginHorizontal: 20
    },
})

export default Tracker;

