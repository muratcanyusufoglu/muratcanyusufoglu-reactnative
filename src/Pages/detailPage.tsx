import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';

interface DetailProps {
  route: RouteProp<any, any>;
}

const window = Dimensions.get('window');

const DetailPage: React.FC<DetailProps> = prop => {
  let item = prop.route.params?.data;

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{uri: item.avatar}} />
      </View>
      <View style={styles.textbar}>
        <ScrollView>
          <View style={styles.topBar}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.title}>${item.price}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    backgrounColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerImage: {
    backgrounColor: '#f8f9fa',
    flex: 5,
  },
  image: {
    width: window.width,
    height: window.height / 2.4,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  textbar: {
    flex: 4,
    backgroundColor: 'black',
    width: window.width,
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    textAlign: 'auto',
    fontWeight: '500',
    color: 'white',
    margin: 15,
  },
  description: {
    fontSize: 13,
    textAlign: 'auto',
    fontWeight: '500',
    color: 'white',
    margin: 15,
  },
});
