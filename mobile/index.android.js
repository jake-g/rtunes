import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	WebView,
	Text,
	Image
} from 'react-native';

const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');
const app = require('./index.html')

export default class rtunes extends Component {
	render() {

		return (
			<View style={styles.container}>
				<WebView ref={'webview'} automaticallyAdjustContentInsets={false} source={app} style={styles.video} javaScriptEnabled={true} domStorageEnabled={true} decelerationRate="normal" startInLoadingState={true} scalesPageToFit={true}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	video: {
		flex: 1,
		width: windowSize.width,
		height: windowSize.height
	}
});

AppRegistry.registerComponent('rtunes', () => rtunes);
