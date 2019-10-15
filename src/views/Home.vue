<template>
  <div id="container">
    <div class="log-operate">
      <div class="person">
        <div @click="toPersonal">
          <img :src="personImg" />
        </div>
      </div>
      <div class="message">
        <div>
          <img :src="messageImg" alt />
        </div>
      </div>
      <div class="operation">
        <div @click="toOper">
          <img :src="operationImg" alt />
        </div>
      </div>
      <div class="product">
        <div @click="toProduct">
          <img :src="productImg" alt />
        </div>
      </div>
      <div class="pick">
        <div @click="toPick">
          <img :src="pickImg" alt />
        </div>
      </div>
      <div class="industry">
        <div>
          <img :src="industryImg" alt />
        </div>
      </div>
      <div class="list">
        <div @click="toList">
          <img :src="listImg" alt />
        </div>
      </div>
    </div>
    <!-- 宣传视频 -->
    <div class="propaganda" @click="showVideo">
      <img :src="propaganda" alt />
      <div class="video-play" v-show="showVideoFlag">
        <video controls>
          <source
            type="video/mp4"
            src="http://www.www.haitian.com/wp-content/uploads/sites/3/2018/04/HAITIAN_CULTURAL_CHINA_2016_04_15_1080.mp4"
          />
          <source
            type="video/webm"
            src="http://www.www.haitian.com/wp-content/uploads/sites/3/2018/04/HAITIAN_CULTURAL_CHINA_2016_04_15_1080.webm"
          />
        </video>
      </div>
    </div>
    <div class="row line">
      <div class="col-md-3 col-md-offset-3">
        <img :src="indexLine" alt />
      </div>
    </div>
    <div class="row copy-right">
      <span>Copyright &#169; 2018 WCJ2100</span>
    </div>
  </div>
</template>

<script>
import personImg from "./images/个人中心.png";
import messageImg from "./images/消息通知.png";
import operationImg from "./images/运维指南.png";
import productImg from "./images/产品概览.png";
import pickImg from "./images/机型选配.png";
import industryImg from "./images/行业选配.png";
import listImg from "./images/选配清单.png";
import propaganda from "./images/宣传视频.png";
import indexLine from "./images/首页_线.png";

export default {
  data() {
    return {
      personImg,
      messageImg,
      operationImg,
      productImg,
      pickImg,
      industryImg,
      listImg,
      propaganda,
      indexLine,
      showVideoFlag: false
    };
  },
  methods: {
    toPersonal() {
      this.until.href("personal.html");
    },
    toProduct() {
      this.until.href("productOverview.html");
    },
    toPick() {
      this.until.href("optional.html");
    },
    toList() {
      this.until.href("optionalCart.html");
    },
    toOper() {
      this.until.href("operAndMaint.html");
    },
    showVideo() {
      this.showVideoFlag = true;
    }
  }
};
</script>

<style lang="less">
#container {
  width: 100%;
  position: relative;
  height: 100%;
  background: url("./images/首页背景.png") no-repeat top center;
  background-size: cover;
}

.log-operate {
  position: absolute;
  width: 70%;
  height: 16.5%;
  top: 49%;
  transform: translateY(50%);
  left: 15%;
  background-color: rgba(255, 255, 255, 0);
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.log-operate > div {
  height: 100%;
  width: 8.5%;
}

.log-operate > div > div {
  margin: 0 auto;
}

.log-operate > div > div > img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.propaganda {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 76%;
}

.line {
  position: absolute;
  top: 95%;
}

.copy-right {
  position: absolute;
  top: 98%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #a7a7a7;
  line-height: 1;
}

.video-play {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-play > video {
  width: 100%;
  height: 100%;
}
</style>
