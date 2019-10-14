<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center">
          选配结果
          <!-- 下拉图标 -->
        </p>
        <span class="confirmBtn" @click="toCart">保存</span>
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
          <div
            class="concept"
            v-for="(item, index) in productInfoList"
            :key="index"
          >
            <div>{{ item.num }}</div>
            <div>{{ item.name }}</div>
            <div>{{ item.unit }}</div>
            <div>{{ item.format }}</div>
            <div>{{ item.note }}</div>
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
      backArrow,
      productInfoList: [
        {
          num: 1,
          name: "螺杆型号",
          unit: "mm",
          format: "24",
          note: ""
        },
        {
          num: 2,
          name: "螺杆直径",
          unit: "mm",
          format: "24",
          note: ""
        },
        {
          num: 3,
          name: "螺杆长径比",
          unit: "L/D",
          format: "23.3",
          note: ""
        },
        {
          num: 4,
          name: "理论注射容量",
          unit: "cm3",
          format: "50",
          note: ""
        },
        {
          num: 5,
          name: "注射重量(PS)",
          unit: "g",
          format: "46",
          note: ""
        },
        {
          num: 6,
          name: "注射压力",
          unit: "Mpa",
          format: "250",
          note: ""
        },
        {
          num: 7,
          name: "螺杆转速",
          unit: "rpm",
          format: "0-265",
          note: ""
        },
        {
          num: 8,
          name: "锁模力",
          unit: "KN",
          format: "600",
          note: ""
        },
        {
          num: 9,
          name: "最大移模行程",
          unit: "mm",
          format: "270",
          note: ""
        },
        {
          num: 10,
          name: "拉杆内距",
          unit: "mm",
          format: "310*310",
          note: ""
        },
        {
          num: 11,
          name: "最大模厚",
          unit: "mm",
          format: "330",
          note: ""
        },
        {
          num: 12,
          name: "最小模厚",
          unit: "mm",
          format: "120",
          note: ""
        }
      ]
    };
  },
  methods: {
    back(){
       window.history.back();
    },
    toCart(){
      this.until.href("optionalCart.html")
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
#container {
  padding: 0 15px;
  width: 100%;
  height: 100%;
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
