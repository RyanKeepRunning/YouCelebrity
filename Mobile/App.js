import React from 'react';
import Home from './pages/Home';
// import Camera from './pages/Camera';
import Profile from './pages/Profile';
import ModifyProfile from './pages/ModifyProfile';
// import TabNavigator from 'react-native-tab-navigator';
import Login from './pages/Login';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import Authentication from './pages/Authentication';
import { createAppContainer, createStackNavigator,createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SelectImg from './pages/SelectImg';
import Result from './pages/Result';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isUserLoggedIn: true,
    }
  }

  handleLogout=()=>{
    this.setState({
      isUserLoggedIn:false
    })
  }

  handleLogin =()=>{
    this.setState({
      isUserLoggedIn:true
    })
  }

  render() {

    // let tabBarHeight = 80;
    // return (
    //   <View style={styles.container}>
    //     <TabNavigator tabBarStyle={{ height: tabBarHeight}}>
    //         <TabNavigator.Item
    //             selected={this.state.selectedTab === 'home'}
    //             title="Home"
    //             renderIcon={() => <Image style={{width: 50, height: 50}}
    //                                      source={{uri: 'https://www.freeiconspng.com/uploads/home-icon-4.png'}} />}
    //             renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
    //                                      source={{uri: 'https://www.freeiconspng.com/uploads/home-icons-29.png'}} />}
    //             badgeText="1"
    //             onPress={() => this.setState({ selectedTab: 'home' })}>
    //             <Home/>
    //         </TabNavigator.Item>
    //         <TabNavigator.Item
    //             selected={this.state.selectedTab === 'camera'}
    //             title="Camera"
    //             renderIcon={() => <Image style={{width: 50, height: 50}}
    //                                      source={{uri: 'https://www.freeiconspng.com/minicovers/camera-icon-clip-art--royalty--1.png'}}/>}
    //             renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
    //                                      source={{uri: 'https://www.freeiconspng.com/minicovers/big-camera-icon--camera-icons--softiconsm-20.png'}} />}
    //             onPress={() => this.setState({ selectedTab: 'camera' })}>
    //             <Camera/>
    //         </TabNavigator.Item>
    //         <TabNavigator.Item
    //             selected={this.state.selectedTab === 'profile'}
    //             title="Profile"
    //             renderIcon={() => <Image style={{width: 50, height: 50}}
    //                                      source={{uri: 'https://www.freeiconspng.com/minicovers/profile-icon-png-user-account-profile-people--6.png'}}/>}
    //             renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
    //                                      source={{uri: 'https://www.freeiconspng.com/minicovers/profile-icon-1.png'}} />}
    //             onPress={() => this.setState({ selectedTab: 'profile' })}>
    //             {this.state.isUserLoggedIn?
    //               <Profile screenProps={{handleLogout: this.handleLogout}}/>
    //               :
    //               <Login screenProps = {{handleLogin:this.handleLogin}}/>}
    //         </TabNavigator.Item>
    //     </TabNavigator>
    //   </View>
    // );

    // <AppContainer/>

  }
}

const getTabBarIcon = (navigation, focused) => {
  const { routeName } = navigation.state;
  if (routeName === 'Home') {
    return focused? 
      <MaterialCommunityIcons name="home" size={50} color="#00BFFF" />
      :
      <MaterialCommunityIcons name="home-outline" size={50} color="#c0e2f7" />
  }  else if (routeName === 'Gallery') {
    return focused? 
    <FontAwesome name="picture-o" size={45} color="#00BFFF" />
      :
      <SimpleLineIcons name="picture" size={45} color="#c0e2f7" />
  }  else if (routeName === 'Profile') {
    return focused? 
    <MaterialIcons name="person" size={50} color="#00BFFF" />
      :
      <MaterialIcons name="person-outline" size={50} color="#c0e2f7" />
  };
}

let HomeStack = createStackNavigator({
  Home,SelectImg,Result
},{initialRouteName:'Home'});
let ProfileStack = createStackNavigator({
  Profile,ModifyProfile
});
let LoginStack = createStackNavigator({
  Login, Register
})

let GalleryStack = createStackNavigator({
  Gallery
})

const MembershipSwitch = createSwitchNavigator({
  Authentication,LoginStack,ProfileStack
})

const TabNavigator = createBottomTabNavigator({
  Home:{screen:HomeStack,navigationOptions:{
    tabBarLabel:'Home',
    tabBarOnPress: ({navigation, defaultHandler}) => {
      navigation.navigate('Home');
      defaultHandler();
    },
  }},
  Gallery:{screen:GalleryStack},
  Profile:{screen:MembershipSwitch}
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    style:{
      height:75
    },
    labelStyle:{
      fontFamily:'Courier',
      fontSize:15
    },
    activeTintColor: '#00BFFF',
    inactiveTintColor: 'gray',
  },
});

export default createAppContainer(TabNavigator);