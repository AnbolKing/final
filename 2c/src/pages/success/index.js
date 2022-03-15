import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtSteps } from 'taro-ui';
import './index.less';

const Success = () => {
  const items = [
    {
      'title': '商品选购',
    },
    {
      'title': '商品下单',
    },
    {
      'title': '支付成功',
    },
  ]

  const handleBackHome = () => {
    Taro.switchTab({
      url: '../home/index',
    });
  }

  return (
    <View className='success-container'>
      <View className='header'>
        <AtSteps
          items={items}
          current={2}
          className='success-steps'
        />
      </View>
      <View className='body'>
        <View className='icon success-icon' />
        <Text className='text'>支付成功！</Text>
        <View className='btn' onClick={handleBackHome}>继续逛逛</View>
      </View>
    </View>
  )
}

export default Success;