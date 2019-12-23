<template>
  <div id="container">
    <div class="log-header">
      <div>
        <img :src="logNoLetter" alt />
        <div>
          <p>博创智能装备股份有限公司</p>
          <p>BORCHMACHINERYCO.,LTD</p>
        </div>
      </div>
      <img :src="logLetter" alt />
    </div>
    <div class="title">
      <h2>{{ saleAgreementJson.neederCompany }}</h2>
      <h1>方案报价</h1>
    </div>
    <div class="company-logo">
      <img :src="borcheLogo" alt />
    </div>
    <div class="price-info">
      <div>
        <p>报价单位：</p>
        <p>博创智能装备股份有限公司</p>
      </div>
      <div>
        <p>联 系 人：</p>
        <p>
          {{ saleAgreementJson.supplierAgenter }}
          {{ saleAgreementJson.supplierTel }}
        </p>
      </div>
      <div>
        <p>邮 箱：</p>
        <p>{{ saleAgreementJson.neederPostcode }}</p>
      </div>
    </div>
    <!-- 报价单 -->
    <div class="quotation">
      <h3>一 报价单</h3>
      <p>
        感谢您对博创智能装备股份有限公司的信赖和支持，我们将向您提供
        <b>性能优异的注塑机精品和全程无忧的“钻石服务”！</b>
      </p>
      <div class="item">
        <div class="title">Ⅰ、商业条款</div>
        <div class="table-list">
          <p>金额单位：人民币/元</p>
          <!-- 货物信息（可以多个） -->
          <div class="product-info">
            <div>
              <div v-for="(item, index) in PRODUCT_TITLE" :key="index">{{ item }}</div>
            </div>
            <div v-for="(item, index) in saleAgreementJson.saleAgreementProducts" :key="index">
              <div>注塑机</div>
              <div>{{ item.name }}</div>
              <div>{{ item.num }}</div>
              <div>{{ item.priceAll }}</div>
              <div>{{ item.salePriceAll }}</div>
              <div>{{ item.money }}</div>
              <div>{{ item.saleMoney }}</div>
            </div>
          </div>
          <div class="total">
            <div>总计</div>
            <div>
              <p>
                面价总计：人民币 {{ moneyTotalB }}元整（{{
                moneyTotal | toFixedCn(2)
                }}
                元）
              </p>
              <p>
                优惠价总计：人民币 {{ saleMoneyTotalB }}元整 （{{
                saleMoneyTotal | toFixedCn(2)
                }}
                元）
              </p>
            </div>
          </div>
          <p>
            备注：报价有效期为 30
            天，以上为标准机台报价，含增值税费等；若有其它特殊要求，则另行商议价格。
          </p>
          <!-- 货物信息对应的选配参数 -->
          <!-- <div class="optional-signal">
            <div>
              <div>选配功能或附件</div>
            </div>
          </div>
          <div class="optional-list">
            <div>
              <div v-for="(item, index) in OPTIONAL_TITLE" :key="index">{{ item }}</div>
            </div>
          </div>-->
          <!-- <div class="optional-list" v-for="(item, index) in techAgreementJson" :key="index">
            <div v-for="(itemChild, index1) in item.techAgreementMatchs" :key="index1">
              <div>{{ index1 + 1 }}</div>
              <div>{{ itemChild.matchNameCH }}</div>
              <div>{{ itemChild.num }}</div>
              <div>{{ itemChild.unitPrice | toFixed(2) }}</div>
              <div>{{ itemChild.money | toFixed(2) }}</div>
            </div>
          </div>-->
          <!-- <div class="total">
            <div>总计</div>
            <div>
              <p>
                人民币 {{ optionMoneyB }}元整（{{ optionMoney | toFixedCn(2) }}
                元）
              </p>
            </div>
          </div>-->
        </div>
      </div>
      <div class="item">
        <div class="title">Ⅱ、付款方式及交付期：</div>
        <p class="input-desc">
          签订合同
          <input type="text" /> 日内支付合同金额的
          %作为定金，出货前再支付合同金额的
          <input type="text" />
          %，余款在货到客户工厂后
          <input type="text" /> 付清。
        </p>
        <p class="input-desc2">
          收到定金
          <input type="text" /> 天后左右交货，具体以合同约定为准。
        </p>
      </div>
      <div class="item">
        <div class="title">Ⅲ、随机附件：</div>
        <p>易损件、避震脚 1 套、工具箱及工具 1 套、说明书 1 套。</p>
      </div>
      <div class="item">
        <div class="title">Ⅳ、服务承诺：</div>
        <p>
          自出厂之日起，整机实行免费保修 18
          个月（易损件除外）注塑机三大模板免费保修五年。（详见我司标准售后服务保修条例）
        </p>
      </div>
      <div class="item">
        <div class="title">Ⅴ、备注：</div>
        <p>
          博创公司所提供之以上设备质量和验收要求依行业产品标准执行；其他事宜
          双方协商解决或另行协定。
        </p>
      </div>
    </div>
    <!-- 技术参数及配置 -->
    <div class="technology-setting">
      <h3>二 技术参数及配置</h3>
      <div class="item" v-for="(item, index) in techAgreementJson" :key="index">
        <div class="title">2-1 技术参数表</div>
        <p>{{item.propertyArr[4].val}}技术参数表</p>
        <div class="param">
          <div v-for="(itemChild, index) in item.propertyArr" :key="index">
            <div>{{ itemChild.nm }}</div>
            <div>{{ itemChild.unit }}</div>
            <div>{{ itemChild.val }}</div>
          </div>
          <div class="detail-title">
            <div>选配明细</div>
          </div>
          <div class="detail-list">
            <div v-for="(item, index) in OPTIONAL_TITLE" :key="index+30">{{ item }}</div>
          </div>
          <div
            class="detail-list"
            v-for="(itemChild, index1) in item.techAgreementMatchs"
            :key="index1+31"
          >
            <div>{{ index1 + 1 }}</div>
            <div>{{ itemChild.matchNameCH }}</div>
            <div>{{ itemChild.num }}</div>
            <!-- <div>{{ itemChild.unitPrice | toFixed(2) }}</div>
            <div>{{ itemChild.money | toFixed(2) }}</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="save">确定</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import logNoLetter from "./images/log-no-letter.png";
import logLetter from "./images/log-letter.png";
import borcheLogo from "./images/borche-logo.png";
var Nzh = require("nzh");
export default {
  data() {
    return {
      logNoLetter,
      logLetter,
      borcheLogo,
      technologyList: [],
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
      ],
      PRODUCT_TITLE: [
        "货物名称",
        "规格型号",
        "数量",
        "单价（面价）",
        "单价（优惠价）",
        "合计（面价）",
        "合计（优惠价）"
      ],
      OPTIONAL_TITLE: ["序号", "名称", "数量"],
      orderParam: {},
      saleAgreementJson: {},
      techAgreementJson: [],
      moneyTotal: 0,
      moneyTotalB: "",
      saleMoneyTotal: 0,
      saleMoneyTotalB: "",
      optionMoney: 0,
      optionMoneyB: ""
    };
  },

  mounted() {
    //根据
    let orderParamStr = this.until.loGet("orderParam");
    if (orderParamStr) {
      this.orderParam = JSON.parse(orderParamStr);
      this.saleAgreementJson = JSON.parse(this.orderParam.saleAgreementJson);
      this.techAgreementJson = JSON.parse(this.orderParam.techAgreementJsons);
      this.calculateMoney();
      this.calculateSaleMoney();
      this.calculateOptionMoney();
      this.getTechnologyList();
    }
  },
  filters: {
    toFixed(input, param1) {
      //input代表的是管道符前面的内容，param1代表 过滤方法传进来的参数
      return parseInt(input).toFixed(param1);
    },
    toFixedCn(input, param1) {
      return `￥${input.toFixed(param1)}`;
    }
  },
  methods: {
    getTechnologyList() {
      this.techAgreementJson.forEach(item => {
        this.TECH_LIST.forEach(pro => {
          if (item.techAgreement.length > 0) {
            if (pro.enNm.indexOf(",") > 0) {
              const arr = pro.enNm.split(",");
              pro.val = ` ${item.techAgreement[0][arr[0]]}~${
                item.techAgreement[0][arr[1]]
              }`;
            } else {
              pro.val = item.techAgreement[0][pro.enNm]
                ? item.techAgreement[0][pro.enNm]
                : "";
            }
          }
        });
        // this.technologyList.push(JSON.parse(JSON.stringify(this.TECH_LIST)));
        item.propertyArr = JSON.parse(JSON.stringify(this.TECH_LIST));
      });
    },
    calculateMoney() {
      this.moneyTotal = this.saleAgreementJson.saleAgreementProducts.reduce(
        (curr, next) => {
          return curr + parseInt(next.money);
        },
        0
      );
      var nzhcn = Nzh.cn;
      this.moneyTotalB = nzhcn.encodeB(this.moneyTotal);
    },
    calculateSaleMoney() {
      this.saleMoneyTotal = this.saleAgreementJson.saleAgreementProducts.reduce(
        (curr, next) => {
          return curr + parseInt(next.saleMoney);
        },
        0
      );
      var nzhcn = Nzh.cn;
      this.saleMoneyTotalB = nzhcn.encodeB(this.saleMoneyTotal);
    },
    calculateOptionMoney() {
      let arr = [];
      this.techAgreementJson.forEach(item => {
        arr.push(...item.techAgreementMatchs);
      });

      this.optionMoney = arr.reduce((curr, next) => {
        return curr + parseInt(next.money);
      }, 0);
      var nzhcn = Nzh.cn;
      this.optionMoneyB = nzhcn.encodeB(this.optionMoney);
    },
    save() {
      this.api.sysSubmitOrder(this.orderParam).then(res => {
        if (res) {
          this.showDialog = false;
          this.$message({
            message: "生成订单成功",
            type: "success"
          });
          this.until.loRemove("orderParam");
          //返回首页
          this.until.href("personal.html");
        }
      });
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
  padding: 20px;
  .log-header {
    > div {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      align-items: center;
      div {
        margin-left: 20px;
        p {
          font-weight: 700;
          letter-spacing: 4px;
          &:nth-of-type(1) {
            font-size: 16px;
          }
        }
      }
    }
  }
  .title {
    h2 {
      text-align: center;
    }
    h1 {
      text-align: center;
      font-weight: 700;
    }
  }
  .company-logo {
    text-align: center;
    margin: 30px 0;
  }
  .price-info {
    text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-flow: column wrap;
    font-weight: 700;
    font-size: 16px;
    > div {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      justify-content: center;
      > p {
        &:nth-of-type(1) {
          width: 120px;
        }
      }
    }
  }
  .quotation {
    font-size: 16px;
    width: 60%;
    margin: 20px auto;
    > p {
      text-indent: 30px;
      text-decoration: underline;
    }
    .item {
      .title {
        font-weight: 700;
      }
      p {
        margin: 10px 0 10px 2%;
      }
      .input-desc,
      .input-desc2 {
        input {
          outline: none;
          border: 0;
          border-bottom: 1px solid #e1e1e1;
        }
      }
      .input-desc {
        input {
          &:nth-of-type(1) {
            width: 40px;
          }
          &:nth-of-type(2) {
            width: 60px;
          }
          &:nth-last-of-type(1) {
            width: 120px;
          }
        }
      }
      .input-desc2 {
        input {
          width: 60px;
        }
      }
      .table-list {
        .product-info,
        .optional-list,
        .optional-signal {
          display: flex;
          display: -webkit-flex;
          flex-flow: column wrap;
          border-left: 1px solid #bebebe;

          > div {
            flex: 1;
            display: flex;
            flex-flow: row nowrap;

            > div {
              flex: 1;
              padding-left: 2%;
              width: 100%;
              height: 40px;
              line-height: 40px;
              border-right: 1px solid #bebebe;
              border-bottom: 1px solid #bebebe;
            }
          }
        }
        .optional-list {
          > div {
            > div {
              &:nth-of-type(1) {
                flex: 0 0 14.3%;
              }
              &:nth-of-type(3) {
                flex: 0 0 10%;
              }
              &:nth-of-type(4),
              &:nth-last-of-type(1) {
                flex: 0 0 15%;
              }
              &:nth-of-type(2) {
                flex: 1;
              }
            }
          }
        }
        .product-info {
          border-top: 1px solid #bebebe;
        }
        .total {
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          align-items: center;
          border: 1px solid #bebebe;
          border-top: 0;
          div {
            &:nth-of-type(1) {
              padding-left: 2%;
              flex: 0 0 14.2%;
            }
            &:nth-last-of-type(1) {
              border-left: 1px solid #bebebe;
              flex: 1;
              display: flex;
              display: -webkit-flex;
              flex-flow: column wrap;
              > p {
                flex: 1;
              }
            }
          }
        }
        .optional-signal {
          border-top: 1px solid #bebebe;
          > div {
            div {
              flex: 1;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .technology-setting {
    font-size: 16px;
    width: 60%;
    margin: 0 auto;
    .item {
      margin-top: 30px;
      .title {
        font-weight: 700;
      }
      > p {
        margin-top: 20px;
      }
      .param {
        display: flex;
        display: -webkit-flex;
        flex-flow: column wrap;
        border: 1px solid #bebebe;
        border-right: 0;
        border-bottom: 0;
        > div {
          flex: 1;
          display: flex;
          flex-flow: row nowrap;

          > div {
            &:nth-of-type(1) {
              flex: 0 0 20%;
            }
            &:nth-of-type(2) {
              flex: 0 0 25%;
            }
            padding-left: 2%;
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-right: 1px solid #bebebe;
            border-bottom: 1px solid #bebebe;
          }
        }
        .detail-title {
          > div {
            &:nth-of-type(1) {
              flex: 1;
              text-align: center;
            }
          }
        }
        .detail-list {
          > div {
            &:nth-of-type(1),
            &:nth-last-of-type(1) {
              flex: 1;
            }
            &:nth-of-type(2) {
              flex: 2;
            }
          }
        }
      }
    }
  }
}
</style>
