/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {ProductProps} from '../Props/interfaces';

const window = Dimensions.get('window');

interface CardProps {
  data: ProductProps;
}

const Card: React.FC<CardProps> = prop => {
  console.log('prop', prop);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail' as never, {data: prop.data} as never)
      }>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.image} source={{uri: prop.data.avatar}} />
        </View>

        <View style={styles.textbar}>
          <Text style={styles.title} numberOfLines={1}>
            {prop.data.name}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            ${prop.data.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'stretch',
    width: window.width / 2.2,
    height: window.height / 3.5,
    backgroundColor: 'white',
    borderColor: '#f2f2f2',
    elevation: 5,
    margin: 5,
  },
  image: {
    width: 110,
    height: 150,
    resizeMode: 'contain',
  },
  textbar: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
    marginLeft: 3,
  },
  category: {
    textAlign: 'left',
  },
  price: {
    textAlign: 'right',
    marginRight: 5,
  },
});
