import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';

class Result extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const result = this.props.navigation.getParam('result',{});
        console.log(result);
        return(
            <View style={styles.container}>
                <Text style={styles.msg}>Result</Text>
                <Image source={{uri:result.img}} style={styles.exampleImg} />
                <Text style={styles.text}>{result.name}</Text>
                <Text style={styles.text}>Similarity: {result.similarity}</Text>
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
    exampleImg:{
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: "white",
        alignSelf:'center',
        marginTop:20
    },
    text:{
        marginTop:20,
        fontSize:17,
        textAlign:'center',
        color: "#464d59",
        fontWeight: "600"
    }
  });

export default Result;