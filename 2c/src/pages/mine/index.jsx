import React, { useState,useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro'
import { BG_IMG } from '../../define/const';
import './index.less';

const Mine = () => {

  const [statusHeight, setStatusHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);

  // init
  useEffect(() => {
    const mobileRes = Taro.getSystemInfoSync();
    const buttonRes = Taro.getMenuButtonBoundingClientRect();
    setStatusHeight(mobileRes.statusBarHeight);
    if(mobileRes.platform == 'devtools') {
      setNavHeight(buttonRes.height);
    }
    if(mobileRes.platform == 'ios') {
      setNavHeight(buttonRes.height);
    }
    if(mobileRes.platform == 'android') {
      setNavHeight(buttonRes.height);
    }
  }, [])
  return (
    <View className='mine-container'>
      <View className='bg' />
      <Text 
        className='mine-title'
        style={{
          top: `${statusHeight}px`,
          width: '100%',
          height: `${navHeight}px`
        }}
      >个人中心</Text>
    </View>
  )
}

export default Mine;