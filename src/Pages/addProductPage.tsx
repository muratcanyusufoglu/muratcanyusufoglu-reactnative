import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppServices from '../Hooks/useFetch';
import {useNavigation} from '@react-navigation/native';

const window = Dimensions.get('window');

const AddProductPage = () => {
  const [categories, setCategories] = useState<any>();
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [imageLink, setImageLink] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const useFetch = new AppServices();
  const navigation = useNavigation();

  //   let item = {username: name, age: age, image: image};
  const load = async () => {
    await useFetch.getCategories().then(resp => {
      setCategories(resp);
      console.log('resp2', categories);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const addProduct = async () => {
    await useFetch
      .postProduct(title, price, selectedCategory, description, imageLink)
      .then(resp => {
        console.log('rr66', resp);
        Alert.alert(resp.data.message);
        if (resp.data.message == 'Success') {
          navigation.navigate('Home' as never);
        }
      });
  };
  console.log('rr1', price);
  return (
    <View style={styles.container}>
      <View>
        {title ? <Text style={styles.inputDesc}>Product title</Text> : null}
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Product Title"
        />
        {price ? <Text style={styles.inputDesc}>Price</Text> : null}
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          placeholder="Price"
          keyboardType="numeric"
        />

        {description ? <Text style={styles.inputDesc}>Description</Text> : null}
        <TextInput
          style={styles.description}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
          multiline={true}
        />

        {imageLink ? <Text style={styles.inputDesc}>Image Link</Text> : null}
        <TextInput
          style={styles.input}
          onChangeText={setImageLink}
          value={imageLink}
          placeholder="Image Link"
        />

        <Text style={styles.selectedTitle}>
          Selected Category: {selectedCategory}
        </Text>

        <ScrollView horizontal>
          {categories?.map((element: any, index: any) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(element.name)}
              style={
                element.name == selectedCategory
                  ? styles.categoriesBarActive
                  : styles.categoriesBarPasif
              }>
              <Text
                style={
                  element.name == selectedCategory
                    ? styles.categoriesTitle
                    : styles.categoriesTitlePasif
                }
                numberOfLines={1}>
                {element.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => addProduct()} style={styles.addButton}>
        <Text style={styles.title}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProductPage;

const styles = StyleSheet.create({
  container: {
    backgrounColor: '#f8f9fa',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  input: {
    height: 40,
    width: window.width / 1.1,
    marginBottom: 15,
    marginLeft: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  description: {
    height: 80,
    width: window.width / 1.1,
    marginBottom: 15,
    marginLeft: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  textbar: {
    flex: 2,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    textAlign: 'auto',
    fontWeight: '500',
    color: 'white',
  },
  category: {
    textAlign: 'left',
  },
  inputDesc: {
    marginLeft: 12,
  },
  addButton: {
    height: 40,
    width: 110,
    padding: 5,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    bottom: 60,
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
  selectedTitle: {
    margin: 10,
    fontSize: 20,
    fontWeight: '500',
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
