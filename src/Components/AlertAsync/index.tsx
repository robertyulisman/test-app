import { Alert } from 'react-native';

// By default RN adds a default button if nothing is provided.
// We have to emulate this default setting to ensure that we can intercept this button's press
const DefaultRNButtons = [
  {
    text: 'OK',
  },
];

const AlertAsync = async (title: any, message: any, buttons: any, options: any = {}, type: any) => {
  return new Promise((resolve, reject) => {
    const interceptCallback = (callback: any) => {
      if (!callback) {
        resolve(null);
      } else {
        try {
          const maybePromise = callback();
          if (maybePromise instanceof Promise) {
            maybePromise.then(resolve, reject);
          } else {
            resolve(maybePromise);
          }
        } catch (e) {
          reject(e);
        }
      }
    };

    const nonEmptyButtons = buttons && buttons.length > 0 ? buttons : DefaultRNButtons;

    const interceptedButtons = nonEmptyButtons.map((button: any) => ({
      ...button,
      onPress: () => interceptCallback(button.onPress),
    }));

    const interceptedOptions = {
      ...options,
      onDismiss: () => interceptCallback(options.onDismiss),
    };

    Alert.alert(title, message, interceptedButtons, interceptedOptions);
  });
};

export default AlertAsync;
