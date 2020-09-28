# taro+vue picker 选择器
#### version: 1.0.0  
#### author: toumingren

微信原生的 picker 选择器不满足自定义UI和功能需求，所以自己写了一个简单的 picker 选择器，可扩展、可自定义，满足大部分业务需要。 

## 兼容性

H5 + 各平台小程序

## 工程要求

vue+小程序开发环境

## 功能

1、单选  
2、多级联动，非多级联动，理论支持任意级数  
3、省市区选择，基于多级联动  
4、自定义选择器头部确定取消按钮颜色及插槽支持  
5、选择器可视区自定义滚动个数  
6、自定义数据字段，满足不同人的需求  
7、自定义选择器样式  
8、单选及非联动选择支持扁平化的简单数据，如下形式：


## 引入插件

单独引入，在需要使用的页面上 import 引入即可
<template>
  <view>
    <xl-picker></xl-picker>
  </view>
</template>

<script>
  import XlPicker from '../../xl-picker';
  export default {
    components: {
      XlPicker
    }
  }
</script>
```

全局引入，`app.js`中 import 引入并注册即可全局使用

npm 安装引入：

```shell
jnpm install taro-vue-picker
```


```jsvascript
import XlPicker from 'taro-vue-picker';
Vue.component("xl-picker", XlPicker)
```


## 选择器数据格式

### 单选

常规数据

```javascript
list: [
  {
    label: '选项1',
    value: '1'
  },
  {
    label: '选项2',
    value: '2'
  }
]
```

扁平化简单数据

```javascript
list: ['选项1', '选项2']
```

### 多级联动

```javascript
list: [
  {
    label: '选项1',
    value: '1',
    children: [
      {
        label: '选项1-1',
        value: '1-1',
        children: [
          {
            label: '选项1-1-1',
            value: '1-1-1'
          }
        ]
      }
    ]
  }
]
```

### 非联动选择

常规数据

```javascript
list: [
  [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ],
  [
    { label: '选项11', value: '11' },
    { label: '选项22', value: '22' },
    { label: '选项33', value: '33' }
  ],
  [
    { label: '选项111', value: '111' },
    { label: '选项222', value: '222' },
    { label: '选项333', value: '333' }
  ]
]
```

扁平化简单数据

```javascript
list: [
  ['选项1', '选项2', '选项3'],
  ['选项11', '选项22', '选项33'],
  ['选项111', '选项222', '选项333']
]
```

## 调用显示选择器

通过`ref`形式手动调用`show`方法显示，隐藏同理调用`hide`

```text
<xl-picker ref="picker"></xl-picker>

this.$refs.picker.show() // 显示
this.$refs.picker.hide() // 隐藏
```

## 绑定值及设置默认值

支持 vue 中`v-model`写法绑定值，无需自己维护选中值的索引。

```javascript
<xl-picker v-model="value1"></xl-picker>
<xl-picker v-model="value2"></xl-picker>

data () {
  return {
    value1: '' // 单选
    value2: [] // 多列联动选择
  }
}
```

## 多个选择器

通过设置不同的`ref`，然后调用即可

```javascript
<xl-picker ref="picker1"></xl-picker>
<xl-picker ref="picker2"></xl-picker>

this.$refs.picker1.show() // picker1显示
this.$refs.picker2.show() // picker2显示
```

## 省市区选择

省市区选择是基于多列联动选择，数据源采用按需加载的方式渲染。  
也可使用自己已有的省市区数据，如果数据字段不一样，也可以自定义，参考下方自定义数据字段。

## 自定义数据字段

为了满足不同人的需求，插件支持自定义数据字段名称， 插件默认的数据字段如下形式：

```javascript
list: [
  {
    label: '选择1',
    value: 1,
    children: []
  },
  {
    label: '选择1',
    value: 1,
    children: []
  }
]
```

如果你的数据字段和上面不一样，如下形式：

```javascript
list: [
  {
    text: '选择1',
    id: 1,
    child: []
  },
  {
    text: '选择1',
    id: 1,
    child: []
  }
]
```

通过设置参数中的`props`即可，如下所示：

```javascript
<xl-picker :props="myProps"></xl-picker>

data () {
  return {
    myProps: {
      label: 'text',
      value: 'id',
      children: 'child'
    }
  }
}
```

## 插槽使用

选择器支持一些可自定义化的插槽，如选择器的取消和确定文字按钮，如果需要对其自定义处理的话，比如加个 icon 图标之类的，可使用插槽，使用方法如下：

```html
<xl-picker>
  <view slot="cancel-text">我是自定义取消</view>
  <view slot="confirm-text">我是自定义确定</view>
</xl-picker>
```

其他插槽见下。

## 参数及事件

### Props

| 参数                    | 说明                                                                                        | 类型                | 可选值                                                           | 默认值                                            |
| :---------------------- | :------------------------------------------------------------------------------------------ | :------------------ | :--------------------------------------------------------------- | :------------------------------------------------ |
| value/v-model           | 绑定值，联动选择为 Array 类型                                                               | String/Number/Array | -                                                                | -                                                 |
| mode                    | 选择器类型，支持单列，多列联动                                                              | String              | selector 单选/multiSelector 多级联动/unlinkedSelector 多级非联动 | selector                                          |
| list                    | 选择器数据(v1.0.7 单选及非联动多选支持扁平数据：['选项 1', '选项 2'])                       | Array               | -                                                                | -                                                 |
| level                   | 多列联动层级，仅 mode 为 multiSelector 有效                                                 | Number              | -                                                                | 2                                                 |
| props                   | 自定义数据字段                                                                              | Object              | -                                                                | {label:'label',value:'value',children:'children'} |
| cancel-text             | 取消文字                                                                                    | String              | -                                                                | 取消                                              |
| cancel-color            | 取消文字颜色                                                                                | String              | -                                                                | #999                                              |
| confirm-text            | 确定文字                                                                                    | String              | -                                                                | 确定                                              |
| confirm-color           | 确定文字颜色                                                                                | String              | -                                                                | #007aff                                           |
| empty-text              | 选择器列表为空的时候显示的文字                                                 | String              | -                                                                | 暂无数据                                          |
| empty-color             | 暂无数据文字颜色                                                               | String              | -                                                                | #999                                              |
| column-num              | 可视滚动区域内滚动个数，最好设置奇数值                                                      | Number              | -                                                                | 5                                                 |
| radius                  | 选择器顶部圆角，支持 rpx，如 radius="10rpx"                                                 | String              | -                                                                | -                                                 |
| loading                 | 选择器是否显示加载中，可使用 loading 插槽自定义加载效果                                     | Boolean             | -                                                                | -                                                 |
| mask-color              | 遮罩层颜色                                                                                  | String              | -                                                                | rgba(0, 0, 0, 0.4)                                |
| close-on-click-mask     | 点击遮罩层是否关闭选择器                                                                    | Boolean             | true/false                                                       | true                                              |
| dataset                 | 可以向组件中传递任意的自定义的数据，在`confirm`或`change`事件中可以取到        | Object              | -                                                                | -                                                 |
| show-header             | 是否显示选择器头部                                                             | Boolean             | -                                                                | - true                                            |
| inline                  | inline 模式，开启后默认显示选择器，无需点击弹出，可以配合`show-header`一起使用 | Boolean             | -                                                                | -                                                 |

### 方法

| 方法名 | 说明       | 参数 |
| :----- | :--------- | :--- |
| show   | 打开选择器 | -    |
| hide   | 关闭选择器 | -    |

### Events

| 事件名称 | 说明                                     | 回调参数                                                                                                                                                                                                                                                                                                                             |
| :------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show     | 选择器打开时触发                         | -                                                                                                                                                                                                                                                                                                                                    |
| hide     | 选择器隐藏时触发                         | -                                                                                                                                                                                                                                                                                                                                    |
| change   | 选择器滚动时触发，此时不会改变绑定的值   | `{ index, item, value, change }` `index`触发滚动后新的索引，单选时是具体的索引值，多列联动选择时为数组。`item`触发滚动后新的的完整内容，包括`label`、`value`等，单选时为对象，多列选择时为数组对象。`value`触发滚动后新的 value 值，单列选择时为具体值，多列联动选择时为数组。`change`触发事件的类型，详情参考下面的 change 事件备注 |
| confirm  | 点击选择器确定时触发，此时会改变绑定的值 | 同上`change`事件说明                                                                                                                                                                                                                                                                                                                 |
| cancel   | 点击选择器取消时触发                     | 同上`change`事件说明                                                                                                                                                                                                                                                                                                                 |

### `change` 事件备注

如果绑定的值是空的，`change`触发后里面的内容都是列表的第一项。  
`change`事件会在以下情况触发：

- 初始化
- 绑定值 value 变化
- 选择器 list 列表变化
- 滚动选择器

以上情况会在回调函数中都可以取到`change`变化的类型，对应上面的情况包括以下：

- `init`
- `value`
- `list`
- `scroll`

根据这些类型大家可以在`change`的时候按需处理自己的业务逻辑，比如一种常见的情况，有默认值的时候需要显示默认值的文字，此时可以`change`事件中判断`change`的类型是否是`init`，如果是的话可以取事件回调中的`item`进行显示绑定值对应的文字信息。

```javascript
handleChange (e) {
  if (e.change === 'init') {
    console.log(e.item.label) // 单选 选项1
    console.log(e.item.map(item => item.label).join('-')) // 多选 选项1-选项11
  }
}
```

### `confirm` 事件备注,在设置确定/取消按钮可见的情况下使用，使用此方法代替`change`事件来确定最终的选择项

如果绑定的值是空的，`confirm`触发后里面的内容都是列表的第一项。  
`confirm`事件会在以下情况触发：

- 绑定值 value 变化
- 选择器 list 列表变化

以上情况会在回调函数中都可以取到`change`变化的类型，对应上面的情况包括以下：

- `value`
- `list`

根据这些类型大家可以在`confirm`的时候按需处理自己的业务逻辑，比如一种常见的情况，有默认值的时候需要显示默认值的文字，此时可以`confirm`事件中判断`confirm`的类型是否是`init`，如果是的话可以取事件回调中的`item`进行显示绑定值对应的文字信息,在连击确认键的时候加入 debounce 防抖函数。

单选：

```javascript
handleConfirm :debounce( function (e){
  console.log(e.item.label) // 选项1
},500)
```

联动选择：

```javascript
handleConfirm :debounce( function (e){
  console.log(e.item.map(item => item.label).join('-')) // 选项1-选项11
},500)
```


### 插槽

| 插槽名        | 说明                |
| :------------ | :------------------ |
| cancel-text   | 选择器取消文字插槽  |
| action-center | 选择器顶部中间插槽  |
| confirm-text  | 选择器确定文字插槽  |
| loading       | 选择器 loading 插槽 |
| empty         | 选择器 空数据 插槽  |

### 选择器自定义样式

```css
<style lang="scss" scoped>
.xl-picker {
  .xl-picker-column-label {
    color: #ddd;
  }
}
</style>
```
