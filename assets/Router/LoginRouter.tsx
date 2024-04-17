import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduce from '../Login/Introduce';
import Login from '../Login/Login';
import ForgotPassword from '../Login/Forgot';




const Stack = createNativeStackNavigator();

const LoginRouter = () => {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Introduce" component={Introduce} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </>
    )



}

export default LoginRouter;