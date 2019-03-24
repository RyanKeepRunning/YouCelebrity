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
    AsyncStorage
  } from 'react-native';
  import {Header} from 'react-navigation';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    signUpAsync = async()=>{
        //TODO axios call to validate and save user info.
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Authentication');
    }

    onRegister = () => {
        this.signUpAsync();
    }

    render(){
        console.log(this.state);
        return(
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="padding"
            keyboardVerticalOffset = {Header.HEIGHT + 10} > 
            {/* avatar view */}
            <Image style={styles.avatar} source={require('../assets/unLoggedInProfile.png')}/>
            <Text style={styles.msg}>Register your account</Text>
            {/* avatart upload button */}
            <ScrollView style={styles.content} >
                <TextInput 
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
                    value={this.state.password}
                    maxLength={20}
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