<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center">
          选配清单
          <!-- 下拉图标 -->
        </p>
        <div class="search">
          <img :src="searchIcon" alt />
          <input type="text" placeholder="请输入搜索关键字" />
        </div>
        <span class="confirmBtn" @click="toOptional">添加机型</span>
      </div>
    </div>
    <div class="row">
      <p class="select-all">
        <img id="pickAll" :src="pickAllMark ? pickAll : noPick" @click="pickAllOp" alt />
        <span>全选</span>
      </p>
    </div>
    <div class="row">
      <div class="content">
        <!-- 每一条商品信息 -->
        <div class="product-info" v-for="(item, index) in cartList" :key="index">
          <!-- 产品名称 -->
          <img
            class="pick"
            :src="item.selected ? pickAll : noPick"
            @click="pickOne(item, index)"
            alt
          />
          <div>
            <span>{{ item.proNm }}</span>
          </div>
          <!-- 产品数量 -->
          <div class="count-detail">
            <!-- 数量详细 -->
            <div>
              <span>选配时间：{{ item.createTm }}</span>
            </div>
            <div class="count">
              <span>数量：</span>
              <img :src="numIcon" alt />
              <span>{{ item.num }}</span>
              <button class="left-btn" @click="mins(item)"></button>
              <button class="right-btn" @click="plus(item)"></button>
            </div>
            <div>
              <img :src="editIcon" alt @click="editOrder(item.form, item.id,item.type)" />
            </div>
            <div>
              <a :href="toShowTechnology(item.id)">查看详情</a>
            </div>
            <div>
              <img @click="delCart(item)" class="del-order" :src="deleteIcon" alt />
            </div>
          </div>
          <!-- 差异价 -->
          <div>
            <span>差异价：{{ item.diff ? item.diff * item.num : 0 }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row footer">
      <div @click="showSaveOrder" class="create-order col-md-1 col-md-offset-10">生成订单</div>
    </div>
    <div class="submit-wrap" v-show="showDialog">
      <div class="submit" style="display:block;">
        <img :src="closeIcon" @click="showDialog = false" alt />
        <h3>提交信息</h3>

        <div class="email">
          <!--附件选择 -->
          <div>
            <span>附件选择：</span>
            <div class="pick-attach">
              <div>
                <img
                  :src="attach.technicalParameters ? pickAll : noPick"
                  @click="
                    attach.technicalParameters = !attach.technicalParameters
                  "
                  alt
                />
                <span>技术参数</span>
              </div>
              <div>
                <img
                  :src="attach.afterSalesService ? pickAll : noPick"
                  alt
                  @click="attach.afterSalesService = !attach.afterSalesService"
                />
                <span>售后服务</span>
              </div>
              <div>
                <img
                  :src="attach.credentials ? pickAll : noPick"
                  alt
                  @click="attach.credentials = !attach.credentials"
                />
                <span>资质证明</span>
              </div>
              <div>
                <img
                  :src="attach.businessLicense ? pickAll : noPick"
                  alt
                  @click="attach.businessLicense = !attach.businessLicense"
                />
                <span>营业执照</span>
              </div>
            </div>
          </div>
          <div>
            <span>邮箱地址：</span>
            <div class="email-input">
              <input type="text" v-model="param.email" />
            </div>
          </div>
          <!-- 备注 -->
          <div>
            <span>备注：</span>
            <div>
              <textarea v-model="param.remark"></textarea>
            </div>
          </div>
          <div>
            <span></span>
            <div class="sumbit-btn" @click="save">预览合同</div>
          </div>
        </div>
      </div>
      <div class="del" style="display:none;">
        <img :src="closeIcon" alt />
        <h3>删除确认</h3>
        <div class="del-confirm">
          <div>确定删除该选配订单吗？</div>
          <div>
            <div class="del-certain">确认</div>
            <div class="del-cancel">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import searchIcon from "./images/搜索.png";
import pickAll from "./images/选配清单_全选.png";
import numIcon from "./images/数量控件.png";
import editIcon from "./images/编辑.png";
import deleteIcon from "./images/选配清单_删除.png";
import noPick from "./images/选配清单_未选.png";
import closeIcon from "./images/关闭.png";
export default {
  data() {
    return {
      backArrow,
      searchIcon,
      pickAll,
      numIcon,
      editIcon,
      deleteIcon,
      noPick,
      closeIcon,
      pickAllMark: false,
      showDialog: false,
      cartList: [],
      userInfo: {},
      param: {
        email: "954540387@qq.com",
         remark:''
      },
      time: "",
      attach: {
        technicalParameters: false,
        afterSalesService: false,
        credentials: false,
        businessLicense: false
      }
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    toShowTechnology(id) {
      return `technologyAgreement.html?id=${id}`;
    },
    pickAllOp() {
      this.pickAllMark = !this.pickAllMark;
      this.cartList.map(item => (item.selected = this.pickAllMark));
    },
    pickOne(item, i) {
      item.selected = !item.selected;
      this.$set(this.cartList, i, item);

      let index = this.cartList.findIndex(item => !item.selected);
      if (index > -1) {
        this.pickAllMark = false;
      } else {
        this.pickAllMark = true;
      }
    },
    mins(item) {
      if (item.num >= 1) {
        item.num--;

        //调用接口
        const param = {
          id: item.id,
          data: JSON.stringify(item)
        };
        this.api.sysModifyCart(param);
      }
    },
    plus(item) {
      item.num++;
      //调用接口
      const param = {
        id: item.id,
        data: JSON.stringify(item)
      };
      this.api.sysModifyCart(param);
    },
    toOptional() {
      this.until.href("optional.html");
    },
    showSaveOrder() {
      this.showDialog = true;
    },
    save() {
      //提交订单
      const checkedCart = this.cartList.find(item => item.selected);
      if (!checkedCart) {
        this.$message.error("请至少选择一条产品下单！");
        return;
      }

      const msg = this.reg.checkMail(this.param.email);
      if (msg !== "ok") {
        this.$message.error("请输入正确的邮箱格式！");
        return;
      }

      const checkedCartList = this.cartList.filter(item => item.selected);
      const param1 = checkedCartList.map(item => {
        return {
          techAgreementMatchs: item.techAgreementMatchs,
          techAgreement: item.techAgreement
        };
      });

      const param2 = checkedCartList.map(item => {
        const price = parseInt(item.proSaleInfo.price).toFixed(2);
        const salePrice = parseInt(item.proSaleInfo.salePrice).toFixed(2);
        const money = (item.proSaleInfo.price * item.num).toFixed(2);
        const saleMoney = (item.proSaleInfo.salePrice * item.num).toFixed(2);
        return {
          name: item.form.model,
          modelNumber: item.proSaleInfo.modelNumber,
          num: item.num,
          price,
          salePrice,
          money,
          saleMoney
        };
      });

      const param3 = {
        neederCompany: checkedCartList[0].proSaleInfo.neederCompany,
        supplier: "博创智能装备股份有限公司",
        appuserId: this.userInfo.userId,
        remark: this.param.remark,
        supplierAgenter: this.userInfo.nickname,
        supplierTel: this.userInfo.mob,
        signDate: this.time,
        neederPostcode: this.param.email,
        attachment: this.attach,
        saleAgreementProducts: param2
      };

      const carts = checkedCartList.map(item => item.id);
      const param = {
        techAgreementJsons: JSON.stringify(param1),
        saleAgreementJson: JSON.stringify(param3),
        cartIds: JSON.stringify(carts)
      };

      this.until.loSave("orderParam", JSON.stringify(param));
      this.until.href("technologyPreview.html");
    },
    async getCartList() {
      const query = new this.Query();
      query.buildWhereClause("userId", this.userInfo.userId, "EQ");
      query.buildOrderClause("updTm", "desc");

      const param = query.getParam();
      let list = await this.api.sysGetCartList(param);
      list.forEach(item => {
        if (item.data && item.status === 0) {
          const data = JSON.parse(item.data);

          data.id = item.id;
          this.cartList.push(data);
        }
      });

      this.cartList.forEach((item, index) => {
        item.selected = false;
        if (item.proSaleInfo) {
          item.diff = item.proSaleInfo.price - item.proSaleInfo.salePrice;
        }
        this.$set(this.cartList, index, item);
      });
    },
    delCart(item) {
      this.$confirm("此操作将删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.cartList = this.cartList.filter(itemCart => itemCart !== item);
          //调用接口
          const param = {
            id: item.id,
            data: ""
          };
          this.api.sysModifyCart(param).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editOrder(form, id, type) {
      const str = JSON.stringify(form);
      if (type === "usual") {
        this.until.href(`optional.html?form=${str}&id=${id}`);
      } else {
        this.until.href(`industryOptional.html?form=${str}&id=${id}`);
      }
    }
  },
  mounted() {
    //从缓存中得到购物车，因后端接口出错，等修复后，前端统一修复
    const userInfoStr = this.until.loGet("userInfo");
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
      this.getCartList();
    }

    this.time = this.until.formatDay("yyyy-MM-dd");
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
}

.row > .header {
  position: relative;
  background-color: @headerColor;
  color: #fff;
}

.row .arrow-left {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
}

.row .search {
  width: 20%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12%;
  padding-left: 0;
  padding-right: 0;
  margin: 0 2%;
  border: 1px solid #fff;
  border-radius: 5px;
}

.search > img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2%;
}
.search > input {
  border: 0;
  margin-left: 8%;
  padding: 5px 0;
  width: 90%;
  color: #000;
}

.search > input:focus {
  outline: none;
}

.row .arrow-side {
  display: inline-block;
  margin-left: 30px;
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

.row .select-all {
  margin-left: 8%;
}

.row .content {
  margin: 0 8%;
}

.content .product-info {
  position: relative;
  padding: 35px 0 35px 25px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid #bebebe;
}

.content .product-info > img.pick {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 35px;
  left: 0;
}
.content .product-info > div {
  width: 100%;
}

.content .product-info > :nth-of-type(1) {
  margin-bottom: 10px;
  width: 100%;
  font-size: 16px;
}

.content .product-info .count-detail {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between; /*水平留空隙*/
  align-items: center; /*垂直居中*/
}

.count-detail .count {
  position: relative;
}

.count-detail .count > span:nth-last-of-type(1) {
  position: absolute;
  left: 60%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.count-detail .count > button {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  transform: translateY(-50%);
  opacity: 0;
}

.count-detail .count > .left-btn {
  left: 20%;
}

.count-detail .count > .right-btn {
  right: 0;
}

.footer {
  border-top: 1px solid #cdcdcd;
  background-color: #f2f5f9;
  width: 100%;
  position: fixed;
  height: 6.6%;
  bottom: 0;
}

.create-order {
  margin-top: 1.6%;
  transform: translateY(-50%);
  background-color: @themeColor;
  color: #000;
  text-align: center;
  padding: 0.5% 0;
  border-radius: 5px;
}

.submit-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(153, 153, 153, 0.5);
}

.submit {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 470px;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 10px;
}

.submit > img,
.del > img {
  position: absolute;
  top: 7%;
  right: 5%;
}

.submit h3 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.submit > div {
  margin: 0 55px;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.submit > div > div {
  width: 100%;
}

.email {
  > div {
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    &:not(:nth-last-of-type(1)) {
      margin-bottom: 30px;
    }
    &:nth-of-type(3) {
      textarea {
        padding-left: 10px;
        width: 100%;
        height: 100px;
      }
    }
    > div {
      flex: 1;
    }
    .pick-attach {
      display: flex;
      display: -webkit-flex;
      flex-flow: row wrap;
      div {
        width: 50%;
        &:nth-of-type(n + 3) {
          margin-top: 5px;
        }
        span {
          margin-left: 5px;
        }
      }
    }
    > span {
      display: inline-block;
      width: 25%;
    }
  }
}

.sumbit-btn {
  padding: 10px;
  background-color: @themeColor;
  border: 1px solid @themeColor;
  border-radius: 5px;
  color: #000;
  text-align: center;
}
.email-input > input {
  border: 1px solid #bebebe;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
}

.email-input > input:focus {
  outline: none;
}

.del {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 310px;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 10px;
}

.del h3 {
  text-align: center;
  margin: 40px 0;
}

.del .del-confirm {
  margin: 0 50px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.del .del-confirm > div {
  width: 100%;
  padding: 30px 0;
}

.del .del-confirm > div:nth-of-type(1) {
  text-align: center;
  font-size: 18px;
}

.del .del-confirm > div:nth-of-type(2) {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
}

.del-certain,
.del-cancel {
  padding: 10px 0;
  border: 1px solid @themeColor;
  border-radius: 5px;
  background-color: @themeColor;
  color: #fff;
  text-align: center;
  width: 45%;
}

.del-cancel {
  border: 1px solid #b5b5b5;
  background-color: #b5b5b5;
}
</style>
