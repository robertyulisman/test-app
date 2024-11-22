import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Platform, StyleSheet, Dimensions } from 'react-native';

import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');
export default class CustomWebView extends Component<any, any> {
  render() {
    return (
      <View style={styles.content}>
        <WebView
          source={{ uri: this.props.uri }}
          style={styles.webView}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true}
          scalesPageToFit={true}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          // scalesPageToFit={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: Platform.OS === 'android' ? 0 : 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    width,
  },
});
