import React, { useState, useEffect } from 'react';
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components';
import { AtFloatLayout } from "taro-ui";
import Taro, { useReady, useRouter } from '@tarojs/taro';
import { DETAIL } from '../../define/mock';
import { DETAIL_INFO, INSURE_CONTENT } from '../../define/const';
import './index.less';

const Detail = () => {
  
  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState(null);
  const [tags, setTags] = useState([]);
  const [insure, setInsure] = useState([]);
  const [hasCollect, setHasCollect] = useState(false);
  const [selected, setSelected] = useState(null);
  const [scrollHeight, setScrollHeight] = useState(700);
  const [insureOpen, setInsureOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleSwiper = (e) => {
    setCurrent(e.detail.current);
  }

  const handleCollect = () => {
    setHasCollect(!hasCollect);
  }

  const handleLookImg = (index, key) => {
    const imgs = key==='swiper' ? detail.swiper_imgs : detail.detail_imgs;
    Taro.previewImage({
      current: imgs[index],
      urls: imgs,
    })
  }

  const handleInsureOpen = () => {
    setInsureOpen(true);
  }

  const handleInfoOpen = (key) => {
    if(key === 'go') {
      return ;
    }
    setInfoOpen(true);
  }

  const fetchDetail = () => {
    const id = Taro.getCurrentInstance().router.params.id;
    setDetail(DETAIL);
    // deal tags
    const newTags = [];
    for(let i=0; i<DETAIL.tags.length; i++) {
      newTags.push(DETAIL.tags[i])
      if(i !== DETAIL.tags.length-1) {
        newTags.push('.');
      }
    }
    // deal insure
    const newInsure = [];
    for(let i=0; i<DETAIL.insure.length; i++) {
      newInsure.push(DETAIL.insure[i])
      if(i !== DETAIL.insure.length-1) {
        newInsure.push('.');
      }
    }
    setInsure(newInsure);
    setTags(newTags);
  }

  const fetchScrollHeight = () => {
    const allHeight = Taro.getSystemInfoSync().windowHeight;
    const query = Taro.createSelectorQuery();
    query.select('.detail-bottom').boundingClientRect();
    query.exec(res => {
      let bottomHeight = res[0].height;
      setScrollHeight(allHeight-bottomHeight);
    })
  }

  const renderContent = (key) => {
    const keys = Object.keys(detail.info);
    const infos = keys[0] + keys[1] ? keys[1] : '';
    if(key === 'info') {
      return infos
    }
    if(key === 'go') {
      return detail.go
    }
  }

  const renderInsureContent = () => {
    return (
      <View className='insure-content'>
        {
          INSURE_CONTENT.map((item, index) => {
            return (
              <View className='insure-item' key={index}>
                <View className='left'>
                  <View className='check icon' />
                </View>
                <View className='right'>
                  <View className='title'>{item.title}</View>
                  <View className='content'>{item.content}</View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  const renderInfoContent = () => {
    const objs = Object.entries(detail.info);
    return (
      <>
        <View className='info-content'>
          {
            objs.map((item, index) => {
              return (
                <View className='info-item' key={index}>
                  <Text className='label'>{item[0]}</Text>
                  <Text className='content'>{item[1]}</Text>
                </View>
              )
            })
          }
        </View>
      </>
    )
  }

  // init
  useEffect(() => {
    fetchDetail();
  }, [])

  useReady(() => {
    fetchScrollHeight();
  })

  if(!detail) {
    return null;
  }
  
  return (
    <>
      <ScrollView 
        className='detail-container' 
        scrollY
        style={{
          height: `${scrollHeight}px`
        }}
      >
        <View className='detail-swiper'>
          <Swiper
            className='swiper-wrapper'
            circular={true}
            snapToEdge={true}
            onChange={e => handleSwiper(e)}
          >
            {
              detail.swiper_imgs.map((item, index) => {
                return (
                  <SwiperItem className='swiper-item'>
                    <Image
                      src={item}
                      key={index}
                      className='item-img'
                      onClick={() => handleLookImg(index, 'swiper')}
                    />
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <View className='swiper-dots'>
            <Text className='current'>{current+1}</Text>
            <Text className='total'>/{detail.swiper_imgs.length}</Text>
          </View>
          <View className='back' onClick={handleBack}>
            <View className='icon back-icon' />
          </View>
        </View>
        <View className='detail-content'>
          <View className='introduction wrapper'>
            <View className='top'>
              <Text className='price'>
                <Text className='unit'>￥</Text>
                {detail.price}
              </Text>
              <Text className='nums'>已售 {detail.nums}</Text>
            </View>
            <View className='middle'>
              <Text className='title'>{detail.title}</Text>
              <View 
                className={`collect icon ${hasCollect ? 'has-collect' : ''}`}
                onClick={handleCollect}
              />
            </View>
            <View className='bottom'>
              {
                tags.length && tags.map((item, index) => {
                  return (
                    <View className='tag' key={index}>
                      {item}
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View className='insure wrapper' onClick={handleInsureOpen}>
            <View className='left'>
              <View className='left-icon icon' />
              <View className='left-desc'>小店保障</View>
              <View className='left-insure'>
                {
                  insure.length && insure.map((item, index) => {
                    return (
                      <View className='insure' key={index}>
                        {item}
                      </View>
                    )
                  })
                }
              </View>
            </View>
            <View className='right arrow-icon' />
          </View>
          <View className='info wrapper'>
            {
              DETAIL_INFO.map(item => {
                return (
                  <View 
                    className='info-item'
                    onClick={() => handleInfoOpen(item.key)}
                  >
                    <View className='left'>
                      <View className='label'>{item.text}</View>
                      <View className='content'>
                        {renderContent(item.key)}
                      </View>
                    </View>
                    {
                      item.key==='go'
                      ? null
                      : <View className='right arrow-icon' />
                    }
                  </View>
                )
              })
            }
          </View>
          <View className='store wrapper'>
            <View className='store-img'>
              <Image className='img' src={detail.store_avatar}/>
            </View>
            <View className='store-info'>
              <Text className='name'>{detail.name}</Text>
              <Text className='desc'>{detail.desc}</Text>
              <View className='btn'>进店逛逛</View>
            </View>
          </View>
        </View>
        <View className='detail-detail'>
          <View className='detail-title'>
            <View className='title-divider'></View>
            <View className='title'>商品详情</View>
            <View className='title-divider'></View>
          </View>
          <View className='detail-imgs'>
            {
              detail.detail_imgs.map((item, index) => {
                return (
                  <Image 
                    src={item}
                    key={index}
                    className='img-item'
                    onClick={() => handleLookImg(index, 'detail')}
                  />
                )
              })
            }
          </View>
        </View>
        <View className='detail-bottom'>
          已经到底了
        </View>
      </ScrollView>
      <View className='detail-buy'>
        <View className='buy-left'>
          <View className='item'>
            <View className='icon store' />
            <Text className='text'>店铺</Text>
          </View>
          <View className='item'>
            <View className='icon info' />
            <Text className='text'>信息</Text>
          </View>
          <View className='item'>
            <View 
              className={`icon collect ${hasCollect ? 'has-collect' : ''}`} 
              onClick={handleCollect}
            />
            <Text className='text'>收藏</Text>
          </View>
        </View>
        <View className='buy-right'>立即购买</View>
      </View>
      <AtFloatLayout
        isOpened={insureOpen}
        title='小店保障'
        onClose={() => setInsureOpen(false)}
        className='insure-float'
      >
        {renderInsureContent()}
      </AtFloatLayout>
      <AtFloatLayout
        isOpened={infoOpen}
        title='商品参数'
        onClose={() => setInfoOpen(false)}
        className='info-float'  
      >
        {renderInfoContent()}
      </AtFloatLayout>
    </>
  )
}

export default Detail;