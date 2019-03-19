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
    Alert
  } from 'react-native';

class Camera extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    showAlert(msg){
        Alert.alert("Loading","Trying to " + msg);
    }

    onPressImgGallery = () => {
        this.showAlert("open the gallery");
    }

    onPressCamera = () => {
        this.showAlert("take a photo");
    }

    render(){
        console.log(this.state);
        return(
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.onPressImgGallery()}
                underlayColor='#fff'>
                <Text style={styles.text}>Choose a photo from Gallery</Text>
            </TouchableOpacity>    

            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.onPressCamera()}
                underlayColor='#fff'>
                <Text style={styles.text}>Take a picture using Camera</Text>
            </TouchableOpacity>    
        </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#4286f4',
        marginRight:40,
        marginLeft:40,
        marginTop: 120,
        paddingTop:25,
        paddingBottom:25,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    text:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    }
});

export default Camera;