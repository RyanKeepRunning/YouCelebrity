import React,{Component} from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
  } from 'react-native';
import Masonry from 'react-native-masonry';
// import axios from 'axios';

class Gallery extends Component{
    constructor(props){
        super(props);
        this.state= {
            galleryList:[]
        }
    }
    static navigationOptions = { header: null }
    async componentDidMount(){
        let userId = 1;
        // try{
        //     const response = await axios.get("http://localhost:3333/api/getGalleryList/"+userId);
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

        const galleryList = [
            {data:{name:"Will Smith",similarity:"60%"},uri:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Will Smith",similarity:"60%"},uri:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Will Smith",similarity:"60%"},uri:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Will Smith",similarity:"60%"},uri:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Will Smith",similarity:"60%"},uri:"http://www.gstatic.com/tv/thumb/persons/1650/1650_v9_ba.jpg"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
            {data:{name:"Pikachu",similarity:"50%"},uri:"http://p1.pstatp.com/large/212f000013ad64823987"},
        ];

        galleryList.map(function(item,index){
            item.key = index;
            item.renderFooter = (data) =>{
                return(<View style={styles.item}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.name}>{data.similarity}</Text>
                    <Text style={styles.name}>similarity</Text>
                </View>)
            }
        })

        this.setState({galleryList});
    }

    render(){
        console.log(this.state.galleryList);
        return(
            <View style={styles.container}>
                <Masonry
                    columns={4} // optional - Default: 2
                    bricks={this.state.galleryList}
                    spacing= {3}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#c0e2f7',
        padding:10
    },
    item:{
        backgroundColor: 'white', 
        padding: 3, 
        paddingRight: 4, 
        paddingLeft: 4,
        alignItems: 'center',
    }
    ,
    name:{
        lineHeight: 20,
        fontSize: 16,
    }
});

export default Gallery;