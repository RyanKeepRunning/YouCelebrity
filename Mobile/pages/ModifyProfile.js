import React,{Component} from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    } from 'react-native';
import {Header} from 'react-navigation';
import firebase from "../firebase";


var db = firebase.firestore();

// Page for profile modification.
class ModifyProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            info:"",
            token:"",
            avatar:"https://cdn140.picsart.com/268503922008211.png?r1024x1024",
            imgSource:{
                uri:"",
                type:"",
                name:"",
                data:"",
              }
        }
    }

    componentDidMount = () => {
        this.setState({
            email: this.props.navigation.getParam('token',"")
        });
    }

    onHandleSubmit= async()=>{
        const postData = {
            name:this.state.name,
            info:this.state.info,
            email:this.state.email
        }

        db.collection('/users').doc(this.state.email).set(postData).then(()=>{
            Alert.alert('Success','Profile was successfully modified!');
            this.props.navigation.navigate('Authentication'); // to authentication route to relocate based on user token state
        }).catch((e) => {
            Alert.alert('Failure','Oops! Something went wrong! Please try again!');
        });
    }
    render(){
        return(
        <KeyboardAvoidingView 
            keyboardVerticalOffset = {Header.HEIGHT+20}
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : undefined} > 
           
            <Image style={styles.avatar} 
                source={
                    !this.state.avatar ? 
                    require('../public/unLoggedInProfile.png'):
                    {uri:this.state.avatar}}
            />
            <ScrollView style={styles.content}>
                <TextInput 
                    placeholder="Your new name"
                    style={styles.inputForm}
                    onChangeText={(name)=>this.setState({name:name})}
                    value={this.state.name}
                    maxLength={15}
                />
                <TextInput
                    placeholder="Your new description"
                    style={styles.inputForm}
                    onChangeText={(info)=>this.setState({info:info})}
                    value={this.state.info}
                    maxLength={20}
                />
                <TouchableOpacity
                    onPress={()=>this.onHandleSubmit()}
                    style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
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
        marginTop:120
    },
    avatar: {
        backgroundColor: '#f7bbda',
        width: 110,
        height: 110,
        borderRadius: 53,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:20,
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

})

export default ModifyProfile;