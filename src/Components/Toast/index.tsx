import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';
import CustomText from '../CustomText';

export const DURATION = {
  LENGTH_SHORT: 1500,
  FOREVER: 0,
};

const { height } = Dimensions.get('window');

interface ToastProps {
  position?: 'top' | 'center' | 'bottom';
  textStyle?: object;
  positionValue?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  opacity?: number;
  defaultCloseDelay?: number;
  style?: object;
}

interface ToastState {
  isShow: boolean;
  text: string | React.ReactNode;
  opacityValue: Animated.Value;
}

export default class Toast extends Component<ToastProps, ToastState> {
  private duration: number;
  private callback?: () => void;
  private animation: Animated.CompositeAnimation | undefined;
  private isShow: boolean = false;
  private timer: NodeJS.Timeout | null = null;

  static defaultProps: Partial<ToastProps> = {
    position: 'bottom',
    textStyle: {},
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1,
  };

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(this.props.opacity!),
    };
  }

  show(text: string | React.ReactNode, duration?: number, callback?: () => void) {
    this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
    this.callback = callback;
    this.setState({ isShow: true, text });

    this.animation = Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity!,
      duration: this.props.fadeInDuration!,
      useNativeDriver: true,
    });

    this.animation.start(() => {
      this.isShow = true;
      if (this.duration !== DURATION.FOREVER) this.close();
    });
  }

  close(duration?: number) {
    const delay = duration === undefined ? this.duration : duration;
    if (delay === DURATION.FOREVER) {
      this.timer = setTimeout(() => this.close(this.props.defaultCloseDelay || 250), 0);
      return;
    }

    if (!this.isShow && !this.state.isShow) return;

    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.animation = Animated.timing(this.state.opacityValue, {
        toValue: 0,
        duration: this.props.fadeOutDuration!,
        useNativeDriver: true,
      });

      this.animation.start(() => {
        this.setState({ isShow: false });
        this.isShow = false;
        this.callback && this.callback();
      });
    }, delay);
  }

  componentWillUnmount() {
    this.animation?.stop();
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const pos = this.calculatePosition();

    return this.state.isShow ? (
      <SafeAreaView style={[styles.container, { bottom: toDp(8) }]}>
        <Animated.View
          style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
        >
          {React.isValidElement(this.state.text) ? (
            this.state.text
          ) : (
            <CustomText
              textType="semibold"
              style={[
                {
                  color: '#FFFFFF',
                  fontSize: toDp(14),
                  marginLeft: toDp(16),
                },
                this.props.textStyle,
              ]}
            >
              {this.state.text}
            </CustomText>
          )}
          <TouchableOpacity style={styles.viewSilang} onPress={() => this.close(10)}>
            <Image source={allLogo.icSilang} style={styles.icSilang} />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    ) : null;
  }

  private calculatePosition() {
    switch (this.props.position) {
      case 'top':
        return this.props.positionValue;
      case 'center':
        return height / 2;
      case 'bottom':
      default:
        return height - this.props.positionValue!;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    width: toDp(344),
    height: toDp(50),
    borderRadius: toDp(4),
    backgroundColor: '#5AAA0F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    fontSize: toDp(14),
    marginLeft: toDp(16),
  },
  viewSilang: {
    padding: toDp(4),
    marginRight: toDp(8),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#FFFFFF',
  },
});
