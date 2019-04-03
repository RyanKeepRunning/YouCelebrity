import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Alert,
    TouchableOpacity,
    PixelRatio
  } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class SelectImg extends Component{
    constructor(props){
        super(props);
        this.state={
            imgSource:""
        }
    }
    selectPhotoTapped = () =>{
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
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              imgSource: source,
            });
          }
        });
    }
    handleSubmit = ()=>{
        Alert.alert(`Calculating using ${this.props.navigation.getParam('model', "")} model! Details:${this.state.imgSource.uri}`);
    }
    
    render(){
        console.log(this.state.imgSource);
        return(
            <View style={styles.container}>
                <Text style={styles.msg}>Using {this.props.navigation.getParam('model', "")} Model</Text>
                <TouchableWithoutFeedback onPress={()=>this.selectPhotoTapped()}>
                    <View style={[
                        styles.img,
                        styles.imgContainer,
                        { marginBottom: 20 },
                    ]}>
                        {this.state.imgSource===""?
                            (<Text style={styles.text}>Select an photo</Text>):
                            (<Image source={this.state.imgSource} style={styles.img} />)
                        }
                        
                    </View>
                </TouchableWithoutFeedback>
                {this.state.imgSource===""?
                null:<TouchableOpacity 
                onPress={()=>this.handleSubmit()}
                style={styles.submitButton}>
                    <Text style={styles.text}>Upload</Text>
                </TouchableOpacity>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c0e2f7',
    },
    msg:{
        marginTop:50,
        fontSize:28,
        textAlign:'center',
        color: "#464d59",
        fontWeight: "600"
    },
    imgContainer: {
        marginTop:70,
        borderColor: '#b1d3e0',
        borderWidth: 10 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#33b7e8'
    },
    img: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    text: {
        fontSize:18,
        color:"#fff",
    },
    submitButton:{
        marginTop:10,
        height:36,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:180,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    }
  });

export default SelectImg;