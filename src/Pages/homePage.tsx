/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  View,
} from 'react-native';

import {ProductProps} from '../Props/interfaces';
import AppServices from '../Hooks/useFetch';
import Card from '../Cards/productCard';
import {useNavigation} from '@react-navigation/native';

const HomePage = () => {
  const useFetch = new AppServices();

  const [product, setProduct] = useState<ProductProps>();
  const [categories, setCategories] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const load = async () => {
    await useFetch.getProducts().then(resp => {
      setProduct(resp);
      console.log('resp3', resp);
    });
    await useFetch.getCategories().then(resp => {
      setCategories([...resp, {name: 'All'}]);
      console.log('resp2', categories);
    });
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      load();
    } else {
      useFetch.getWithCategories(selectedCategory).then(resp => {
        console.log('resp343', resp);
        setProduct(undefined);
        setProduct(resp);
        console.log('resp344', product);
      });
    }
  }, [selectedCategory]);

  const navigation = useNavigation();

  const getComponent = ({item}: any) => <Card data={item} />;

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView horizontal style={{flex: 1}}>
        {categories?.map((element: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(element.name)}
            style={
              element.name === selectedCategory
                ? styles.categoriesBarActive
                : styles.categoriesBarPasif
            }>
            <Text
              style={
                element.name === selectedCategory
                  ? styles.categoriesTitle
                  : styles.categoriesTitlePasif
              }
              numberOfLines={1}>
              {element.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{flex: 6}}>
        <FlatList
          numColumns={2}
          keyExtractor={item => item.id}
          data={product}
          renderItem={getComponent}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductAdd' as never)}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 30,
    color: '#4d9878',
    fontWeight: 'bold',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  plusIcon: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  productsTab: {
    top: 0,
  },
  categoriesTitlePasif: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  categoriesBarPasif: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    height: 50,
  },
  categoriesBarActive: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    height: 50,
  },
});

export default HomePage;
