import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtForm, AtInput, AtButton, AtToast } from 'taro-ui';
import { sleep } from '../../utils/sleep';
import './index.less';

const Login = () => {

  const [status, setStatus] = useState('index');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChangeStatus = (key) => {
    setStatus(key);
  }

  const handleChangeName = value => {
    setName(value)
  }

  const handleChangePassword = value => {
    setPassword(value)
  }

  const handleLogin = async () => {
    if(!name) {
      setMsg('请输入用户名');
      setToastOpen(true);
      return ;
    }
    if(!password) {
      setMsg('请输入密码');
      setToastOpen(true);
      return ;
    }
    setLoginLoading(true);
    const obj = {
      name,
      password
    };
    const res = await sleep(1000, obj);
    setLoginLoading(false);
    Taro.switchTab({
      url: '../home/index',
    })
  }

  const handleRegister = async () => {
    if(!name) {
      setMsg('请输入用户名');
      setToastOpen(true);
      return ;
    }
    if(!password) {
      setMsg('请输入密码');
      setToastOpen(true);
      return ;
    }
    setLoginLoading(true);
    const obj = {
      name,
      password
    };
    const res = await sleep(1000, obj);
    setLoginLoading(false);
    Taro.switchTab({
      url: '../home/index',
    })
  }

  const renderLogin = () => {
    return (
      <View className='login-wrapper wrapper'>
        <AtForm>
          <AtInput 
            name='name' 
            title='用户名' 
            type='text' 
            placeholder='单行文本' 
            value={name}
            required
            onChange={handleChangeName}
            placeholderStyle={{
              fontSize: '1rem'
            }}
          />
          <AtInput 
            name='password' 
            title='密码' 
            type='password' 
            placeholder='单行文本' 
            value={password}
            required
            onChange={handleChangePassword} 
            placeholderStyle={{
              fontSize: '1rem'
            }}
          />
          <AtButton loading={loginLoading} onClick={handleLogin} className='submit-btn'>提交</AtButton>
        </AtForm>
        <AtToast 
          isOpened={toastOpen}
          text={msg}
          duration={1000}
          onClose={() => setToastOpen(false)}
        />
      </View>
    )
  }

  const renderRegister = () => {
    return (
      <View className='register-wrapper wrapper'>
        <AtForm>
          <AtInput 
            name='name' 
            title='用户名' 
            type='text' 
            placeholder='单行文本' 
            value={name}
            required
            onChange={handleChangeName}
            placeholderStyle={{
              fontSize: '1rem'
            }}
          />
          <AtInput 
            name='password' 
            title='密码' 
            type='password' 
            placeholder='单行文本' 
            value={password}
            required
            onChange={handleChangePassword} 
            placeholderStyle={{
              fontSize: '1rem'
            }}
          />
          <AtButton loading={loginLoading} onClick={handleRegister} className='submit-btn'>注册</AtButton>
        </AtForm>
        <AtToast 
          isOpened={toastOpen}
          text={msg}
          duration={1000}
          onClose={() => setToastOpen(false)}
        />
      </View>
    )
  }

  const renderIndex = () => {
    return (
      <View className='wrapper'>
        <Image className='img' src='https://s3.bmp.ovh/imgs/2022/03/1e75fe6dbc4446e7.png'/>
        <View className='btns'>
          <View className='btn-login btn' onClick={() => handleChangeStatus('login')}>登录</View>
          <View className='btn-register btn' onClick={() => handleChangeStatus('register')}>注册</View>
        </View>
      </View>
    )
  }

  const renderPage = () => {
    if(status === 'index') {
      return renderIndex();
    }
    if(status === 'login') {
      return renderLogin();
    }
    if(status === 'register') {
      return renderRegister();
    }
  }

  return renderPage();
}

export default Login;