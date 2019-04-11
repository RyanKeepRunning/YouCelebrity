import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Alert
  } from 'react-native';

class Home extends Component{
    static navigationOptions = { header: null }
    constructor(props){
        super(props);
        this.state={
            imgSource:""
        }
    }
    handleCelebrityModel=()=>{
        // Alert.alert('Wait',
        // 'In which way could we get the photo for ya?',
        // [
        // {text:'Library',onPress:()=>console.log('Library')},
        // {text:'Camera',onPress:()=>console.log('Camera')},
        // {text:'Cancel',onPress:()=>{}}
        // ])

        // ImagePicker.showImagePicker(optionsCelebrity, (response) => {
        //     console.log('Response = ', response);
            
        //     if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else {
        //         // const source = { uri: response.uri };
        //         // You can also display the image using data:
        //         const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //         this.setState({
        //             imgSource: source,
        //         });
        //     }
        // });
        this.props.navigation.navigate('SelectImg',{model:'Celebrity'});
    }
    handleAnimeModel=()=>{
        // Alert.alert('Wait',
        // 'In which way could we get the photo for ya?',
        // [
        // {text:'Library',onPress:()=>console.log('Library')},
        // {text:'Camera',onPress:()=>console.log('Camera')},
        // {text:'Cancel',onPress:()=>{}}
        // ])

        // ImagePicker.showImagePicker(optionsAnime, (response) => {
        //     console.log('Response = ', response);
          
        //     if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
        //     } else {
        //     //   const source = { uri: response.uri };
          
        //       // You can also display the image using data:
        //       const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
        //       this.setState({
        //             imgSource: source,
        //       });
        //     }
        // });
        this.props.navigation.navigate('SelectImg',{model:'Anime'});
    
    }
    
    render(){
        console.log(this.state.imgSource);
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Choose a category</Text>
                {this.state.imgSource===""?null:
                    <Image source={this.state.avatarSource} style={styles.uploadImg} />
                }
                <TouchableWithoutFeedback
                onPress={()=>this.handleCelebrityModel()}>
                <Image
                style={styles.img}
                source={require('../public/celebrity.png')}
                alt="CelebrityModel"
                />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                onPress={()=>this.handleAnimeModel()}>
                <Image
                style={styles.img}
                source={require('../public/anime.jpg')}
                alt="AnimeModel"
                />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#c0e2f7',
        alignItems: 'center',
        fontFamily: 'Courier'
    },
    text:{
        fontSize:28,
        color: "#464d59",
        fontWeight: "600",
        textAlign:'center',
        alignSelf:'center',
        marginTop:50
    },
    img:{
        backgroundColor: '#fff',
        width: 250,
        height: 130,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
        marginTop:43
    },
    uploadImg:{
        width: 250,
        height: 130,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
        marginTop:43
    }
});

export default Home;