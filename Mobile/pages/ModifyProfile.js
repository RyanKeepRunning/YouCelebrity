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
    TouchableHighlight,
    TouchableWithoutFeedback,
    Alert,
    Navigator,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    } from 'react-native';
// import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import firebase from "../firebase";


var db = firebase.firestore();

class ModifyProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            info:"",
            token:"",
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
            avatar: this.props.navigation.getParam('currentAvatar',""),
            email: this.props.navigation.getParam('token',"")
        });
    }


    uploadAvatar = async () => {
        console.log("thisis uoloadAvatar");
        const options = {
          title: 'Select Avatar',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = {data: response.data};
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              avatar: source.data,
            });
    
          }
        });
      }
    

    onHandleSubmit= async()=>{
        const {goBack} = this.props.navigation;
        // Notification: Check if the postData.avatar.data is "" to see whether you need to update the avatar in the database.
        const imageData = new FormData();
        imageData.append('name', 'image');
        imageData.append('image',this.state.imgSource);


        const postData = {
            avatar:this.state.avatar,
            name:this.state.name,
            info:this.state.info,
            email:this.state.email
        }

        console.log(postData);
        db.collection('/users').doc(this.state.email).set(postData).then(()=>{
            Alert.alert('Success','Profile was successfully modified!');
            this.props.navigation.navigate('Authentication');
        }).catch((e) => {
            console.log(e)
            Alert.alert('Failure','Oops! Something went wrong! Please try again!');
        });
    }
    //this.props.navigation.getParam('currentAvatar',"")

    render(){
        return(
        <KeyboardAvoidingView 
            keyboardVerticalOffset = {Header.HEIGHT+20}
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : undefined} > 
            {/* avatar view */}
            <TouchableWithoutFeedback onPress={() => this.uploadAvatar()}>
                <Image style={styles.avatar} 
                    source={
                        !this.state.avatar ? 
                        require('../public/unLoggedInProfile.png'):
                        {uri:`data:image/gif;base64,${this.state.avatar}`}}
                />
            </TouchableWithoutFeedback>
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