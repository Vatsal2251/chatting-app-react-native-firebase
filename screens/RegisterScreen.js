import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from "react"
import { Button, Input, Image, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imgUrl || "https://static.thenounproject.com/png/17241-200.png",
            });
        }).catch((error) => alert(error.message));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        })
    }, [navigation])

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="black" />
            <Text h3 style={{ marginBottom: 25, color: "#808080" }}>Create Your Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" type="password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Profile Image URL (optional)" onSubmitEditing={register} type="text" value={imgUrl} onChangeText={(text) => setImgUrl(text)} />
            </View>

            <Button containerStyle={styles.button} title="Register" raised onPress={register} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 350,
    },
    button: {
        width: 250,
        marginTop: 15,
    },
})
