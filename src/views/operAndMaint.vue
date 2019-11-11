<template>
  <div id="container">
    <div class="row" ref="scroll">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center" @click="showOption">
          <span>{{ operate }}</span>
          <!-- 下拉图标 -->
          <img class="arrow-side" :src="pullDown" />
        </p>
        <div type="false" class="ul-style" v-if="showType">
          <li
            v-for="(item, index) in operateList"
            :key="index"
            @click="chooseOperate(item)"
          >
            {{ item.nm }}
          </li>
        </div>
      </div>
    </div>
    <div class="row">
      <maintain v-show="currentCd" ref="maintain"></maintain>
      <!--<debug v-show="operate === '注塑机调试'"></debug>-->
      <factory v-show="operate === '厂房规划'"></factory>
      <water-pipe v-show="operate === '冷却水管'"></water-pipe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import pullDown from "./images/标签栏下拉箭头.png";
import maint from "./images/maint.png";
//import debug from "../components/debugging"
import factory from "../components/factory"
import maintain from "../components/maintain"
//import repair from "../components/repair"
import waterPipe from "../components/waterPipe"
export default {
  data() {
    return {
      backArrow,
      pullDown,
      maint,
      showType: false,
      operateList: ["注塑机调试", "注塑机维护", "注塑机维修","厂房规划","冷却水管"],
      operate: "注塑机调试",
      currentCd:''
    };
  },
  components:{
    // debug,
    factory,
    maintain,
    //repair,
    waterPipe
  },
  watch:{
    currentCd:function(e) {
        this.$refs.maintain.getTypeList(e)
    }
  },
  methods: {
    async getOperateList(){
      this.operateList = await this.api.operAndMainTopList({cd:'OPS'})
      let list = [{nm:'冷却水管',cd:''},{nm:'厂房规划',cd:''}]
      this.operateList.push(...list)
      this.operate = this.operateList[0].nm
      this.currentCd = this.operateList[0].cd
    },
    back() {
      window.history.back();
    },
    chooseTab(index) {
      this.selectTab = index;
    },
    showOption() {
      this.showType = !this.showType;
    },
    selectRepairTypeOp(i) {
      this.selectRepairType = i;
      //查找子项
      let filter = this.options.filter((item, index) => index === i);
      this.optionChilds = filter[0].children;
      this.showRepairChild = true;
    },
    selectRepairChildOp(index) {
      this.selectRepairChild = index;
      this.showRepairChild = false;
    },
    chooseOperate(item) {
      this.operate = item.nm;
      this.currentCd = item.cd
      this.showType = false;
      if (item === "注塑机维修") {
        this.showRepair = true;
        this.showMaintain = false;
        this.showDebugger = false;
      } else if (item === "注塑机维护") {
        this.showMaintain = true;
        this.showRepair = false;
        this.showDebugger = false;
      } else {
        this.showDebugger = true;
        this.showRepair = false;
        this.showMaintain = false;
      }
    },
    scrollLoad() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop } = this.$refs.scroll;
        if (scrollTop > 100) {
          this.activeStep++;
        }
      }, 100);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollLoad, true);
    this.getOperateList()
  },

};
</script>
<style lang="less">
@import url("../styles/main.less");
.row > .header {
  position: relative;
  background-color: @headerColor;
  color: #fff;
}

.row .arrow-left {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
}

.row .arrow-side {
  display: inline-block;
  margin-left: 3%;
}

.text-center {
  font-size: 18px;
}

.text-center > span {
  display: inline-block;
  /*width: 5%;*/
}
</style>
<style lang="less" scoped>
html,
body {
  background-color: #fff;
}
#container {
  padding: 0 15px;
  width: 100%;
  background-color: #fff;
}

.header {
  > .ul-style {
    color: #00338d;
    display: -webkit-flex;
    display: flex;
    display: block;
    width: 15%;
    z-index: 12;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 43%;
    border: 1px solid #d2d2d2;
    background-color: #00338d;
    box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
    > li {
      width: 100%;
      /* background-color: #00338D; */
      background-color: #fff;
      padding: 8px 0 8px 6%;
      &:hover {
        background-color: #00338d;
        color: #fff;
      }
    }
  }
}

.row {
  p {
    margin: 18px 0;
  }
  .content {
    display: -webkit-flex;
    display: flex;
    width: 1440px;
    margin: 60px auto;
    height: 100%;
    flex-flow: row nowrap;
    justify-content: space-between;
    .left {
      width: 260px;
      background-color: #fff;
      text-align: center;
      .img {
        border: 1px solid #ccc;
      }
      .inspect-type {
        padding: 20px 0;
        background-color: #fafafa;
        color: #8c8c8c;
      }
      .active {
        background-color: #00338d;
        color: #fff;
      }
    }

    .repair {
      margin-top: 60px;
      position: relative;
      .inspect-type {
        text-align: left;
        padding-left: 40px;
        i {
          margin-left: 100px;
        }
      }
      .inspect-type-child {
        position: absolute;
        top: 0;
        left: 260px;
        width: 260px;
        height: 300px;
        background-color: #fafafa;
        > div {
          height: 60px;
          line-height: 60px;
        }
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
  }
}
</style>
