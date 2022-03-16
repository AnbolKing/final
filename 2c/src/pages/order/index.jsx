import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import { AtTabBar, AtModal } from 'taro-ui'
import Taro, { useDidShow } from '@tarojs/taro';
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
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const fetchOrders = async (status) => {
    setSwitchTab(true);
    const res = await sleep(1000, ORDER_ITEM);
    setSwitchTab(false);
    setOrders(ORDER_ITEM);
    if(res.length === 0) {
      setShowEmpty(true);
    }
    else {
      setShowEmpty(false);
    }
  }

  // switch tab
  const handleChangeTab = (index) => {
    setTabActive(index);
  }

  // pull refresh
  const handlePullRefresh = async () => {
    setRefresh(true);
    const res = await sleep(2000, '123');
    setRefresh(false);
  }

  const handleBtn = (key) => {
    if(key === 'sure') {
      setContent('确认收到货了嘛');
    }
    if(key === 'help') {
      setContent('下面是客服电话');
    }
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleConfirm = () => {
    if(content.indexOf('确认') > 0) {
      fetchOrders(tabActive);
    }
    setOpen(false);
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
    if(status===1 || status===2) {
      return (
        <View className='item-btn'>
          <View className='btn btn-help' onClick={() => handleBtn('help')}>联系售后</View>
          <View className='btn btn-sure' onClick={() => handleBtn('sure')}>确认收货</View>
        </View>
      )
    }
    if(status === 3) {
      return (
        <View className='item-btn'>
          <View className='btn btn-help' onClick={() => handleBtn('help')}>联系售后</View>
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
      orders.map((item, index) => {
        return (
          <View className='item-wrapper' key={index}>
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
        case 'wait_go':
          setTabActive(1)
          fetchOrders(1);
          return ;
        case 'wait_recive':
          setTabActive(2)
          fetchOrders(2);
          return ;
        case 'wait_judge':
          setTabActive(3)
          fetchOrders(3);
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

  // switch tab
  useEffect(() => {
    fetchOrders();
  }, [tabActive])

  if(orders && !orders.length) {
    return null;
  }

  return (
    <View className='order-container'>
      {/* order tab */}
      <AtTabBar
        tabList={ORDER_TAB}
        onClick={handleChangeTab}
        current={tabActive}
        selectedColor='#000000'
        color='#A8A9AA'
        className='tab-wrapper'
      />
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
      <AtModal
        isOpened={open}
        title={null}
        cancelText='取消'
        confirmText='确认'
        onCancel={ handleCancel }
        onConfirm={ handleConfirm }
        content={content}
        className='card-modal'
      />
    </View>
  )
}

export default Order;