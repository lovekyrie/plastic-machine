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
            </div>
          </div>

          <div class="product-info">
            <p>产品信息</p>
            <div>
              <div>
                <span>规格型号</span>
                <input type="text" v-model="proSaleInfo.modelNumber" />
              </div>
              <div>
                <span>单价</span>
                <input type="number" v-model="proSaleInfo.price" />
              </div>
              <div>
                <span>优惠价</span>
                <input type="number" v-model="proSaleInfo.salePrice" />
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
            <div></div>
          </div>
          <div class="param">
            <!-- 序号 -->
            <div>
              <div v-for="item in 35" :key="item">{{ item }}</div>
            </div>
            <!-- 名称 -->
            <div>
              <div v-for="(item, index) in nmList" :key="index">{{ item }}</div>
            </div>
            <!-- 单位 -->
            <div>
              <div v-for="(item, index) in unList" :key="index">{{ item }}</div>
            </div>
            <div v-for="(item, index) in list" :key="index">
              <div v-for="(itemJ, index1) in Object.values(item)" :key="index1">
                {{ itemJ ? itemJ : "--" }}
              </div>
            </div>
            <!-- 空白 -->
            <div>
              <div v-for="item in 35" :key="item"></div>
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
      cart: {
        proNm: "",
        createTm: "",
        num: 1
      },
      cartList: [],
      cartId: "",
      techAgreementMatchs: [],
      neederCompany: "",
      proSaleInfo: {
        neederCompany: "",
        modelNumber: "",
        price: "",
        salePrice: ""
      }
    };
  },
  mounted() {
    const option = this.until.getQueryString("option");
    const cartId = this.until.getQueryString("cartId");
    if (option) {
      this.form = JSON.parse(option);
      this.getParamList();
    }

    if (cartId) {
      this.cartId = cartId;
    }
    this.time = this.until.formatDay("yyyy-MM-dd");
  },
  methods: {
    back() {
      window.history.back();
    },
    toCart() {
      if (!this.proSaleInfo.neederCompany) {
        this.$message.error("客户名称必填！");
        return;
      }
      if (!this.proSaleInfo.modelNumber) {
        this.$message.error("规格型号必填！");
        return;
      }
      if (!this.proSaleInfo.price) {
        this.$message.error("单价必填！");
        return;
      }
      if (!this.proSaleInfo.salePrice) {
        this.$message.error("优惠价必填！");
        return;
      }

      const { model, clampingForce, injection, screw, machineType } = this.form;
      //保存购物车
      this.cart.proNm = `${model}${clampingForce} / ${injection} / ${screw}(${machineType})`;
      this.cart.createTm = this.until.formatDay("yyyy-MM-dd hh:mm");
      this.cart.form = this.form;
      this.cart.techAgreement = this.list;
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
      const { injection } = this.form;
      data.injection = injection;

      this.list.push(data);
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
              width: 40%;
            }
            &:nth-of-type(2) {
              width: 10%;
            }
            &:nth-of-type(3) {
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
          flex-flow: row nowrap;
          > div {
            flex: 1;
            display: flex;
            flex-flow: column wrap;
            &:nth-of-type(1) {
              flex: 0 0 5%;
            }
            &:nth-of-type(3) {
              flex: 0 0 10%;
            }
            &:nth-of-type(2) {
              flex: 0 0 35%;
            }
            > div {
              padding-left: 10%;
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
