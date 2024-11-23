  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _this = this;
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var RegisterScreen = function RegisterScreen(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isLoading: true,
        arrayData: []
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var HeaderView = function HeaderView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewHeader
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[6]).allLogo.logo,
        style: styles.logo
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleMenu, {
          color: state.isDarkMode ? 'white' : '#1c2028'
        }]
      }, "Syarat & Ketentuan Penggunaan Aplikasi Central Connect 2"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewContent
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDesc
      }, "Mohon Untuk Membaca Seluruh Syarat Dan Ketentuan Penggunaan Di Bawah Ini Dengan Cermat Dan Saksama Sebelum Menggunakan Setiap Fitur Dan/Atau Layanan Yang Tersedia Dalam Aplikasi Central Connect.", '\n\n', "Dengan mengunduh atau menggunakan Aplikasi Central Connect maka syarat dan ketentuan ini akan berlaku secara otomatis untuk Anda sebagai pengguna aplikasi, karena itu Anda harus memastikan bahwa Anda membacanya dengan cermat sebelum menggunakan Aplikasi. Anda tidak diizinkan untuk menyalin, atau memodifikasi Aplikasi, bagian mana pun dari Aplikasi, atau merek dagang yang tercantum di dalam Aplikasi dengan cara apapun.", '\n\n', "Pendaftaran Akun Pengguna", '\n\n', "Pengguna wajib menyetujui Syarat dan Ketentuan dan mendaftarkan diri Pengguna dengan memberikan informasi yang diminta. Saat melakukan pendaftaran, aplikasi akan meminta Pengguna untuk memberikan data pribadi yang digunakan hanya untuk tujuan yang disebutkan dalam Syarat dan Ketentuan ini.", '\n\n', "Penggunaan Aplikasi Central Connect", '\n\n', "Setelah Pengguna mengisi data diri yang dibutuhkan pada saat Pendaftaran Akun Pengguna, Aplikasi akan membuatkan akun Pengguna yang tunduk pada Syarat dan Ketentuan Penggunaan, sebagai berikut:", '\n\n\t', "a. Menggunakan Aplikasi Central Connect hanya untuk tujuan dan cara yang sah.", '\n\n\t', "b. Mematuhi semua panduan, pemberitahuan, peraturan operasional, kebijakan, dan instruksi apa pun terkait penggunaan Aplikasi Central Connect sekaligus seluruh perubahan yang diterbitkan dari waktu ke waktu, baik karena alasan teknis atau karena kebijakan Pemerintah Republik Indonesia.", '\n\n\t', "c. Menjamin informasi atau data yang Pengguna publikasikan atau tampilkan di Aplikasi Central Connect bersifat akurat dan tidak menyesatkan.", '\n\n\t', "d. Dalam hal berusia di bawah 18 tahun dan belum kawin, Pengguna menyatakan dan menjamin bahwa Pengguna telah memperoleh izin dari orang tua atau pengampu. Dengan memberikan persetujuan, orang tua atau pengampu dari Pengguna setuju untuk ikut tunduk pada Syarat dan Ketentuan Penggunaan ini.", '\n\n\t', "e. Dari waktu ke waktu, Central Connect dapat menambah, mengubah atau menghilangkan seluruh atau sebagian fitur atau fungsi dalam Layanan. Pelanggan dapat melakukan instalasi atas versi terbaru untuk menerima perubahan-perubahan tersebut. Central Connect juga dapat memutuskan untuk berhenti menyediakan seluruh atau sebagian dari Layanan pada setiap waktu, dan tidak ada satu ketentuan pun di dalam Ketentuan Penggunaan ini yang dapat dijadikan sebagai jaminan bahwa Aplikasi atau bagian dari Layanan manapun akan selalu tersedia, baik pada bentuk saat ini atau bentuk lainnya, dan/atau bahwa Central Connect akan terus mendukung, menjaga, atau meneruskan untuk menawarkan Layanan dan/atau Aplikasi atau versi mana pun daripadanya.", '\n\n\t', "f. Dengan tunduk pada ketentuan dalam Ketentuan Penggunaan ini, Central Connect dengan ini memberikan Anda hak dan lisensi yang bersifat terbatas, dapat ditarik kembali, tidak eksklusif, tidak dapat dialihkan (kecuali disebutkan secara eksplisit dalam Ketentuan Penggunaan ini) untuk menginstal dan menggunakan Layanan.", '\n\n\t', "g. Anda tidak boleh mencoba mengekstrak kode sumber Aplikasi, dan Anda juga tidak boleh mencoba menerjemahkan Aplikasi ke bahasa lain, atau membuat versi turunan. Aplikasi itu sendiri, dan semua merek dagang, hak cipta, hak basis data, dan hak kekayaan intelektual lainnya yang terkait pada Aplikasi.", '\n\n\t', "h. Anda setuju untuk menggunakan Layanan dengan cara yang wajar. Apabila Central Connect menganggap bahwa Anda menggunakan Layanan secara tidak wajar atau dapat menyebabkan turunnya kinerja Layanan untuk Pelanggan atau pengguna lainnya, maka Central Connect dapat mengenakan pembatasan terhadap penggunaan Anda atas penggunaan Aplikasi.", '\n\n\t', "i. Anda bertanggung jawab sepenuhnya atas penggunaan Layanan dan setuju untuk tidak meminta pertanggungjawaban dari Central Connect atas segala tuntutan, kerugian, dan/atau kehilangan sehubungan dengan penggunaan Layanan.", '\n\n', "Pembatasan Tanggung Jawab", '\n\n', "Sejauh mana diperbolehkan oleh hukum yang berlaku, Central Connect tidak akan bertanggung jawab atas segala kerusakan dan/atau kerugian langsung, tidak langsung, insidental, khusus, konsekuensial, atau tipikal (contoh kerusakan) yang mungkin ditimbulkan atau diderita oleh Anda, termasuk namun tidak terbatas pada kehilangan keuntungan, usaha, niat baik, reputasi, data atau kerugian tidak berwujud lainnya.", '\n\n', "Central Connect juga tidak akan bertanggung jawab atas setiap kerusakan atau kerugian yang timbul sebagai akibat dari (a) penggunaan atau ketidakmampuan untuk menggunakan Layanan (secara keseluruhan atau sebagian) atau kerusakan teknis apa pun; (b) biaya atas pengadaan barang atau jasa pengganti; (c) akses yang terlarang untuk, atau perubahan atas, komunikasi atau data Pelanggan; (d) pernyataan atau tindakan pihak ketiga manapun sehubungan dengan Layanan; (e) pengandalan Anda terhadap kelengkapan atau akurasi Layanan atau bagian manapun daripadanya (f) setiap perubahan yang mungkin dilakukan Central Connect atas Layanan, atau setiap penghentian permanen maupun sementara dari Layanan; (g) penghapusan, korupsi, atau kegagalan untuk menyimpan setiap konten dan data komunikasi lainnya yang dipelihara atau transmisikan oleh atau melalui penggunaan Layanan oleh Anda; (h) kegagalan Anda untuk memberikan informasi akun yang akurat kepada Central Connect; atau (i) segala masalah lainnya sehubungan dengan Layanan.", '\n\n', "Anda setuju untuk memberikan ganti rugi kepada dan membebaskan Central Connect dan afiliasi, pejabat, agen, karyawan dan mitranya dari segala tuntutan atau klaim, termasuk biaya hukum yang wajar, dari pihak ketiga mana pun yang timbul dari dan/atau sehubungan dengan penggunaan Layanan oleh Anda yang bertentangan dengan Ketentuan Penggunaan ini atau pemberian data dan informasi yang tidak akurat atau tidak lengkap kepada Central Connect sehubungan dengan penggunaan Layanan oleh Anda.", '\n\n', "Perubahan Syarat dan Ketentuan.", '\n\n', "Central Connect dapat memperbarui Syarat dan Ketentuan kami dari waktu ke waktu. Dengan menyetujui Syarat dan Ketentuan Penggunaan ini, Pengguna juga menyetujui ketentuan penggunaan tambahan pada aplikasi Central Connect dan perubahannya yang merupakan bagian yang tidak terpisahkan dari Syarat dan Ketentuan Penggunaan ini.", '\n\n', "Hukum yang Berlaku", '\n\n', "Syarat dan Ketentuan ini dibuat dan tunduk berdasarkan hukum Negara Kesatuan Republik Indonesia.", '\n\n', "Anda setuju bahwa: (i) Layanan akan diberikan dari Indonesia; (ii) hukum Indonesia berlaku untuk Ketentuan Penggunaan ini, termasuk setiap permasalahan kontraktual atau non-kontraktual atau perselisihan yang timbul dari atau sehubungan dengan Ketentuan Penggunaan ini, akses dan penggunaan Layanan oleh Anda, dan hubungan antara Central Connect dengan Anda; dan (iii) setiap konflik yang timbul dari atau sehubungan dengan Layanan atau konflik antara Central Connect dengan Anda sehubungan dengan Layanan akan diajukan dan diselesaikan pertama-tama melalui musyawarah untuk mufakat dalam waktu 30 (tiga puluh) hari terhitung sejak diterimanya pemberitahuan timbulnya konflik. Apabila setelah jangka waktu dimaksud tidak tercapai kesepakatan, maka penyelesaian konflik akan diselesaikan oleh Badan Arbitrase Nasional Indonesia (BANI). Dengan tidak mengesampingkan hal tersebut di atas, Anda setuju bahwa kami dapat meminta putusan provisi, putusan sela atau protective relief di hadapan pengadilan yang kompeten di wilayah yurisdiksi mana pun.", '\n\n')));
    };
    var ShimmerView = function ShimmerView() {};
    var ItemView = function ItemView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.title, {
          color: _this.state.darkMode ? 'white' : '#000000'
        }]
      }, index + 1 + '. ' + item.title), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.desc, {
          color: _this.state.darkMode ? 'white' : '#000000'
        }]
      }, item.desc));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: state.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Syarat & Ketentuan',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.isLoading ? ['', '', '', '', '', '', '', ''] : state.arrayData,
      renderItem: state.isLoading ? ShimmerView : ItemView,
      ListHeaderComponent: function ListHeaderComponent() {
        return HeaderView();
      },
      ListFooterComponent: function ListFooterComponent() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16)
          }
        });
      }
    }));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(28) : 0
    },
    viewHeader: {
      //alignItems: 'center',
      //paddingHorizontal: toDp(32)
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16)
    },
    viewContent: {},
    logo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(77.5)
    },
    textTitleMenu: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(12),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      textAlign: 'center'
    },
    viewItem: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(32)
    },
    title: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16)
    },
    desc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16)
    },
    textDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(12),
      color: '#383B34'
    }
  });
  var _default = exports.default = RegisterScreen;
