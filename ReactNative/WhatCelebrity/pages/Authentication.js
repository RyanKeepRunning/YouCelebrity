import React,{Component} from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    Alert,
    Navigator,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    StatusBar,
    AsyncStorage
  } from 'react-native';

class Authentication extends Component{
    constructor(props){
        super(props);
        this.state={
            isUserLoggedIn:true
        }
        this.asyncNavigation();
    }

    asyncNavigation= async ()=>{
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken?'Profile':'Login');
    }

    render(){
        return(
            <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
            </View>
        )
    }
}


export default Authentication;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#c0e2f7', 
    }
});