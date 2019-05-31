import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Alert,
    TouchableOpacity,
    PixelRatio,
    ActivityIndicator,
  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "../firebase";
// import { ENGINE_METHOD_NONE } from 'constants';



var db = firebase.firestore();


function getResponse() {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(result_data), 4000);
  });
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var testImg

class SelectImg extends Component{
    constructor(props){
        super(props);
        this.state={
            imgSource:{
              uri:"",
              type:"",
              name:"",
              data:"",
              token:""
            },
            isLoading:false,
        }
    }


    selectPhotoTapped = async () =>{
      console.log('------------');

      let token = await AsyncStorage.getItem('userToken');
      if(!token){
        token = "guest";
      }
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
            model: this.props.navigation.getParam('model',""), //the corresponding model: celebrity or anime
            token: token
          };
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            imgSource: source,
          });
        }
      });
    }
    
    handleSubmit = async ()=>{
      if(this.state.imgSource.uri === ""){
        Alert.alert('Hey mate! You should select a photo first!');
      }else{
        AsyncStorage.getItem('userToken').then((value) => {
          this.setState({ 
            email: value,
            isLoading:true
           });
          console.log("this.state.email: ",this.state.email);
          
          var img = this.state.imgSource.data  // use the Blob or File API
          testImg = img

        //will modify after the anime model finished 
          var upload_data = { 
            base64: img,
            model:  this.state.imgSource.model
          }
          db.collection('imgs').doc('img').set(upload_data);
          console.log('test img uploaded! ');
          });

          var result_data = {}
          await sleep(40000).then(()=>{
            db.collection('output').doc('output').get().then(docSnapshot => {
              let Snapdata = docSnapshot.data();
              result_data = {
                testImg:Snapdata['img']['_binaryString'],
                detectedImg:Snapdata['celebrity']['_binaryString'],
                name:Snapdata['predict_name'],
                similarity:Snapdata['predict_score']
              }
              console.log(result_data);

              var upload_data = { 
                base64: Snapdata['celebrity']['_binaryString'],
                name:Snapdata['predict_name'],
                similarity:Snapdata['predict_score'] }
              
              db.collection(this.state.email).add(upload_data).then(ref => {
                console.log('Added document with ID: ', ref.id);
              });
              console.log('test img recorded into history')
    
              this.props.navigation.navigate('Result',{result:result_data});
              this.setState({
                isLoading:false
              })
              db.collection('output').doc('output').delete();
              console.log("output data deleted.")
            }).catch(err => {
              console.log('Error getting document', err);
            });
          })
      }
    }
    //why it is relevant. reference. not just what you gonna do, why it is the right/good way todo the testing.
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
                        {this.state.imgSource.uri===""?
                            (<Text style={styles.text}>Select an photo</Text>):
                            (<Image source={{uri:this.state.imgSource.uri}} style={styles.img} />)
                        }
                        
                    </View>
                </TouchableWithoutFeedback>
                {this.state.isLoading?<ActivityIndicator size="large" color="#00BFFF" animating={this.state.ifLoading}/>:null}
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
        marginTop:40,
        fontSize:28,
        textAlign:'center',
        color: "#464d59",
        fontWeight: "600"
    },
    imgContainer: {
        marginTop:40,
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
        marginTop:20,
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