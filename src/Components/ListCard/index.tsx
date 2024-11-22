import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  ActivityIndicator,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import { toDp } from "../../Helper/percentageToDP";

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

let id = '';
let limit = 0;

export default class ListCard extends Component<any, any> {
  
  componentDidMount() {
    limit = this.props.limit;
  }

  renderItem = ({ item, index } : {item: any, index: number}) => {
    id = item.id;
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.left}>
              <Text style={styles.message}>{item.content}</Text>
              <Text style={styles.time}>{item.createdAt}</Text>
            </View>
            <View style={styles.right}>
              {item.contentPicture === 'no picture' ? (
                <View />
              ) : (
                <Image source={{ uri: item.contentPicture }} style={styles.urlPhoto} />
              )}
              <View />
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  };

  renderItemShimmer = ({ item, index } : { item: any, index: number }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.left}>
              <ShimmerPlaceHolder style={[styles.message, { width: toDp(200) }]} />
              <ShimmerPlaceHolder style={[styles.time, { width: toDp(75) }]} />
            </View>
            <View style={styles.right}>
              <ShimmerPlaceHolder style={styles.urlPhoto} />
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return <ActivityIndicator size="large" color="#20A7B5" style={{ marginVertical: toDp(24) }} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.arrayData.length === 0 && !this.props.loading ? (
          <View style={styles.viewCenter}>
            <Text style={styles.textEmpty}>{this.props.messages}</Text>
          </View>
        ) : (
          <ScrollView
            ref="scrollView"
            onMomentumScrollEnd={(e: any) => {
              let hasil = limit - parseInt((e.nativeEvent.contentOffset.y / toDp(110)).toString());
              if (hasil === 6 || hasil === 5) {
                this.props.loadData(id);
                limit += this.props.limit;
              }
            }}
          >
            <FlatList
              data={this.props.loading ? ['', '', '', '', '', '', '', ''] : this.props.arrayData}
              renderItem={this.props.loading ? this.renderItemShimmer : this.renderItem}
              ListFooterComponent={
                this.props.arrayData.length % this.props.limit === 0 ? (
                  this.renderFooter()
                ) : (
                  <View />
                )
              }
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEmpty: {
    fontSize: toDp(16),
    color: '#151d2c',
    letterSpacing: toDp(0.7),
    fontFamily: 'Montserrat-Regular',
    margin: toDp(16),
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'column',
    height: toDp(110),
  },
  content: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: toDp(10),
  },
  left: {
    flex: 8,
  },
  right: {
    flex: 2,
    alignItems: 'flex-end',
  },
  urlPhoto: {
    width: toDp(58),
    height: toDp(58),
    resizeMode: 'contain',
  },
  message: {
    fontFamily: 'Montserrat-Regular',
    fontSize: toDp(16),
    lineHeight: toDp(21),
    color: '#757575',
  },
  time: {
    fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    lineHeight: toDp(14),
    color: '#AAAAAA',
    marginTop: toDp(30),
  },
  line: {
    backgroundColor: '#EEEEEE',
    height: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
