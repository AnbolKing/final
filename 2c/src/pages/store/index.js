import React, { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { STORE_BG } from '../../define/const';
import { STORE_INFO } from '../../define/mock';
import { sleep } from '../../utils/sleep';
import './index.less';

const Store = () => {
  
  const [storeInfo, setStoreInfo] = useState(null);

  const fetchStoreInfo = async () => {
    const res = await sleep(1000, STORE_INFO);
    setStoreInfo(res);
  }

  const handleBack = () => {
    Taro.navigateBack();
  }

  const handleToItem = (id) => {
    Taro.navigateTo({
      url: `../detail/index?id=${id}`,
    })
  }

  useEffect(() => {
    fetchStoreInfo();
  }, [])

  if(!storeInfo) {
    return null;
  }

  return (
    <View className='store-container'>
      <View className='back' onClick={handleBack}>
        <View className='icon back-icon' />
      </View>
      <Image className='bg' src={STORE_BG}></Image>
      <View className='header'>
        <View className='img'>
          <Image className='avatar' src={storeInfo.store_avatar} />
        </View>
        <View className='info'>
          <View className='name'>{storeInfo.name}</View>
          <View className='desc'>{storeInfo.desc}</View>
        </View>
      </View>
      <View className='list-wrapper'>
        {
          storeInfo.list.map(item => {
            const priceArr = item.price.split('.');
            return (
              <View 
                className='card-wrapper' 
                key={item.id}
                onClick={() =>handleToItem(item.id)}
              >
                <Image src={item.imgUrl} className='card-img' />
                <View className='card-bottom'>
                  <Text className='card-text'>{item.desc}</Text>
                  {
                    item.tags && item.tags.length ? (
                      <View className='card-tags'>
                        {
                          item.tags.map(tag => {
                            return (
                              <View className='card-tag'>{tag}</View>
                            )
                          })
                        }
                      </View>
                    ) : null
                  }
                  <View className='card-price'>
                    <Text className='price-text price-unit'>￥</Text>
                    <Text className='price-text price-pre'>{priceArr[0]}</Text>
                    <Text className='price-text price-las'>.{priceArr[1]}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
        <View className='bottom'>已经到底喽~</View>
      </View>
    </View>
  )
}

export default Store;