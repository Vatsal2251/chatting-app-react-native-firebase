import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                size="medium"
                source={{
                    uri: "https://cdn1.iconfinder.com/data/icons/basic-ui-thinline-icons-set/139/Profile-GroupFriend-RoundedSolid-512.png"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "700" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    Test Subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
