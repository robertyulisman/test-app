import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';
import ImageZoom from 'react-native-image-pan-zoom';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

let { width, height } = Dimensions.get('window');

class CustomImageView extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  renderModal = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackButtonPress={() => this.setState({ modalVisible: false })}
        isVisible={this.state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={[styles.viewRootModal, { height }]}>
          <View style={[styles.modalBox, { backgroundColor: '#000000', height }]}>
            <View style={styles.viewModalTitle}>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Image
                  source={allLogo.icSilang}
                  style={[styles.icSilang, { tintColor: 'white' }]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.viewCenter}>
              // @ts-expect-error TS(2769): No overload matches this call.
              <ImageZoom
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={toDp(400)}
                imageHeight={toDp(400)}
              >
                <Image
                  style={{ resizeMode: 'contain', width: toDp(400), height: toDp(400) }}
                  source={{ uri: this.props.uri }}
                />
              </ImageZoom>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <Image source={{ uri: this.props.uri }} style={this.props.style} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCenter: {
    width,
    alignItems: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewRootModal: {
    width,
  },
  modalBox: {
    width,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewModalTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchSilang: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
    borderRadius: toDp(20),
    backgroundColor: '#121212',
    zIndex: 1,
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: 'white',
  },
});

export default CustomImageView;
