import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduce from '../Login/Introduce';
import Login from '../Login/Login';
import Home from '../Page/Home';
import Statistic from '../Page/Statistic';
import Category from '../Page/Category';
import Search from '../Page/Search';
import Detail from '../Page/Detail';
import Cart from '../Page/Cart';



const Stack = createNativeStackNavigator();

const AppRouter = () => {

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Introduce" component={Introduce} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen 
            //  options={{headerShown:true}} 
            name="Search" component={Search} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Cart" component={Cart} />



        </Stack.Navigator>

    )



}

export default AppRouter;