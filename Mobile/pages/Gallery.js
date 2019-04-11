import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
  } from 'react-native';
import MasonryList from "react-native-masonry-list";
import AsyncStorage from '@react-native-community/async-storage';
// import console = require('console');
// import axios from 'axios';

class Gallery extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoggedIn:false,
            avatar:"",
            galleryList:[]
        }
    }
    static navigationOptions = { header: null }

    async componentDidMount(){

        this.subs = [
            this.props.navigation.addListener('didFocus', async () => {
                const userToken = await AsyncStorage.getItem('userToken');
                console.log(userToken);
                if(userToken){
                    const response = {
                        data: {
                            avatar:"https://cdn140.picsart.com/268503922008211.png?r1024x1024",
                            galleryList: [
                                {name:"Will Smith",similarity:"60%",uri:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                                {name:"Pikachu",similarity:"50%",uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
                            ]
                        }
                    }
                    this.setState({galleryList:response.data.galleryList,avatar:response.data.avatar,isLoggedIn:true});
                }else{
                    this.setState({isLoggedIn:false});
                }
            }),
        ];

        // try{
        //     const response = await axios.get("http://localhost:3333/api/getGalleryList/"+userToken);
        //     if(response.data.status==="success"){
        //         const galleryList = response.data.galleryList;
        //         galleryList.map(function(item,index){
        //             item.key = index;
        //             item.renderFooter = data =>{
        //                 return(<View style={styles.item}>
        //                     <Text style={styles.name}>{data.name}</Text>
        //                     <Text style={styles.name}>{data.similarity}</Text>
        //                     <Text style={styles.name}>similarity</Text>
        //                 </View>)
        //             }
        //         })
        //         this.setState({
        //             galleryList
        //         })
        //     }
        // }catch(e){
        //     console.log(e);
        // }
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    onNavigateToLogin = ()=>{
        this.props.navigation.navigate('Authentication');
    }

    render() {
        console.log(this.state);
        if(this.state.isLoggedIn){
            return (
                <View
                    style={styles.container}
                >
                    <View style={[styles.header, styles.mobileHeader, { paddingTop: 20 }]}>
                        <Text style={styles.title}>Gallery</Text>
                    </View>
                    <MasonryList
                        images={this.state.galleryList}
                        columns={3}
                        backgroundColor={"#c0e2f7"}
                        renderIndividualHeader={(data) => {
                            return (
                                <TouchableWithoutFeedback>
                                    <View style={styles.masonryHeader}>
                                        <Image
                                            source={{ uri: this.state.avatar }}
                                            style={styles.userPic} />
                                        <Text style={styles.info}>{data.name} </Text>
                                        <Text style={styles.info}>{data.similarity}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                    />
                </View>
            );
        }else{
            return(
                <View style={styles.container}>
                    <Text style={styles.alert}>Please Login first</Text>
                    <TouchableOpacity
                    style={styles.submitButton}
                    onPress={()=>this.onNavigateToLogin()}>
                    <Text style={styles.submitText}>Go to Login page</Text>
                </TouchableOpacity>
                </View>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c0e2f7"
    },
    header: {
        height: 64,
        backgroundColor: "transparent"
    },
    mobileHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    masonryHeader: {
        flex:1,
        position: "absolute",
        zIndex: 10,
        alignItems: "center",
        backgroundColor: "rgba(150,150,150,0.4)"
    },
    title: {
        fontSize: 25,
        fontWeight:'bold'
    },
    userPic: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: 10
    },
    info: {
        fontSize: 10,
        color: "#fafafa",
        fontWeight: "bold",
    },
    alert:{
        marginTop:170,
        fontSize:24,
        textAlign:'center',
        color: "#464d59",
        fontWeight: "600"
    },
    submitText:{
        color:'#fff',
        fontSize:20,
    },
    submitButton:{
        marginLeft:30,
        marginRight:30,
        marginTop: 40,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
    }

});

export default Gallery;