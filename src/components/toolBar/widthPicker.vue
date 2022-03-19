<template>
  <div class="width-picker">
    <p>粗细</p>
    <div class="slider-box">
      <el-slider
        v-model="strokeWidth"
        :max="49"
        :min="1"
        :step="2"
        :format-tooltip="formatTooltip"
        @input='changeStrokeWidth'
        style="width: 95%">
      </el-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'widthPicker',
  data () {
    return {
      strokeWidth: 5
    }
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('strokeWidth'))) {
      this.strokeWidth = JSON.parse(localStorage.getItem('strokeWidth'))
    }
  },
  methods: {
    changeStrokeWidth (value) {
      this.$store.commit('changeStrokeWidth', value)
    },
    formatTooltip (value) {
      return value / 2 + 0.5
    }
  }
}
</script>

<style lang="scss" scoped>
.width-picker {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 18px;
    align-self: flex-start;
    cursor: default;
  }
  .slider-box {
    display: flex;
    width: 95%;
    // justify-content: center;
    .el-slider__button {
      width: 6px;
      height: 6px;
      border: 4px solid #F1F6FA;
      background-color: #409EFF;
      border-radius: 150px;
      box-shadow: 2px 2px 4px #b0b4b7,
                -2px -2px 4px #ffffff;
    }
  }
}
</style>
