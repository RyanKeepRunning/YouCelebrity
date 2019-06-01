import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "../firebase";

// import { createAppContainer, createStackNavigator} from 'react-navigation';

const db = firebase.firestore();

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          return 0;
        }

        // Delete documents in a batch
        var batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }

        // Recurse on the next process tick, to avoid
        // exploding the stack.
    process.nextTick = setImmediate(() => deleteQueryBatch(db, query, batchSize, resolve, reject));
      }).catch(reject);    
}

class Profile extends Component {
  constructor(props){
    super(props);

    this.state={
      avatar:"https://cdn140.picsart.com/268503922008211.png?r1024x1024",
      name:"",
      info:"",
      email:""
    }
  }

  static navigationOptions = { header: null }
  onDeleteHistory=()=>{
    Alert.alert('Warning',
    ' You would lose all the records if you delete the history!',
    [
      {text:'Continue',onPress:()=>deleteCollection(db, this.state.email, 1)},
      {text:'Cancel',style:'cancel',onPress:()=>console.log('History deleted')}
    ])
    

  }

  onLogout= async ()=>{
    //TODO You also need to logout at the backend!
    await AsyncStorage.clear();
    this.props.navigation.navigate('Authentication');
  }

 

  componentDidMount = async ()=>{
    this.subs = [
      this.props.navigation.addListener('didFocus',async ()=>{
        const response = {
          data:{
            avatar:'https://cdn140.picsart.com/268503922008211.png?r1024x1024',
            name:'Ryan',
            info:'App developer',
            status: 'success'
          }
        }
    
        AsyncStorage.getItem('userToken').then((value) => {
          
          if(value){
    
        db.collection('/users').doc(value).get().then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              this.setState({ 
                'email': value, 
                'name' : doc.data()['name'],
                'info' : doc.data()['info'],
                'avatar':doc.data()['avatar'] //Hardcoded for test purpose. Modify it later.
              })
            }
          }).catch(err => {
            console.log('Error getting document', err);
          })}
          else{
            console.log("no user logged!")
          }
        });
      })
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {
    return (
      <View style={styles.container}>
      {!this.state.email?
        <View style={styles.container}>
        <View style={styles.header}></View>
        <ActivityIndicator size="large" color="#00BFFF" animating={this.state.ifLoading}/>
        </View>
      : <View style={styles.container}>
        <View style={styles.header}></View>
            <Image style={styles.avatar} 
              source={
                // !this.state.avatar? 
                // require('../public/unLoggedInProfile.png'):
                // {uri:`data:image/gif;base64,${this.state.avatar}`}}
                {uri:`https://cdn140.picsart.com/268503922008211.png?r1024x1024`}}
                />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.info}>{this.state.info}</Text> 
              <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=>{
                this.props.navigation.navigate('ModifyProfile',{currentAvatar:this.state.avatar,token:this.state.email});
                }}
                >
                <Text style={styles.text}>Modify Profile</Text> 
              </TouchableOpacity> 
              <TouchableOpacity style={styles.buttonContainer}
                onPress={()=>this.onDeleteHistory()}>
                <Text style={styles.text}>Delete History</Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButtonContainer}
                onPress={()=>this.onLogout()}>
                <Text style={styles.text}>Logout</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
    }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#c0e2f7',
  },
  header:{
    backgroundColor: "#00BFFF",
    height:100,
  },
  avatar: {
    backgroundColor: '#f7bbda',
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },

  name:{
    height:50,
    fontSize:28,
    color: "#464d59",
    fontWeight: "600"
  },
  info:{
    height:30,
    fontSize:22,
    color: "#464d59",
    fontWeight: "600"
  },
  
  buttonContainer: {
    marginTop:22,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  
  logoutButtonContainer: {
    marginTop:22,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
    backgroundColor: "#bf5f5f",
  },

  text:{
    fontSize:18,
    color:"#fff"
  }
});

export default Profile;
// export default Profile;