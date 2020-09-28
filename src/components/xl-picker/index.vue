<template>
  <view :class="['xl-picker', inline ? 'xl-picker-inline' : '']">
    <view
      v-if="visible && !inline"
      class="xl-picker-mask"
      :style="{ 'background-color': maskColor }"
      @tap.stop="handleMaskTap"
      @touchmove.stop.prevent="moveHandle"
    />
    <view
      :class="['xl-picker-container', visible ? 'xl-picker-toggle' : '']"
      :style="{ borderRadius: `${radius} ${radius} 0 0` }"
    >
      <view
        v-if="showHeader"
        class="xl-picker-header"
        :style="{
          height: pickerHeaderHeight,
          'line-height': pickerHeaderHeight
        }"
      >
        <view class="xl-picker-action xl-picker-left">
          <view
            class="xl-picker-action-cancel"
            @tap.stop="handleCancel"
          >
            <slot
              v-if="$slots['cancel-text']"
              name="cancel-text"
            />
            <view
              v-else
              class="action-cancel-text"
              :style="{ color: cancelColor }"
            >
              {{ cancelText }}
            </view>
          </view>
        </view>

        <view
          v-if="$slots['action-center']"
          class="xl-picker-action xl-picker-center"
        >
          <slot name="action-center" />
        </view>

        <view class="xl-picker-action xl-picker-right">
          <view
            class="xl-picker-action-confirm"
            @tap.stop="handleConfirm"
          >
            <slot
              v-if="$slots['confirm-text']"
              name="confirm-text"
            />
            <view
              v-else
              class="action-confirm-text"
              :style="{ color: confirmColor }"
            >
              {{ confirmText }}
            </view>
          </view>
        </view>
      </view>
      <view
        class="xl-picker-content"
        :style="{ height: pickerContentHeight }"
      >
        <!-- loading -->
        <view
          v-if="loading"
          class="xl-picker-loading"
        >
          <slot name="loading">
            <view class="xl-picker-loading-img" />
          </slot>
        </view>

        <!-- 暂无数据 -->
        <view
          v-if="isEmpty && !loading"
          class="xl-picker-empty"
        >
          <slot name="empty">
            <text
              class="xl-picker-empty-text"
              :style="{ color: emptyColor }"
            >
              {{ emptyText }}
            </text>
          </slot>
        </view>

        <!-- 单选 -->
        <selector-picker
          v-if="mode === 'selector' && !loading && !isEmpty"
          :value="value"
          :list="list"
          :props="pickerProps"
          :height="pickerContentHeight"
          :inline="inline"
          @change="handleChange"
        />

        <!-- 多列联动 -->
        <multi-selector-picker
          v-if="mode === 'multiSelector' && !loading && !isEmpty"
          :value="value"
          :list="list"
          :level="level"
          :visible="visible"
          :props="pickerProps"
          :height="pickerContentHeight"
          :inline="inline"
          @change="handleChange"
        />

        <!-- 非联动选择 -->
        <unlinked-selector-picker
          v-if="mode === 'unlinkedSelector' && !loading && !isEmpty"
          :value="value"
          :list="list"
          :visible="visible"
          :props="pickerProps"
          :height="pickerContentHeight"
          :inline="inline"
          @change="handleChange"
        />
      </view>
    </view>
  </view>
</template>

<script>
const defaultProps = {
  label: 'label',
  value: 'value',
  children: 'children'
}
import { getIndicatorHeight } from './utils'
import SelectorPicker from './pickers/selector-picker'
import MultiSelectorPicker from './pickers/multi-selector-picker'
import UnlinkedSelectorPicker from './pickers/unlinked-selector-picker'
import { debounce } from './utils'

const indicatorHeight = getIndicatorHeight()
export default {
  components: {
    SelectorPicker,
    MultiSelectorPicker,
    UnlinkedSelectorPicker
  },
  props: {
     value:{
      type: [Number,String,Array],
      default: ''
    },
    list:{
      type: Array,
      default: Array
    },
    mode: {
      type: String,
      default: 'selector'
    },
    level: {
      type: Number,
      default: 1
    },
     props: {
      type: Object,
      default:Object
    },
    cancelText: {
      type: String,
      default: '取消'
    },
     cancelColor: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    confirmColor: {
      type: String,
      default: ''
    },
    canHide: {
      type: Boolean,
      default: true
    },
    emptyColor: {
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    radius: {
      type: String,
      default: ''
    },
    columnNum: {
      type: Number,
      default: 5
    },
    loading: Boolean,
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    maskColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    dataset: {
      type: Object,
      default: Object
    },
    inline: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      myValue: this.value,
      picker: {},
      pickerProps: Object.assign({}, defaultProps, this.props),
      pickerHeaderHeight: indicatorHeight + 'px',
      pickerContentHeight: indicatorHeight * this.columnNum + 'px'
    }
  },
  computed: {
    isEmpty() {
      if (!this.list) return true
      if (this.list && !this.list.length) return true
      return false
    }
  },
  watch: {
    value(newVal) {
      this.myValue = newVal
    },
    myValue(newVal) {
      this.$emit('input', newVal)
    },
    visible(newVisible) {
      if (newVisible) {
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  },
  methods: {
    show() {
      if (this.inline) return
      this.visible = true
    },
    hide() {
      if (this.inline) return
      this.visible = false
    },
    handleCancel() {
      this.$emit('cancel', this.picker)
      if (this.canHide && !this.inline) {
        this.hide()
      }
    },
    handleConfirm: debounce( function () {
        if (this.isEmpty) {
            this.$emit('confirm', null)
            this.hide()
          } else {
            const picker = JSON.parse(JSON.stringify(this.picker))
            this.myValue = picker.value
            this.$emit('confirm', this.picker)
            if (this.canHide) this.hide()
          }
    },500) ,
    handleChange({ value, item, index, change }) {
      this.picker.value = value
      this.picker.item = item
      this.picker.index = index
      this.picker.change = change
      this.picker.dataset = this.dataset || {}
      this.$emit('change', this.picker)
    },
    handleMaskTap() {
      if (this.closeOnClickMask) {
        this.visible = false
      }
    },
    moveHandle() { }
  }
}
</script>

<style>
@import "./style/picker.css";
</style>
