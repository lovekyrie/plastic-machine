<template>
  <div class="container">
    <div class="msgDetail" v-show="showDetail">
      <div>
        <i class="el-icon-close" @click="showDetail = false"></i>
        <h3>{{ info.title }}</h3>
        <p>{{ info.publishDate }}</p>
        <div v-html="info.content"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center">
          消息中心
          <!-- 下拉图标 -->
        </p>
      </div>
    </div>
    <div class="main">
      <div class="right">
        <ul>
          <li v-for="item in list" :key="item.id" @click="toDetail(item.id)">
            <span></span>
            <p>{{ item.title }}</p>
            {{ item.publishDate }}
          </li>
        </ul>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
export default {
  data() {
    return {
      backArrow,
      showDetail:false,
      classify:[],
      list:[],
      pageNo:1,
      pageSize:10,
      total:0,
      info:{}
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    back() {
      window.history.back()
    },
    getList(){
      let qry = new this.Query();
      qry.buildPageClause(this.pageNo, this.pageSize);
      this.api.msgList(qry.getParam()).then(res=>{
        this.list = res.data.list
        this.list.forEach(item=>{
          item.publishDate = item.publishDate ? item.publishDate.split(' ')[0] : ''
        })
        this.total = res.page.total
      })
    },
    toDetail(id){
      this.api.msgDetail(id).then(res=>{
        this.info = res
        this.showDetail = true
      })
    },
    handleCurrentChange(e){
      this.pageNo = e
      this.getList()
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
html,
body {
  height: 100%;
  background-color: #fff;
}

.container {
  position: relative;
  width: 100%;
}

.row > .header {
  position: relative;
  background-color: #00338d;
  color: #fff;
}

.row .arrow-left {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
}

.row p {
  font-size: 18px;
  margin: 16px 0;
}
.main {
  display: flex;
  display: -webkit-flex;
  .left {
    width: 20%;
    background: #f8f8f8;
  }
  .right {
    flex: 1;
    ul {
      padding-bottom: 20px;
    }
    ul li {
      display: flex;
      display: -webkit-flex;
      color: #999999;
      border-bottom: 1px solid #d4d4d4;
      height: 80px;
      align-items: center;
      cursor: pointer;
      span {
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 100%;
        background: #999;
        margin: 0 20px;
      }
      p {
        flex: 1;
        color: #333333;
        margin: 0;
      }
    }
  }
}
.msgDetail {
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  display: -webkit-flex;
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  > div {
    width: 50%;
    height: 70%;
    margin: auto;
    border-radius: 10px;
    background: #ffffff;
    padding: 30px 40px;
    position: relative;
    i {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
    }
    > p {
      text-align: center;
      padding: 10px;
      color: #999;
    }
  }
  h3 {
    text-align: center;
  }
}
</style>
