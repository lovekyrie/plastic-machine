<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" />
        <p class="text-center">
          <span>MAIL</span>
          <!-- 下拉图标 -->
          <img class="arrow-side" :src="pullDown" />
        </p>
        <div type="false" class="ul-style" style="display:none;">
          <li>MAIIS</li>
          <li>MAⅡ</li>
          <li>MA/G</li>
          <li>VEⅡ</li>
          <li>ZE</li>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项 -->
        <div class="left">
          <div class="row active">
            <span>MA600II/130</span>
          </div>
          <div class="row-segment"></div>
        </div>
        <div class="right">
          <div class="title">
            <div class="active introduce">
              <span>机型简介</span>
            </div>
            <div>
              <span>性能特征</span>
            </div>
            <div>
              <span>典型制品</span>
            </div>
            <div class="standard">
              <span>标准配置</span>
            </div>
            <div>
              <span>技术参数</span>
            </div>
            <div>
              <span>相关尺寸</span>
            </div>
          </div>
          <!-- 机型简介 -->
          <div class="concept" style="display:block">
            <p>2005年，HTF普通型注塑机</p>
            <p>2006年-2011年，天隆MA伺服节能注塑机</p>
            <p>2012年后，天隆MAII伺服节能、高效、精密注塑机</p>
            <p>
              我们将产品归拢为8大品类，每个品类列举的实例中设计的设备所魔力最高至2300千牛。我们具体地描述了八大品类产品的特质
              及其质量标准，以此为轴线，进一步具体地探讨了质量要求与设备功能之间的相互关联，最终导出最有推荐方案。我们将产品归拢为8大品类，
              每个品类列举的实例中涉及的设备锁模力最高至2300千牛。我们具体地秒速了八大品类产品的特质及其质量标准，
              以此为轴线，进一步具体的探讨了质量要求与设备功能之间的相互关联，最终导出最优推荐方案。
            </p>
          </div>
          <!-- 标准配置 -->
          <div class="standard-set" style="display:none;">
            <div class="wrap">
              <div class="injection">
                <div class="part">注射部分</div>
                <div class="triangle"></div>
              </div>
              <div class="injection-ct"></div>
            </div>
            <div class="warp">
              <div class="lock">
                <div class="part">锁模部分</div>
                <div class="triangle"></div>
              </div>
              <div class="lock-ct"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import pullDown from "./images/标签栏下拉箭头.png";

export default {
  data() {
    return {
      backArrow,
      pullDown
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
html,
body {
  height: 100%;
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
  margin-left: 3%;
}

.text-center {
  font-size: 18px;
}

.text-center > span {
  display: inline-block;
  width: 5%;
}

.header > .ul-style {
  color: #00338d;
  display: -webkit-flex;
  display: flex;
  width: 15%;
  z-index: 12;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 43%;
  border: 1px solid #d2d2d2;
  background-color: #00338d;
  box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
}

.header > .ul-style > li {
  width: 100%;
  /* background-color: #00338D; */
  background-color: #fff;
  padding: 8px 0 8px 6%;
}

.header > .ul-style > li:hover {
  background-color: #00338d;
  color: #fff;
}

.row p {
  margin: 18px 0;
}

.content {
  display: -webkit-flex;
  display: flex;
  height: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
}

.content .left {
  width: 25%;
  background-color: #fff;
}

.content .right {
  width: 75%;
}

.content .left .row {
  margin-left: 0;
  width: 100%;
  padding: 15px 0;
  background: url("./images/左侧导航.png") no-repeat top center;
  background-size: cover;
}

.content .left > .active {
  background-image: url("./images/左侧导航_选中.png");
}

.content .row > span {
  margin-left: 40%;
}

.right .title {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #f2f5f9;
}

.right .title > div {
  margin: 0 30px;
  padding: 15px 0;
  flex: 6;
  text-align: center;
}

.right .title > .active {
  border-bottom: 1px solid #4e72b0;
  color: #4e72b0;
}

.right > .concept,
.right > .standard-set {
  margin: 50px 150px 0 40px;
  line-height: 30px;
}

.right .concept > p {
  margin-top: 0;
  margin-bottom: 0;
}

.standard-set .wrap {
  margin-bottom: 30px;
}

.injection,
.lock {
  display: -webkit-flex;
  display: flex;
  color: #000;
  background-color: #fff;
}

.injection > .part,
.lock > .part {
  width: 210px;
  height: 100%;
  background-color: #00338d;
  color: #fff;
  text-indent: 30px;
}

.injection > .triangle,
.lock > .triangle {
  width: 0;
  height: 0;
  border: 15px solid #fff;
  border-left-color: #00338d;
  border-bottom-color: #00338d;
}

.injection-ct,
.lock-ct {
  padding: 10px 0;
  background-color: #f2f5f9;
}
.injection-ct > p,
.lock-ct > p {
  margin-top: 0;
  margin-bottom: 0;
  text-indent: 30px;
  padding: 5px 0;
}

.row-segment {
  height: 1px;
  background: url("./images/个人中心_左侧线.png") center center no-repeat;
  background-size: cover;
}
</style>
