<template>
  <div class="container">
    <el-dialog
      title="评分系统"
      :visible.sync="dialogVisible"
      width="30%">
      <el-dialog
        width="30%"
        title="得分"
        :visible.sync="innerVisible"
        append-to-body
        >
        <div v-loading="loading">
          <span>您的得分是:{{score}}分</span>
        </div>
      </el-dialog>
      <div class='up-box'>
        <span>本系统将根据画作的准确度给出评分，以提高作画水平</span>
        <el-select v-model="value" placeholder="请选择作画类别">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-image
            :src="upLoadSrc"
            fit="fill"
          ></el-image>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadPic">上 传</el-button>
      </span>
    </el-dialog>
    <el-drawer
      title="画册"
      :visible.sync="drawer"
      direction="ttb"
      :before-close="handleClose"
      :destroy-on-close="true"
      :show-close="false">
      <div class="pic-container">
        <div class="img-box"
          v-for="(item, index) in picFile"
          :key="item.id"
        >
          <el-image
            :src="item.picUrl"
            fit="fill"
            @click="pickPic(item.picData, item.id)"
          ></el-image>
          <i class="el-icon-delete delete-img" @click="deleteLine(index)"></i>
        </div>
      </div>
    </el-drawer>
    <div class="option-container">
      <div class="option-box opation-save" @click="drawer = !drawer">
        <i class="el-icon-folder-opened"></i>
        <span>打开</span>
      </div>
      <div class="option-box opation-save" @click="savePic('file')">
        <i class="el-icon-folder-add"></i>
        <span>保存</span>
      </div>
      <div class="option-box opation-save" @click="savePic('locating')">
        <i class="el-icon-monitor"></i>
        <span>导出</span>
      </div>
      <div class="option-box opation-save" @click="savePic('upload');dialogVisible = true">
        <i class="el-icon-upload2"></i>
        <span>评分</span>
      </div>
    </div>
    <div class="option-container">
      <div class="option-box revoke-box" @click="revokeLine">
        <i class="el-icon-refresh-left"></i>
        <span>撤销</span>
      </div>
      <div class="option-box clear-box" @click="clearAllLine">
        <i class="el-icon-delete"></i>
        <span>清空</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'Optionbar',
  data () {
    return {
      drawer: false,
      visible: false,
      dialogVisible: false,
      options: ['上衣', '裤子', '套头衫', '连衣裙', '外套', '凉鞋', '衬衫', '运动鞋', '包', '短靴'],
      value: '',
      loading: false,
      innerVisible: false,
      score: ''
    }
  },
  computed: {
    ...mapState([
      'picFile',
      'lines',
      'upLoadSrc'
    ])
  },
  methods: {
    revokeLine () {
      this.$store.commit('revokeLine')
    },
    clearAllLine () {
      this.$store.commit('clearAll')
    },
    savePic (path) {
      if (this.lines.length === 0) {
        this.$message({
          message: '《皇帝的新画》暂不支持保存/导出',
          type: 'warning'
        })
        return
      }
      this.$root.event.$emit('savePic', path)
    },
    handleClose (done) {
      done()
    },
    pickPic (lines, id) {
      this.$store.commit('changeLine', [lines, id])
      this.drawer = false
    },
    deleteLine (index) {
      this.$store.commit('deleteLine', index)
    },
    async uploadPic () {
      if (this.value === '') {
        this.$message({
          message: '请先选择作画类别再上传',
          type: 'warning'
        })
        return
      }
      this.loading = true
      this.innerVisible = true
      const response = await axios.post('/login', {
        className: this.value,
        picUrl: this.upLoadSrc
      })
      this.score = response.data.score
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pic-container {
    display: flex;
    flex-wrap: wrap;
    .img-box {
      position: relative;
      width: 20%;
      margin-left: 4%;
      margin-bottom: 2%;
      transition: all 0.5s ease-in-out;
      &:hover {
        .delete-img {
          opacity: 1;
        }
      }
      .el-image {
        border: 2px solid #A8A8A8;
        border-radius: 8px;
        box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
        cursor: pointer;
      }
      .delete-img {
        opacity: 0;
        position: absolute;
        top: 0px;
        right: 0px;
        margin: 3px;
        font-size: 30px;
        color: #A8A8A8;
        cursor: pointer;
        transition: opacity 0.5s ease-in-out;
        &:hover {
          color: #ff4500;
          transition: color 0.2s ease-in-out;
        }
      }
    }
  }
  .option-box {
    cursor: pointer;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    &:hover {
      background-color: #C5C7CC;
    }
    i {
      font-size: 20px;
      padding-right: 10px;
    }
    span {
      font-size: 18px;
      // padding-bottom: 4px;
    }
  }
  .option-container {
    height: 100%;
    display: flex;
  }
}
.up-box {
  font-family: 'Arial';
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-image {
    border: 2px solid #A8A8A8;
    border-radius: 8px;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
  }
}

</style>
