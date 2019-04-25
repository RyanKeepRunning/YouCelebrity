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

function getFakeResponse() {
  return new Promise(function(resolve) {
    setTimeout(() => resolve({data:{
      imgSet:["http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg","https://www.thenational.ae/image/policy:1.782205:1539936253/na20-WIllSmith.jpg?f=16x9&w=1200&$p$f$w=34b487a"],
      name:"Will Smith",
      similarity:"60%"
    }}), 4000);
  });
}

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
        this.setState({isLoading:true});
        const imageData = new FormData();
        imageData.append('name', 'image');
        imageData.append('image',this.state.imgSource);

        //TODO: Gao xiong! CALL your firebase api to upload the imageData to the backend server. (I've made this method async)
        //See line 47 to see the details of imageData.
        //Notice: use await/then to let the UI wait until it fetches the response from the backend server.

        // The reponse would be similar to this.
        // const response = {data:{
        //   img:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg",
        //   name:"Will Smith",
        //   similarity:"60%"
        // }}
        getFakeResponse().then(response => {
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate('Result',{result:response.data});
        });
        // this.props.navigation.navigate('Result',{result:response.data});
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