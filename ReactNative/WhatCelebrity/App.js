import React from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Profile from './pages/Profile';
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
                <Home/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'camera'}
                title="Camera"
                renderIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/camera-icon-clip-art--royalty--1.png'}}/>}
                renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/big-camera-icon--camera-icons--softiconsm-20.png'}} />}
                onPress={() => this.setState({ selectedTab: 'camera' })}>
                <Camera/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Profile"
                renderIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/profile-icon-png-user-account-profile-people--6.png'}}/>}
                renderSelectedIcon={() => <Image style={{width: 50, height: 50}}
                                         source={{uri: 'https://www.freeiconspng.com/minicovers/profile-icon-1.png'}} />}
                onPress={() => this.setState({ selectedTab: 'profile' })}>
                <Profile/>
            </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0e2f7',
  },
});