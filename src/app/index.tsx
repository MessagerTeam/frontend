import {Redirect} from "expo-router";
const isAuthenticated = false;

export default function Index(){
    if(isAuthenticated){
        return <Redirect href="/(tabs)/chats" />;
    }
    return <Redirect href="/(auth)/login" />;
}