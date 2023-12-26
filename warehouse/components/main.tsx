import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import ItemCard, {ItemData} from './itemCard';
import NavigationBar from './navbar';
import {  TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


export type RecievedItemData = {
  id: number;
  name: string;
  image_url: string;
  status: string;
  quantity: number;
  height: number;
  width: number;
  depth: number;
  barcode: number;
}

type RootStackParamList = {
    MainScreen: undefined;
    ItemDetailsScreen: { item: ItemData };
  };
  
  type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  
  interface MainScreenProps {
    navigation: MainScreenNavigationProp;
  }
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const [items, setItemms] = useState<ItemData[]>([]);
    const [filteredItems, setFilteredItems] = useState<ItemData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const getItems = async () => {
      try {
        // TODO: поменять на актуальный ip сервера внутри сети 
        const response = await axios('http://172.20.10.6:7070/items', { 
          method: 'GET',
        });
 
        const items = response.data.items;
        const newArr = items.map((raw: RecievedItemData) => ({
          id: raw.id,
          name: raw.name,
          image_url: raw.image_url,
          status: raw.status,
          quantity: raw.quantity,
          height: raw.height,
          width: raw.width,
          depth: raw.depth,
          barcode: raw.barcode
        }));
        setItemms(newArr)
        setTimeout(getItems, 1000) 
      }
      catch(e) {
        throw e
      }
    };

    useEffect(() => {
      getItems();
    }, []);
  
    useEffect(() => {
      if (searchQuery === '') {
        setFilteredItems(items);
      } else {
        const filtered = items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(filtered);
      }
    }, [searchQuery, items]);
  
    const handleDetailsPress = (item: ItemData) => {
      console.log('Details Pressed:', item.name);
      navigation.navigate('ItemDetailsScreen', { item });
    };
  
    const renderItemCard = ({ item }: { item: ItemData }) => {
      return (
        <TouchableOpacity onPress={() => handleDetailsPress(item)}>
          <ItemCard item={item} onDetailsPress={() => {}} />
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TextInput
          style={styles.input}
          placeholder="Поиск по названию..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <FlatList
          data={filteredItems}
          renderItem={renderItemCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginTop: 10,
    },
  });
  
  export default MainScreen;