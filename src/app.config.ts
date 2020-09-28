export default {
  pages: [
    'pages/tab/picker-single',
    'pages/tab/picker-multi'
  ],
  tabBar: {
    selectedColor: '#333333',
    color: '#666666',
    list: [
      {
        pagePath: 'pages/tab/picker-single',
        text: 'picker-single'
      },
      {
        pagePath: 'pages/tab/picker-multi',
        text: 'picker-multi'
      }
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  }
};
