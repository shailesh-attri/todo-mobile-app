import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  BottomTabNavigation: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface ILogin {
  email:string
  password:string
}

const Login = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<ILogin>({
    email:"",
    password:""
  })
const handleLogin = ()=>{
  if(formData.email === "" || formData.password === ""){
    return 
  }
  console.log("formData", formData)
}
  return (
    <View style={styles.formContainer}>
        <View style={styles.form}>
          <TextInput
            style={styles.inputTextBox}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder='Enter a valid Email Address'
            value={formData.email}
            keyboardType='email-address'
          />
          <TextInput
            style={styles.inputTextBox}
            onChangeText={(text)=>setFormData({...formData, password:text})}
            placeholder='Enter your password'
            value={formData.password}
            secureTextEntry
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginBtnWrapper}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  formContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  form:{
    backgroundColor:"white",
    height:"20%",
    flex:1,
    paddingHorizontal:12,
  },
  inputLabel:{
    color: "#ffffffe3"
  },
  inputTextBox:{
    borderRadius:10,
    borderColor:"1px solid #ffffff8f",
    flex:1,
    paddingHorizontal:2
  },
  loginBtnWrapper:{

  },
  loginBtnText:{
    backgroundColor:"black",
    color:"white"

  },
  
})