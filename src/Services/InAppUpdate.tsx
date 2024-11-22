import React from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';

const InAppUpdate = () => {
  let version = DeviceInfo.getVersion();
  console.log('result check update test version', version);
  const inAppUpdates = new SpInAppUpdates(
    false, // isDebug
  );

  React.useEffect(() => {
    inAppUpdates.checkNeedsUpdate({ curVersion: version }).then((result) => {
      console.log('result check update', result);
      if (result.shouldUpdate) {
        const updateOptions: StartUpdateOptions = {};

        Platform.select({
          ios: {
            title: 'Update available',
            message:
              'There is a new version of the app available on the App Store, do you want to update it?',
            buttonUpgradeText: 'Update',
            buttonCancelText: 'Cancel',
            // country: 'it', // 👈🏻 the country code for the specific version to lookup for (optional)
          },
          android: {
            updateType: IAUUpdateKind.IMMEDIATE,
          },
        });

        inAppUpdates.startUpdate(updateOptions);
        // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    });
  }, []);
};

export default InAppUpdate;
