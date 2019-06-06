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
import firebase from "../firebase";


var db = firebase.firestore();

// Class for image gallery. It shows all collected images with corresponding similarity.
// If a user is not logged in, "go to login page" would be shown to navigate the user to login page.

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

    componentDidMount = async () => {
        this.subs = [
            this.props.navigation.addListener('didFocus', async () => { // To update this page when the gallery tab is focused
                const userToken = await AsyncStorage.getItem('userToken');
                var galleryList = [];
                if(userToken){
                    await db.collection(userToken).get().then(doc => { // Fetch images from server.
                        detectedHistory = doc.docs
                        detectedHistory.forEach(detectedImg => {
                            ImgInfo = {
                                name:detectedImg.data()['name'],
                                similarity:detectedImg.data()['similarity'],
                                uri:"data:image/png;base64,"+detectedImg.data()['base64']
                            }
                            galleryList.push(ImgInfo)
                        })
                    })

                    const response = {
                        data: {
                            avatar:"https://cdn140.picsart.com/268503922008211.png?r1024x1024",
                            galleryList: galleryList
                        }
                    }
                    this.setState({galleryList:response.data.galleryList,avatar:response.data.avatar,isLoggedIn:true});
                }else{
                    this.setState({isLoggedIn:false});
                }
            }),
        ];
    }

    componentWillUnmount() { 
        this.subs.forEach(sub => sub.remove()); // When gallery tab is not focused. Remove listener.
    }

    // Navigate user to login page to login.
    onNavigateToLogin = ()=>{ 
        this.props.navigation.navigate('Authentication');
    }

    render() {
        if(this.state.isLoggedIn){
            return (
                <View
                    style={styles.container}
                >
                    <View style={[styles.header, styles.mobileHeader, { paddingTop: 20 }]}>
                        <Text style={styles.title}>Gallery</Text>
                    </View>
                    {this.state.galleryList.length===0?null:<MasonryList
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
                                        <Text style={styles.info}>{data.similarity.toString().slice(0,4)}%</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                    />}
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