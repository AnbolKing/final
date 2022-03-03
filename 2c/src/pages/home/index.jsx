import React, {useState, useEffect} from 'react';
import { View, Text, Swiper, Image, SwiperItem } from '@tarojs/components';
import './index.less'

const Home = () => {
  const [imgList, setImgList] = useState([]); // swiper imgs
  const [hotItems, setHotItems] = useState([]); // hot items
  const [channels, setChannels] = useState([]); // two channels

  // fetch swiper imgs
  const fetchImgList = () => {
    setImgList([
      'https://img1.baidu.com/it/u=2193335351,6115624&fm=253&fmt=auto&app=120&f=JPEG?w=899&h=500',
      'https://img0.baidu.com/it/u=1242512222,1241183799&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=312',
      'https://img0.baidu.com/it/u=1538438019,2605145229&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
    ])
  }

  // fetch hot items
  const fetchHotItems = () => {
    setHotItems([
      {
        imgUrl: 'https://img2.baidu.com/it/u=2031330930,1299798005&fm=26&fmt=auto',
        price: '5.01'
      },
      {
        imgUrl: 'https://img1.baidu.com/it/u=4067931509,3749667927&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        price: '7.99',
      },
      {
        imgUrl: 'https://img1.baidu.com/it/u=4067931509,3749667927&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        price: '10.1',
      },
      {
        imgUrl: 'https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        price: '29.9',
      }
    ])
  }

  // fetch two channels
  const fetchChannels = () => {
    setChannels([
      {
        first_title: '二手专场',
        second_title: '好物精选',
        list: [
          {
            imgUrl: 'https://img0.baidu.com/it/u=3374251525,2847520370&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            desc: '潮流尖货榜',
          },
          {
            imgUrl: 'https://img0.baidu.com/it/u=2742336273,2910703392&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            desc: '大牌手机场',
          }
        ]
      },
      {
        first_title: '二手专场',
        second_title: '好物精选',
        list: [
          {
            imgUrl: 'https://img0.baidu.com/it/u=3374251525,2847520370&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            desc: '潮流尖货榜',
          },
          {
            imgUrl: 'https://img0.baidu.com/it/u=2742336273,2910703392&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            desc: '大牌手机场',
          }
        ]
      }
    ])
  }

  useEffect(() => {
    fetchImgList();
    fetchHotItems();
    fetchChannels();
  }, []);

  return (
    <View className='home-container'>
      {/* swiper */}
      <View className='swiper-wrapper'>
        <Swiper
          className='swiper-content'
          autoplay={true}
          indicatorDots={true}
          circular={true}
          snapToEdge={true}
          indicatorColor='#DAD8CB'
          indicatorActiveColor='#FDFFFF'
        >
          {
            imgList.map((item, index) => {
              return (
                <SwiperItem className='swiper-item'>
                  <Image 
                    src={item}
                    key={index}
                    className='item-img'
                  />
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
      {/* hot items */}
      <View className='hot-wrapper'>
        <Text className='hot-title'>主推爆款</Text>
        <View className='hot-list'>
          {
            hotItems.map((item, index) => {
              const priceArr = item.price.split('.');
              return (
                <View className='item-wrapper' key={index}>
                  <Image
                    src={item.imgUrl}
                    className='item-img'
                  />
                  <View className='item-price'>
                    <Text className='price-text price-unit'>￥</Text>
                    <Text className='price-text price-pre'>{priceArr[0]}</Text>
                    <Text className='price-text price-las'>.{priceArr[1]}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
      {/* special two channels */}
      <View className='channels-wrapper'>
        {
          channels.map((item, index) => {
            return (
              <View className='channel-container' key={index}>
                <View className='channel-title'>
                  <Text className='first-title'>{item.first_title}</Text>
                  <View className='tag-title'>
                    <Text className='second-title'>{item.second_title}</Text>
                  </View>
                </View>
                <View className='channel-list'>
                  {
                    item.list.map((item, _index) => {
                      return (
                        <View className='list-item'>
                          <Image src={item.imgUrl} className='item-img'/>
                          <Text className='item-desc'>{item.desc}</Text>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default Home;