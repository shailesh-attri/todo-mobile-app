import React from 'react'
import { Text, View } from 'react-native'
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  BottomTabNavigation: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login = ({ navigation }: Props) => {
  return (
    <View>
        <Text onPress={()=>navigation.navigate("BottomTabNavigation")}>I am login page</Text>
    </View>
  )
}

export default Login