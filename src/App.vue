<template>
  <el-container>
    <el-container>
      <el-header><Optionbar/></el-header>
      <el-main><Stage/></el-main>
    </el-container>
    <el-aside width="250px"><Toolbar/>
    </el-aside>
  </el-container>
</template>

<script>
import Stage from './components/Stage.vue'
import Toolbar from './components/Toolbar.vue'
import Optionbar from './components/Optionbar.vue'

export default {
  name: 'Home',
  components: {
    Stage,
    Toolbar,
    Optionbar
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('lines'))) {
      this.$store.state.lines = JSON.parse(localStorage.getItem('lines'))
    }
    if (JSON.parse(localStorage.getItem('picFile'))) {
      this.$store.state.picFile = JSON.parse(localStorage.getItem('picFile'))
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(http://api.btstu.cn/sjbz/?lx=dongman);
  background-size:100% 100%;
  & > .el-container {
    height: 90%;
    margin: 4%;
    border-radius: 8px !important;
    user-select: none;
    .el-header {
      font-family: 'webfont';
      background-image: linear-gradient(to right, rgba(222, 224, 225, .95) , rgba(240, 242, 243, 0.93));
      color: #1C1C47;
      text-align: center;
      padding: 0 10px !important;
      border-top-left-radius: 8px !important;
    }
    .el-aside {
      font-family: 'webfont';
      background-color: rgba(240, 242, 243, .93);
      color: #32325D;
      font-weight: 600;
      text-align: center;
      border-top-right-radius: 8px !important;
      border-bottom-right-radius: 8px !important;
    }
    .el-main {
      background-image: linear-gradient(to right, rgba(222, 224, 225, .95), rgba(240, 242, 243, 0.93));
      padding: 0 10px 10px 10px !important;
      overflow: hidden;
      border-bottom-left-radius: 8px !important;
    }
  }
}

.el-slider__button {
  background-color: #F0F2F3 !important;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.1),
            -2px -2px 10px rgba(255,255,255,1);
}
.el-drawer__body {
  &::-webkit-scrollbar{
    width: 8px;
  }

  &::-webkit-scrollbar-track{
    background: #FFFFFF;
  }

  &::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background: #A8A8A8;
  }
}
</style>
