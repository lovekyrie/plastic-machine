<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" @click="back" :src="bankArrow" />
        <p class="text-center">
          塑机计算器
          <!-- 下拉图标 -->
        </p>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项 -->
        <div class="left"></div>
        <!-- 高级设置 -->
        <div class="right" v-show="showSetting"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bankArrow from "./images/返回.png";
export default {
  data() {
    return {
      bankArrow
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
html,
body {
  #container {
    width: 100%;
    background-color: #fff;
    .row {
      > .header {
        position: relative;
        background-color: @headerColor;
        color: #fff;
      }
      .arrow-left {
        position: absolute;
        top: 50%;
        left: 12%;
        transform: translateY(-50%);
      }
      p {
        font-size: 18px;
        margin: 16px 0;
      }
      .content {
        display: -webkit-flex;
        display: flex;
        height: 100%;
        width: 80%;
        margin: 0 auto;
        flex-flow: row nowrap;
        justify-content: space-between;
        .left,
        .right {
          flex: 1;
        }
      }
    }
  }
}
</style>
