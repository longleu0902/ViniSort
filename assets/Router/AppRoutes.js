import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduce from '../Login/Introduce';
import Login from '../Login/Login';
import Home from '../Page/Home';
import Statistic from '../Page/Statistic';
import Category from '../Page/Category';
import Search from '../Page/Search';
import Detail from '../Page/Detail';
import Cart from '../Page/Cart';
import Restaurant from '../Page/RestaurantDetail';
import Payment from '../Page/Payment';
import AddCard from '../Page/AddCard';
import PaymentSuccess from '../Page/PaymentSuccess';
import Tracker from '../Page/Tracker';
import TrackerOder from '../Page/TrackerOder';
import CallScreen from '../Page/CallScreen';
import MyOders from '../Page/MyOder';


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
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            <Stack.Screen name="Tracker" component={Tracker} />
            <Stack.Screen name="TrackerOder" component={TrackerOder} />
            <Stack.Screen name="CallScreen" component={CallScreen} />
            <Stack.Screen name="MyOders" component={MyOders} />

            


            







        </Stack.Navigator>

    )



}

export default AppRouter;