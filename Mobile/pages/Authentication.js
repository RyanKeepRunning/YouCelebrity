import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar,
    AsyncStorage
  } from 'react-native';

class Authentication extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.asyncNavigation();
    }

    asyncNavigation= async ()=>{
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken?'Profile':'Login');
    }

    render(){
        console.log("Authentication");
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