import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import BillingScreen from '../Containers/Billing';
import DetailsBillingScreen from '../Containers/Billing/details';
import InfoBillingScreen from '../Containers/Billing/info';
import CCTVScreen from '../Containers/CCTV';
import DetailsCCTVScreen from '../Containers/CCTV/details';
import ChangePasswordScreen from '../Containers/ChangePassword';
import ContactUsScreen from '../Containers/ContactUs';
import DetailScreen from '../Containers/Detail';
import DocumentsRequestScreen from '../Containers/DocumentsRequest';
import AddDocumentsRequestScreen from '../Containers/DocumentsRequest/add';
import DetailsDocumentsRequestScreen from '../Containers/DocumentsRequest/details';
import EmergencyScreen from '../Containers/Emergencies';
import DetailEmergencyScreen from '../Containers/Emergencies/detailEmergency';
import DetailHistoryEmergencyScreen from '../Containers/Emergencies/detailHistoryEmergency';
import EmergencyContactScreen from '../Containers/Emergencies/emergencyContact';
import SosRequestScreen from '../Containers/Emergencies/emergencyRequest';
import EmergencyResponseScreen from '../Containers/Emergencies/emergencyResponse';
import HistoryEmergencyScreen from '../Containers/Emergencies/historyEmergency';
import ListContactEmergencyScreen from '../Containers/Emergencies/listContactEmergency';
import ListEmergencyScreen from '../Containers/Emergencies/listEmergency';
import NotifDaruratScreen from '../Containers/Emergencies/notifDarurat';
import ForgotPasswordScreen from '../Containers/ForgotPassword';
import HomeScreen from '../Containers/Home';
import JasaScreen from '../Containers/Jasa';
import DetailsJasaScreen from '../Containers/Jasa/details';
import InfoJasaScreen from '../Containers/Jasa/info';
import LayananScreen from '../Containers/Jasa/layanan';
import MultifinanceScreen from '../Containers/Jasa/multifinance';
import LandingPageScreen from '../Containers/LandingPage';
import LoginScreen from '../Containers/Login';
import MarketScreen from '../Containers/Market';
import ConfirmMarketScreen from '../Containers/Market/confirm';
import DetailsMarketScreen from '../Containers/Market/details';
import DetailsPesananMarketScreen from '../Containers/Market/detailsPesanan';
import InfoMarketScreen from '../Containers/Market/info';
import KeranjangScreen from '../Containers/Market/keranjang';
import NewsScreen from '../Containers/News';
import AddNewsScreen from '../Containers/News/add';
import DetailsNewsScreen from '../Containers/News/details';
import EditNewsScreen from '../Containers/News/edit';
import ListClusterScreen from '../Containers/News/listCluster';
import NotificationScreen from '../Containers/Notification';
import OnBoardingScreen from '../Containers/OnBoarding';
import PhotoProgress from '../Containers/PhotoProgress';
import ProfileScreen from '../Containers/Profile';
import EditProfileScreen from '../Containers/Profile/editProfile';
import RegisterScreen from '../Containers/Register';
import AgreementScreen from '../Containers/Register/agreement';
import ReportingScreen from '../Containers/Reporting';
import AddReportScreen from '../Containers/Reporting/add';
import CommentsScreen from '../Containers/Reporting/comments';
import DetailsReportScreen from '../Containers/Reporting/details';
import RatingScreen from '../Containers/Reporting/rating';
import TanggapanScreen from '../Containers/Reporting/tanggapan';
import RestorePasswordScreen from '../Containers/RestorePassword';
import SmartClusterScreen from '../Containers/SmartCluster';
import SmartCommunityScreen from '../Containers/SmartCommunity';
import SmartHomeScreen from '../Containers/SmartHome';
import SplashScreen from '../Containers/SplashScreen';
import UnitScreen from '../Containers/Unit';
import AddUnitScreen from '../Containers/Unit/addUnit';
import DetailUnitScreen from '../Containers/Unit/detailUnit';
import SetUnitScreen from '../Containers/Unit/setUnit';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPasswordScreen} />
      <Stack.Screen name="RestorePass" component={RestorePasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LandingPage" component={LandingPageScreen} />
      <Stack.Screen name="SmartHome" component={SmartHomeScreen} />
      <Stack.Screen name="Agreement" component={AgreementScreen} />
      <Stack.Screen name="SmartCluster" component={SmartClusterScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="ChangePass" component={ChangePasswordScreen} />
      <Stack.Screen name="Unit" component={UnitScreen} />
      <Stack.Screen name="AddUnit" component={AddUnitScreen} />
      <Stack.Screen name="SetUnit" component={SetUnitScreen} />
      <Stack.Screen name="DetailUnit" component={DetailUnitScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="DetailsNews" component={DetailsNewsScreen} />
      <Stack.Screen name="ListCluster" component={ListClusterScreen} />
      <Stack.Screen name="AddNews" component={AddNewsScreen} />
      <Stack.Screen name="EditNews" component={EditNewsScreen} />
      <Stack.Screen name="CCTV" component={CCTVScreen} />
      <Stack.Screen name="DetailsCCTV" component={DetailsCCTVScreen} />
      <Stack.Screen name="SmartCommunity" component={SmartCommunityScreen} />
      <Stack.Screen name="Jasa" component={JasaScreen} />
      <Stack.Screen name="Layanan" component={LayananScreen} />
      <Stack.Screen name="ListEmergency" component={ListEmergencyScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="SosRequest" component={SosRequestScreen} />
      <Stack.Screen name="ListContactEmergency" component={ListContactEmergencyScreen} />
      <Stack.Screen name="HistoryEmergency" component={HistoryEmergencyScreen} />
      <Stack.Screen name="DetailEmergency" component={DetailEmergencyScreen} />
      <Stack.Screen name="Multifinance" component={MultifinanceScreen} />
      <Stack.Screen name="DetailsJasa" component={DetailsJasaScreen} />
      <Stack.Screen name="Reporting" component={ReportingScreen} />
      <Stack.Screen name="AddReport" component={AddReportScreen} />
      <Stack.Screen name="DetailsReport" component={DetailsReportScreen} />
      <Stack.Screen name="EmergencyResponse" component={EmergencyResponseScreen} />
      <Stack.Screen name="NotifDarurat" component={NotifDaruratScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Tanggapan" component={TanggapanScreen} />
      <Stack.Screen name="Billing" component={BillingScreen} />
      <Stack.Screen name="DetailsBilling" component={DetailsBillingScreen} />
      <Stack.Screen name="DetailHistoryEmergency" component={DetailHistoryEmergencyScreen} />
      <Stack.Screen name="InfoBilling" component={InfoBillingScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
      <Stack.Screen name="InfoJasa" component={InfoJasaScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="DetailsMarket" component={DetailsMarketScreen} />
      <Stack.Screen name="Keranjang" component={KeranjangScreen} />
      <Stack.Screen name="ConfirmMarket" component={ConfirmMarketScreen} />
      <Stack.Screen name="DetailsPesananMarket" component={DetailsPesananMarketScreen} />
      <Stack.Screen name="InfoMarket" component={InfoMarketScreen} />
      <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
      <Stack.Screen name="DocumentsRequestScreen" component={DocumentsRequestScreen} />
      <Stack.Screen name="AddDocumentsRequestScreen" component={AddDocumentsRequestScreen} />
      <Stack.Screen
        name="DetailsDocumentsRequestScreen"
        component={DetailsDocumentsRequestScreen}
      />
      <Stack.Screen name="PhotoProgress" component={PhotoProgress} />
    </Stack.Navigator>
  );
}
