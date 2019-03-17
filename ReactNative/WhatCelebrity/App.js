import React from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'home'
    }
  }
  render() {
    let tabBarHeight = 80;
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>Thanks for using YouCelebrity!</Text>
        <TabNavigator tabBarStyle={{ height: tabBarHeight}}>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'home'}
                title="Home"
                renderIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/uploads/home-icon-4.png'}} />}
                renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/uploads/home-icons-29.png'}} />}
                badgeText="1"
                onPress={() => this.setState({ selectedTab: 'home' })}>
                <Text>homepage</Text>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'camera'}
                title="Camera"
                renderIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/camera-icon-clip-art--royalty--1.png'}}/>}
                renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/big-camera-icon--camera-icons--softiconsm-20.png'}} />}
                onPress={() => this.setState({ selectedTab: 'camera' })}>
                <Text>camera</Text>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Profile"
                renderIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/profile-icon-png-user-account-profile-people--6.png'}}/>}
                renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/profile-icon-1.png'}} />}
                onPress={() => this.setState({ selectedTab: 'profile' })}>
                <Text>profile</Text>
            </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    backgroundColor:'gray',
    color: 'blue',
    fontWeight:'bold',
    fontSize:30,
    lineHeight:150,
    textAlign: 'center',
    alignItems:'center',
    textAlignVertical:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page1: {
    flex: 1,
    backgroundColor: 'red'
  },
  page2: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  image: {
    height: 50,
    width: 50
  }
});