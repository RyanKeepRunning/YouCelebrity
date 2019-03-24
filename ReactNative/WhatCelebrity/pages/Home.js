import React,{Component} from 'react';

import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Alert
  } from 'react-native';
import Gallery from './Gallery';
import { createAppContainer, createStackNavigator} from 'react-navigation';

class Home extends Component{
    static navigationOptions = { header: null }
    handleCelebrityModel=()=>{
        Alert.alert("Loading","Trying to use Celebrity Model");
    }
    handleAnimeModel=()=>{
        Alert.alert("Loading","Trying to use Anime Model");
    }
    handleGallery=()=>{
        this.props.navigation.navigate('Gallery');
    }
    
    render(){
        return(
            <View style={styles.container}>
                    <TouchableHighlight
                    onPress={()=>this.handleCelebrityModel()}>
                    <Image
                    style={styles.img}
                    source={require('../assets/celebrity.png')}
                    alt="CelebrityModel"
                    />
                    </TouchableHighlight>

                    <TouchableHighlight
                    onPress={()=>this.handleAnimeModel()}>
                    <Image
                    style={styles.img}
                    source={require('../assets/anime.jpg')}
                    alt="AnimeModel"
                    />
                    </TouchableHighlight>

                    <TouchableHighlight
                    onPress={()=>this.handleGallery()}>
                    <Image
                    style={styles.img}
                    source={require('../assets/gallery.jpg')}
                    alt="Gallery"
                    />
                    </TouchableHighlight>
            </View>
        )
    }
}

// const RootStack = createStackNavigator(
//     {
//         Home:Home,
//         Gallery:Gallery
//     }
// );
// const AppContainer = createAppContainer(
//     RootStack
// )

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#c0e2f7'
    },
    img:{
        backgroundColor: '#fff',
        width: 250,
        height: 130,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
        marginTop:23
    }
});

export default Home;