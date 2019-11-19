<template>
  <div class="app">
    <div class="content">
      <!-- 左侧选项 -->
      <div class="left">
        <el-select v-model="proId" placeholder="请选择" @change="choosePro" class="proList">
          <el-option
                  v-for="item in proList"
                  :key="item.id"
                  :label="item.modelName"
                  :value="item.id">
          </el-option>
        </el-select>
        <!--<div class="img">-->
          <!--<img :src="maint" alt />-->
        <!--</div>-->
        <!-- 注塑机维护 -->
        <div class="maintain">
          <!--<p>5个要点维护、5个定期检查</p>-->
          <div
            class="inspect-type"
            v-for="(item, index) in typeList"
            :class="{ active: id === item.id }"
            @click="id = item.id"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 维护 -->
        <div class="maintain-right">
          <div class="title">
            <div
              v-for="(item, index) in introduceList"
              :key="index"
              :class="{ active: contentId === item.id }"
              @click="chooseTab(item.id)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="concept" v-html="info.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import maint from "../views/images/maint.png";
export default {
  data() {
    return {
      maint,
      introduceList: ["每日", "每周", "每月", "每季", "每年"],
      typeList: ["定期检查", "要点维护"],
      id: "",
      contentId: "",
      proList:[],
      proId:'',
      info: {}
    };
  },
  watch: {
    id: function() {
      this.getTypeList2();
    },
    contentId: function() {
      this.getInfo();
    }
  },
  mounted(){
    this.getProList()
  },
  methods: {
    async getTypeList(cd) {
      let query = new this.Query();
      query.buildWhereClause("typeCd", cd, "LK");
      this.typeList = await this.api.operAndMainLeftList(query.getParam());
      if (this.typeList.length > 0) {
        this.id = this.typeList[0].id;
      }
    },
    async getTypeList2() {
      let query = new this.Query();
      query.buildWhereClause("trainTypeOneId", this.id, "LK");
      this.introduceList = await this.api.operAndMainLeftList2(
        query.getParam()
      );
      this.contentId = this.introduceList[0].id;
    },
    async getProList(){
      this.proList = await this.api.operAndMainLeftProList();
      this.proId = this.proList[0].id
    },
    chooseTab(id){
      this.contentId = id
      // this.getInfo()
    },
    async getInfo() {
      this.info = await this.api.operAndMainDetail({
        trainTypeTwoId:this.contentId,
        mtMachineTypeId:this.proId
      })
    },
    choosePro(){
      this.getInfo()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url("../styles/main.less");
.content {
  display: -webkit-flex;
  display: flex;
  width: 1440px;
  margin: 60px auto;
  height: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.left {
  width: 260px;
  background-color: #fff;
  text-align: center;
  .proList{
    padding-bottom: 20px;
    width: 100%;
  }
  .img {
    border: 1px solid #ccc;
  }
  .inspect-type {
    padding: 20px 0;
    background-color: #fafafa;
    color: #8c8c8c;
  }
  .active {
    background-color: @themeColor;
    color: #000;
  }
}
.right {
  width: 70%;

  .maintain-right {
    .title {
      width: 100%;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      background-color: #f2f5f9;
      > div {
        margin: 0 30px;
        padding: 15px 0;
        flex: 6;
        text-align: center;
      }
      > .active {
        border-bottom: 1px solid #4e72b0;
        color: #4e72b0;
      }
    }
    .concept {
      margin: 50px 150px 0 40px;
      line-height: 30px;
      > p {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
  .repair-right {
    display: -webkit-flex;
    display: flex;
    flex-flow: column wrap;
    > div {
      flex: 1;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      align-items: center;

      &:nth-of-type(2n) {
        background-color: #f7f9fb;
      }
      &:nth-of-type(2n + 1) {
        background-color: #edf1f7;
      }
      &:nth-of-type(1) {
        background-color: #00338d;
        color: #fff;
      }
      > div {
        padding: 5px 0;
        &:nth-of-type(1) {
          width: 10%;
          text-align: center;
        }
        &:nth-of-type(2) {
          width: 20%;
        }
        &:nth-of-type(3) {
          width: 30%;
        }
        &:nth-last-of-type(1) {
          width: 40%;
        }
      }
    }
  }
}
</style>
