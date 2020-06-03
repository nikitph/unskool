import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Animated,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import _ from "lodash";

import styles from './style';
import Star from '../Star';
import Likes from '../Likes';
import { Images, Colors } from '../../Themes';
import { scale } from '../../Themes/ScalingUtils';

const DATA = ["1", "2", "3", "4"];

const FirstRoute = () => {
  return (
    DATA.map((d, i) => <View key={i.toString()}>{list()}</View>)
  )
};

const SecondRoute = () => {
  return (
    DATA.map((d, i) => <View key={i.toString()}>{list()}</View>)
  )
};

const list = () => (
  <TouchableOpacity style={styles.listContainer}>
    <Image style={styles.listImage} source={Images.child} />
    <View style={styles.listRightContainer}>
      <View style={styles.listName}>
        <Text style={styles.name}>Sally Smith</Text>
        <Text style={styles.timePeriod}>month ago</Text>
      </View>
      <Text style={styles.listDetails}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Text>
      <View style={styles.startContainer}>
        <Star />
        <Likes name="like1" color="#9FBBD1" style={{ marginLeft: scale(20) }} />
      </View>
    </View>
  </TouchableOpacity>
)

const initialLayout = { width: Dimensions.get('window').width };

export default function FriendsTabs() {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'first', title: 'Calendar' },
    { key: 'second', title: 'Reviews' },
  ]);


  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({ route, focused, color }) => (
          <Text style={[styles.title, { color: focused ? "#000" : 'rgba(0,0,0,0.7)' }]}>
            {route.title}
          </Text>
        )}
        renderIndicator={renderIndicator}
        indicatorContainerStyle={styles.indicatorContainerStyle}
      />
    )
  }
  const renderIndicator = useCallback(
    ({ getTabWidth }) => {
      const tabWidth = _.sum([...Array(index).keys()].map(i => getTabWidth(i)));

      return (
        <TabIndicator
          width={getTabWidth(index)}
          tabWidth={tabWidth}
          index={index}
        />
      );
    },
    [index]
  );


  const TabIndicator = ({ width, tabWidth, index }) => {
    const marginLeftRef = useRef(new Animated.Value(index ? tabWidth : 0))
      .current;
    useEffect(() => {
      Animated.timing(marginLeftRef, {
        toValue: tabWidth,
        duration: 400,
      }).start();
    }, [tabWidth]);

    return (
      <Animated.View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          width: width,
          marginLeft: marginLeftRef
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#50b0ea", "#80a2ed", "#a797f2", "#e981f4"]}
          style={{ height: 2, width: "100%" }}
        />
      </Animated.View>
    );
  };


  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}
