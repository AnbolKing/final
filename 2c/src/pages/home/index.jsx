import React from 'react';
import { View, Text, Swiper, Image, SwiperItem, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.less';
import { TAB_ITEMS, CARD_HEIGHT, IMG_URL } from '../../define/const';
import { LIST_CARDS } from '../../define/mock';
import { sleep } from '../../utils/sleep';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [], // swiper imgs
      hotItems: [], // hot items
      channels: [], // two channels
      scrollLeft: 0, // tab position
      tabAvtive: 0, // active tab index
      cards: [], // list cards
      scrollHeight: 2400, // list scroll height
      tabFix: false, // tab fixed
      hasMore: true, // has more
      bottomText: '点我加载更多哦~',
      loading: false,
    }
  }
  // fetch swiper imgs
  fetchImgList = () => {
    this.setState({
      imgList: [
        'https://img1.baidu.com/it/u=2193335351,6115624&fm=253&fmt=auto&app=120&f=JPEG?w=899&h=500',
        'https://img0.baidu.com/it/u=1242512222,1241183799&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=312',
        'https://img0.baidu.com/it/u=1538438019,2605145229&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
      ]
    })
  }

  // fetch hot items
  fetchHotItems = () => {
    this.setState({
      hotItems: [
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
      ]
    })
  }

  // fetch two channels
  fetchChannels = () => {
    this.setState({
      channels: [
        {
          key: 'second_hand',
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
          key: 'lottery',
          first_title: '抽奖专场',
          second_title: '福利宠粉',
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
      ]
    })
  }

  // fetch cards
  fetchCards = () => {
    const res = [...LIST_CARDS, ...LIST_CARDS]
    const rows = Math.ceil(res.length / 2);
    this.setState({
      cards: res,
    })
    this.setState({
      scrollHeight: rows * CARD_HEIGHT,
    })
  }

  // tab active
  handleTab = (index) => {
    this.setState({
      tabAvtive: index
    })
  }

  // swpier list
  handleSwiperTab = (e) => {
    const currentIndex = e.currentTarget.current;
    this.setState({
      tabAvtive: currentIndex
    })
    if (currentIndex > 4) {
      this.setState({
        scrollLeft: 300,
      })
    }
    else {
      this.setState({
        scrollLeft: 0,
      })
    }
  }

  // fetch more list
  handleLoadMore = async () => {
    this.setState({
      bottomText: '加载中',
      loading: true
    })
    const hasMore = await sleep(3000, true);
    const res = LIST_CARDS;
    const newCards = [...this.state.cards, ...res];
    const rows = Math.ceil(newCards.length / 2);
    this.setState({
      cards: newCards,
      scrollHeight: rows * CARD_HEIGHT,
      bottomText: hasMore ? '点我加载更多哦~' : '已经到底了哦~喜欢就下单吧! ',
      hasMore,
      loading: false,
    })
  }

  // to good detail
  handleToItem = (id) => {
    console.log(id);
    Taro.navigateTo({
      url: `../detail/index?id=${id}`,
    })
  }

  // render bottom
  renderBottom = () => {
    const { hasMore, bottomText, loading } = this.state;
    if(hasMore) {
      return (
        <View className='divider-wrapper'>
          {
            loading ? (
              <Image 
                src={IMG_URL.loading}
                className='load-img'
              />
            ) : null
          }
          <Text className='text' onClick={this.handleLoadMore}>{bottomText}</Text>
        </View>
      )
    }
    else {
      return (
        <View className='divider-wrapper'>
          <View className='divider'></View>
          <Text className='text'>{bottomText}</Text>
          <View className='divider'></View>
        </View>
      )
    }
  }

  init() {
    this.fetchImgList();
    this.fetchHotItems();
    this.fetchChannels();
    this.fetchCards();
  }

  // init
  componentDidMount() {
    this.init();
  }

  // pull refresh
  onPullDownRefresh() {
    console.log('pull refresh')
    this.init();
  }

  // compute page scroll-height to fix tab
  onPageScroll({scrollTop}) {
    if(scrollTop > 548) {
      this.setState({
        tabFix: true
      })
    }
    else {
      this.setState({
        tabFix: false
      })
    }
  }

  render() {
    const { 
      imgList, hotItems, channels, scrollLeft, 
      tabAvtive, cards, scrollHeight, tabFix,
    } = this.state

    return (
      <View 
        className='home-container'
      >
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
            channels.map((channel) => {
              return (
                <View className='channel-container' key={channel.key}>
                  <View className='channel-title'>
                    <Text className='first-title'>{channel.first_title}</Text>
                    <View className='tag-title'>
                      <Text className='second-title'>{channel.second_title}</Text>
                    </View>
                  </View>
                  <View className='channel-list'>
                    {
                      channel.list.map((item, _index) => {
                        return (
                          <View className='list-item' key={_index}>
                            <Image src={item.imgUrl} className='item-img' />
                            <Text className='item-desc'>{item.desc}</Text>
                            {
                              channel.key==='second_hand' ? (
                                <Image 
                                  src={IMG_URL.recommend} 
                                  className='hot-img'
                                />
                              ) : null
                            }
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
        {/* tabs */}
        <ScrollView
          className={`tabs-wrapper ${tabFix ? 'tab-fix' : ''}`}
          scrollX={true}
          scrollWithAnimation={true}
          scrollLeft={scrollLeft}
        >
          {
            TAB_ITEMS.map((item, index) => {
              return (
                <View
                  className={
                    `tab-item 
                      ${tabAvtive === index ? 'tab-item-active' : ''}
                      ${tabFix ? 'tab-item-fix' : ''}
                    `
                  }
                  onClick={() => this.handleTab(index)}
                >
                  {item.text}
                </View>
              )
            })
          }
        </ScrollView>
        {/* list card */}
        <Swiper
          className='list-swiper'
          autoplay={false}
          style={{ height: `${scrollHeight}rpx` }}
          onChange={this.handleSwiperTab}
        >
          {
            TAB_ITEMS.map((tabs, index) => {
              return (
                <SwiperItem>
                  <View className='list-wrapper'>
                    {
                      cards.map(item => {
                        const priceArr = item.price.split('.');
                        return (
                          <View 
                            className='card-wrapper' 
                            key={item.id}
                            onClick={() => this.handleToItem(item.id)}
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
                </SwiperItem>
              )
            })
          }
        </Swiper>
        {/* bottom such as line & so */}
        <View className='bottom-wrapper'>
          {this.renderBottom()}
        </View>
      </View>
    )
  }
}

export default Home;