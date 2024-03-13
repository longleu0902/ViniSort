import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduce from '../Login/Introduce';
import Login from '../Login/Login';



const Stack = createNativeStackNavigator();

const LoginRouter = () => {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Introduce" component={Introduce} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </>
    )



}

export default LoginRouter;