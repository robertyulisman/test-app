import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { allLogo } from '../../Assets';
import CustomFilterModal from '../../Components/CustomFilterModal';
import CustomText from '../../Components/CustomText';
import Empty from '../../Components/Empty';
import * as NavigatorService from '../../Helper/NavigatorServices';
import { toDp } from '../../Helper/percentageToDP';
import { getMarketCategory, postProductList } from '../../Services/Apis';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const { width, height } = Dimensions.get('window');
const Produk = (props: any) => {
  const [state, setState] = useState<any>({
    loading: true,
    searchValue: '',
    arrayProducts: [],
    arrayHolder: [],
  });

  const [categoryState, setCategory] = useState({
    categories: [],
    selectedCategory: '',
  });

  useEffect(() => {
    loadProducts();
    loadCategory();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [categoryState.selectedCategory]);

  const loadCategory = () => {
    getMarketCategory()
      .then((response) => {
        setCategory((state) => ({
          ...state,
          categories: response.data.product_categories,
        }));
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const loadProducts = () => {
    let data = {
      filter: {
        product_category_id: categoryState.selectedCategory,
      },
    };
    postProductList(data)
      .then((response) => {
        console.log('response', response);
        setState((state: any) => ({
          ...state,
          arrayProducts: response.data.products.map((data: any) => {
            return {
              ...data,
              quantity: 0,
            };
          }),
          loading: false,
          arrayHolder: response.data.products,
        }));
      })
      .catch((err) => {
        console.log('err', err);
        setState((state: any) => ({ ...state, loading: false }));
      });
  };

  useEffect(() => {
    const newData = state.arrayHolder.filter((item: any) => {
      const itemData = item.name ? item.name.toUpperCase() : item.toUpperCase();
      const textData = state.searchValue.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setState((state: any) => ({ ...state, arrayProducts: newData }));
  }, [state.searchValue]);

  const onChangeTextSearch = (valueSearch: any) => {
    setState((state: any) => ({ ...state, searchValue: valueSearch }));
  };

  const minPlus = (id: any, operator: any) => {
    setState((state: any) => ({
      ...state,
      arrayProducts: state.arrayProducts.map((data: any) => {
        if (data.id === id) {
          return {
            ...data,
            quantity: operator === '+' ? data.quantity + 1 : data.quantity - 1,
          };
        } else {
          return {
            ...data,
          };
        }
      }),
    }));
  };

  const renderSearch = () => {
    return (
      <View style={styles.searchRow}>
        <View style={[styles.inputRow, { borderColor: '#5AAA0F' }]}>
          <Image source={allLogo.icSearch} style={[styles.icSearch, { tintColor: '#9B9F95' }]} />
          <TextInput
            onChangeText={(searchValue: any) => {
              setState((state: any) => ({ ...state, searchValue }));
            }}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            style={[styles.textInput, { color: '#383B34' }]}
            placeholder={'Cari Market'}
            placeholderTextColor={'#9B9F95'}
            returnKeyType="search"
            value={state.searchValue}
            maxLength={30}
          />
          {state.searchValue !== '' && (
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => {
                setState((state: any) => ({ ...state, searchValue: '' }));
              }}
            >
              <Image source={allLogo.icDeleteAll} style={styles.icDeleteAll} />
            </TouchableOpacity>
          )}
        </View>
        <CustomFilterModal
          style={{ paddingHorizontal: toDp(20) }}
          darkMode={state.darkMode}
          title={'Market Kategori'}
          desc={''}
          textPlaceholder={'Pilih kategori market'}
          value={categoryState.selectedCategory}
          arrayData={categoryState.categories}
          onSelected={(item: any, index: any) => {
            onSelectFilter(item);
          }}
        />
      </View>
    );
  };

  const onSelectFilter = (item: any) => {
    setCategory((state) => ({
      ...state,
      selectedCategory: item.id,
    }));
  };

  const renderShimmer = () => {
    return (
      <View style={styles.viewShimmer}>
        <ShimmerPlaceHolder style={styles.shimmerPhoto} />
        <ShimmerPlaceHolder style={styles.shimmerName} />
        <ShimmerPlaceHolder style={styles.shimmerPrice} />
      </View>
    );
  };

  const convert = (amount: any) => {
    var reverse = amount.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.viewShimmer}
        onPress={() =>
          NavigatorService.navigate('DetailsMarket', {
            item,
            minPlus,
            loadKeranjang: props.loadKeranjang,
            setContentPesanan: props.setContentPesanan,
          })
        }
      >
        <Image source={{ uri: item.product_images[0].image_url }} style={styles.shimmerPhoto} />
        <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.textName}>
          {item.name}
        </CustomText>
        <CustomText textType="semibold" style={styles.textPrice}>
          {'Rp. ' + convert(item.price)}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearch()}
      <View style={styles.content}>
        {state.arrayProducts.length === 0 ? (
          <Empty
            images={allLogo.imgEmptyNews}
            title={'Produk tidak ditemukan'}
            subtitle={'Tidak ada ' + state.searchValue + ' terkait.'}
          />
        ) : (
          <FlatList
            //ListHeaderComponent={() => renderSearch()}
            ListFooterComponent={() => <View style={{ height: toDp(24) }} />}
            data={state.arrayProducts}
            renderItem={state.loading ? renderShimmer : renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={state.loading}
                onRefresh={() => {
                  //setState(state => ({...state, loading: true, arrayData:[]}))
                  //loadProducts()
                }}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width,
  },
  content: {
    backgroundColor: '#F6F7F4',
    flex: 1,
  },
  textName: {
    fontSize: toDp(12),
    color: '#000000',
    marginHorizontal: toDp(10),
    marginTop: toDp(8),
  },
  textPrice: {
    fontSize: toDp(14),
    color: '#000000',
    marginHorizontal: toDp(10),
    marginTop: toDp(5),
  },
  viewShimmer: {
    width: toDp(160),
    height: toDp(235),
    backgroundColor: 'white',
    borderRadius: toDp(5),
    marginTop: toDp(10),
    marginLeft: toDp(12),
  },
  shimmerPhoto: {
    width: toDp(160),
    height: toDp(160),
    borderTopLeftRadius: toDp(5),
    borderTopRightRadius: toDp(5),
  },
  shimmerName: {
    width: toDp(140),
    height: toDp(24),
    marginVertical: toDp(8),
    marginLeft: toDp(10),
  },
  shimmerPrice: {
    width: toDp(100),
    height: toDp(20),
    marginLeft: toDp(10),
  },
  searchRow: {
    width,
    height: toDp(60),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icFilter: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
    marginLeft: toDp(10),
  },
  icSearch: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
    marginRight: toDp(8),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(8),
    backgroundColor: '#F6F7F4',
    width: '80%',
    borderRadius: toDp(10),
    height: toDp(40),
  },
  touchHeaderSearch: {
    padding: toDp(4),
  },
  icDeleteAll: {
    width: toDp(20),
    height: toDp(20),
    marginLeft: toDp(-40),
  },
  textInput: {
    width: width * 0.7,
    marginLeft: toDp(4),
    fontSize: toDp(12),
    color: '#273238',
  },
});

export default Produk;
