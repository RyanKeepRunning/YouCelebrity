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

// Class for user login.
class Login extends Component{
    static navigationOptions = { header: null };
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    onLogin = async () => {
        var email = this.state.email 
        var ifError = false;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password) //user login
        .catch(function(error) {
        // Handle Errors here.
        ifError=true;
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode+": "+errorMessage+email);
        });
        if(!ifError){ //logged in
            await AsyncStorage.setItem('userToken', this.state.email);
            const userToken = await AsyncStorage.getItem('userToken');
            console.log(userToken);
            this.props.navigation.navigate('Authentication');
        }
        
    }

    onNavigateRegister = () => {
        this.props.navigation.navigate('Register');//navigate to register page.
    }
    render(){
        return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset = {Header.HEIGHT + 10} > 
            {/* avatar view */}
            <Image style={styles.avatar} source={require('../public/unLoggedInProfile.png')}/>
            <Text style={styles.msg}>Please login first</Text>
            {/* avatart upload button */}
            <ScrollView style={styles.content} >
                <TextInput 
                    keyboardType='email-address'
                    placeholder="Email"
                    style={styles.inputForm}
                    onChangeText={(email)=>this.setState({email:email})}
                    value={this.state.email}
                    maxLength={15}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.inputForm}
                    onChangeText={(password)=>this.setState({password:password})}
                    secureTextEntry={true}
                    value={this.state.password}
                    maxLength={20}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={()=>this.onLogin()}>
                    <Text style={styles.submitText}>Login</Text>
                </TouchableOpacity>
                <Text
                onPress={()=>this.onNavigateRegister()}
                style={styles.signUp}
                >Sign Up</Text>
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
        marginTop:170,
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
        marginTop:40,
        alignSelf:'center',
        position: 'absolute',
    },
    inputForm:{
        height: 40,
        borderColor: '#00BFFF',
        borderWidth: 1,
        marginLeft:30,
        marginRight:30,
        marginTop:40,
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
    },

    signUp:{
        color:'#464d59',
        marginTop:10,
        marginRight:30,
        textAlign:'right',
        fontSize:13,
        fontWeight:'500'
    }

})

export default Login;