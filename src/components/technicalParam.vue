<template>
  <div class="techical">
    <div class="right-part">
      <div class="param">
        <div v-for="(itemChild, index) in list[0]" :key="index">
          <div>{{index+1}}</div>
          <div>{{ itemChild.nm }}</div>
          <div>{{ itemChild.unit }}</div>
          <div v-for="(itemG, j) in itemChild.val" :key="j">{{itemG}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nmList: [
        "螺杆型号",
        "螺杆直径",
        "螺杆长径比",
        "理论注射容量",
        "注射重量",
        "注射速率",
        "塑化能力",
        "注射压力",
        "螺杆转速",
        "锁模力",
        "最大移模行程",
        "最大拉杆内间距(H×V)",
        "最大模厚",
        "最小模厚",
        "顶出行程",
        "顶出力",
        "最大模板开距",
        "最小模具尺寸",
        "最大模具重量",
        "模板尺寸(H×V)",
        "电热功率",
        "油泵马达(电机功率)",
        "外形尺寸",
        "机器重量",
        "料斗容积",
        "油箱容积",
        "注射速度",
        "保压压力",
        "喷嘴接触力",
        // "油泵马达",
        "总电气容量",
        "转盘直径",
        "转盘承重",
        "模具定位中心距",
        "中托行程",
        "中托力"
      ],
      unList: [
        "",
        "mm",
        "L/D",
        "cm³",
        "g",
        "g/s",
        "g/s",
        "Mpa",
        "rpm",
        "t",
        "mm",
        "mm",
        "mm",
        "mm",
        "mm",
        "KN",
        "mm",
        "mm",
        "Kg",
        "mm",
        "Kw",
        "Kw",
        "m",
        "t",
        "Kg",
        "L",
        "mm/s",
        "Mpa",
        "Mpa",
        // "Kw",
        "Kw/A",
        "mm",
        "t",
        "mm",
        "mm",
        "KN"
      ]
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
.techical {
  margin: 50px 150px 20px 40px;
  .right-part {
    font-size: 16px;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #f3f6fa;
    border-left: 1px solid #bebebe;
    > div {
      margin-top: 0;
      width: 100%;
      display: -webkit-flex;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: center;
    }
    .param-part {
      > div {
        padding: 2% 0;
        text-align: center;
        width: 100%;
        border-right: 1px solid #bebebe;
        border-bottom: 1px solid #bebebe;
      }
    }
    > .machine-type {
      > div {
        padding: 2% 0 2% 2%;
        height: 100%;
        border-right: 1px solid #bebebe;
        border-bottom: 1px solid #bebebe;
      }
    }
    .param {
      display: flex;
      display: -webkit-flex;
      flex-flow: column wrap;
      border-right: 0;
      border-bottom: 0;
      > div {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;

        > div {
          flex: 1;
          &:nth-of-type(1) {
            flex: 0 0 5%;
          }
          &:nth-of-type(2) {
            flex: 0 0 25%;
          }
          &:nth-of-type(3) {
            flex: 0 0 20%;
          }
          padding-left: 2%;
          width: 100%;
          height: 30px;
          line-height: 30px;
          border-right: 1px solid #bebebe;
          border-bottom: 1px solid #bebebe;
        }
      }
    }
  }
}
</style>
