import React, { useState } from 'react';
import { View, Picker, Switch, Text } from '@tarojs/components';
import { AtInput, AtButton }  from 'taro-ui';
import {} from '../../define/const';
import './index.less';
const EditAdress = () => {

  const [region, setRegion] = useState(["四川省", "广元市", "苍溪县"]);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [detail, setDetail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePicker = (e) => {
    setRegion(e.detail.value);
  }
  
  const handleSwitch = (e) => {
    setChecked(e.detail.value)
  }

  return (
    <View className='edit-container'>
      <AtInput
        name='name'
        title='收货人'
        type='text'
        value={name}
        onChange={e => setName(e)}
      />
      <AtInput
        name='phone'
        title='手机号码'
        type='text'
        value={phone}
        onChange={e => setPhone(e)}
      />
      <View className='edit-detail'>
        <View className='detail-label'>所在地区</View>
        <Picker 
          mode='region' 
          onChange={handlePicker}
          value={region}
          className='picker'
        >
          <View>
            {region[0]} {region[1]} {region[2]}
          </View>
        </Picker>
        <View className='picker-icon icon' />
      </View>
      <AtInput
        name='detail'
        title='详细地区'
        type='text'
        value={detail}
        onChange={e => setDetail(e)}
      />
      <View className='edit-check'>
        <Switch 
          onChange={handleSwitch}
          checked={checked}
          type='checkbox'
          color='#ED1628'
          className='check'
        />
        <Text className='check-text'>设置为默认地址</Text>
      </View>
      <AtButton
        className='edit-submit'
        type='primary'
        circle
        loading={loading}
      >提交</AtButton>
      {/* <View className='edit-submit'>保存</View> */}
    </View>
  )
}

export default EditAdress;