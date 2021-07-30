import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState('');

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error.message))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add A New Chat",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black", fontWeight: "700", alignSelf: 'center' },
            headerTintColor: "black",
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <StatusBar style="black" />
            <Input
                placeholder="Enter a chat Name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="user" type="antdesign" size={24} color="black" style={{ paddingRight: 10, paddingLeft: 4 }} />
                }
            />
            <Button title="Create new Chat" onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        padding: 30,
    },
})
