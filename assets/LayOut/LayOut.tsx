import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import AppRouter from '../Router/AppRoutes';
import { useSelector } from 'react-redux';
import LoginRouter from '../Router/LoginRouter';



interface auth {
    username: undefined | string
    token: undefined | string,
    isAuthentication: boolean,
    img: undefined | string,
}
const LayOut = () => {
    const auth: any = useSelector<any>(state => state.LoginReducer.payload);
    // console.log(auth)
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {auth.isAuthentication ? <AppRouter /> : <LoginRouter />}
                {/* <AppRouter/> */}

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