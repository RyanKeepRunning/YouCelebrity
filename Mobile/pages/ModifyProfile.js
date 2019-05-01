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
    } from 'react-native';
// import axios from "axios";
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

    async componentDidMount(){
        this.setState({imgSource:{
            uri: this.props.navigation.getParam('currentAvatar',""),
            type:"",
            name:"",
            data:"",
            },
            token: this.props.navigation.getParam('token',"")});
    }

    selectPhotoTapped = async () =>{
        
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = {
              uri: response.uri,
              type: response.type,
              name: response.fileName,
              data: response.data,
            };
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              imgSource: source,
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
            token: this.state.token,
            avatar:imageData,
            name:this.state.name,
            info:this.state.info
        }
        console.log(postData);
        db.collection('/users').doc(this.state.email).update(postData).then(()=>{
            alert('Success','Profile was successfully modified!');
        }).catch(() => {
            alert('Failure','Oops! Something went wrong! Please try again!');
        });
        Alert.alert('Success','Profile was successfully modified!');
        goBack();
    }
    //this.props.navigation.getParam('currentAvatar',"")

    render(){
        return(
        <KeyboardAvoidingView 
            keyboardVerticalOffset = {Header.HEIGHT+20}
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : undefined} > 
            {/* avatar view */}
            <TouchableHighlight onPress={() => this.selectPhotoTapped()}>
                {this.state.imgSource.uri === ""? <Image style={styles.avatar} source={require('../public/unLoggedInProfile.png')}/>:
                <Image style={styles.avatar} source={{uri: this.state.imgSource.uri }} />}
            </TouchableHighlight>
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