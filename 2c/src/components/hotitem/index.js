import React, {useState, useEffect} from 'react';
import {View, Text, Image} from '@tarojs/components';
import './index.less';

class HotItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    imgUrl: 'https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    price: '1.1',
  };

  render() {
    console.log(this.props);
    return (
      <View className='item-wrapper'>
        <Image
          src={this.props.imgUrl}
          className='item-img'
        />
        <Text className='item-price'>￥{this.props.price}</Text>
      </View>
    )
  }
}

export default HotItem;