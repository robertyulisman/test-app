import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Modal,
  PanResponder,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { OnMove, OnTap } from '../types';

const WINDOW_WIDTH: number = Dimensions.get('window').width;
const WINDOW_HEIGHT: number = Dimensions.get('window').height;
const LONG_PRESS_TIME = 800;
const DOUBLE_CLICK_INTERVAL = 250;
const MAX_OVERFLOW = 100;
const MIN_SCALE = 0.6;
const MAX_SCALE = 10;
const CLICK_DISTANCE = 10;
const DRAG_DISMISS_THRESHOLD = 150;

const Styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH || '100%',
    height: WINDOW_HEIGHT || '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH || '100%',
    backgroundColor: 'transparent',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: WINDOW_WIDTH || '100%',
    backgroundColor: 'transparent',
  },
  closeButton: {
    fontSize: 35,
    color: 'white',
    lineHeight: 40,
    width: 40,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1.5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});

interface Props {
  renderToHardwareTextureAndroid?: boolean;
  isTranslucent?: boolean;
  isOpen: boolean;
  origin: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  source: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  backgroundColor?: string;
  swipeToDismiss?: boolean;
  hideCloseButton?: boolean;
  renderHeader?: (close: () => void) => JSX.Element | Array<JSX.Element>;
  renderFooter?: (close: () => void) => JSX.Element | Array<JSX.Element>;
  onTap?: (eventParams: OnTap) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  didOpen?: () => void;
  onMove?: (position: OnMove) => void;
  responderRelease?: (vx?: number, scale?: number) => void;
  willClose?: () => void;
  onClose: () => void;
}
export default class ImageDetail extends React.Component<Props> {
  _animatedScale = new Animated.Value(1);
  _animatedPositionX = new Animated.Value(0);
  _animatedPositionY = new Animated.Value(0);
  _animatedFrame = new Animated.Value(0);
  _animatedOpacity = new Animated.Value(WINDOW_HEIGHT);
  _imagePanResponder: any = undefined;
  _lastPositionX: null | number = null;
  _lastPositionY: null | number = null;
  _zoomLastDistance: null | number = null;
  _horizontalWholeCounter = 0;
  _verticalWholeCounter = 0;
  _isDoubleClick = false;
  _isLongPress = false;
  _centerDiffX = 0;
  _centerDiffY = 0;
  _singleClickTimeout: any;
  _longPressTimeout: any;
  _lastClickTime = 0;
  _doubleClickX = 0;
  _doubleClickY = 0;
  _scale = 1;
  _positionX = 0;
  _positionY = 0;
  _zoomCurrentDistance = 0;
  _swipeDownOffset = 0;
  _horizontalWholeOuterCounter = 0;
  _isAnimated = false;

  constructor(props: Props) {
    super(props);
    const { onLongPress, onDoubleTap, swipeToDismiss, onTap, responderRelease } = props;
    this._imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (evt: any) => {
        if (this._isAnimated) {
          return;
        }
        this._lastPositionX = null;
        this._lastPositionY = null;
        this._zoomLastDistance = null;
        this._horizontalWholeCounter = 0;
        this._verticalWholeCounter = 0;
        this._isDoubleClick = false;
        this._isLongPress = false;

        if (this._singleClickTimeout) {
          // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
          clearTimeout(this._singleClickTimeout);
        }

        if (evt.nativeEvent.changedTouches.length > 1) {
          const centerX =
            (evt.nativeEvent.changedTouches[0].pageX + evt.nativeEvent.changedTouches[1].pageX) / 2;
          this._centerDiffX = centerX - WINDOW_WIDTH / 2;

          const centerY =
            (evt.nativeEvent.changedTouches[0].pageY + evt.nativeEvent.changedTouches[1].pageY) / 2;
          this._centerDiffY = centerY - WINDOW_HEIGHT / 2;
        }
        if (this._longPressTimeout) {
          // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
          clearTimeout(this._longPressTimeout);
        }

        this._longPressTimeout = setTimeout(() => {
          this._isLongPress = true;
          if (typeof onLongPress === 'function') {
            onLongPress();
          }
        }, LONG_PRESS_TIME);

        if (evt.nativeEvent.changedTouches.length <= 1) {
          if (new Date().getTime() - this._lastClickTime < (DOUBLE_CLICK_INTERVAL || 0)) {
            this._lastClickTime = 0;
            if (typeof onDoubleTap === 'function') {
              onDoubleTap();
            }

            // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
            clearTimeout(this._longPressTimeout);

            this._doubleClickX = evt.nativeEvent.changedTouches[0].pageX;
            this._doubleClickY = evt.nativeEvent.changedTouches[0].pageY;

            this._isDoubleClick = true;

            if (this._scale > 1 || this._scale < 1) {
              this._scale = 1;

              this._positionX = 0;
              this._positionY = 0;
            } else {
              const beforeScale = this._scale;
              this._scale = 2;

              const diffScale = this._scale - beforeScale;
              this._positionX = ((WINDOW_WIDTH / 2 - this._doubleClickX) * diffScale) / this._scale;

              this._positionY =
                ((WINDOW_HEIGHT / 2 - this._doubleClickY) * diffScale) / this._scale;
            }

            this._imageDidMove('centerOn');

            Animated.parallel([
              Animated.timing(this._animatedScale, {
                toValue: this._scale,
                duration: 100,
                useNativeDriver: false,
              }),
              Animated.timing(this._animatedPositionX, {
                toValue: this._positionX,
                duration: 100,
                useNativeDriver: false,
              }),
              Animated.timing(this._animatedPositionY, {
                toValue: this._positionY,
                duration: 100,
                useNativeDriver: false,
              }),
            ]).start();
          } else {
            this._lastClickTime = new Date().getTime();
          }
        }
      },
      onPanResponderMove: (evt: any, gestureState: any) => {
        if (this._isDoubleClick || this._isAnimated) {
          return;
        }

        if (evt.nativeEvent.changedTouches.length <= 1) {
          let diffX = gestureState.dx - (this._lastPositionX || 0);
          if (this._lastPositionX === null) {
            diffX = 0;
          }
          let diffY = gestureState.dy - (this._lastPositionY || 0);
          if (this._lastPositionY === null) {
            diffY = 0;
          }

          this._lastPositionX = gestureState.dx;
          this._lastPositionY = gestureState.dy;

          this._horizontalWholeCounter += diffX;
          this._verticalWholeCounter += diffY;

          if (
            (Math.abs(this._horizontalWholeCounter) > 5 ||
              Math.abs(this._verticalWholeCounter) > 5) &&
            this._longPressTimeout
          ) {
            // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
            clearTimeout(this._longPressTimeout);
          }

          if (this._swipeDownOffset === 0) {
            if (WINDOW_WIDTH * this._scale > WINDOW_WIDTH) {
              if (this._horizontalWholeOuterCounter > 0) {
                if (diffX < 0) {
                  if (this._horizontalWholeOuterCounter > Math.abs(diffX)) {
                    this._horizontalWholeOuterCounter += diffX;
                    diffX = 0;
                  } else {
                    diffX += this._horizontalWholeOuterCounter;
                    this._horizontalWholeOuterCounter = 0;
                  }
                } else {
                  this._horizontalWholeOuterCounter += diffX;
                }
              } else if (this._horizontalWholeOuterCounter < 0) {
                if (diffX > 0) {
                  if (Math.abs(this._horizontalWholeOuterCounter) > diffX) {
                    this._horizontalWholeOuterCounter += diffX;
                    diffX = 0;
                  } else {
                    diffX += this._horizontalWholeOuterCounter;
                    this._horizontalWholeOuterCounter = 0;
                  }
                } else {
                  this._horizontalWholeOuterCounter += diffX;
                }
              }

              this._positionX += diffX / this._scale;

              const horizontalMax = (WINDOW_WIDTH * this._scale - WINDOW_WIDTH) / 2 / this._scale;
              if (this._positionX < -horizontalMax) {
                this._positionX = -horizontalMax;
                this._horizontalWholeOuterCounter += -1 / 1e10;
              } else if (this._positionX > horizontalMax) {
                this._positionX = horizontalMax;
                this._horizontalWholeOuterCounter += 1 / 1e10;
              }
              this._animatedPositionX.setValue(this._positionX);
            } else {
              this._horizontalWholeOuterCounter += diffX;
            }

            if (this._horizontalWholeOuterCounter > (MAX_OVERFLOW || 0)) {
              this._horizontalWholeOuterCounter = MAX_OVERFLOW || 0;
            } else if (this._horizontalWholeOuterCounter < -(MAX_OVERFLOW || 0)) {
              this._horizontalWholeOuterCounter = -(MAX_OVERFLOW || 0);
            }
          }

          this._positionY += diffY / this._scale;
          this._animatedPositionY.setValue(this._positionY);
          if (swipeToDismiss && this._scale === 1) {
            this._animatedOpacity.setValue(Math.abs(gestureState.dy));
          }
        } else {
          if (this._longPressTimeout) {
            // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
            clearTimeout(this._longPressTimeout);
          }

          let minX: number;
          let maxX: number;
          if (
            evt.nativeEvent.changedTouches[0].locationX >
            evt.nativeEvent.changedTouches[1].locationX
          ) {
            minX = evt.nativeEvent.changedTouches[1].pageX;
            maxX = evt.nativeEvent.changedTouches[0].pageX;
          } else {
            minX = evt.nativeEvent.changedTouches[0].pageX;
            maxX = evt.nativeEvent.changedTouches[1].pageX;
          }

          let minY: number;
          let maxY: number;
          if (
            evt.nativeEvent.changedTouches[0].locationY >
            evt.nativeEvent.changedTouches[1].locationY
          ) {
            minY = evt.nativeEvent.changedTouches[1].pageY;
            maxY = evt.nativeEvent.changedTouches[0].pageY;
          } else {
            minY = evt.nativeEvent.changedTouches[0].pageY;
            maxY = evt.nativeEvent.changedTouches[1].pageY;
          }

          const widthDistance = maxX - minX;
          const heightDistance = maxY - minY;
          const diagonalDistance = Math.sqrt(
            widthDistance * widthDistance + heightDistance * heightDistance,
          );
          this._zoomCurrentDistance = Number(diagonalDistance.toFixed(1));

          if (this._zoomLastDistance !== null) {
            const distanceDiff = (this._zoomCurrentDistance - this._zoomLastDistance) / 200;
            let zoom = this._scale + distanceDiff;

            if (zoom < MIN_SCALE) {
              zoom = MIN_SCALE;
            }
            if (zoom > MAX_SCALE) {
              zoom = MAX_SCALE;
            }

            const beforeScale = this._scale;

            this._scale = zoom;
            this._animatedScale.setValue(this._scale);

            const diffScale = this._scale - beforeScale;
            this._positionX -= (this._centerDiffX * diffScale) / this._scale;
            this._positionY -= (this._centerDiffY * diffScale) / this._scale;
            this._animatedPositionX.setValue(this._positionX);
            this._animatedPositionY.setValue(this._positionY);
          }
          this._zoomLastDistance = this._zoomCurrentDistance;
        }

        this._imageDidMove('onPanResponderMove');
      },
      onPanResponderRelease: (evt: any, gestureState: any) => {
        if (this._longPressTimeout) {
          // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
          clearTimeout(this._longPressTimeout);
        }

        if (this._isDoubleClick || this._isLongPress || this._isAnimated) {
          return;
        }

        const moveDistance = Math.sqrt(
          gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy,
        );
        const { locationX, locationY, pageX, pageY } = evt.nativeEvent;

        if (evt.nativeEvent.changedTouches.length === 1 && moveDistance < CLICK_DISTANCE) {
          this._singleClickTimeout = setTimeout(() => {
            if (typeof onTap === 'function') {
              onTap({ locationX, locationY, pageX, pageY });
            }
          }, DOUBLE_CLICK_INTERVAL);
        } else {
          if (typeof responderRelease === 'function') {
            responderRelease(gestureState.vx, this._scale);
          }

          this._panResponderReleaseResolve(evt.nativeEvent.changedTouches.length);
        }
      },
    });
  }

  _imageDidMove = (type: string): void => {
    const { onMove } = this.props;
    if (typeof onMove === 'function') {
      onMove({
        type,
        positionX: this._positionX,
        positionY: this._positionY,
        scale: this._scale,
        zoomCurrentDistance: this._zoomCurrentDistance,
      });
    }
  };

  _panResponderReleaseResolve = (changedTouchesCount: number): void => {
    const { swipeToDismiss } = this.props;
    if (this._scale < 1) {
      this._scale = 1;
      Animated.timing(this._animatedScale, {
        toValue: this._scale,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (WINDOW_WIDTH * this._scale <= WINDOW_WIDTH) {
      this._positionX = 0;
      Animated.timing(this._animatedPositionX, {
        toValue: this._positionX,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (WINDOW_HEIGHT * this._scale < WINDOW_HEIGHT) {
      this._positionY = 0;
      Animated.timing(this._animatedPositionY, {
        toValue: this._positionY,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else if (
      swipeToDismiss &&
      this._scale === 1 &&
      changedTouchesCount === 1 &&
      Math.abs(this._positionY) > DRAG_DISMISS_THRESHOLD
    ) {
      this.close();
      return;
    }

    if (WINDOW_HEIGHT * this._scale > WINDOW_HEIGHT) {
      const verticalMax = (WINDOW_HEIGHT * this._scale - WINDOW_HEIGHT) / 2 / this._scale;
      if (this._positionY < -verticalMax) {
        this._positionY = -verticalMax;
      } else if (this._positionY > verticalMax) {
        this._positionY = verticalMax;
      }
      Animated.timing(this._animatedPositionY, {
        toValue: this._positionY,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (WINDOW_WIDTH * this._scale > WINDOW_WIDTH) {
      const horizontalMax = (WINDOW_WIDTH * this._scale - WINDOW_WIDTH) / 2 / this._scale;
      if (this._positionX < -horizontalMax) {
        this._positionX = -horizontalMax;
      } else if (this._positionX > horizontalMax) {
        this._positionX = horizontalMax;
      }
      Animated.timing(this._animatedPositionX, {
        toValue: this._positionX,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (this._scale === 1) {
      this._positionX = 0;
      this._positionY = 0;
      Animated.timing(this._animatedPositionX, {
        toValue: this._positionX,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(this._animatedPositionY, {
        toValue: this._positionY,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(this._animatedOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();

    this._horizontalWholeOuterCounter = 0;
    this._swipeDownOffset = 0;

    this._imageDidMove('onPanResponderRelease');
  };

  close = (): void => {
    const { isTranslucent, willClose, onClose } = this.props;
    if (isTranslucent) {
      StatusBar.setHidden(false);
    }

    setTimeout(() => {
      this._isAnimated = true;
      if (typeof willClose === 'function') {
        willClose();
      }

      Animated.parallel([
        Animated.timing(this._animatedScale, { toValue: 1, useNativeDriver: false }),
        Animated.timing(this._animatedPositionX, { toValue: 0, useNativeDriver: false }),
        Animated.timing(this._animatedPositionY, { toValue: 0, useNativeDriver: false }),
        Animated.timing(this._animatedOpacity, { toValue: WINDOW_HEIGHT, useNativeDriver: false }),
        Animated.spring(this._animatedFrame, { toValue: 0, useNativeDriver: false }),
      ]).start(() => {
        onClose();
        this._isAnimated = false;
      });
    });
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    if (nextProps.isOpen !== this.props.isOpen || nextProps.origin.x !== this.props.origin.x) {
      return true;
    }
    return false;
  }

  componentDidUpdate(): void {
    const { isOpen, didOpen } = this.props;

    if (isOpen) {
      this._lastPositionX = null;
      this._lastPositionY = null;
      this._zoomLastDistance = null;
      this._horizontalWholeCounter = 0;
      this._verticalWholeCounter = 0;
      this._isDoubleClick = false;
      this._isLongPress = false;
      this._centerDiffX = 0;
      this._centerDiffY = 0;
      this._singleClickTimeout = undefined;
      this._longPressTimeout = undefined;
      this._lastClickTime = 0;
      this._doubleClickX = 0;
      this._doubleClickY = 0;
      this._scale = 1;
      this._positionX = 0;
      this._positionY = 0;
      this._zoomCurrentDistance = 0;
      this._swipeDownOffset = 0;
      this._horizontalWholeOuterCounter = 0;
      this._isAnimated = true;

      Animated.parallel([
        Animated.timing(this._animatedOpacity, { toValue: 0, useNativeDriver: false }),
        Animated.spring(this._animatedFrame, { toValue: 1, useNativeDriver: false }),
      ]).start(() => {
        this._isAnimated = false;
        if (typeof didOpen === 'function') {
          didOpen();
        }
      });
    }
  }

  render(): JSX.Element {
    const {
      renderToHardwareTextureAndroid,
      isOpen,
      origin,
      source,
      resizeMode,
      backgroundColor = '#000000',
      hideCloseButton,
      renderHeader,
      renderFooter,
    } = this.props;
    const animateConf = {
      transform: [
        {
          scale: this._animatedScale,
        },
        {
          translateX: this._animatedPositionX,
        },
        {
          translateY: this._animatedPositionY,
        },
      ],
      left: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.x, 0],
      }),
      top: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.y, 0],
      }),
      width: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.width, WINDOW_WIDTH],
      }),
      height: this._animatedFrame.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.height, WINDOW_HEIGHT],
      }),
    };

    const background = (
      <Animated.View
        renderToHardwareTextureAndroid={renderToHardwareTextureAndroid === false ? false : true}
        style={[
          Styles.background,
          { backgroundColor: backgroundColor },
          {
            opacity: this._animatedOpacity.interpolate({
              inputRange: [0, WINDOW_HEIGHT],
              outputRange: [1, 0],
            }),
          },
        ]}
      ></Animated.View>
    );

    const header = (
      <Animated.View
        renderToHardwareTextureAndroid={renderToHardwareTextureAndroid === false ? false : true}
        style={[
          Styles.header,
          {
            opacity: this._animatedOpacity.interpolate({
              inputRange: [0, WINDOW_HEIGHT],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        {typeof renderHeader === 'function' ? (
          renderHeader(this.close)
        ) : !hideCloseButton ? (
          <SafeAreaView>
            <TouchableOpacity onPress={this.close}>
              <Text style={Styles.closeButton}>×</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : undefined}
      </Animated.View>
    );

    const footer = renderFooter && (
      <Animated.View
        renderToHardwareTextureAndroid={renderToHardwareTextureAndroid === false ? false : true}
        style={[
          Styles.footer,
          {
            opacity: this._animatedOpacity.interpolate({
              inputRange: [0, WINDOW_HEIGHT],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        {renderFooter(this.close)}
      </Animated.View>
    );

    const content = (
      <View
        style={{
          overflow: 'hidden',
          width: WINDOW_WIDTH || '100%',
          height: WINDOW_HEIGHT || '100%',
        }}
        {...(this._imagePanResponder ? this._imagePanResponder.panHandlers : undefined)}
      >
        {background}
        <Animated.View
          style={animateConf}
          renderToHardwareTextureAndroid={renderToHardwareTextureAndroid === false ? false : true}
        >
          <Image
            resizeMode={resizeMode}
            style={{
              width: '100%',
              height: '100%',
            }}
            source={source}
          />
        </Animated.View>
        {header}
        {typeof renderFooter === 'function' && footer}
      </View>
    );

    return (
      <Modal
        hardwareAccelerated={true}
        visible={isOpen}
        transparent={true}
        onRequestClose={(): void => this.close()}
      >
        {content}
      </Modal>
    );
  }
}
