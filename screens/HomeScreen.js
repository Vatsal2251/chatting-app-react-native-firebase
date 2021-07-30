import React, { useEffect, useLayoutEffect, useState } from 'react'
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { StatusBar } from 'expo-status-bar'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
//import { id, chatName } from './AddChatScreen'

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            )
        );



        return unsubscribe;
    }, [])

    //ArrChat = Array.from(chats)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat Room",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black", fontWeight: "700" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.3} onPress={signOutUser} >
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    marginRight: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                }}>
                    <TouchableOpacity activeOpacity={0.5}  >
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}  >
                        <SimpleLineIcons name="pencil" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <StatusBar style="black" />
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
