import React, { Component } from 'react';
import {
  Alert,
  Modal,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  Text,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';

class DownloadUpdateModal extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      downloadByte: 0,
      totalByte: 1,
      isDownloadUpdate: false,
      isInstallUpdate: false,
      isCompleteUpdate: false,
    };
  }

  codePushDownloadDidProgress(progress: any) {
    this.setState(
      {
        downloadByte: progress.receivedBytes,
        totalByte: progress.totalBytes,
      },
      () => {
        if (progress.receivedBytes === progress.totalBytes) {
          this.setState({
            isDownloadUpdate: false,
            isInstallUpdate: true,
          });
        }
      },
    );
  }

  codePushStatusDidChange(status: any) {
    console.log('CODE PUSH STATUS', status);
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        this.setState({
          showModal: false,
          isDownloadUpdate: false,
          isInstallUpdate: false,
        });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        this.setState({ showModal: true, isDownloadUpdate: true });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        this.setState({
          showModal: true,
          isDownloadUpdate: false,
          isInstallUpdate: true,
        });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        this.setState({
          showModal: false,
          isDownloadUpdate: false,
          isInstallUpdate: false,
        });
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        this.setState({ showModal: false, isDownloadUpdate: false, isInstallUpdate: false }, () => {
          setTimeout(
            () =>
              Alert.alert(
                'Download update complete',
                'To apply the update, you need to restart app. Restart now?',
                [
                  {
                    text: 'Later',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {
                    text: 'Ok',
                    onPress: () => codePush.restartApp(),
                  },
                ],
                { cancelable: false },
              ),
            1000,
          );
        });
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        const { showModal } = this.state;
        this.setState({ showModal: false, isDownloadUpdate: false, isInstallUpdate: false }, () => {
          // @ts-expect-error TS(2304): Cannot find name '__DEV__'.
          if (!__DEV__ && showModal) {
            setTimeout(() => {
              // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
              alert();
              Alert.alert(
                'Download Error',
                'Download or Install update failure, please try again later.',
              );
            }, 1000);
          }
        });
        break;
      default: {
        break;
      }
    }
  }

  render() {
    const { downloadByte, totalByte, showModal, isDownloadUpdate, isInstallUpdate } = this.state;
    const progress = downloadByte / totalByte;
    return (
      <Modal
        style={{ zIndex: 1 }}
        visible={showModal}
        onRequestClose={() => null}
        animationType="fade"
        transparent
      >
        <View
          style={{
            zIndex: 1,
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            paddingHorizontal: 25,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              {isDownloadUpdate && <Text style={{ color: '#595959' }}>Downloading Update</Text>}
              {isInstallUpdate && <Text style={{ color: '#595959' }}>Installing Update</Text>}
            </View>
            {Platform.OS === 'ios' ? (
              <ProgressViewIOS progress={progress} />
            ) : (
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
                color={'#595959'}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: true,
})(DownloadUpdateModal);
