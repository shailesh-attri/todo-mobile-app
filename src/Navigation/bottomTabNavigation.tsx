import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';

const BottomTabNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})

export default BottomTabNavigation;
