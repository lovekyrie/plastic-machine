<template>
  <div id="container">
    <h3>注塑机技术协议</h3>
    <div class="need-company">
      <div>
        <span>供方：</span>
        <div>博创智能装备股份有限公司</div>
      </div>
      <div>
        <span>需方：</span>
        <div>
          <input type="text" />
        </div>
      </div>
      <p>经过双方友好协商除对采购设备的标准配置和参数确定以外，另外达成以下技术协议进行补充，若本协议中还有未涉及的条款双方友好协商解决：</p>
    </div>
    <div class="paragraph">
      <p>一、设备技术要求（下标为标准机参数）：</p>
      <div class="right-part">
        <div class="param-part">
          <div>
            <span>参数部分</span>
          </div>
        </div>
        <div class="machine-type">
          <div>机型</div>
          <div>{{ showNm }}</div>
          <div></div>
          <div></div>
        </div>
        <div class="param">
          <div v-for="(itemChild, index) in list[0]" :key="index">
            <div>{{index+1}}</div>
            <div>{{ itemChild.nm }}</div>
            <div>{{ itemChild.unit }}</div>
            <div>{{ itemChild.val }}</div>
            <div></div>
          </div>
        </div>
        <div class="optional">
          <div>选购配置或功能</div>
        </div>
        <div class="option-list">
          <div>序号</div>
          <div>名称</div>
          <div>数量</div>
          <div>单价</div>
          <div>小计</div>
        </div>
        <div class="optional">
          <div>常规选配</div>
        </div>
        <div
          class="option-list"
          v-for="(item, index) in cartInfo.techAgreementMatchs"
          :key="item.code"
        >
          <div>{{ index+1 }}</div>
          <div>{{ item.matchNameCH }}</div>
          <div>{{ item.num }}</div>
          <div>{{ item.unitPrice | toFixed(2) }}</div>
          <div>{{ (item.num * item.unitPrice) | toFixed(2) }}</div>
        </div>
        <!-- <div class="terms" v-for="item in 3" :key="item">
          <div>条款修改</div>
          <div></div>
          <div>供方确认</div>
          <div></div>
          <div>需方确认</div>
          <div></div>
        </div>-->
      </div>
    </div>
    <!-- <div class="paragraph">
      <p>二、安全要求：按塑料机械国家标准G8/T2S156-2010要求执行，同时符合国家工作健康和安全法规。</p>
    </div>
    <div class="paragraph">
      <p>三、设备的验收：按塑料机械国家标准G8/T2S156-2010进行测试验收，若有异议设备到需方十五天内必须通知供货方。</p>
    </div>
    <div class="paragraph">
      <p>四、本技术协议作为合同的附件之一（设备的标准配置说明条款，供方拥有最终解释权；若需方对设备的标准配置有异议之处，请列入商标；未列入上表则按遵从供方设备的标准配置看待），本协议同相关合同具有相等法律效力</p>
    </div>-->
    <div class="footer">
      <button @click="toBack">确定</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      id: "",
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
      ],
      list: [],
      cartInfo: {},
      showNm: "",
      TECH_LIST: [
        {
          nm: "技术参数",
          enNm: "",
          unit: "UNIT",
          val: "BS80-III"
        },
        {
          nm: "注射系统",
          enNm: "",
          unit: "unit",
          val: ""
        },
        {
          nm: "螺杆直径",
          enNm: "screwDiameter",
          unit: "mm",
          val: "D30"
        },
        {
          nm: "注射容积",
          enNm: "shotSize",
          unit: "cm3",
          val: "120"
        },
        {
          nm: "注射量（PS）",
          enNm: "injectionWeight",
          unit: "g",
          val: "113"
        },
        {
          nm: "理论注射压力",
          enNm: "injectionPressure",
          unit: "MPa",
          val: "209"
        },
        {
          nm: "螺杆长径比",
          enNm: "screwRatioLD",
          unit: "L/D",
          val: "24"
        },
        {
          nm: "注射行程",
          enNm: "injectionStroke",
          unit: "mm",
          val: "500"
        },
        {
          nm: "最大螺杆转速",
          enNm: "screwSpeed",
          unit: "rpm",
          val: "250"
        },
        {
          nm: "射嘴接触力",
          enNm: "nozzleContactForce",
          unit: "KN",
          val: "12"
        },
        {
          nm: "射移行程",
          enNm: "injectionRoute",
          unit: "mm",
          val: "320"
        },
        {
          nm: "锁模系统",
          enNm: "",
          unit: "unit",
          val: ""
        },
        {
          nm: "锁模力",
          enNm: "clampTonnage",
          unit: "KN",
          val: "800"
        },
        {
          nm: "开模行程",
          enNm: "maxToggleStroke",
          unit: "mm",
          val: "200"
        },
        {
          nm: "模板尺寸",
          enNm: "moldPlatenDimension",
          unit: "mm×mm",
          val: "540×540"
        },
        {
          nm: "拉杆间距",
          enNm: "spaceBetweenTieBars",
          unit: "mm×mm",
          val: "360×360"
        },
        {
          nm: "模板最大距离",
          enNm: "maxMoldOpeningStroke",
          unit: "mm",
          val: "680"
        },
        {
          nm: "容模厚度",
          enNm: "minMoldHeight,maxMoldHeight",
          unit: "mm",
          val: "1.2"
        },
        {
          nm: "顶针行程",
          enNm: "ejectorStroke",
          unit: "mm",
          val: "100"
        },
        {
          nm: "理论顶出力",
          enNm: "ejectorTonnage",
          unit: "KN",
          val: "28.5"
        },
        {
          nm: "顶针数",
          enNm: "ejectorQty",
          unit: "unit",
          val: "56"
        },
        {
          nm: "电力/电热",
          enNm: "",
          unit: "unit",
          val: ""
        },
        {
          nm: "液压系统压力",
          enNm: "maxPumpPressure",
          unit: "MPa",
          val: "84"
        },
        {
          nm: "油泵电机功率",
          enNm: "pumpMotorPower",
          unit: "KW",
          val: "11"
        },
        {
          nm: "电热功率",
          enNm: "heaterPower",
          unit: "KW",
          val: "6.5"
        },
        {
          nm: "温控区数",
          enNm: "tempCtlQty",
          unit: "unit",
          val: "2"
        },
        {
          nm: "其他",
          enNm: "",
          unit: "unit",
          val: ""
        },
        {
          nm: "理论油箱容量",
          enNm: "oilTankCapacity",
          unit: "L",
          val: "175"
        },
        {
          nm: "外形尺寸",
          enNm: "machineDimension",
          unit: "m×m×m",
          val: "230×200"
        },
        {
          nm: "理论机重",
          enNm: "machineWeight",
          unit: "KG",
          val: "3"
        }
      ]
    };
  },
  filters: {
    toFixed(input, param) {
      return parseInt(input).toFixed(param);
    }
  },
  async mounted() {
    const idStr = this.until.getQueryString("id");
    if (idStr) {
      this.id = idStr;
      //先根据ID得到购物车商品信息，再去获取技术参数
      await this.getOrderInfo();
      await this.getParamList();
    }
  },
  methods: {
    toBack() {
      window.history.back();
    },
    async getOrderInfo() {
      const info = await this.api.sysGetOrderInfoById(this.id);
      if (info) {
        this.cartInfo = JSON.parse(info.data);
        //
        const modelArr = this.cartInfo.form.model.split("/");
        const modelStr =
          modelArr[0] + this.cartInfo.form.clampingForce + modelArr[1];
        this.showNm = `${modelStr}/${this.cartInfo.form.injection}/${this.cartInfo.form.screw}`;
      }
    },
    async getParamList() {
      const {
        modelID,
        clampingForceId,
        injectionId,
        screwId
      } = this.cartInfo.form;

      const param = {
        modelTypeId: modelID,
        clampForceId: clampingForceId,
        injectionId: injectionId,
        screwTypeId: screwId
      };

      const data = await this.api.sysGetOptionResultParamList(param);
      const paramList = [];
      paramList.push(data);
      this.TECH_LIST.forEach(pro => {
        if (paramList.length > 0) {
          if (pro.enNm.indexOf(",") > 0) {
            const arr = pro.enNm.split(",");
            pro.val = ` ${data[arr[0]]}~${data[arr[1]]}`;
          } else {
            pro.val = data[pro.enNm];
          }
        }
      });
      this.list.push(JSON.parse(JSON.stringify(this.TECH_LIST)));
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
#container {
  width: 100%;
  background-color: #fff;
  padding: 0 8%;
  font-size: 16px;
  h3 {
    text-align: center;
    padding: 30px 0;
    margin: 0;
  }
  .need-company {
    display: flex;
    display: -webkit-flex;
    flex-flow: column wrap;
    > div {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      margin-bottom: 15px;
      span {
        width: 60px;
      }
      div {
        width: 300px;
        input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          border-bottom: 1px solid #e1e1e1;
        }
      }
    }
    p {
      text-indent: 30px;
    }
  }
  .paragraph {
    margin-bottom: 20px;
    > p {
      font-weight: 700;
    }
    .right-part {
      font-size: 16px;
      width: 100%;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: #f3f6fa;
      border-left: 1px solid #bebebe;
      .param-part {
        > div {
          padding: 1% 0;
          text-align: center;
          width: 100%;
          border-right: 1px solid #bebebe;
          border-bottom: 1px solid #bebebe;
        }
      }
      .machine-type,
      .optional,
      .option-list,
      .terms {
        > div {
          height: 30px;
          line-height: 30px;
          border-right: 1px solid #bebebe;
          border-bottom: 1px solid #bebebe;
        }
      }
      .machine-type {
        > div {
          &:nth-of-type(1) {
            text-align: center;
            width: 30%;
          }
          &:nth-of-type(2) {
            width: 20%;
            padding-left: 2%;
          }
          &:nth-of-type(3) {
            width: 25%;
          }
          &:nth-last-of-type(1) {
            width: 25%;
          }
        }
      }
      .optional {
        > div {
          &:nth-of-type(1) {
            padding-left: 0;
            width: 100%;
            text-align: center;
          }
        }
      }
      .option-list {
        > div {
          padding-left: 5px;
          &:nth-of-type(1),
          &:nth-of-type(3),
          &:nth-of-type(4),
          &:nth-of-type(5) {
            width: 5%;
          }
          &:nth-of-type(2) {
            width: 80%;
          }
        }
      }
      .terms {
        > div {
          padding-left: 5px;
          &:nth-of-type(1),
          &:nth-of-type(3),
          &:nth-of-type(4),
          &:nth-of-type(5),
          &:nth-last-of-type(1) {
            width: 10%;
          }
          &:nth-of-type(2) {
            width: 50%;
          }
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
      > div {
        margin-top: 0;
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
      }
    }
  }
  .footer {
    width: 100%;
    text-align: center;
    button {
      border: 0;
      width: 250px;
      height: 50px;
      line-height: 50px;
      background-color: @themeColor;
      border: 0;
      border-radius: 6px;
    }
  }
}
</style>
