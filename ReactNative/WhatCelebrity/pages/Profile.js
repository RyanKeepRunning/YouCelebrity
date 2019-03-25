import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
// import { createAppContainer, createStackNavigator} from 'react-navigation';
import ModifyProfile from './ModifyProfile';

class Profile extends Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = { header: null }

  onDeleteHistory=()=>{
    Alert.alert('Warning',
    ' You would lose all the records if you delete the history!',
    [
      {text:'Continue',onPress:()=>console.log('Continue')},
      {text:'Cancel',style:'cancel',onPress:()=>console.log('History deleted')}
    ])
  }
  onLogout= async ()=>{
    await AsyncStorage.clear();
    this.props.navigation.navigate('Authentication');
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://cdn140.picsart.com/268503922008211.png?r1024x1024'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Ryan</Text>
              <Text style={styles.info}>App developer</Text>    
              <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={()=>{
                this.props.navigation.navigate('ModifyProfile');
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
    );
  }
}

// const RootStack = createStackNavigator(
//   {
//     Profile: Profile,
//     ModifyProfile: ModifyProfile,
//   }
// );
// const AppContainer = createAppContainer(RootStack);

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