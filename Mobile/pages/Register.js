import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert
  } from 'react-native';
import {Header} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "../firebase";


// Class for user registration.
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    onRegister = async () => {
        if(this.state.email && this.state.password){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
        await AsyncStorage.setItem('userToken', this.state.email);
        firebase.firestore().collection("users").doc(this.state.email).set({
            email: this.state.email,
            avatar:'null',
            name: this.state.email,
            info: 'null',
          }); 
        this.props.navigation.navigate('Authentication');}
        else {
            Alert.alert("please enter email and password!")
        }
    }

    render(){
        return(
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "undefined"}
            keyboardVerticalOffset={Header.HEIGHT +20} > 
            <Image style={styles.avatar} source={require('../public/unLoggedInProfile.png')}/>
            <Text style={styles.msg}>Register your account</Text>
            <ScrollView style={styles.content} >
                <TextInput 
                    keyboardType='email-address'
                    placeholder="Email"
                    style={styles.inputForm}
                    onChangeText={(email)=>this.setState({email:email})}
                    value={this.state.email}
                    maxLength={30}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.inputForm}
                    onChangeText={(password)=>this.setState({password:password})}
                    secureTextEntry={true}
                    value={this.state.password}
                    maxLength={30}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={()=>this.onRegister()}>
                    <Text style={styles.submitText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: '#c0e2f7', 
},
content:{
    flex:1,
},
msg:{
    marginTop:140,
    fontSize:24,
    textAlign:'center',
    color: "#464d59",
    fontWeight: "600"
    },

avatar: {
    backgroundColor: '#fff',
    width: 110,
    height: 110,
    borderRadius: 53,
    borderWidth: 4,
    borderColor: "white",
    marginTop:20,
    alignSelf:'center',
    position: 'absolute',
},
inputForm:{
    height: 40,
    borderColor: '#00BFFF',
    borderWidth: 1,
    marginLeft:30,
    marginRight:30,
    marginTop:34,
    borderRadius:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff'
},

submitButton:{
    marginLeft:30,
    marginRight:30,
    marginTop: 40,
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
},

submitText:{
    color:'#fff',
    fontSize:20,
}

})

export default Register;


