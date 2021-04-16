import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from './theme';

const {width} = Dimensions.get('window');

const PlaceholderHome = () => {
  return (
    <View style={{width: '100%'}}>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.spacing.l,
            marginHorizontal: theme.spacing.m,
            alignItems: 'center',
          }}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{marginLeft: 10}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, width: '100%', height: width / 2}} />
        <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 10, width: '100%', height: 20, borderRadius: 4}}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.spacing.l,
            marginHorizontal: theme.spacing.m,
            alignItems: 'center',
          }}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{marginLeft: 10}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, width: '100%', height: width / 2}} />
        <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 10, width: '100%', height: 20, borderRadius: 4}}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default PlaceholderHome;
