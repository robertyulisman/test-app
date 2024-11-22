// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { CommonActions } from '@react-navigation/native';
import { Platform } from 'react-native';
import { NavigationParams } from 'react-navigation';

let _container: any; // eslint-disable-line

export function setContainer(container: any) {
  _container = container;
}

export function reset(name: string, params?: NavigationParams) {
  _container.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name }],
    }),
  );
}

export function navigate(name: string, params?: NavigationParams) {
  let event = (Platform.OS + '_' + name).toUpperCase();

  console.log('EVENT', event);
  // await firebase.analytics().logEvent(event, {});
  // await firebase.analytics().setCurrentScreen(event)
  _container.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}
