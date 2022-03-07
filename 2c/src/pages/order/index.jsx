import React, {useState, useEffect} from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import {ORDER_TAB, IMG_URL} from '../../define/const';
import './index.less';

const Order = () => {

  const [tabActive, setTabActive] = useState(0);
  const [orders, setOrders] = useState({});
  const [showEmpty, setShowEmpty] = useState(false);

  const fetchOrders = () => {
    const res = [];
    setOrders(res);
    if(res.length === 0) {
      setShowEmpty(true);
    }
  }

  const handleChangeTab = (index, key) => {
    setTabActive(index);
  }

  const renderEmpty = () => {
    return (
      <View className='empty-wrapper'>
        <Image 
          src={IMG_URL.emptyOrder}
          className='empty-img'
        />
      </View>
    )
  }

  const renderOrders = () => {
    return (
      <View>orders</View>
    )
  }

  // init
  useEffect(() => {
    fetchOrders();
  }, []);

  // judge empty

  return (
    <View className='order-container'>
      {/* order tab */}
      <View className='tab-wrapper'>
        {
          ORDER_TAB.map((item, index) => {
            return (
              <View
                className={
                  `tab-item 
                    ${tabActive === index ? 'tab-item-active' : ''}
                  `
                }
                onClick={() => handleChangeTab(index, item.key)}
                key={item.key}
              >
                {item.text}
              </View>
            )
          })
        }
      </View>
      {/* orders */}
      <ScrollView
        className='orders-wrapper'
      >
        {
          showEmpty
          ? renderEmpty()
          : renderOrders()
        }
      </ScrollView>
    </View>
  )
}

export default Order;