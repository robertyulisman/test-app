// @ts-expect-error TS(2307): Cannot find module 'react-native-firebase' or its ... Remove this comment to see the full error message
import * as firebase from 'react-native-firebase';

/**
 * Easily log an analytics event. Guaranteed to succeed.
 * Will sanity check arguments for correctness vs underlying analytics provider,
 * and log errors (possibly via analytics if possible)
 *
 * @param name 40 character max alphanumeric and '_' only, starts with alpha
 * @param props keys 40 character max w/name content rules, values 100 character max
 */
function analyticsEvent(name: string, props?: Object | undefined): void {
  try {
    firebase.analytics().logEvent(name, props);
  } catch (e) {
    console.log('Unable to tag analytics event:', e);
  }
}

/**
 * Set user properties
 * @param props keys 24 char max alphanumeric and '_' only starts alpha, values 26 char max
 */
function setAnalyticsUserProperties(props: { [key: string]: string | null }): void {
  firebase.analytics().setUserProperties(props);
}

function setAnalyticsUser(id: string): void {
  firebase.analytics().setUserId(id);
}

function analyticsScreen(screenName: string): void {
  firebase.analytics().setCurrentScreen(screenName, screenName);
}

/**
 * Verify that we follow google rules for analytics string contents
 * If there is a problem it will have the side-effect of logging a reportable event
 * for followup to fix the problem
 * @param value string to verify
 * @param maxLength optional max length of the string, defaults to 40
 */
function checkAnalyticsString(value: string, maxLength: number = 40): boolean {
  let badEvent = 'errorInvalidAnalyticsEvent';
  if (value.length > maxLength) {
    firebase.analytics().logEvent(badEvent, { badKey: value.substr(0, maxLength - 1) });
    return false;
  }

  if (!/^[a-zA-Z][_a-zA-Z0-9]+$/.test(value)) {
    firebase.analytics().logEvent(badEvent, { badKey: value });
    return false;
  }

  return true;
}

export {
  analyticsEvent,
  analyticsScreen,
  checkAnalyticsString,
  setAnalyticsUser,
  setAnalyticsUserProperties,
};
