<template>
  <div class="color-picker">
    <div class="color-titile">
      <p class="demonstration">取色板</p>
      <el-color-picker
        v-model="stroke"
        show-alpha
        color-format="colorPicker"
        :predefine="predefineColors"
        size="medium"
        @change="changeStroke"
        @active-change="changeStroke"
      ></el-color-picker>
    </div>
    <div class="color-container">
      <div class="color-box"
        v-for="(color, index) in predefineColors" :key="index"
        @click="changeStroke(color)"
        :style="{backgroundColor: color}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'colorPicker',
  data () {
    return {
      stroke: '#ff4500',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#000000'
      ]
    }
  },
  methods: {
    changeStroke (val) {
      this.stroke = val
      this.$store.commit('changeStroke', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-picker {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .color-titile {
    display: flex;
    align-self: flex-start;
    align-items: center;
    p {
      font-size: 18px;
      margin-right: 5px;
    }
  }
  .color-container {
    width: 95%;
    display: flex;
    justify-content: space-between;
    .color-box {
      margin: 2px;
      cursor: pointer;
      width: 100%;
      height: 60px;
      box-shadow: 5px 5px 5px rgba(0,0,0,0.1),
                  -5px -5px 5px rgba(255,255,255,.7);
      border-radius: 18px;
      display: flex;
      background-color: #efeeee;
      transition: box-shadow 0.2s ease-out;
      &:hover {
        box-shadow: 0px 0px 0px rgba(0,0,0,0.1),
                    0px 0px 0px rgba(255,255,255,.7),
                    inset 2px 2px 4px rgba(0,0,0,0.1),
                    inset -2px -2px 4px rgba(255,255,255,1);
        transition: box-shadow 0.2s ease-out;
      }
    }
  }
}
</style>
