import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import {ORDER_TAB, ORDER_STATUS, ORDER_BENEFIT} from '../../define/const';
import {ORDER_ITEM} from '../../define/mock';
import './index.less';

const Order = () => {

  const [tabActive, setTabActive] = useState(0);
  const [orders, setOrders] = useState({});
  const [showEmpty, setShowEmpty] = useState(false);

  const fetchOrders = () => {
    const res = [1];
    setOrders(res);
    if(res.length === 0) {
      setShowEmpty(true);
    }
    else {
      setShowEmpty(false);
    }
  }

  const handleChangeTab = (index, key) => {
    setTabActive(index);
  }

  const renderEmpty = () => {
    return (
      <View className='empty-wrapper'>
        <Text className='empty-img empty'/>
        <Text className='empty-text'>暂无相关订单</Text>
      </View>
    )
  }

  const renderOrders = () => {
    return (
      <View className='orders-wrapper'>
        {
          ORDER_ITEM.map((item, index) => {
            return (
              <View className='item-wrapper'>
                <View className='item-status'>
                  <View className='left'>
                    <Image src={item.store_img} className='store-img' />
                    <Text className='store-name store-text'>{item.store_name}</Text>
                    <Text className='store-arr store-text'>{'>'}</Text>
                  </View>
                  <View className='right'>{ORDER_STATUS[item.status]}</View>
                </View>
                <View className='item-content'>
                  <Image src={item.good_img} className='good-img'/>
                  <View className='item-detail'>
                    <View className='detail-top'>
                      <Text className='good-desc'>{item.good_desc}</Text>
                      <Text className='good-price'>￥{item.good_all_price}</Text>
                    </View>
                    <View className='detail-mid'>
                      <Text className='good-info'>{item.good_info}</Text>
                      <Text className='good-nums'>X{item.good_nums}</Text>
                    </View>
                    <View className='detail-bottom'>
                      {
                        item.good_benefits.map(benefit => {
                          return (
                            <Text className='good-benefit'>{ORDER_BENEFIT[benefit]}</Text>
                          )
                        })
                      }
                    </View>
                  </View>
                </View>
                <View className='item-price'>
                  <View className='price all-price'>
                    总价￥
                    <Text className='all-num'>{item.good_all_price}</Text>
                  </View>
                  <View className='price need-pay'>
                    需付款￥
                    <Text className='all-num'>{item.good_need_pay}</Text>
                  </View>
                </View>
                <View className='item-btn'>
                  <View className='btn btn-cancel'>取消订单</View>
                  <View className='btn btn-cancel'>付款</View>
                </View>
              </View>
            )
          })
        }
      </View>
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
                <Text className='tab-text'>{item.text}</Text>
                <View className='num-tag'>
                  <Text className='tag-text'>2</Text>
                </View>
              </View>
            )
          })
        }
      </View>
      {/* orders */}
      <ScrollView
        className='content-wrapper'
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