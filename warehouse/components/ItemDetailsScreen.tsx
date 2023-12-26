import React, { useState, } from 'react';
import { View, Text, Button, Pressable, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ItemData } from './itemCard';
import NavigationBar from './navbar';

type ItemDetailsRouteProp = RouteProp<{
  itemDetailsScreen: { item: ItemData };
}, 'itemDetailsScreen'>;

const ObjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ItemDetailsRouteProp>();
  const [currentItem, setItem] = useState<ItemData>()
  const { item } = route.params;
  const getItem = async () => {
    try {
      // TODO: поменять на актуальный ip сервера внутри сети 
      const response = await axios(`http://172.20.10.6:7070/items/${item.id}`, {  
        method: 'GET',
      });
      setItem({
        id: response.data.id,
        name: response.data.name,
        image_url: response.data.image_url,
        status: response.data.status,
        quantity: response.data.quantity,
        height: response.data.height,
        width: response.data.width,
        depth: response.data.depth,
        barcode: response.data.barcode
      }
      )
    }
    catch (e) {
      throw e
    }
  };

  React.useEffect(() => {
    getItem()
  }, [])

  return (
    <View style={styles.container}>
      <NavigationBar />
      <View style={styles.content}>
        <Image source={{ uri: item?.image_url }} style={styles.image} />
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.info}>Код товара: {item?.barcode}</Text>
        <Text style={styles.info}>Количество: {item?.quantity}</Text>
        <Text style={styles.info}>Размеры: {item?.height} x {item?.width} x {item?.depth}</Text>
        {/* Дополнительная информация о объекте */}
        <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'yellow' : 'black',
            },
            styles.button
          ]}
          onPress={() => navigation.goBack()}
        >
          {({ pressed }) => (
            <Text style={[styles.text, { color: pressed ? 'black' : 'white' }]}>Назад</Text>
          )}
        </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%', // Пример задания ширины изображения
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10, // Добавляем отступ снизу для текста
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
    flex: 1, // Allow the content view to take up the available space
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the button to the bottom of the container
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2787F5',
    marginBottom: 10, // Add margin to position the button away from the bottom edge
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default ObjectDetailsScreen;