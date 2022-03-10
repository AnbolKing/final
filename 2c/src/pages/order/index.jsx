import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import Taro, { useDidShow, useDidHide } from '@tarojs/taro';
import {ORDER_TAB, ORDER_STATUS, ORDER_BENEFIT} from '../../define/const';
import {ORDER_ITEM} from '../../define/mock';
import { sleep } from '../../utils/sleep';
import './index.less';

const Order = () => {

  const [tabActive, setTabActive] = useState(null);
  const [orders, setOrders] = useState({});
  const [showEmpty, setShowEmpty] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [switchTab, setSwitchTab] = useState(false);

  const fetchOrders = (status) => {
    const res = [1];
    setOrders(res);
    if(res.length === 0) {
      setShowEmpty(true);
    }
    else {
      setShowEmpty(false);
    }
  }

  // switch tab
  const handleChangeTab = (index, key) => {
    setTabActive(index);
  }

  // pull refresh
  const handlePullRefresh = async () => {
    setRefresh(true);
    const res = await sleep(2000, '123');
    setRefresh(false);
  }

  // switch refresh
  const handleSwitchRefresh = async () => {
    setSwitchTab(true)
    const res = await sleep(2000, '123');
    setSwitchTab(false);
  }

  const renderEmpty = () => {
    return (
      <View className='empty-wrapper'>
        <Text className='empty-img empty'/>
        <Text className='empty-text'>暂无相关订单</Text>
      </View>
    )
  }

  const renderRefresh = () => {
    return (
      <View className='refresh-wrapper'>
        <View className='refresh-icon icon'></View>
        <Text className='refresh-text'>加载中</Text>
      </View>
    )
  }

  const renderBtns = (status) => {
    if(status === 1) {
      return (
        <View className='item-btn'>
          <View className='btn btn-cancel'>取消订单</View>
          <View className='btn btn-ok'>付款</View>
        </View>
      )
    }
    if(status === 2) {
      return (
        <View className='item-btn'>
          <View className='btn btn-cancel'>取消订单</View>
        </View>
      )
    }
    if(status === 3) {
      return (
        <View className='item-btn'>
          <View className='btn btn-help'>联系售后</View>
          <View className='btn btn-sure'>确认收货</View>
        </View>
      )
    }
    if(status === 4) {
      return (
        <View className='item-btn'>
          <View className='btn btn-help'>联系售后</View>
        </View>
      )
    }
  }

  const renderOrders = () => {
    return (
      <View className='orders-wrapper'>
        {
          switchTab
          ? renderRefresh()
          : renderOrderItems()
        }
      </View>
    )
  }

  const renderOrderItems = () => {
    return (
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
            {
              renderBtns(item.status)
            }
          </View>
        )
      })
    )
  }

  // init
  useDidShow(() => {
    const orderKey = Taro.getStorageSync('order_status');
    console.log(orderKey);
    if(orderKey) {
      switch(orderKey) {
        case 'all':
          setTabActive(0)
          fetchOrders(0);
          return ;
        case 'wait_pay':
          setTabActive(1)
          fetchOrders(1);
          return ;
        case 'wait_go':
          setTabActive(2)
          fetchOrders(2);
          return ;
        case 'wait_recive':
          setTabActive(3)
          fetchOrders(3);
          return ;
        case 'wait_judge':
          setTabActive(4)
          fetchOrders(4);
          return ;
        default:
          setTabActive(0)
          fetchOrders(0);
          return ;
      }
    }
    else {
      fetchOrders(0);
    }
  });

  // destory order_key
  // useDidHide(() => {
  //   Taro.setStorageSync('order_status', '');
  //   console.log(Taro.getStorageSync('order_status'))
  // })

  // switch tab
  useEffect(() => {
    handleSwitchRefresh();
  }, [tabActive])

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
        refresherTriggered={refresh}
        refresherEnabled={true}
        refresherThreshold={30}
        scrollY={true}
        showScrollbar={false}
        enhanced={true}
        onRefresherPulling={handlePullRefresh}
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