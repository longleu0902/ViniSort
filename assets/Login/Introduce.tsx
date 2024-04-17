import { Button } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Introduce = () => {
    // console.log("Introduce");
    const navigate = useNavigation<any>();
    const product = [
        {
            id: 1,
            img: require(`../Image/Frame 1.png`),
            title: 'All Your favoriter',
            description: 'Get all your loved foods in one once place, you just place the orer we do the rest'
        },
        {
            id: 2,
            img: require(`../Image/Frame 2.png`),
            title: 'Order from choosen chef',
            description: 'Get all your loved foods in one once place, you just place the orer we do the rest'
        },
        {
            id: 3,
            img: require(`../Image/Frame 3.png`),
            title: 'Free delivery offers',
            description: 'Get all your loved foods in one once place, you just place the orer we do the rest'
        },
    ]

    const [checkList, setCheckList] = useState(1);
    const [renderProduct, setRenderProduct] = useState([]);


    const handleClick = () => {
        setCheckList((i) => i > 3 ? 1 : i + 1);
        // const filter = product.filter((item) => item.id == checkList);
        // setRenderProduct(filter)
    }

    useEffect(() => {
        const filter = product.filter((item) => item.id == checkList);
        setRenderProduct(filter)
        if (checkList == 4) {
            navigate.navigate("Login")
        }
    }, [checkList])

    const handleSkip = () => {
        navigate.navigate("Login")

    }










    return (
        <View style={styles.container}>
            <View style={styles.body}>

                {renderProduct.length > 0 && renderProduct.map((item, index) => (
                    <View key={index} style={styles.bodyItem}>
                        <Image source={item.img} />
                        <Text style={{ fontSize: 24, fontWeight: "700" }} >{item.title}</Text>
                        <Text style={{ fontSize: 16, color: '#646982', textAlign: 'center' }} >{item.description}</Text>
                        <View style={styles.slider}>
                            <View
                                style={[styles.sliderItem, { backgroundColor: checkList == 1 ? '#EF5350' : '#FFCDD2' }]}>
                            </View>
                            <View
                                style={[styles.sliderItem, { backgroundColor: checkList == 2 ? '#EF5350' : '#FFCDD2' }]}>
                            </View>
                            <View
                                style={[styles.sliderItem, { backgroundColor: checkList == 3 ? '#EF5350' : '#FFCDD2' }]}>
                            </View>
                        </View>
                    </View>
                ))}


                <View style={styles.groupButton}>
                    <Button
                        onPress={handleClick}
                        buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                        color="warning">Next</Button>
                    <Button
                        onPress={handleSkip}
                        buttonStyle={{ borderRadius: 12, paddingVertical: 23 }}
                        titleStyle={{color:'#ccc'}}
                        title="Skip" type="clear"
                    />

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red',
        marginHorizontal: 30,


    },
    body: {
        marginBottom: 30

    },
    bodyItem: {
        flexDirection: 'column',
        gap: 30,
        alignItems: 'center'
    },
    slider: {
        flexDirection: 'row',
        gap: 5
    },
    sliderItem: {
        width: 8,
        height: 8,
        backgroundColor: '#FFCDD2',
        borderRadius: 50

    },
    groupButton: {
        flexDirection: 'column',
        marginTop: 40,
        gap: 40
    }
})
export default Introduce;