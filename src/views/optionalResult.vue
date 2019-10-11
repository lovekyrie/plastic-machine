<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" />
        <p class="text-center">
          选配结果
          <!-- 下拉图标 -->
        </p>
        <span class="confirmBtn">保存</span>
      </div>
    </div>
    <div class="row">
      <div class="pick-date">2018-08-16</div>
    </div>
    <div class="row">
      <div class="content">
        <div class="left-part">
          <div>
            <div>机型</div>
            <div>MA天隆-电控系统杆</div>
          </div>
          <div>
            <div>吨位</div>
            <div>锁魔力：1201-1600</div>
          </div>
          <div>
            <div>注册量</div>
            <div>CP-1.0~1.5</div>
          </div>
          <div>
            <div>螺杆型号</div>
            <div>氮化标准螺杆</div>
          </div>
        </div>
        <div class="right-part">
          <div class="param-part">
            <div>
              <span>参数部分</span>
            </div>
          </div>
          <div class="machine-type">
            <div>机型</div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="concept">
            <div>1</div>
            <div>螺杆型号</div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
export default {
  data() {
    return {
      backArrow
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
html,
body {
  height: 100vh;
}

.container {
  width: 100%;
  background-color: #fff;
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

.row .arrow-side {
  display: inline-block;
  margin-left: 2%;
}
.row p {
  font-size: 18px;
  margin: 16px 0;
}

.row .confirmBtn {
  font-size: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8%;
}

.row .pick-date {
  margin: 0 8%;
  padding: 2% 0 10px 0;
  font-size: 16px;
  color: #00338d;
  border-bottom: 1px solid #00338d;
}

.row .content {
  height: 100%;
  margin: 0 8%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.left-part {
  font-size: 16px;
  width: 48%;
  height: 40%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.left-part > div {
  margin-top: 4%;
  width: 100%;
}

.left-part > div > div:nth-of-type(1) {
  font-size: 16px;
}

.left-part > div > div:nth-of-type(2) {
  color: #a5a5a5;
}

.right-part {
  font-size: 16px;
  width: 48%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f3f6fa;
  border-left: 1px solid #bebebe;
}

.right-part > div {
  margin-top: 0;
  width: 100%;
}

.right-part > div {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
}

.right-part > .param-part > div {
  padding: 2% 0;
  text-align: center;
  width: 100%;
  border-right: 1px solid #bebebe;
  border-bottom: 1px solid #bebebe;
}

.right-part > .machine-type > div {
  padding: 2% 0 2% 2%;
  height: 100%;
  border-right: 1px solid #bebebe;
  border-bottom: 1px solid #bebebe;
}

.right-part > .machine-type > div:nth-of-type(1) {
  padding-left: 8%;
  width: 42.58%;
}

.right-part > .machine-type > div:nth-of-type(2) {
  width: 15%;
}

.right-part > .machine-type > div:nth-of-type(3) {
  width: 26%;
}

.right-part > .machine-type > div:nth-of-type(4) {
  width: 26%;
}

.right-part > .concept > div {
  padding: 2% 0 2% 2%;
  height: 100%;
  border-right: 1px solid #bebebe;
  border-bottom: 1px solid #bebebe;
}

.right-part > .concept > div:nth-of-type(1) {
  width: 8%;
}

.right-part > .concept > div:nth-of-type(2) {
  width: 35%;
}

.right-part > .concept > div:nth-of-type(3) {
  width: 15%;
}

.right-part > .concept > div:nth-of-type(4) {
  width: 26%;
}

.right-part > .concept > div:nth-of-type(5) {
  width: 26%;
}
</style>
