import { COLORS } from '@src/Libs/DesignSystem/themes';
import { StatusBar, Text, View } from 'react-native';

const ErrorPage = (props: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: COLORS.light['50'],
      }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View
        style={{
          width: 320,
          height: 247,
          alignSelf: 'center',
          marginTop: 180,
          marginBottom: 20,
          overflow: 'hidden',
        }}
      ></View>
      <Text style={{ textAlign: 'center' }}>Upsss, terjadi kesalahan</Text>
      <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.dark[300], width: '80%' }}>
        Silahkan restart atau keluar dari aplikasi terlebih dahulu lalu coba kembali. Terima kasih
        atas pengertian dan kerjasamanya.
      </Text>
      <Text style={{ marginTop: 20, textAlign: 'center' }}>{props.error.toString()}</Text>
    </View>
  );
};

export default ErrorPage;
