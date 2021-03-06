export default {
  pages: [
    'pages/mine/index',
    'pages/order/index',
    'pages/home/index',
    'pages/login/index',
    'pages/collect/index',
    'pages/store/index',
    'pages/detail/index',
    'pages/success/index',
    'pages/editAddress/index',
    'pages/address/index',
    'pages/about/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999A9B',
    selectedColor: '#000200',
    backgroundColor: '#FEFFFF',
    borderStyle: '#9A9B9C',
    position: 'bottom',
    list: [
      {
        pagePath: "pages/home/index",
        iconPath: "static/home.png",
        selectedIconPath: "static/select_home.png",
        text: "首页",
      },
      {
        pagePath: "pages/order/index",
        iconPath: "static/order.png",
        selectedIconPath: "static/select_order.png",
        text: "订单",
      },
      {
        pagePath: "pages/mine/index",
        iconPath: "static/mine.png",
        selectedIconPath: "static/select_mine.png",
        text: "我的",
      },
    ],
  }
}
