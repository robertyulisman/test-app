import React from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';

const PermissionManager = () => {
  React.useEffect(() => {
    requestMultiple(
      Platform.select({
        android: [PERMISSIONS.ANDROID.POST_NOTIFICATIONS],
        ios: [PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY],
      }),
    ).then((result) => {
      console.log('result request permission', result);
    }),
      checkMultiple(
        Platform.select({
          android: [PERMISSIONS.ANDROID.POST_NOTIFICATIONS],
          ios: [PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY],
        }),
      )
        .then((result) => {
          switch (result) {
            // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
            case RESULTS.UNAVAILABLE:
              console.log('RESULTS.UNAVAILABLE');
              break;

            // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
            case RESULTS.DENIED:
              console.log('RESULTS.DENIED');

              break;

            // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
            case RESULTS.GRANTED:
              console.log('RESULTS.GRANTED');

              break;

            // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
            case RESULTS.BLOCKED:
              console.log('RESULTS.BLOCKED');

              break;
          }
        })
        .catch((error) => {
          console.log('error permission', error);
        });
  }, []);

  return null;
};

export default PermissionManager;
