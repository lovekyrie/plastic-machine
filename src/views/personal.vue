<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" @click="back" :src="bankArrow" />
        <p class="text-center">
          个人中心
          <!-- 下拉图标 -->
        </p>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项 -->
        <div class="left">
          <div
            class="row order"
            :class="{ active: item.selected }"
            v-for="(item, index) in leftNavigationList"
            @click="pickOne(item, index)"
            :key="index"
          >
            <div>
              <img :src="item.selected ? item.activeUrl : item.imgUrl" alt />
            </div>
            <span>{{ item.title }}</span>
          </div>
        </div>
        <!-- 高级设置 -->
        <div class="right" v-show="showSetting">
          <div class="title">
            <div
              class="introduce"
              :class="{ active: selectType === index }"
              v-for="(item, index) in typeList"
              :key="index"
              @click="selectType = index"
            >
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="set-content">
            <div class="change-email" @click="toShowEmail">邮箱修改</div>
            <div class="change-pwd" @click="toShowPassword">密码修改</div>
            <div class="login-out" @click="loginOut">退出账号</div>
          </div>
        </div>
        <!-- 我的订单 -->
        <div class="order-content" v-show="showOrder">
          <div class="title">
            <div>
              <span>订单编号</span>
            </div>
            <div>
              <span>客户名称</span>
            </div>
            <div>
              <span>机型</span>
            </div>
            <div>
              <span>单价(￥)</span>
            </div>
            <div>
              <span>数量</span>
            </div>
            <div>
              <span>总价(￥)</span>
            </div>
            <div>
              <span>下单日期</span>
            </div>
            <div>
              <span>编辑</span>
            </div>
            <div>
              <span>状态</span>
            </div>
            <div>
              <span>删除</span>
            </div>
          </div>
          <div class="order-wrap">
            <div
              class="concept"
              v-for="(item, index) in orderList"
              :key="index"
            >
              <div>
                <span>{{ item.orderno ? item.orderno : "" }}</span>
              </div>
              <div>
                <span>
                  {{
                    item.proSaleInfo.neederCompany
                      ? item.proSaleInfo.neederCompany
                      : ""
                  }}
                </span>
              </div>
              <div class="multi-row">
                <span
                  v-for="(itemC, index) in item.techAgreementMatchs"
                  :key="index"
                  >{{ itemC.matchNameCH }}</span
                >
              </div>
              <div class="multi-row">
                <span
                  v-for="(itemC1, index) in item.techAgreementMatchs"
                  :key="index"
                  >{{ itemC1.unitPrice | toFixed(2) }}</span
                >
              </div>
              <div class="multi-row">
                <span
                  v-for="(itemC2, index) in item.techAgreementMatchs"
                  :key="index"
                  >{{ itemC2.num }}</span
                >
              </div>
              <div>
                <span>{{ item.total | toFixed(2) }}</span>
              </div>
              <div>
                <span>{{ item.createTm }}</span>
              </div>
              <div>
                <img
                  v-if="item.status"
                  :src="editIcon"
                  @click="editOrder(item.form, item.id)"
                />
              </div>
              <div :class="{ active: item.status }">
                <span v-if="item.status" @click="save(item.id)">生成订单</span>
                <span v-else>订单已生成</span>
              </div>
              <div>
                <img
                  class="del-img"
                  :src="delOrder"
                  @click="deleteOrder(item)"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 意见反馈 -->
        <div class="suggest-content" v-show="showSuggest">
          <!-- 不要title，因为没有内容，也撑不开 -->
          <p>请详细写下您的意见和问题，我们会尽快解决您的反馈：</p>
          <div class="text-suggest">
            <textarea
              v-model="sug.content"
              class="textarea-sugg"
              placeholder="请填写您的意见和问题......"
            ></textarea>
            <p><span class="suggest-len">0</span>/200</p>
            <!-- <div> -->
            <!-- 默认的文件上传控件是没有+符号的 -->
            <!-- <input type="file" /> -->
            <!-- </div> -->
          </div>
          <p>联系方式：</p>
          <div class="text-linked">
            <!--可输入 -->
            <input
              v-model="sug.contact"
              type="text"
              placeholder="请填写您的手机、QQ、邮箱"
            />
          </div>
          <span
            >选填，您的联系方式有助于我们沟通和解决问题，仅工作人员可见</span
          >
          <div @click="submitSuggest">提交</div>
        </div>
      </div>
    </div>
    <div class="pwd-wrap" v-show="showPassword">
      <div class="changepwd">
        <img :src="close" @click="showPassword = false" alt="关闭" />
        <h3>密码修改</h3>
        <div class="pwd-region">
          <div>
            <input
              type="password"
              v-model="pwd.password"
              placeholder="请输入原始密码"
            />
          </div>
          <div>
            <input
              type="password"
              v-model="pwd.newPassword"
              placeholder="请输入新密码"
            />
          </div>
          <div>
            <input
              type="password"
              v-model="pwd.newPasswordAgain"
              placeholder="请输入新密码"
            />
          </div>
          <div class="comfirmBtn" @click="modifyPassword">确认</div>
        </div>
      </div>
    </div>
    <div class="email-wrap" v-show="showEmail">
      <div class="changeemail">
        <img :src="close" @click="showEmail = false" alt="关闭" />
        <h3>邮箱修改</h3>
        <div class="email-region">
          <div>
            <input
              type="text"
              v-model="email.superiorMail"
              placeholder="请输入原始邮箱"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="email.newSuperiorMail"
              placeholder="请输入新邮箱"
            />
          </div>
          <div class="comfirmEmail" @click="modifyEmail">确认</div>
        </div>
      </div>
    </div>
    <div class="change-suc" style="display:none;">
      <img :src="success" alt />
      <h3>修改成功</h3>
    </div>
    <div class="del-wrap" style="display:none;">
      <div class="del">
        <img :src="close" alt />
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
import bankArrow from "./images/返回.png";
import close from "./images/关闭.png";
import success from "./images/成功.png";
import order from "./images/个人中心_我的订单.png";
import orderActive from "./images/个人中心_我的订单_选中.png";
import suggest from "./images/个人中心_意见反馈.png";
import suggestActive from "./images/个人中心_意见反馈_选中.png";
import higherSetting from "./images/个人中心_高级设置.png";
import higherSettingActive from "./images/个人中心_高级设置_选中.png";
import aboutMe from "./images/个人中心_关于我们.png";
import aboutMeActive from "./images/个人中心_关于我们_选中.png";
import editIcon from "./images/编辑.png";
import delOrder from "./images/我的订单_删除.png";

export default {
  data() {
    return {
      bankArrow,
      close,
      success,
      order,
      orderActive,
      editIcon,
      delOrder,
      suggest,
      suggestActive,
      higherSetting,
      higherSettingActive,
      aboutMe,
      aboutMeActive,
      showSetting: false,
      showSuggest: false,
      showOrder: true,
      showEmail: false,
      showPassword: false,
      email: {
        superiorMail: "",
        newSuperiorMail: ""
      },
      pwd: {
        password: "",
        newPassword: "",
        newPasswordAgain: ""
      },
      sug: {
        content: "",
        contact: ""
      },
      newEamil: "",
      userInfo: {},
      leftNavigationList: [
        {
          title: "我的订单",
          imgUrl: order,
          activeUrl: orderActive,
          selected: true
        },
        {
          title: "意见反馈",
          imgUrl: suggest,
          activeUrl: suggestActive,
          selected: false
        },
        {
          title: "高级设置",
          imgUrl: higherSetting,
          activeUrl: higherSettingActive,
          selected: false
        }
        // ,
        // {
        //   title: "关于我们",
        //   imgUrl: aboutMe,
        //   activeUrl: aboutMeActive,
        //   selected: false
        // }
      ],
      typeList: ["内贸", "外销"],
      selectType: 0,
      orderList: []
    };
  },
  mounted() {
    const userInfoStr = this.until.loGet("userInfo");
    if (userInfoStr) {
      this.userInfo = JSON.parse(userInfoStr);
    }
    this.getCartList();
  },
  filters: {
    toFixed(input, param1) {
      //input代表的是管道符前面的内容，param1代表 过滤方法传进来的参数
      return input.toFixed(param1);
    }
  },
  methods: {
    pickOne(itemPick, index) {
      itemPick.selected = true;
      const filter = this.leftNavigationList.filter(item => item !== itemPick);
      filter.map(item => (item.selected = false));

      if (index === 0) {
        this.showOrder = true;
        this.showSetting = false;
        this.showSuggest = false;
      } else if (index === 2) {
        this.showSetting = true;
        this.showOrder = false;
        this.showSuggest = false;
      } else if (index === 1) {
        this.showSuggest = true;
        this.showOrder = false;
        this.showSetting = false;
      }
    },
    toShowEmail() {
      this.showEmail = true;
      if (this.userInfo) {
        this.email.superiorMail = this.newEamil || this.userInfo.email;
      }
    },
    toShowPassword() {
      this.showPassword = true;
    },
    loginOut() {
      this.api.sysLoginOut().then(res => {
        if (res) {
          this.$message({
            message: "退出成功",
            type: "success"
          });

          this.until.loRemove("token");
          this.until.loRemove("userInfo");
          setTimeout(() => {
            this.until.href("login.html");
          }, 1500);
        }
      });
    },
    back() {
      window.history.back();
    },
    modifyEmail() {
      //校验邮箱格式
      if (!this.email.superiorMail) {
        this.$message.error("请输入原始邮箱！");
        return;
      } else if (!this.email.newSuperiorMail) {
        this.$message.error("请输入新邮箱！");
        return;
      } else {
        if (this.reg.checkMail(this.email.superiorMail) !== "ok") {
          this.$message.error("请输入正确的原始邮箱格式！");
          return;
        } else if (this.reg.checkMail(this.email.newSuperiorMail) !== "ok") {
          this.$message.error("请输入正确的新邮箱格式！！");
          return;
        } else {
          let param = this.email;
          if (this.userInfo) {
            param.id = this.userInfo.userId;
          }
          this.api.sysModifyEmail(param).then(res => {
            if (res) {
              this.$message({
                message: "修改邮箱成功",
                type: "success"
              });
              this.showEmail = false;
              this.newEamil = this.email.newSuperiorMail;
              this.email.newSuperiorMail = "";
            }
          });
        }
      }
    },
    modifyPassword() {
      if (!this.pwd.password) {
        this.$message.error("请输入原始密码");
        return;
      } else if (!this.pwd.newPassword || !this.pwd.newPasswordAgain) {
        this.$message.error("请输入新密码");
        return;
      } else {
        if (this.pwd.newPassword !== this.pwd.newPasswordAgain) {
          this.$message.error("请确保两次输入的新密码一致！");
          return;
        }

        const param = {
          password: this.pwd.password,
          newPassword: this.pwd.newPasswordAgain
        };
        this.api.sysModifyPassword(param).then(res => {
          if (res) {
            this.$message({
              message: "修改密码成功",
              type: "success"
            });
            this.showPassword = false;
            this.pwd = {};
          }
        });
      }
    },
    submitSuggest() {
      if (!this.sug.content) {
        this.$message.error("请填写您的意见和问题再提交！");
        return;
      }
      if (!this.sug.contact) {
        this.$message.error("请填写您的联系方式再提交！");
        return;
      }

      let param = this.sug;
      if (this.userInfo) {
        param.appuserId = this.userInfo.userId;
      }

      this.api.sysSuggestCallback(param).then(res => {
        if (res) {
          this.$message({
            message: "您填写的意见反馈已经提交",
            type: "success"
          });
          this.sug = {};
        }
      });
    },
    editOrder(form, id) {
      const str = JSON.stringify(form);
      this.until.href(`optional.html?form=${str}&id=${id}`);
    },
    deleteOrder(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.orderList = this.orderList.filter(itemCart => itemCart !== item);
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
    async getCartList() {
      const query = new this.Query();
      query.buildWhereClause("userId", this.userInfo.userId, "EQ");
      query.buildOrderClause("updTm", "desc");

      const param = query.getParam();
      let list = await this.api.sysGetCartList(param);
      list.forEach(item => {
        if (item.data) {
          const data = JSON.parse(item.data);
          data.id = item.id;
          this.orderList.push(data);
        }
      });

      this.orderList.forEach((item, index) => {
        let total = 0;
        item.techAgreementMatchs.forEach(itemChild => {
          total += itemChild.unitPrice * itemChild.num;
        });
        item.status = true;
        item.total = total;
        this.$set(this.orderList, index, item);
      });
    },
    save(id) {
      //提交订单

      const checkedOrderList = this.orderList.filter(item => item.id === id);
      const param1 = checkedOrderList.map(item => {
        return {
          techAgreementMatchs: item.techAgreementMatchs,
          techAgreement: item.techAgreement
        };
      });

      const param2 = checkedOrderList.map(item => {
        const money = (item.proSaleInfo.price * item.num).toFixed(2);
        const saleMoney = (item.proSaleInfo.salePrice * item.num).toFixed(2);
        return {
          name: item.form.model,
          modelNumber: item.proSaleInfo.modelNumber,
          num: item.num,
          price: item.proSaleInfo.price,
          salePrice: item.proSaleInfo.salePrice,
          money,
          saleMoney
        };
      });

      const param3 = {
        neederCompany: checkedOrderList[0].proSaleInfo.neederCompany,
        supplier: "博创智能装备股份有限公司",
        appuserId: this.userInfo.userId,
        remark: this.param.remark,
        supplierAgenter: this.userInfo.nickname,
        supplierTel: this.userInfo.mob,
        signDate: this.time,
        neederPostcode: this.userInfo.email,
        attachment: this.attach,
        saleAgreementProducts: param2
      };

      const param = {
        techAgreementJsons: JSON.stringify(param1),
        saleAgreementJson: JSON.stringify(param3)
      };

      this.api.sysSubmitOrder(param).then(res => {
        if (res) {
          this.showDialog = false;
          this.$message({
            message: "生成订单成功",
            type: "success"
          });
        }
      });
    }
  },

  components: {}
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
html,
body {
  .container {
    width: 100%;
    background-color: #fff;
    .row {
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
      p {
        font-size: 18px;
        margin: 16px 0;
      }
      .content {
        display: -webkit-flex;
        display: flex;
        height: 100%;
        width: 90%;
        margin: 0 auto;
        flex-direction: row;
        flex-wrap: nowrap;
        .left {
          width: 20%;
          height: 94vh;
          background-color: @grayColor;
          .row {
            display: -webkit-flex;
            display: flex;
            margin-left: 0;
            width: 100%;
            padding: 30px 0;
            justify-content: center;
          }
          > .active {
            background-color: #fff;
            border-left: 4px solid @themeColor;
          }
        }
        .right,
        .order-content {
          background-color: #fafbfd;
          width: 80%;
        }
      }
    }
  }
}

.content .order > div,
.content .customer > div,
.content .suggest > div,
.content .multi-set > div,
.content .about-me > div {
  width: 30px;
  height: 30px;
}

.content .row > span {
  line-height: 30px;
  margin-left: 20px;
}

.right .title,
.order-content .title,
.order-wrap .concept {
  margin: 0 auto;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.order-content .title {
  background-color: #f2f5f9;
}
.order-content .title,
.order-wrap .concept {
  justify-content: space-around;
}

.order-wrap .concept {
  padding: 20px 0;
  background-color: #fafbfd;
  border-bottom: 1px solid #f2f5f9;
}

.order-content .title > div,
.order-wrap .concept > div {
  padding: 0.5% 0 0.5% 1%;
}

.order-content > .title > div:nth-of-type(1),
.order-content > .title > div:nth-of-type(7),
.concept > div:nth-of-type(1),
.concept > div:nth-of-type(7) {
  width: 13%;
}

.order-content > .title > div:nth-of-type(5),
.order-content > .title > div:nth-of-type(8),
.order-content > .title > div:nth-of-type(10),
.concept > div:nth-of-type(5),
.concept > div:nth-of-type(8),
.concept > div:nth-of-type(10) {
  width: 5%;
}

.order-content > .title > div:nth-of-type(9),
.concept > div:nth-of-type(9) {
  padding-left: 0;
  color: #d5d5d5;
  text-align: center;
}

.order-content > .title > div:nth-of-type(9) {
  color: #000;
}

.concept > div.active {
  background-color: #00338d;
  border-radius: 5px;
  color: #fff;
}

.order-content > .title > div:nth-of-type(3),
.concept > div:nth-of-type(3) {
  width: 19%;
}

.order-content > .title > div:nth-of-type(2),
.order-content > .title > div:nth-of-type(4),
.order-content > .title > div:nth-of-type(6),
.order-content > .title > div:nth-of-type(9),
.concept > div:nth-of-type(2),
.concept > div:nth-of-type(4),
.concept > div:nth-of-type(6),
.concept > div:nth-of-type(9) {
  width: 8%;
}

.order-wrap {
  .concept {
    .multi-row {
      display: flex;
      display: -webkit-flex;
      flex-flow: column wrap;
      > span {
        flex: 1;
        &:not(:nth-of-type(1)) {
          margin-top: 10px;
        }
      }
    }
  }
}

.suggest-content {
  width: 70%;
  padding: 60px 30% 0 60px;
  background-color: #fff;
}

.suggest-content > p:nth-of-type(2) {
  font-size: 12px;
}

.suggest-content > span {
  font-size: 12px;
}

.suggest-content > div:nth-last-of-type(1) {
  margin-top: 100px;
  padding: 8px 0;
  text-align: center;
  background-color: #00338d;
  color: #fff;
  border-radius: 5px;
}

.text-suggest,
.text-linked {
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 10px 0 15px 10px;
  border: 1px solid #f2f5f9;
  border-radius: 10px;
  background-color: #f2f5f9;
}

.text-linked {
  margin-bottom: 10px;
}

.text-suggest > textarea,
.text-suggest > p,
.text-suggest > div {
  width: 100%;
}

.text-suggest > textarea {
  height: 120px;
  resize: none;
  border: 0;
  background-color: #f2f5f9;
}

.text-linked > input {
  width: 100%;
  resize: none;
  border: 0;
  background-color: #f2f5f9;
}

.text-suggest > p {
  font-size: 10px;
  margin-bottom: 0;
}

.text-suggest > div {
  position: relative;
  border: 1px solid #999;
  background-color: #fff;
  width: 60px;
  height: 60px;
  background: url("./images/up.png") 50% 50% no-repeat;
  background-size: 20px 20px;
  overflow: hidden;
  background-color: #fff;
}

.text-suggest > div > input {
  width: 100%;
  height: 100%;
  opacity: 0;
}

.text-suggest > textarea:focus,
.text-suggest > div > input:focus,
.text-linked > input:focus {
  outline: none;
}

.right .title > div {
  font-size: 16px;
  width: 15%;
  margin: 0 30px;
  padding: 15px 0;
  text-align: center;
  &:nth-of-type(1) {
    margin-left: 25%;
  }
}

.right .title > .active {
  border-bottom: 1px solid #4e72b0;
  color: #4e72b0;
}

.right > .set-content {
  width: 25%;
  margin-top: 9%;
  margin-left: 26%;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.right > .set-content > div {
  padding: 10px 0;
  width: 100%;
  text-align: center;
  border: 1px solid #ced2d8;
  border-radius: 5px;
  cursor: pointer;
  &:nth-last-of-type(1) {
    border: 0;
  }
}

.change-email {
  margin-bottom: 25px;
}

.change-pwd {
  margin-bottom: 90px;
}

.login-out {
  background-color: @themeColor;
  color: #000;
}

.right .concept > p {
  margin-top: 0;
  margin-bottom: 0;
}

.pwd-wrap,
.email-wrap,
.del-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(153, 153, 153, 0.5);
}

.changepwd,
.changeemail {
  position: fixed;
  width: 500px;
  height: 450px;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 10px;
}

.changeemail {
  height: 44%;
}

.changepwd > img,
.changeemail > img {
  position: absolute;
  top: 6%;
  right: 5%;
}

.changepwd h3,
.changeemail > h3 {
  text-align: center;
  margin: 40px 0;
}

.changepwd .pwd-region,
.changeemail .email-region {
  margin: 0 50px;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.changepwd .pwd-region > div:nth-of-type(1),
.changeemail .email-region > div:nth-of-type(1) {
  margin-top: 40px;
}

.changepwd .pwd-region > div,
.changeemail .email-region > div {
  width: 100%;
  margin-bottom: 60px;
  border-bottom: 1px solid #d9d9d9;
}

.changepwd .pwd-region > div {
  margin-bottom: 45px;
}

.changepwd .pwd-region > div:nth-last-of-type(1),
.changeemail .email-region > div:nth-last-of-type(1) {
  padding: 10px 0;
  border: 1px solid #00338d;
  border-radius: 8px;
  background-color: #00338d;
  color: #fff;
  text-align: center;
}

.pwd-region > div > input,
.email-region > div > input {
  width: 100%;
  border: 0;
}

.pwd-region > div > input:focus,
.email-region > div > input:focus {
  outline: none;
}

.change-suc {
  background-color: #fff;
  position: fixed;
  width: 12%;
  height: 14%;
  left: 50%;
  top: 40%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 5px;
  box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
}

.change-suc img {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.change-suc h3 {
  font-size: 16px;
  text-align: center;
}

.row-segment {
  height: 1px;
  background: url("./images/个人中心_左侧线.png") center center no-repeat;
  background-size: cover;
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

.del img {
  position: absolute;
  top: 5%;
  right: 5%;
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
  border: 1px solid #00338d;
  border-radius: 5px;
  background-color: #00338d;
  color: #fff;
  text-align: center;
  width: 45%;
}

.del-cancel {
  border: 1px solid #b5b5b5;
  background-color: #b5b5b5;
}
</style>
