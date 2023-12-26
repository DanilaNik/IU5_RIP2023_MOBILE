import React, {useState} from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface ItemData {
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
interface ObjectCardProps {
  item: ItemData;
  onDetailsPress: () => void; 
}

const ObjectCard: React.FC<ObjectCardProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item?.image_url }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.info}>{item.barcode}</Text>

          {/* <Text style={styles.price}>{object.price}</Text> */}

  
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: 'gray',
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  detailsButton: {
    backgroundColor: '#171717',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ObjectCard;