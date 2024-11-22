import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { navigate } from '../NavigatorServices';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Alert } from 'react-native';

const NotifService = (props: any) => {
  const onDisplayNotification = async (notif: any) => {
    const channelId = await notifee.createChannel({
      id: 'centralconnect',
      name: 'CentralConnect Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    await notifee.displayNotification({
      title: notif.title,
      body: notif.body,
      android: {
        channelId,
        smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
          launchActivity: 'default', // works fine
        },
        color: '#00a551',
      },
      // pressAction: {
      //   id: 'default',
      //   launchActivity: 'default',
      //   launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      // },
    });
  };

  useEffect(() => {
    notificationEvent();
  }, []);

  const notificationEvent = async () => {
    const setting = await notifee.requestPermission();

    console.log('setting notification', setting);
    return notifee.onForegroundEvent(({ type, detail }: any) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('type', type);

          console.log('detail', detail);
          if (detail.notification.title === 'Sinyal Darurat Baru') {
            AsyncStorage.getItem('notification')
              .then((notification: any) => {
                let notif = JSON.parse(notification);

                console.log('notification', notif);
                let emergencyData = {
                  id: notif.data.entity_id,
                  user: { name: notif.data.penghuni_name },
                  unit: { unit_name: notif.data.unit },

                  refreshData: () => console.log('refreshData'),
                };
                loadUserUnit(emergencyData);
              })

              .catch((err) => console.log('err', err));
          } else {
            console.log('Lain - Lain');
          }
          break;
      }
    });
  };

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      console.log(
        `[onBackgroundEvent] notification id: ${notification?.id},  event type: ${EventType[type]}, press action: ${pressAction?.id}`,
      );
      if (
        type === EventType.ACTION_PRESS &&
        // @ts-expect-error TS(2304): Cannot find name 'NOTIFICATION_ACTIONS_ID'.
        pressAction?.id === NOTIFICATION_ACTIONS_ID.cancelIncomingCall
      ) {
        console.log('[onBackgroundEvent] ACTION_PRESS: cancelIncomingCall');
        if (notification?.id) {
          await notifee.cancelNotification(notification?.id);
        }
      } else if (
        type === EventType.ACTION_PRESS &&
        // @ts-expect-error TS(2304): Cannot find name 'NOTIFICATION_ACTIONS_ID'.
        pressAction?.id === NOTIFICATION_ACTIONS_ID.acceptIncomingCall
      ) {
        console.log('[onBackgroundEvent] ACTION_PRESS: acceptIncomingCall');
        if (notification?.id) {
          await notifee.cancelNotification(notification?.id);
        }
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      AsyncStorage.setItem('notification', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage.notification);
      if (
        remoteMessage.data.entity_type === 'emergency' &&
        remoteMessage.data.entity_additional_info === 'Request'
      ) {
        let emergencyData = {
          id: remoteMessage.data.entity_id,
          user: { name: remoteMessage.data.penghuni_name },
          unit: { unit_name: remoteMessage.data.unit },

          refreshData: () => console.log('refreshData'),
        };
        loadUserUnit(emergencyData);
      } else if (
        remoteMessage.data.entity_type === 'emergency' &&
        remoteMessage.data.entity_additional_info === 'Batal'
      ) {
        Alert.alert(
          remoteMessage.data.title,
          remoteMessage.data.body,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK');
              },
            },
          ],
          { cancelable: false },
        );
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return messaging().onNotificationOpenedApp((remoteMessage) => {});
  }, []);

  useEffect(() => {
    return messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      AsyncStorage.setItem('notification', JSON.stringify(remoteMessage));
    });
  }, []);

  let loadUserUnit = async (emergencyData: any) => {
    let dataUser = await AsyncStorage.getItem('dataUser');
    if (JSON.parse(dataUser as any).is_a_resident === false) {
      console.log('emergencyData', emergencyData);
      navigate('NotifDarurat', { emergencyData });
    }
  };

  return null;
};

export default NotifService;
