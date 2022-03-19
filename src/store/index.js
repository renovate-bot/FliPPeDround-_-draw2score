import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    penType: '',
    stroke: '#ff4500',
    strokeWidth: 5,
    lines: [],
    mouseStyle: {},
    picFile: [],
    upLoadSrc: ''
  },
  mutations: {
    changePenType (state, type) {
      state.penType = type
      localStorage.setItem('typeName', JSON.stringify(type))
    },
    changeLine (state, [lines, id]) {
      state.lines = JSON.parse(JSON.stringify(lines))
      state.lines.id = id
    },
    deleteLine (state, index) {
      if (state.picFile[index].id === state.lines.id) {
        state.lines.id = undefined
      }
      state.picFile.splice(index, 1)
      localStorage.setItem('picFile', JSON.stringify(state.picFile))
    },
    drawNewLine (state, newLinePoint) {
      const newLine = {
        stroke: state.stroke,
        strokeWidth: state.strokeWidth,
        points: newLinePoint,
        lineCap: 'square',
        lineJoin: 'bevel'
      }
      switch (state.penType) {
        case '马克笔':
          newLine.lineCap = 'round'
          newLine.lineJoin = 'round'
          break
        case '橡皮檫':
          newLine.stroke = '#fff'
          newLine.lineCap = 'round'
          newLine.opacity = 0.5
          break
      }
      state.lines.push(newLine)
    },
    updataNewLine (state, lastLinePoint) {
      const line = state.lines[state.lines.length - 1]
      line.points = lastLinePoint
    },
    localStorageLine (state) {
      localStorage.setItem('lines', JSON.stringify(state.lines))
    },
    drawMouseStyle (state, mousePoint) {
      state.mouseStyle = {
        stroke: state.stroke,
        strokeWidth: 0.9,
        x: mousePoint[0],
        y: mousePoint[1],
        radius: (state.strokeWidth + 0.5) / 2
      }
    },
    updataMousePoint (state, newMousePoint) {
      [state.mouseStyle.x, state.mouseStyle.y] = newMousePoint
    },
    clearMouseStyle (state) {
      state.mouseStyle = {}
    },
    revokeLine (state) {
      state.lines.pop()
      localStorage.setItem('lines', JSON.stringify(state.lines))
    },
    clearAll (state) {
      state.lines = []
      localStorage.setItem('lines', JSON.stringify(state.lines))
    },
    changeStroke (state, newStroke) {
      state.stroke = newStroke
    },
    changeStrokeWidth (state, newStrokeWidth) {
      state.strokeWidth = newStrokeWidth
      localStorage.setItem('strokeWidth', JSON.stringify(newStrokeWidth))
    },
    savePictoFile (state, newPicUrl) {
      if (!state.lines.id) {
        state.picFile.push({
          picUrl: newPicUrl,
          picData: JSON.parse(JSON.stringify(state.lines)),
          id: new Date().toString()
        })
      } else {
        state.picFile.map((item, index) => {
          if (state.lines.id === item.id) {
            const newPicFile = {
              picUrl: newPicUrl,
              picData: JSON.parse(JSON.stringify(state.lines)),
              id: item.id
            }
            state.picFile.splice(index, 1, newPicFile)
          }
        })
      }
      localStorage.setItem('picFile', JSON.stringify(state.picFile))
    },
    upLoadPic (state, uploadPic) {
      state.upLoadSrc = uploadPic
    }
  },
  actions: {
  },
  modules: {
  }
})
