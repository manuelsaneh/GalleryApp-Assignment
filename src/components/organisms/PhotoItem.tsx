import {Image, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IPhotoProps {
  id: string;
  uri: string;
  onDelete: (imageId: string) => void;
}

const PhotoItem = ({id, uri, onDelete}: IPhotoProps) => {
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const opacity = useSharedValue(1);
  const pan = Gesture.Pan()
    .onUpdate(e => {
      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;
      translateX.value = e.translationX;
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
        translateX.value = withTiming(width * direction.value);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDelete) {
            runOnJS(onDelete)(id);
          }
        });
      } else {
        translateX.value = withTiming(0, {duration: 500});
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        testID="photo-item"
        style={[styles.listContainer, animatedStyle]}>
        <Image style={styles.image} source={{uri: uri}} />
      </Animated.View>
    </GestureDetector>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  listContainer: {
    width: 300,
    height: 300,
    margin: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});
