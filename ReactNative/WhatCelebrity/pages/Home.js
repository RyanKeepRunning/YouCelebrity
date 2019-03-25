import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Alert
  } from 'react-native';

class Home extends Component{
    static navigationOptions = { header: null }
    handleCelebrityModel=()=>{
        Alert.alert('Wait',
        'In which way could we get the photo for ya?',
        [
        {text:'Local storage',onPress:()=>console.log('Local storage')},
        {text:'Camera',onPress:()=>console.log('Camera')},
        {text:'Cancel',onPress:()=>console.log('Cancel')}
        ])
    }
    handleAnimeModel=()=>{
        Alert.alert('Wait',
        'In which way could we get the photo for ya?',
        [
        {text:'Local storage',onPress:()=>console.log('Local storage')},
        {text:'Camera',onPress:()=>console.log('Camera')},
        {text:'Cancel',onPress:()=>console.log('Cancel')}
        ])
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Choose a category</Text>
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
    }
});

export default Home;