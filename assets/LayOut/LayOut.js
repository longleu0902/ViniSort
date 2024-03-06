import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import AppRouter from '../Router/AppRoutes';
import Nav from '../Nav/Nav';


const LayOut = () => {

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <AppRouter />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    body: {
        flex: 1,
    },
    footer: {
        // flex: 1,
    }
});

export default LayOut;