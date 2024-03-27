import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../styles/Colors';
import TopScreen from '../../components/organisms/TopScreen';
import PhotoItem from '../../components/organisms/PhotoItem';
import axios from 'axios';

export interface IDataProps {
  id: string;
  uri: string;
}

const BASE_URL = 'https://6602d89e9d7276a75554641c.mockapi.io/api/v1/';

const GalleryScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IDataProps[]>([]);

  const fetchImagesFromApi = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL + 'images');
      const res = response.data.map((item: {id: string; uri: string}) => ({
        id: item.id,
        uri: item.uri,
      }));
      setData([...res]);
      setLoading(false);
      return res;
    } catch (error) {
      Alert.alert("Couldn't fetch image.", 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
      throw error;
    }
  };

  const deleteImageFromApi = async (imageId: string): Promise<void> => {
    try {
      const response = await axios.delete(BASE_URL + `images/${imageId}`);
      return response.data;
    } catch (error) {
      Alert.alert("Couldn't delete image.", 'Try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
      throw error;
    }
  };

  useEffect(() => {
    fetchImagesFromApi();
  }, []);

  const onRefresh = () => {
    setData([]);
    fetchImagesFromApi();
  };

  const renderItem = ({item}) => {
    return (
      <PhotoItem uri={item.uri} id={item.id} onDelete={deleteImageFromApi} />
    );
  };

  return (
    <View style={styles.root}>
      <TopScreen title="Gallery" />
      <View style={styles.galleryContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  galleryContainer: {
    flex: 3,
    backgroundColor: Colors.secondary,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
