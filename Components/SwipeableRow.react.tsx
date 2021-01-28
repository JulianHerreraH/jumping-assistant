import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SessionItem from './SessionItem.react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';
import { mainTheme as theme } from '../Theme';

interface Props {
  //deleteItem: () => void;
  children: React.ReactNode;
}

const SwipeableRow = ({ children }: Props) => {
  const swipeAction = (progress: any, dragX: any): React.ReactNode => {
    //console.log(dragX);
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        //onPress={deleteItem}
        style={styles.deleteAction}
        activeOpacity={0.5}
      >
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={swipeAction} rightThreshold={41}>
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;

const styles = StyleSheet.create({
  deleteAction: {
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'poppins-regular',
    color: theme.textColor,
  },
});
