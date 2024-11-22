import React, { PureComponent } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Animated, Easing, Platform, TouchableWithoutFeedback, I18nManager, TouchableWithoutFeedbackProps  } from 'react-native';
import { styles, radius } from './styles';

interface PropsComponent extends TouchableWithoutFeedbackProps{
  rippleColor: string,
  rippleOpacity: number,
  rippleDuration: number,
  rippleSize: number,
  rippleContainerBorderRadius: number,
  rippleCentered: boolean,
  rippleSequential: boolean,
  rippleFades: boolean,
  disabled: boolean,
  nativeID ?: any;
  onRippleAnimation: (animation: any, callback: any) => void,
};

export default class Ripple extends PureComponent<PropsComponent, any> {

  private unique: any;
  private mounted: any;

  static defaultProps: PropsComponent = {
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 100,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,  
    rippleFades: true,
    disabled: false,
    onRippleAnimation: (animation: any, callback: any) => animation.start(callback)
  };


  constructor(props: any) {
    
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.renderRipple = this.renderRipple.bind(this);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event: any) {
    let { width, height } = event.nativeEvent.layout;
    // @ts-expect-error TS(2339): Property 'onLayout' does not exist on type 'Readon... Remove this comment to see the full error message
    let { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onPress(event: any) {
    let { ripples } = this.state;
    // @ts-expect-error TS(2339): Property 'onPress' does not exist on type 'Readonl... Remove this comment to see the full error message
    let { onPress, rippleSequential } = this.props;

    if (!rippleSequential || !ripples.length) {
      if ('function' === typeof onPress) {
        // @ts-expect-error TS(2304): Cannot find name 'requestAnimationFrame'.
        requestAnimationFrame(() => onPress(event));
      }

      this.startRipple(event);
    }
  }

  onLongPress(event :any) {
    // @ts-expect-error TS(2339): Property 'onLongPress' does not exist on type 'Rea... Remove this comment to see the full error message
    let { onLongPress } = this.props;

    if ('function' === typeof onLongPress) {
      // @ts-expect-error TS(2304): Cannot find name 'requestAnimationFrame'.
      requestAnimationFrame(() => onLongPress(event));
    }

    this.startRipple(event);
  }

  onPressIn(event: any) {
    // @ts-expect-error TS(2339): Property 'onPressIn' does not exist on type 'Reado... Remove this comment to see the full error message
    let { onPressIn } = this.props;

    if ('function' === typeof onPressIn) {
      onPressIn(event);
    }
  }

  onPressOut(event:any) {
    // @ts-expect-error TS(2339): Property 'onPressOut' does not exist on type 'Read... Remove this comment to see the full error message
    let { onPressOut } = this.props;

    if ('function' === typeof onPressOut) {
      onPressOut(event);
    }
  }

  onAnimationEnd() {
    if (this.mounted) {
      this.setState(({ ripples } : any) => ({ ripples: ripples.slice(1) }));
    }
  }

  startRipple(event: any) {
    let { width, height } = this.state;
    let { rippleDuration, rippleCentered, rippleSize, onRippleAnimation } = this.props;

    let w2 = 0.5 * width;
    let h2 = 0.5 * height;

    let { locationX, locationY } = rippleCentered
      ? { locationX: w2, locationY: h2 }
      : event.nativeEvent;

    let offsetX = Math.abs(w2 - locationX);
    let offsetY = Math.abs(h2 - locationY);

    let R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    let ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    let animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    onRippleAnimation(animation, this.onAnimationEnd);

    this.setState(({ ripples } : any) => ({ ripples: ripples.concat(ripple) }));
  }

  renderRipple({ unique, progress, locationX, locationY, R } : any) {
    let { rippleColor, rippleOpacity, rippleFades } = this.props;

    let rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],

      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  }

  render() {
    let { ripples } = this.state;
    let {
      // @ts-expect-error TS(2339): Property 'delayLongPress' does not exist on type '... Remove this comment to see the full error message
      delayLongPress,
      // @ts-expect-error TS(2339): Property 'delayPressIn' does not exist on type 'Re... Remove this comment to see the full error message
      delayPressIn,
      // @ts-expect-error TS(2339): Property 'delayPressOut' does not exist on type 'R... Remove this comment to see the full error message
      delayPressOut,
      disabled,
      // @ts-expect-error TS(2339): Property 'hitSlop' does not exist on type 'Readonl... Remove this comment to see the full error message
      hitSlop,
      // @ts-expect-error TS(2339): Property 'pressRetentionOffset' does not exist on ... Remove this comment to see the full error message
      pressRetentionOffset,
      // @ts-expect-error TS(2339): Property 'children' does not exist on type 'Readon... Remove this comment to see the full error message
      children,
      rippleContainerBorderRadius,
      // @ts-expect-error TS(2339): Property 'testID' does not exist on type 'Readonly... Remove this comment to see the full error message
      testID,
      nativeID,
      // @ts-expect-error TS(2339): Property 'accessible' does not exist on type 'Read... Remove this comment to see the full error message
      accessible,
      // @ts-expect-error TS(2339): Property 'accessibilityHint' does not exist on typ... Remove this comment to see the full error message
      accessibilityHint,
      // @ts-expect-error TS(2339): Property 'accessibilityLabel' does not exist on ty... Remove this comment to see the full error message
      accessibilityLabel,
      // @ts-expect-error TS(2339): Property 'onPress' does not exist on type 'Readonl... Remove this comment to see the full error message
      onPress,
      // @ts-expect-error TS(2339): Property 'onLongPress' does not exist on type 'Rea... Remove this comment to see the full error message
      onLongPress,
      // @ts-expect-error TS(2339): Property 'onLayout' does not exist on type 'Readon... Remove this comment to see the full error message
      onLayout,
      onRippleAnimation,
      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleSize,
      rippleCentered,
      rippleSequential,
      rippleFades,
      ...props
    } = this.props;

    let touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      onLongPress: onLongPress ? this.onLongPress : undefined,

      ...('web' !== Platform.OS ? { nativeID } : null),
    };

    let containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents="box-only">
          {children}
          <View style={[styles.container, containerStyle]}>{ripples.map(this.renderRipple)}</View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
