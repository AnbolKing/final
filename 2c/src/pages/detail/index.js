import React, { useState, useEffect } from 'react';
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components';
import { AtFloatLayout, AtDivider,AtInputNumber, AtToast, AtModal, AtActivityIndicator } from "taro-ui";
import Taro, { useReady } from '@tarojs/taro';
import { DETAIL, ADDRESS } from '../../define/mock';
import { DETAIL_INFO, INSURE_CONTENT, PAY_WAYS, PAY_SELECT } from '../../define/const';
import { sleep } from '../../utils/sleep';
import './index.less';

const Detail = () => {
  
  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState(null);
  const [tags, setTags] = useState([]);
  const [insure, setInsure] = useState([]);
  const [hasCollect, setHasCollect] = useState(false);
  const [selected, setSelected] = useState(null);
  const [num, setNum] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(700);
  const [insureOpen, setInsureOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [payWay, setPayWay] = useState('');
  const [payToast, setPayToast] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [address, setAddress] = useState('');
  const [addressIndex, setAddressIndex] = useState(0);
  const [infoKey, setInfoKey] = useState('');
  const [infoTitle, setInfoTitle] = useState('商品参数');

  const handleStore = () => {
    Taro.navigateTo({
      url: '../store/index',
    })
  }

  const handleBack = () => {
    Taro.navigateBack();
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
    setInfoKey(key);
    setInfoTitle(key==='info' ? '商品参数' : '选择地址');
    setInfoOpen(true);
  }

  const handleBuy = () => {
    setBuyOpen(true);
  }

  const handleSelect = (item, index) => {
    if(selected && index === selected.index) {
      setSelected(null);
      return ;
    }
    const obj = {
      index,
      ...item,
    }
    setSelected(obj);
  }

  const handSubmitBuy = async () => {
    if(!selected) {
      console.log('go')
      setToastOpen(true);
      return ;
    }
    setLoading(true);
    const res = await sleep(2000, 'success');
    setLoading(false);
    setBuyOpen(false);
    setPayOpen(true)
  }

  const handleSelectPay = (key) => {
    if(key === payWay) {
      setPayWay('');
      return ;
    }
    setPayWay(key);
  }

  const handleSelectAddress = (ele, index) => {
    let ans = ele.name + ' ' + ele.phone + ' ' + ele.one_level + ' ' + ele.two_level + ' ' + ele.three_level + ' ' + ele.detail;
    setAddress(ans);
    setAddressIndex(index);
    setInfoOpen(false);
  }

  const handlePay = async () => {
    if(!payWay) {
      setPayToast(true);
      return ;
    }
    setPayModal(true);
    const res = await sleep(2000, 'success');
    setPayModal(false);
    setPayOpen(false);
    Taro.navigateTo({
      url: '../success/index',
    })
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

  const fetchAddress = async () => {
    const res = await sleep(1000, ADDRESS);
    res.forEach((ele, index) => {
      if(ele.isChecked) {
        let ans = ele.name + ' ' + ele.phone + ' ' + ele.one_level + ' ' + ele.two_level + ' ' + ele.three_level + ' ' + ele.detail;
        setAddress(ans);
        setAddressIndex(index);
      }
    });
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
    if(key === 'address') {
      return address;
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
    if(infoKey === 'info') {
      return (
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
      )
    }
    if(infoKey === 'address') {
      return (
        <View className='address-content'>
        {
          ADDRESS.map((item, index) => {
            return (
              <View className='address-item' key={index} onClick={() => handleSelectAddress(item, index)}>
                <View className='item-info'>
                  <View className='item-top'>
                    <Text className='name text'>{item.name}</Text>
                    <Text className='phone text'>{item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</Text>  
                  </View>
                  <View className='item-bottom'>
                    {
                      index===addressIndex ? (
                        <Text className='item-checked text'>当前使用</Text>
                      ) : null
                    }
                    <Text className='one text'>{item.one_level}</Text>
                    <Text className='two text'>{item.two_level}</Text>
                    <Text className='three text'>{item.three_level}</Text>
                    <Text className='detail text'>{item.detail}</Text>
                  </View>
                </View>
                <View className='item-divider' />
              </View>
            )
          })
        }
        </View>
      )
    }
  }

  const renderBuyContent = () => {
    const finalPrice = (Number(selected ? selected.price : detail.price) * num).toFixed(2);
    const priceArr = finalPrice.split('.'); 
    return (
      <>
      <View className='buy-content'>
        <View className='buy-top'>
          <Image className='buy-img' src={detail.commodity_img} />
          <View className='buy-info'>
            <View className='price'>
              <Text className='price-text price-unit'>￥</Text>
              <Text className='price-text price-pre'>{priceArr[0]}</Text>
              <Text className='price-text price-las'>.{priceArr[1]}</Text>
            </View>
            {
              selected
              ? <View className='select'>已选：{selected.content}</View>
              : null
            }
          </View>
          <View 
            className='buy-icon close-icon' 
            onClick={() => setBuyOpen(false)}
          />
        </View>
        <AtDivider 
          className='buy-divider'
          lineColor='#E1E1E1'
        />
        <View className='buy-spec'>
          <View className='spec-label'>规格</View>
          <View className='spec-range'>
            {
              detail.commodity_range.map((item, index) => {
                return (
                  <View 
                    className={`range-item ${selected && selected.index===index ? 'active' : ''}`} 
                    key={index}
                    onClick={() => handleSelect(item, index)}
                  >
                    {item.content}
                  </View>
                )
              })
            }
          </View>
        </View>
        <AtDivider 
          className='buy-divider'
          lineColor='#E1E1E1'
        />
        <View className='buy-nums'>
          <View className='spec-label'>数量</View>
          <AtInputNumber
            min={1}
            max={99}
            step={1}
            value={num}
            onChange={(value) => setNum(value)}
            className='buy-number'
          />
        </View>
      </View>
      <View className='buy-btn'>
        <View 
          className='btn'
          onClick={handSubmitBuy}>
            <AtActivityIndicator 
              isOpened={loading}
              color="#ffffff"
            />
            <Text style={{marginLeft: '20rpx'}}>立即购买</Text>
        </View>
      </View>
      </>
    )
  }

  const renderPayContent = () => {
    return (
      <>
      <View className='pay-content'>
        <View className='top'>
          ￥<Text className='price'>{selected ? selected.price : detail.price}</Text>
        </View>
        <View className='bottom'>
          {
            PAY_WAYS.map(item => {
              return (
                <View className='pay-item' key={item.key} onClick={() => handleSelectPay(item.key)}>
                  <View className='left'>
                    <View className={`icon pay-icon ${item.key}`} />
                    <Text className='text'>{item.text}</Text>
                  </View>
                  <Image 
                    src={payWay===item.key ? PAY_SELECT.isSelected : PAY_SELECT.noSelected} 
                    className='way-icon' 
                  />
                </View>
              )
            })
          }
        </View>
      </View>
      <View className='pay-btn'>
        <View 
          className='btn'
          onClick={handlePay}
        >
            <Text style={{marginLeft: '20rpx'}}>立即购买</Text>
        </View>
      </View>
      </>
    )
  }

  // init
  useEffect(() => {
    fetchDetail();
    fetchAddress();
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
                      <View className={`content ${item.key==='address' ? 'address' : ''}`}>
                        {renderContent(item.key)}
                      </View>
                    </View>
                    {
                      item.key==='go' || item.key==='selected'
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
              <View className='btn' onClick={handleStore}>进店逛逛</View>
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
        <View className='buy-right' onClick={handleBuy}>立即购买</View>
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
        title={infoTitle}
        onClose={() => setInfoOpen(false)}
        className='info-float'  
      >
        {renderInfoContent()}
      </AtFloatLayout>
      <AtFloatLayout
        isOpened={buyOpen}
        title='选购商品'
        onClose={() => setBuyOpen(false)}
        className='buy-float'  
      >
        {renderBuyContent()}
      </AtFloatLayout>
      <AtFloatLayout
        isOpened={payOpen}
        title='支付'
        onClose={() => {
          setPayOpen(false);
          setPayWay('');
        }}
        className='pay-float'  
      >
        {renderPayContent()}
      </AtFloatLayout>
      <AtToast 
        isOpened={toastOpen}
        text={`请选择${detail.commodity_label}`}
        duration={2000}
        onClose={() => setToastOpen(false)}
      />
      <AtToast 
        isOpened={payToast}
        text='请选择支付方式'
        duration={1000}
        onClose={() => setPayToast(false)}
      />
      <AtModal isOpened={payModal} className='pay-loading'>
        <AtActivityIndicator 
          isOpened={true}
          color="#ffffff"
        />
        <Text className='text'>支付中</Text>
      </AtModal>
    </>
  )
}

export default Detail;