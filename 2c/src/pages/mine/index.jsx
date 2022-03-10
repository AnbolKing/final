import React, { useState,useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro'
import { MINE_INFO } from '../../define/mock';
import { MINE_TABS, MINE_ORDERS } from '../../define/const';
import './index.less';

const Mine = () => {

  const [statusHeight, setStatusHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);

  const handleSwitchOrder = (imgClass) => {
    Taro.setStorageSync('order_status', imgClass);
    Taro.switchTab({
      url: '../order/index',
    });
  }

  const handleClickTab = (imgClass) => {
    switch(imgClass) {
      case 'collect':
        return ;
      case 'address':
        Taro.navigateTo({
          url: '../address/index'
        }) 
        return ;
      case 'person':
        return ;
      case 'about':
        Taro.navigateTo({
          url: '../about/index'
        })
        return ;
      default: 
        return ;
    }
  }

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
      <View className='mine-wrapper'>
        <View className='header-wrapper'>
          <Image className='header-avatar' src={MINE_INFO.avatar} />
          <Text className='header-text'>{MINE_INFO.name}</Text>
        </View>
        <View className='tabs-wrapper'>
          {
            MINE_TABS.map((item, index) => {
              return (
                <View className='tab-item' key={index} onClick={() => handleClickTab(item.imgClass)}>
                  <View className={`item-icon icon ${item.imgClass}`} />
                  <Text className='item-text'>{item.text}</Text>
                </View>
              )
            })
          }
        </View>
        <View className='orders-wrapper'>
          <Text className='orders-title'>我的订单</Text>
          <View className='orders-tabs'>
            {
              MINE_ORDERS.map((order, _index) => {
                return (
                  <View className='order-item' key={_index} onClick={() => handleSwitchOrder(order.imgClass)}>
                    <View className={`order-icon icon ${order.imgClass}`} />
                    <Text className='order-text'>{order.text}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
      <View className='mine-bottom'>
        @2022 made by heqi_wang
      </View>
    </View>
  )
}

export default Mine;