import React from 'react';
import { View, Text } from '@tarojs/components';
import { ABOUT_ITEMS } from '../../define/const';
import './index.less';

const About = () => {

  const renderInfo = (obj) => {
    const keys = Object.keys(obj);
    const key = keys[0];
    return (
      <Text className='item-info'>
        {obj[key]}
      </Text>
    )
  }

  return (
    <View className='about-container'>
      <View className='about-wrapper'>
        {
          ABOUT_ITEMS.map(item => {
            return (
              <View className='about-item' key={item.key}>
                <Text className='item-text'>{item.text}</Text>
                {
                  item.info
                  ? renderInfo(item.info)
                  : null
                }
                <View className='item-divider' />
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default About;