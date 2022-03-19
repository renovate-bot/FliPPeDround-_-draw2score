<template>
  <div class="container">
    <penPicker />
    <widthPicker />
    <colorPicker />
  </div>
</template>

<script>
import colorPicker from './toolBar/colorPicker.vue'
import widthPicker from './toolBar/widthPicker.vue'
import penPicker from './toolBar/penPicker.vue'
export default {
  name: 'Toolbar',
  components: {
    colorPicker,
    widthPicker,
    penPicker
  },
  data () {
    return {
    }
  },
  methods: {
    ctrlZ () {
      this.$store.commit('ctrlZ')
    },
    clearAll () {
      this.$store.commit('clearAll')
    },
    rubber () {
      this.$store.commit('drawType', 'line')
      this.$store.commit('changeStroke', '#FFF')
      this.$store.commit('changeStrokeWidth', 20)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
}
</style>
