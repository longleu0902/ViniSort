import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const Statistic = () => {
const test = useSelector(state => state.themeColor.colorText);
// console.log("check store" , test)

console.log("Statistic");


    return (
        <View style={styles.container}>
            <Text>TestStatistic</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        // backgroundColor:'#000'
    }
})
export default Statistic;