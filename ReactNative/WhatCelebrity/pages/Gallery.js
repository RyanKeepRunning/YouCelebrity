import React,{Component} from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
  } from 'react-native';
// import axios from 'axios';

  class Gallery extends Component{
      constructor(props){
          super(props);
          this.state= {
              galleryList:[]
          }
      }
      async componentDidMount(){
        let userId = 1;
        // try{
        //     const response = await axios.get("http://localhost:3333/api/getGalleryList/"+userId);
        //     if(response.data.status==="success"){
        //         const galleryList = response.data.galleryList;
        //         this.setState({
        //             galleryList
        //         })
        //     }
        // }catch(e){
        //     console.log(e);
        // }
        this.setState({
            galleryList:[
                {name:"Will Smith",src:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
                {name:"Pikachu",src:"http://p1.pstatp.com/large/212f000013ad64823987"}
            ]
        })
      }

      render(){
          return(
                <View style={styles.container}>
                    {this.state.galleryList.map((elem)=>{
                        <View style={styles.galleryElem}>
                            <Image source={{uri:elem.src}} alt={elem.name}/>
                            <Text>{elem.name}</Text>
                        </View>
                    })}
                </View>
          )
      }
  }

  const styles = StyleSheet.create({
      container:{
          backgroundColor:'#c0e2f7'
      }
  });

  export default Gallery;