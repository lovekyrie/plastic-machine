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
      <div class="pick-date">{{ time }}</div>
    </div>
    <div class="row">
      <div class="content">
        <div class="left-part">
          <div>
            <div>机型</div>
            <div>{{ form.model }}</div>
          </div>
          <div>
            <div>锁模力</div>
            <div>{{ form.clampingForce }}</div>
          </div>
          <div>
            <div>注射量</div>
            <div>{{ form.injection }}</div>
          </div>
          <div>
            <div>螺杆型号</div>
            <div>{{ form.screw }}</div>
          </div>

          <div class="customer">
            <p>客户信息</p>
            <div>
              <div>
                <span>客户名称</span>
                <input type="text" v-model="proSaleInfo.neederCompany" />
              </div>
              <div>
                <span>联系人</span>
                <input type="text" />
              </div>
              <div>
                <span>联系电话</span>
                <input type="text" />
              </div>
            </div>
          </div>

          <div class="product-info">
            <p>产品信息</p>
            <div>
              <div>
                <span>面价</span>
                <input type="number" v-model="proSaleInfo.price" disabled />
              </div>
              <div>
                <span>优惠价</span>
                <input type="number" v-model="proSaleInfo.salePrice" />
              </div>
              <div>
                <!-- 控制在84%-100%之间 -->
                <span>折扣率</span>
                <input type="text" v-model="discountRate" />
              </div>
            </div>
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
          </div>
          <div class="param">
            <div v-for="(itemChild, index) in technologyList[0]" :key="index">
              <div>{{index+1}}</div>
              <div>{{ itemChild.nm }}</div>
              <div>{{ itemChild.unit }}</div>
              <div>{{ itemChild.val }}</div>
              <div></div>
            </div>
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
      time: "",
      form: {},
      list: [],
      technologyList:[],
      discount: "",
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
          enNm: "maxtoggleStroke",
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
          enNm: "moldHeight",
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
      cart: {
        proNm: "",
        createTm: "",
        num: 1
      },
      cartList: [],
      cartId: "",
      type: "",
      techAgreementMatchs: [],
      neederCompany: "",
      cartInfo: {},
      proSaleInfo: {
        neederCompany: "",
        modelNumber: "",
        price: "",
        salePrice: ""
      }
    };
  },
  computed: {
    discountRate() {
      if (this.proSaleInfo.price !== 0) {
        const res =
          (this.proSaleInfo.salePrice / this.proSaleInfo.price).toFixed(2) *
          100;
        return `${res}%`;
      } else {
        return "0%";
      }
    }
  },
  mounted() {
    const option = this.until.getQueryString("option");
    const cartId = this.until.getQueryString("cartId");
    const type = this.until.getQueryString("type");
    if (option) {
      this.form = JSON.parse(option);
      this.getParamList();
    }

    this.type = type ? type : "";
    if (cartId) {
      this.cartId = cartId;
      this.getOrderInfo();
    }
    this.time = this.until.formatDay("yyyy-MM-dd");
  },
  methods: {
    back() {
      window.history.back();
    },
    async getOrderInfo() {
      const info = await this.api.sysGetOrderInfoById(this.cartId);
      if (info) {
        this.cartInfo = JSON.parse(info.data);
        this.proSaleInfo = this.cartInfo.proSaleInfo;
      }
    },
    toCart() {
      if (!this.proSaleInfo.neederCompany) {
        this.$message.error("客户名称必填！");
        return;
      }
      if (this.proSaleInfo.price === "") {
        this.$message.error("单价必填！");
        return;
      }
      if (this.proSaleInfo.price === 0) {
        this.$message.error("目前系统中暂未维护该产品的面价，无法下单！");
        return;
      }
      if (this.proSaleInfo.salePrice === "") {
        this.$message.error("优惠价必填！");
        return;
      }

      const discountStr = this.discountRate.slice(0, -1);
      const discount = parseFloat(discountStr);
      if (discount > 100 || discount < 84) {
        this.$message.error("请重新填写优惠价，确使折扣率维持在84%~100%之间！");
        return;
      }

      //cart增加一个type用来区分是行业选配还是常规选配
      const { model, clampingForce, injection, screw, machineType } = this.form;
      //保存购物车
      this.cart.proNm = `${model}${clampingForce} / ${injection} / ${screw}(${machineType})`;
      this.cart.createTm = this.until.formatDay("yyyy-MM-dd hh:mm");
      this.cart.form = this.form;
      this.cart.type = this.type;
      const arr = JSON.parse(JSON.stringify(this.list));
      arr.forEach(item => {
        item.injection = injection;
      });
      this.cart.techAgreement = arr;
      //得到当前清单值
      const propertyStr = this.until.loGet("property");
      if (propertyStr) {
        const propertyArr = JSON.parse(propertyStr);
        this.techAgreementMatchs = propertyArr.map(pro => {
          return {
            matchNameCH: pro.name,
            code: pro.cd,
            unitPrice: pro.price,
            money: pro.price,
            num: pro.num ? pro.num : 1
          };
        });
      }

      //移除property
      this.until.loRemove("property");
      this.cart.techAgreementMatchs = this.techAgreementMatchs;
      this.cart.proSaleInfo = this.proSaleInfo;
      const cartStr = JSON.stringify(this.cart);

      let userInfoStr = this.until.loGet("userInfo");
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);

        if (this.cartId) {
          const param = {
            id: this.cartId,
            data: cartStr
          };
          this.api.sysModifyCart(param).then(res => {
            if (res) {
              this.until.href("optionalCart.html");
            }
          });
        } else {
          const param = {
            userId: userInfo.userId,
            data: cartStr
          };

          this.api.sysPosttoCart(param).then(res => {
            if (res) {
              this.until.href("optionalCart.html");
            }
          });
        }
      }
    },
    async getParamList() {
      const param = {
        modelTypeId: this.form.modelID,
        clampForceId: this.form.clampingForceId,
        injectionId: this.form.injectionId,
        screwTypeId: this.form.screwId
      };

      const data = await this.api.sysGetOptionResultParamList(param);

      delete data.imgUrl;
      delete data.imgUrlEn;
      this.proSaleInfo.price = data.priceIn ? data.priceIn : 0;
      delete data.priceIn;
      delete data.priceOut;
      this.list.push(data);

      this.TECH_LIST.forEach(pro => {
        if (data.length > 0) {
          pro.val = data[0][pro.enNm];
        }
      });
      this.technologyList.push(JSON.parse(JSON.stringify(this.TECH_LIST)));
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
#container {
  padding: 0 15px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .row {
    &:nth-last-of-type(1) {
      background-color: #fff;
    }
    > .header {
      position: relative;
      background-color: @headerColor;
      color: #fff;
    }
    .arrow-left {
      position: absolute;
      top: 50%;
      left: 8%;
      transform: translateY(-50%);
    }
    .arrow-side {
      display: inline-block;
      margin-left: 2%;
    }
    p {
      font-size: 18px;
      margin: 16px 0;
    }
    .confirmBtn {
      font-size: 16px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 8%;
    }
    .pick-date {
      margin: 0 8%;
      padding: 2% 0 10px 0;
      font-size: 16px;
      color: #00338d;
      border-bottom: 1px solid #bebebe;
    }
    .content {
      height: 100%;
      margin: 0 8% 40px;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      .left-part {
        font-size: 16px;
        width: 48%;
        height: 40%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        > div {
          margin-top: 4%;
          width: 80%;
          > div {
            &:nth-of-type(1) {
              font-size: 16px;
            }
            &:nth-of-type(2) {
              color: #a5a5a5;
            }
          }
        }
        .customer,
        .product-info {
          p {
            margin: 0 0 15px;
          }
          > div {
            display: flex;
            display: -webkit-flex;
            flex-flow: column wrap;
            border-radius: 10px;
            background-color: #f5f5f5;
            > div {
              flex: 1;
              padding: 25px 20px;
              display: flex;
              flex-flow: row nowrap;

              span {
                width: 100px;
                color: #000;
              }
              input {
                width: 300px;
                border: 0;
                outline: none;
                border-bottom: 1px solid #ced2d8;
                color: #000;
                background-color: rgba(255, 255, 255, 0);
              }
            }
          }
        }
      }
      .right-part {
        font-size: 16px;
        width: 48%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #f6f6f6;
        border-left: 1px solid #bebebe;
        .param-part {
          > div {
            padding: 2% 0;
            text-align: center;
            width: 100%;
            border-right: 1px solid #bebebe;
            border-bottom: 1px solid #bebebe;
          }
        }
        .machine-type {
          > div {
            padding: 1% 0 1% 2%;
            height: 100%;
            border-right: 1px solid #bebebe;
            border-bottom: 1px solid #bebebe;
            &:nth-of-type(1) {
              padding-left: 8%;
              width: 50%;
            }
            &:nth-of-type(2) {
              width: 25%;
            }
            &:nth-last-of-type(1) {
              width: 25%;
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
  }
}
</style>
