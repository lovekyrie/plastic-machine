<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center-nopick">
          当前清单
          <!-- 下拉图标 -->
        </p>
        <span class="confirmBtn" @click="toOptionResult">确定</span>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <div class="left-side">
          <div>
            <input type="text" value="常规选配" />
          </div>
          <div v-for="(item, index) in leftPropertyArr" :key="index">
            <p>{{ item.name }}</p>
            <img :src="numIcon" alt />
            <span>{{ item.num }}</span>
            <button class="left-btn" @click.stop="mins(item)"></button>
            <button class="right-btn" @click.stop="plus(item)"></button>
          </div>
          <div v-for="i in remainLeftLen" :key="i + remainLeftLen"></div>
        </div>
        <div class="right-side">
          <div>
            <input type="text" value="特殊选配" />
          </div>
          <div v-for="(item, index) in rightPropertyArr" :key="index">
            <p>{{ item.name }}</p>
            <img :src="numIcon" alt />
            <span>{{ item.num }}</span>
            <button class="left-btn" @click="mins(item)"></button>
            <button class="right-btn" @click.stop="plus(item)"></button>
          </div>
          <div v-for="i in remainRightLen" :key="i + remainRightLen"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import numIcon from "./images/数量控件.png";
export default {
  data() {
    return {
      backArrow,
      numIcon,
      leftPropertyArr: [],
      rightPropertyArr: [],
      propertyRightArr: [],
      storagePro: ""
    };
  },
  computed: {
    remainLeftLen() {
      const len = this.leftPropertyArr.length;
      if (len < 13) {
        return 13 - len;
      } else {
        return 0;
      }
    },
    remainRightLen() {
      const len = this.rightPropertyArr.length;
      if (len < 13) {
        return 13 - len;
      } else {
        return 0;
      }
    }
  },
  mounted() {
    //常规选配展示在左边，特殊选配展示在右边
    this.storagePro = this.until.loGet("property");
    if (this.storagePro) {
      const arr = JSON.parse(this.storagePro);
      arr.forEach(item => {
        item.num = item.num ? item.num : 1;
        if (item.type === 0) {
          this.leftPropertyArr.push(item);
        } else {
          this.rightPropertyArr.push(item);
        }
      });
    }
  },
  methods: {
    back() {
      window.history.back();
    },
    toOptionResult() {
      //重新保存property
      this.until.loSave("property", this.storagePro);
      const option = this.until.getQueryString("option");
      if (option) {
        this.until.href(`optionalResult.html?option=${option}&type=usual`);
      }
    },
    mins(item) {
      if (item.minNum && item.num <= item.minNum) {
        this.$message.error("您所选择的项目数量已经达到下限！");
        return;
      }
      if (item.num >= 2) {
        item.num -= item.multiple ? item.multiple : 1;
      }
    },
    plus(item) {
      if (item.maxNum && item.num >= item.maxNum) {
        this.$message.error("您所选择的项目数量已经达到上限！");
        return;
      }

      item.num += item.multiple ? item.multiple : 1;
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
html,
body {
  height: 100%;
  background-color: #fff;
}

#container {
  position: relative;
  width: 100%;

  .row {
    p {
      font-size: 18px;
      margin: 0;
    }
    .content {
      display: -webkit-flex;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: space-between;
      background-color: #fff;
      .left-side,
      .right-side {
        height: 100%;
        width: 38%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #f2f5f9;
        div {
          position: relative;
          font-size: 16px;
          padding: 15px 20px;
          width: 100%;
          border-bottom: 1px solid #bebebe;
          &:not(:nth-of-type(1)) {
            position: relative;
            display: flex;
            display: -webkit-flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 71px;
            p {
              flex: 1;
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
            > span {
              position: absolute;
              right: 13%;
              top: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
            > button {
              position: absolute;
              top: 50%;
              width: 50px;
              height: 40px;
              transform: translateY(-50%);
              opacity: 0;
            }
            > .left-btn {
              right: 20%;
            }
            > .right-btn {
              right: 3%;
            }
          }
        }
        > div {
          > input {
            background-color: #f2f5f9;
            border: 0;
            width: 100%;
            &:focus {
              outline: none;
            }
          }
          &:nth-of-type(1) {
            background-color: #fff;
            border-bottom: 1px solid @themeColor;
            color: #000;
            > input {
              background-color: #fff;
            }
          }
        }
      }
      .left-side {
        margin-left: 8%;
      }

      .right-side {
        margin-right: 8%;
      }
    }
  }
}
</style>
