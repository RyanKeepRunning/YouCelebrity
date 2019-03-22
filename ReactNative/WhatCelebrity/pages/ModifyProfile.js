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
    ScrollView
  } from 'react-native';
import {Header} from 'react-navigation';

class ModifyProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            avatar:"",
            name:"",
            info:"",
        }
    }

    render(){
        return(
        <KeyboardAvoidingView 
            keyboardVerticalOffset = {Header.HEIGHT+20}
            style={styles.container} 
            behavior="padding" > 
            {/* avatar view */}
            <Image style={styles.avatar} source={{uri: 'https://cdn140.picsart.com/268503922008211.png?r1024x1024'}}/>
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
                    style={styles.submitButton}>
                    <Text>Submit</Text>
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
    }

})

export default ModifyProfile;