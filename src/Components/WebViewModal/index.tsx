import React, { LegacyRef } from 'react';
import {
  Animated,
  Image,
  ImageProps,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import ImageDetail from './ImageDetail';
import { OnMove, OnTap } from './types';

interface State {
  isOpen: boolean;
  origin: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
interface Props extends ImageProps {
  renderToHardwareTextureAndroid?: boolean;
  isTranslucent?: boolean;
  swipeToDismiss?: boolean;
  imageBackgroundColor?: string;
  overlayBackgroundColor?: string;
  hideCloseButton?: boolean;
  modalRef?: LegacyRef<ImageDetail>;
  disabled?: boolean;
  onLongPressOriginImage?: () => void;
  renderHeader?: (close: () => void) => JSX.Element | Array<JSX.Element>;
  renderFooter?: (close: () => void) => JSX.Element | Array<JSX.Element>;
  onTap?: (eventParams: OnTap) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onOpen?: () => void;
  didOpen?: () => void;
  onMove?: (position: OnMove) => void;
  responderRelease?: (vx?: number, scale?: number) => void;
  willClose?: () => void;
  onClose?: () => void;
}
export default class ImageModal extends React.Component<Props, State> {
  _root: View | null = null;
  _originImageOpacity = new Animated.Value(1);

  constructor(props: Props) {
    super(props);
    const { isTranslucent } = props;
    if (Platform.OS === 'android' && isTranslucent) {
      StatusBar.setTranslucent(isTranslucent);
    }

    this.state = {
      isOpen: false,
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
  }

  _open = (): void => {
    if (this.props.disabled) return;

    if (this._root) {
      this._root.measureInWindow((x: number, y: number, width: number, height: number) => {
        const { isTranslucent, onOpen } = this.props;
        let newY: number = y;
        if (typeof onOpen === 'function') {
          onOpen();
        }

        if (isTranslucent) {
          newY += StatusBar.currentHeight ? StatusBar.currentHeight : 0;
          StatusBar.setHidden(true);
        }

        this.setState({
          origin: {
            width,
            height,
            x,
            y: newY,
          },
        });

        setTimeout(() => {
          this.setState({
            isOpen: true,
          });
        });

        this._root && this._originImageOpacity.setValue(0);
      });
    }
  };

  _onClose = (): void => {
    const { onClose } = this.props;
    this._originImageOpacity.setValue(1);

    setTimeout(() => {
      this.setState({
        isOpen: false,
      });

      if (typeof onClose === 'function') {
        onClose();
      }
    });
  };

  render(): JSX.Element {
    const {
      // @ts-expect-error TS(2339): Property 'source' does not exist on type 'Readonly... Remove this comment to see the full error message
      source,
      // @ts-expect-error TS(2339): Property 'resizeMode' does not exist on type 'Read... Remove this comment to see the full error message
      resizeMode,
      renderToHardwareTextureAndroid,
      isTranslucent,
      swipeToDismiss = true,
      imageBackgroundColor,
      overlayBackgroundColor,
      hideCloseButton,
      modalRef,
      onLongPressOriginImage,
      renderHeader,
      renderFooter,
      onTap,
      onDoubleTap,
      onLongPress,
      didOpen,
      onMove,
      responderRelease,
      willClose,
    } = this.props;
    const { isOpen, origin } = this.state;
    return (
      <View
        ref={(component: any): void => {
          this._root = component;
        }}
        onLayout={(): void => {
          if (this._root) {
            this._root.measureInWindow((x: number, y: number, width: number, height: number) => {
              this.setState({
                origin: {
                  width,
                  height,
                  x,
                  y,
                },
              });
            });
          }
        }}
        style={[{ alignSelf: 'baseline', backgroundColor: imageBackgroundColor }]}
      >
        <Animated.View
          renderToHardwareTextureAndroid={renderToHardwareTextureAndroid === false ? false : true}
          style={{ opacity: this._originImageOpacity }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ alignSelf: 'baseline' }}
            onPress={this._open}
            onLongPress={onLongPressOriginImage}
          >
            <Image {...this.props} />
          </TouchableOpacity>
        </Animated.View>
        <ImageDetail
          ref={modalRef}
          renderToHardwareTextureAndroid={renderToHardwareTextureAndroid}
          isTranslucent={isTranslucent}
          isOpen={isOpen}
          origin={origin}
          source={source}
          resizeMode={resizeMode}
          backgroundColor={overlayBackgroundColor}
          swipeToDismiss={swipeToDismiss}
          hideCloseButton={hideCloseButton}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          onTap={onTap}
          onDoubleTap={onDoubleTap}
          onLongPress={onLongPress}
          didOpen={didOpen}
          onMove={onMove}
          responderRelease={responderRelease}
          willClose={willClose}
          onClose={this._onClose}
        />
      </View>
    );
  }
}

export { ImageDetail };
