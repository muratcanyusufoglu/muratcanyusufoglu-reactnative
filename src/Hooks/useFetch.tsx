import axios from 'axios';
import {Alert} from 'react-native';

//This class include all endpoints
class AppServices {
  TOKEN = require('../../token');
  URLPRODUCT = 'https://upayments-studycase-api.herokuapp.com/api/products';
  URLCATEGORIES =
    'https://upayments-studycase-api.herokuapp.com/api/categories';

  async getProducts() {
    console.log('token', this.TOKEN.default);

    const AuthStr = 'Bearer '.concat(this.TOKEN.default);
    const productsResult = await axios
      .get(this.URLPRODUCT, {headers: {Authorization: AuthStr}})
      .then(response => {
        // If request is good...
        console.log('rr', response.data.products);
        return response.data.products;
      })
      .catch(error => {
        console.log('error ' + error);
        Alert.alert('Error', error);
      });

    return productsResult;
  }
  async getCategories() {
    console.log('token', this.TOKEN.default);

    const AuthStr = 'Bearer '.concat(this.TOKEN.default);
    const categoriesResult = await axios
      .get(this.URLCATEGORIES, {headers: {Authorization: AuthStr}})
      .then(response => {
        // If request is good...
        console.log('rr2', response.data.categories);
        return response.data.categories;
      })
      .catch(error => {
        console.log('error ' + error);
        Alert.alert('Error', error);
      });

    return categoriesResult;
  }

  async getWithCategories(text: string) {
    console.log('token', this.TOKEN.default);

    const AuthStr = 'Bearer '.concat(this.TOKEN.default);
    const categoriesResult = await axios
      .get(this.URLPRODUCT, {headers: {Authorization: AuthStr}})
      .then(response => {
        const filterlist = response.data.products.filter(
          (item: {category: string}) => {
            const searchedText = text.toLowerCase();
            const currentTitle = item.category.toLocaleLowerCase();
            return currentTitle.indexOf(searchedText) > -1;
          },
        );
        return filterlist;
      })
      .catch(error => {
        console.log('error ' + error);
        Alert.alert('Error', error);
      });

    return categoriesResult;
  }

  async postProduct(
    Name: string,
    Price: number,
    Category: string,
    Description: string,
    Avatar: string,
  ) {
    // console.log('token', this.TOKEN.default);

    // const bodyParameters = {
    //   Name: Name,
    //   Price: Price,
    //   Category: Category,
    //   Description: Description,
    //   Avatar: Avatar,
    //   DeveloperEmail: 'muratcan.ysfgl@gmail.com',
    // };

    const AuthStr = 'Bearer '.concat(this.TOKEN.default);
    const productsResult = await axios({
      method: 'post',
      url: this.URLPRODUCT,
      headers: {Authorization: AuthStr},
      data: {
        name: Name,
        price: Price,
        category: Category,
        description: Description,
        avatar: Avatar,
        developerEmail: 'muratcan.ysfgl@gmail.com',
      },
    })
      .then(response => {
        console.log('rr88', Name, Price, Category, Description, Avatar);
        // If request is good...
        console.log('rr', response);
        return response;
      })
      .catch(error => {
        console.log('error ' + error);
        Alert.alert('Error', error);
      });

    return productsResult;
  }
}

export default AppServices;
