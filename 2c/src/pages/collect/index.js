import React, { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.less';
import { LIST_CARDS } from '../../define/mock';
import { sleep } from '../../utils/sleep';

const Collect = () => {

  const [collects, setCollects] = useState([]);

  const handleToItem = (id) => {
    Taro.navigateTo({
      url: `../detail/index?id=${id}`,
    })
  }

  const fetchCollects = async () => {
    const res = await sleep(500, LIST_CARDS);
    setCollects(res);
  }

  useEffect(() => {
    fetchCollects();
  })

  if(!collects || !collects.length) {
    return null;
  }

  return (
    <View className='list-wrapper'>
      {
        collects.map(item => {
          const priceArr = item.price.split('.');
          return (
            <View
              className='card-wrapper' 
              key={item.id}
              onClick={() => handleToItem(item.id)}
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
    </View>
  )
}

export default Collect;