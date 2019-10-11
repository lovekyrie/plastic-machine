<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" />
        <p class="text-center">
          当前清单
          <!-- 下拉图标 -->
        </p>
        <span class="confirmBtn">确定</span>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <div class="left-side">
          <div>
            <input type="text" value="常规选配" />
          </div>
        </div>
        <div class="right-side">
          <div>
            <input type="text" value="特殊选配" />
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

.left-side > div,
.right-side > div {
  font-size: 16px;
  padding: 20px 0 20px 20px;
  width: 100%;
  border-bottom: 1px solid #bebebe;
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
