import React from 'react';
import { View, Text } from '@tarojs/components';
import { ADDRESS } from '../../define/mock';
import './index.less';

const Address = () => {
  return (
    <View className='address-container'>
      {
        ADDRESS.map((item, index) => {
          return (
            <View className='address-item'>
              <View className='item-info'>
                <View className='item-top'>
                  <Text className='name text'>{item.name}</Text>
                  <Text className='phone text'>{item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</Text>  
                </View>
                <View className='item-bottom'>
                  {
                    item.isChecked ? (
                      <Text className='item-checked text'>默认</Text>
                    ) : null
                  }
                  <Text className='one text'>{item.one_level}</Text>
                  <Text className='two text'>{item.two_level}</Text>
                  <Text className='three text'>{item.three_level}</Text>
                  <Text className='detail text'>{item.detail}</Text>
                </View>
              </View>
              <View className='item-img'>
                <View className='item-edit icon' />
              </View>
              <View className='item-divider' />
            </View>
          )
        })
      }
    </View>
  )
}

export default Address;