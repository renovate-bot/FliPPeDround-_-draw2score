<template>
  <div class="pen-picker">
    <p class="type-name">{{typeName}}</p>
    <div class="pen-container">
      <div class="pen-box"
        v-for="(icon, index) in icons" :key="index"
        @click="changePenType(icon.typeName)">
        <svg class="icon-svg"
          aria-hidden="true"
          >
          <use :xlink:href="icon.className"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PenPicker',
  data () {
    return {
      icons: [
        {
          className: '#icon-svg-gangbi',
          typeName: '钢笔'
        },
        {
          className: '#icon-svg-jihaobi',
          typeName: '马克笔'
        },
        {
          className: '#icon-svg-xiangpi',
          typeName: '橡皮檫'
        }
      ],
      typeName: '钢笔'
    }
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('typeName'))) {
      this.typeName = JSON.parse(localStorage.getItem('typeName'))
      this.$store.commit('changePenType', this.typeName)
    }
  },
  methods: {
    changePenType (name) {
      this.typeName = name
      this.$store.commit('changePenType', name)
    }
  }
}
</script>

<style lang='scss' score>
.pen-picker {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1872BC;
  font-size: 24px;
  p {
    align-self: flex-start;
    cursor: default;
  }
  .pen-container {
    width: 95%;
    display: flex;
    justify-content: space-between;
    .pen-box {
      cursor: pointer;
      width: 60px;
      height: 60px;
      box-shadow: 5px 5px 40px rgba(0,0,0,0.1),
                  -5px -5px 40px rgba(255,255,255,1);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(240, 242, 243, 0.7);
      transition: box-shadow 0.2s ease-out;
      position: relative;
      .icon-svg {
        margin: 10px;
        width: 40px;
        height: 40px;
        transition: all 0.2s ease-out;
      }
      &:hover {
        box-shadow: 0px 0px 0px rgba(0,0,0,0.1),
                    0px 0px 0px rgba(255,255,255,1),
                    inset 10px 10px 40px rgba(0,0,0,0.1),
                    inset -10px -10px 40px rgba(255,255,255,1);
        transition: box-shadow 0.2s ease-out;
        & .icon-svg {
          width: 35px;
          height: 35px;
          transition: all 0.2s ease-out;
        }
      }
    }
  }
}
</style>
