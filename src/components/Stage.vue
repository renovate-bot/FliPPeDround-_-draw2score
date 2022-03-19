<template>
  <div class="container" ref="wrapper">
    <v-stage
      ref="stage"
      :config="stageConfig"
      @mousedown="mousedownHandler"
      @mousemove="mousemoveHandler"
      @mouseup="mouseupHandler"
      @mouseleave="mouseupHandler"
    >
      <v-layer
        @mouseenter="enterCanvasHandler"
        @mousemove="moveCanvasHandler"
        @mouseleave="leaveCanvasHandler"
      >
        <v-rect :config="rectConfig" />
        <v-line v-for="(line, lineIndex) in lines" :key="lineIndex" :config="line" />
        <v-circle :config="mouseStyle" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Stage',
  data () {
    return {
      stageConfig: {
        width: 1600,
        height: 700,
        stroke: '#000'
      },
      painting: false,
      rectConfig: {
        x: 0,
        y: 0,
        width: '',
        height: '',
        fill: '#fff',
        opacity: 0.5,
        cornerRadius: [8, 8, 8, 8]
      },
      circleConfig: {
        x: 100,
        y: 100,
        radius: 10,
        stroke: 'red',
        strokeWidth: 0.3
      },
      score: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState([
      'lines',
      'mouseStyle',
      'penType'
    ])
  },
  created () {
    this.$root.event.$on('savePic', (path) => {
      if (path === 'locating') {
        this._savePictoLocation()
      } else if (path === 'file') {
        this._savePictoFile()
      } else {
        this._upLoad()
      }
    })
  },
  mounted () {
    this.stageConfig.width = this.rectConfig.width = this.$refs.wrapper.clientWidth
    this.stageConfig.height = this.rectConfig.height = this.$refs.wrapper.clientHeight
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.stageConfig.width = this.rectConfig.width = this.$refs.wrapper.clientWidth
        this.stageConfig.height = this.rectConfig.height = this.$refs.wrapper.clientHeight
      })
    })
  },
  methods: {
    mousedownHandler (e) {
      this.painting = true
      const newLinePoint = [e.evt.layerX, e.evt.layerY]
      this.$store.commit('drawNewLine', newLinePoint)
    },
    mousemoveHandler (e) {
      if (this.painting) {
        const lastLinePoint = this.lines[this.lines.length - 1].points.concat([e.evt.layerX, e.evt.layerY])
        this.$store.commit('updataNewLine', lastLinePoint)
      }
    },
    mouseupHandler (e) {
      this.painting = false
      this.$store.commit('localStorageLine')
    },
    _savePictoLocation () {
      this.rectConfig.opacity = 1
      setTimeout(() => {
        const eleLink = document.createElement('a')
        eleLink.download = new Date().toString()
        eleLink.style.display = 'none'
        eleLink.href = this.$refs.stage.getNode().toDataURL()
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
        this.rectConfig.opacity = 0.5
      }, 0)
    },
    _savePictoFile () {
      this.$store.commit('savePictoFile', this.$refs.stage.getNode().toDataURL())
      this.$message({
        message: '成功保存到画册，可点击“打开”查看',
        type: 'success'
      })
    },
    _upLoad () {
      this.$store.commit('upLoadPic', this.$refs.stage.getNode().toDataURL())
    },
    enterCanvasHandler (e) {
      const mousePoint = [e.evt.layerX, e.evt.layerY]
      this.$store.commit('drawMouseStyle', mousePoint)
    },
    moveCanvasHandler (e) {
      this.$store.commit('updataMousePoint', [e.evt.layerX, e.evt.layerY])
    },
    leaveCanvasHandler (e) {
      this.$store.commit('clearMouseStyle')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    height: 100%;
  }
</style>
