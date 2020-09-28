<template>
  <view class="index">
    <view class="info bottom">
      <view>
        多级联动选择器demo
      </view>
      <xl-picker
        ref="picker"
        v-model="value"
        class="picker"
        mode="multiSelector"
        :level="3"
        :list="datas"
        :radius="'24rpx'"
        :cancel-color="'#909399'"
        :confirm-color="'#F12E40'"
        @confirm="handleConfirm"
      />
    </view>
    <view
      class="info bottom  picker-arrow"
      @tap="handleTap('picker')"
    >
      {{ name }}
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      datas: [
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
        },
        {
          label: '选项2',
          value: '2',
          children: [
            {
              label: '选项2-2',
              value: '2-2',
              children: [
                {
                  label: '选项2-2-2',
                  value: '2-2-2'
                }
              ]
            }
          ]
        }
      ],
      name: '选项1,选项1-1,选项1-1-1',
      value:[]
    }
  },
  methods: {
    handleTap(name) {
      this
        .$refs[name]
        .show()
    },
    handleConfirm(obj,e) {
      this.value = [obj.value[0],obj.value[1],obj.value[2]];
      this.name = `${obj.item[0].label},${obj.item[1].label},${obj.item[2].label}`
      this.handleTap('picker')
    }
  }
}
</script>

<style>
.picker-arrow::after{
  content: '';
  position: absolute;
  color: #909399;
  width: 15rpx;
  margin: auto;
  border-top: 2rpx solid #909399;
  border-right: 2rpx solid #909399;
  transform: rotate(45deg);
  height: 15rpx;
  right: 37rpx;
}
.info {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 38rpx;
  padding-top: 60rpx;
  padding-bottom: 60rpx;
  letter-spacing: 0.32rpx;
  margin: 0 36rpx;
}
.info.bottom {
  border-bottom: 1px solid #ebeef5;
}
.info .picker {
  flex: 1;
  position: relative;
}
.info .label {
  display: inline-block;
  width: 45%;
  color: #303133;
  font-size: 32rpx;
  font-weight: 400;
  font-family: PingFangSC-Regular;
}
.info .mess {
  float: right;
  position: relative;
  width: 50%;
  padding-right: 40rpx;
  text-align:right;
}
.info picker .picker {
  line-height: 100rpx;
  font-size: 28rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: right;
}
.index{
  padding-bottom: 108px;
  background: #fff;
}
</style>
