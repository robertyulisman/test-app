import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertAsync from '@src/Components/AlertAsync';
import { URL_REFRESH } from '@src/Configs/Api';
import axios from 'axios';
import { postLogout } from '.';
import * as NavigatorService from '../../Helper/NavigatorServices';

const xhr = async (url: any, method: any, data: any, headers: any) => {
  const token = await AsyncStorage.getItem('token');
  let defaultHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token,
  };

  let config = {
    method,
    url,
    headers: token !== null ? defaultHeader : headers,
    data,
    timeout: 15000,
  };
  // LOG ALL DATA
  console.log(config);
  try {
    const res = await axios(config);
    return res;
  } catch ({ response }) {
    console.log(response);
    if (
      response.status === 401 &&
      (response.data.message === 'Token expired.' || response.data.message === 'Invalid token.')
    ) {
      //if(true) {
      const refresh = await AsyncStorage.getItem('refresh');
      let body = {
        method: 'POST',
        url: URL_REFRESH,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: refresh,
        },
        timeout: 15000,
      };
      console.log(body);

      axios(body)
        .then((response) => {
          console.log('URL_REFRESH -> ', response);
          AsyncStorage.setItem(
            'token',
            response.data.token.type + ' ' + response.data.token.access_token,
          );
          AsyncStorage.setItem(
            'refresh',
            response.data.token.type + ' ' + response.data.token.refresh_token,
          );
          AsyncStorage.setItem('dataUser', JSON.stringify(response.data.profile));
          //xhr(url, method, data, headers)
          if (response.data.unit === null && response.data.profile.is_a_resident) {
            console.log('masuk SetUnit');
            NavigatorService.reset('SetUnit');
          } else {
            console.log('masuk HomePage');
            AsyncStorage.setItem('unit', JSON.stringify(response.data.unit));
            NavigatorService.reset('Home');
          }
        })
        .catch(async (error) => {
          console.log('error', error); // bug harus HIT API LOGOUT
          await AlertAsync('Session Habis', 'Silahkan lakukan login ulang', [
            {
              text: 'OK',
              onPress: async () => {
                const fcmToken = await AsyncStorage.getItem('fcmToken');
                const deviceId = await AsyncStorage.getItem('deviceId');
                let body = {
                  fcm_token: fcmToken,
                  device_id: deviceId,
                };
                postLogout(body)
                  .then((response: any) => {
                    console.log('MASUK clearSession A-01', response);
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('refresh');
                    AsyncStorage.removeItem('dataUser');
                    AsyncStorage.removeItem('features');
                    AsyncStorage.removeItem('fcmToken');
                    AsyncStorage.removeItem('deviceId');
                    AsyncStorage.removeItem('notification');
                    NavigatorService.reset('Login');
                  })
                  .catch(async (error: any) => {
                    console.log('MASUK clearSession B-01', error);
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('refresh');
                    AsyncStorage.removeItem('dataUser');
                    AsyncStorage.removeItem('features');
                    AsyncStorage.removeItem('fcmToken');
                    AsyncStorage.removeItem('deviceId');
                    AsyncStorage.removeItem('notification');
                    NavigatorService.reset('Login');
                  });
              },
            },
          ]);
        });
    } else if (response.status === 402 || response.status === 403) {
      await AlertAsync(
        // bug harus HIT API LOGOUT
        'Mohon Maaf',
        'Kami tidak dapat memproses permintaan anda. Silahkan Login kembali',
        [
          {
            text: 'OK',
            onPress: async () => {
              const fcmToken = await AsyncStorage.getItem('fcmToken');
              const deviceId = await AsyncStorage.getItem('deviceId');
              let body = {
                fcm_token: fcmToken,
                device_id: deviceId,
              };
              postLogout(body)
                .then((response: any) => {
                  console.log('MASUK clearSession C-01', response);
                  AsyncStorage.removeItem('token');
                  AsyncStorage.removeItem('refresh');
                  AsyncStorage.removeItem('dataUser');
                  AsyncStorage.removeItem('features');
                  AsyncStorage.removeItem('fcmToken');
                  AsyncStorage.removeItem('deviceId');
                  AsyncStorage.removeItem('notification');
                  NavigatorService.reset('Login');
                })
                .catch(async (error: any) => {
                  console.log('MASUK clearSession D-01', error);
                  AsyncStorage.removeItem('token');
                  AsyncStorage.removeItem('refresh');
                  AsyncStorage.removeItem('dataUser');
                  AsyncStorage.removeItem('features');
                  AsyncStorage.removeItem('fcmToken');
                  AsyncStorage.removeItem('deviceId');
                  AsyncStorage.removeItem('notification');
                  NavigatorService.reset('Login');
                });
            },
          },
        ],
      );
    } else if (response.status === 500) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      await AlertAsync('' + response.status + ' - ' + response.data.message, '' + url, [
        { text: 'OK', onPress: () => {} },
      ]);
    }
    throw response;
  }
};

export default xhr;
