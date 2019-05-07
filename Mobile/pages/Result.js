import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';

class Result extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkGraph: 'img'
        }
        console.log("this is result page")

    }
    onToggleGraph = ()=>{
        let checkGraph = this.state.checkGraph === "img"? "photo":"img";
        console.log(checkGraph)
        this.setState({
            checkGraph:checkGraph,
        })
    }

    render(){
        const result = this.props.navigation.getParam('result',{});
        console.log("this is result page's reslut:  ", result)
        var shownGraph;
        console.log(this.state.checkGraph);
        if(this.state.checkGraph === 'img'){
            // shownGraph = result.imgSet[0];
            shownGraph = result.detectedImg
        }else{
            shownGraph = result.testImg
            // shownGraph = result.imgSet[1];
        }
        console.log(shownGraph)
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>this.onToggleGraph()}
                    style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>{this.state.checkGraph==="img"? "Check the original photo":"Check the result"}</Text>
                </TouchableOpacity>
                <Image source={{uri:`data:image/gif;base64,${shownGraph}`}} style={styles.exampleImg} />
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
    },
    toggleButton:{
        height: 60,
        borderColor: '#00BFFF',
        borderWidth: 1,
        marginLeft:30,
        marginRight:30,
        marginTop:34,
        marginBottom:10,
        borderRadius:30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#00BFFF'
    },
    toggleButtonText:{
        color:'#fff',
        fontSize:20,
    }
  });

export default Result;