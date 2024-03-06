import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Tab } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChartPie, faGear ,faBook,faFile} from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';



const Nav = () => {
    const [index, setIndex] = useState(0);
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state => state.themeColor.colorActive);
    const themeColorText = useSelector(state => state.themeColor.colorText);

    const navigation = useNavigation();

    useEffect(() => {
        switch (index) {
            case 0:
                navigation.navigate('Home')
                break;
            case 1:
                navigation.navigate('CreateQuizz')
                break;
            case 2:
                navigation.navigate('Statistic')
                break;
            case 3:
                navigation.navigate('Setting')
                break;
            default:
                console.log(`Sorry, we are out of ${index}.`);
        }
    }, [index])


    console.log("check", themeBackGround)
    return (
        <View style={[styles.container, { backgroundColor: themeBackGround }]}>
                <SafeAreaView>
                <Tab style={[styles.Tab, {backgroundColor : themeBackGround}]}
                    value={index}
                    onChange={(e) => setIndex(e)}
                    disableIndicator
                >
                    <Tab.Item
                        style={styles.tabItem}
                    >
                        <FontAwesomeIcon
                            color={index === 0 ? themeColorActive : themeColorText}
                            icon={faBook}
                        />
                        <Text
                            style={[styles.Text,{color:themeColorText}, index === 0 && {color : themeColorActive},]}
                        >
                            Đề thi</Text>


                    </Tab.Item >
                    <Tab.Item
                        style={styles.tabItem}
                    >

                        <FontAwesomeIcon
                            color={index === 1 ? themeColorActive : themeColorText}
                            icon={faFile} />
                        <Text
                            style={[styles.Text, {color:themeColorText},index === 1 && {color : themeColorActive}]}
                        >Tạo đề</Text>
                    </Tab.Item>
                    <Tab.Item

                        style={styles.tabItem}>
                        <FontAwesomeIcon
                            color={index === 2 ? themeColorActive : themeColorText}
                            icon={faChartPie} />
                        <Text
                            style={[styles.Text,{color:themeColorText}, index === 2 && {color : themeColorActive}]}
                        >Thống kê</Text>
                    </Tab.Item>
                    <Tab.Item
                        style={styles.tabItem}>
                        <FontAwesomeIcon
                            color={index === 3 ? themeColorActive : themeColorText}
                            icon={faGear} />
                        <Text
                            style={[styles.Text ,{color:themeColorText}, index === 3 && {color : themeColorActive}]}
                        >
                            Cài Đặt</Text>
                    </Tab.Item>
                </Tab>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1

    },
    body: {
        // flexDirection: 'row',
    },
    Tab: {
        height: 90,
        paddingBottom: 30,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    Text: {
        // paddingHorizontal: 10,
        paddingVertical: 10,
        color: "#000"
    },
})
export default Nav;