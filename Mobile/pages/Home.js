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
        this.props.navigation.navigate('SelectImg',{model:'Celebrity'});
    }

    handleAnimeModel=()=>{
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