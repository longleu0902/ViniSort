import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Tab } from '@rneui/themed';
import OdersList from './OdersList';

const MyOders = () => {
    const navigate = useNavigation();
    const [index, setIndex] = useState(0);
    console.log(index)
    return (
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
                        <Text style={{ color: index == 0 ? '#FF7622' : '#ccc', fontSize: 14 ,fontWeight :700 , paddingVertical : 15 }}>
                            OnGoing
                        </Text>
                    </Tab.Item>
                    <Tab.Item>
                        <Text style={{ color: index == 1 ? '#FF7622' : '#ccc', fontSize: 14 ,fontWeight :700 , paddingVertical : 15 }}>
                            History
                        </Text>
                    </Tab.Item>
                </Tab>
            </View>

            <View style={styles.list}>
                {index == 0 ? <OdersList index={index}/> : <OdersList index={index}/>}
            </View>
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
})
export default MyOders;