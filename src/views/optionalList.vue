<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center">
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
          <div v-for="(item, index) in propertyArr" :key="index">
            <p>{{ item.name }}</p>
            <img :src="numIcon" alt />
            <span>{{ item.num }}</span>
            <button class="left-btn" @click="mins(item)"></button>
            <button class="right-btn" @click.stop="plus(item)"></button>
          </div>
          <div v-for="i in remainLeftLen" :key="i + remainLeftLen"></div>
        </div>
        <div class="right-side">
          <div>
            <input type="text" value="特殊选配" />
          </div>
          <div v-for="i in remainRightLen" :key="i"></div>
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
      propertyArr: [],
      propertyRightArr: [],
      remainLeftLen: 13,
      remainRightLen: 13
    };
  },
  mounted() {
    const proArr = this.until.loGet("property");
    if (proArr) {
      const arr = JSON.parse(proArr);

      arr.forEach(item => {
        item.num = item.num ? item.num : 1;
      });
      const length = arr.length;
      if (length <= 13) {
        this.remainRightLen = 13;
        this.remainLeftLen = 13 - length;
        this.propertyArr = arr;
      } else if (length > 13 && length <= 26) {
        this.remainLeftLen = 0;
        this.remainRightLen = 26 - length;

        this.propertyArr = arr.filter((item, index) => index < 13);
        this.propertyRightArr = arr.filter((item, index) => index > 13);
      } else {
        this.remainLeftLen = 13;
        this.remainRightLen = 13;
        this.$message.error("选择的项目过多，无法显示");
      }
    }
  },
  methods: {
    back() {
      window.history.back();
    },
    toOptionResult() {
      //重新保存property
      this.until.loSave('property',JSON.stringify(this.propertyArr))
      const option = this.until.getQueryString("option");
      if (option) {
        this.until.href(`optionalResult.html?option=${option}`);
      }
    },
    mins(item) {
      if (item.minNum && item.num <= item.minNum) {
        this.$message.error("您所选择的项目数量已经达到下限！");
        return;
      }
      if (item.count >= 2) {
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
  p {
    margin: 18px 0;
  }
}

.row .arrow-left {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
}

.row p {
  font-size: 18px;
  margin: 0;
}

.row .confirmBtn {
  font-size: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8%;
}

.row .content {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
}

.left-side,
.right-side {
  height: 100%;
  width: 38%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f2f5f9;
}

.left-side {
  margin-left: 8%;
}

.right-side {
  margin-right: 8%;
}

.left-side,
.right-side {
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
}

.left-side > div:nth-of-type(1),
.right-side > div:nth-of-type(1) {
  background-color: #fff;
  border-bottom: 1px solid #00338d;
  color: #00338d;
}

.left-side > div:nth-of-type(1) > input,
.right-side > div:nth-of-type(1) > input {
  background-color: #fff;
}

.left-side > div > input,
.right-side > div > input {
  background-color: #f2f5f9;
  border: 0;
  width: 100%;
}

.left-side > div > input:focus,
.right-side > div > input:focus {
  outline: none;
}
</style>
