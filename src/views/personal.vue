<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="bankArrow" />
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
          <div class="row order active">
            <div></div>
            <span>我的订单</span>
          </div>
          <div class="row-segment"></div>
          <div class="row suggest">
            <div></div>
            <span>意见反馈</span>
          </div>
          <div class="row-segment"></div>
          <div class="row multi-set">
            <div></div>
            <span>高级设置</span>
          </div>
          <div class="row-segment"></div>
          <div class="row about-me">
            <div></div>
            <span>关于我们</span>
          </div>
          <div class="row-segment"></div>
        </div>
        <!-- 高级设置 -->
        <div class="right" style="display:none;">
          <div class="title">
            <div class="active introduce">
              <span>内贸</span>
            </div>
            <div class="standard">
              <span>外销</span>
            </div>
          </div>
          <div class="set-content">
            <div class="change-email">邮箱修改</div>
            <div class="change-pwd">密码修改</div>
            <div class="login-out">退出登录</div>
          </div>
        </div>
        <!-- 我的订单 -->
        <div class="order-content">
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
          <div class="order-wrap"></div>
        </div>
        <!-- 意见反馈 -->
        <div class="suggest-content" style="display:none;">
          <!-- 不要title，因为没有内容，也撑不开 -->
          <p>请详细写下您的意见和问题，我们会尽快解决您的反馈：</p>
          <div class="text-suggest">
            <textarea class="textarea-sugg" placeholder="请填写您的意见和问题......"></textarea>
            <p>
              <span class="suggest-len">0</span>/200
            </p>
            <div>
              <!-- 默认的文件上传控件是没有+符号的 -->
              <input type="file" />
            </div>
          </div>
          <p>联系方式：</p>
          <div class="text-linked">
            <!--可输入 -->
            <input type="text" placeholder="请填写您的手机、QQ、邮箱" />
          </div>
          <span>选填，您的联系方式有助于我们沟通和解决问题，仅工作人员可见</span>
          <div>提交</div>
        </div>
      </div>
    </div>
    <div class="pwd-wrap" style="display:none;">
      <div class="changepwd">
        <img :src="close" alt="关闭" />
        <h3>密码修改</h3>
        <div class="pwd-region">
          <div>
            <input type="text" placeholder="请输入原始密码" />
          </div>
          <div>
            <input type="text" placeholder="请输入新密码" />
          </div>
          <div>
            <input type="text" placeholder="请输入新密码" />
          </div>
          <div class="comfirmBtn">确认</div>
        </div>
      </div>
    </div>
    <div class="email-wrap" style="display:none;">
      <div class="changeemail">
        <img :src="close" alt="关闭" />
        <h3>邮箱修改</h3>
        <div class="email-region">
          <div>
            <input type="text" placeholder="请输入原始邮箱" />
          </div>
          <div>
            <input type="text" placeholder="请输入新邮箱" />
          </div>
          <div class="comfirmEmail">确认</div>
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

export default {
  data() {
    return {
      bankArrow,
      close,
      success
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
html,
body {
  height: 100%;
  background-color: #f2f5f9;
}

.container {
  width: 100%;
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

.row p {
  font-size: 18px;
  margin: 16px 0;
}

.content {
  display: -webkit-flex;
  display: flex;
  height: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
}

.content .left {
  width: 30%;
  height: 100vh;
  background-color: #fff;
}

.content .right,
.content .order-content {
  background-color: #fafbfd;
  width: 70%;
}

.content .left .row {
  display: -webkit-flex;
  display: flex;
  margin-left: 0;
  width: 100%;
  padding: 30px 0;
  background: url("./images/个人中心_左侧导航.png") no-repeat top center;
  background-size: cover;
}

.content .left > .active {
  background-image: url("./images/个人中心_左侧导航_选中.png");
}

.content .order > div,
.content .customer > div,
.content .suggest > div,
.content .multi-set > div,
.content .about-me > div {
  width: 30px;
  height: 30px;
  margin-left: 35%;
  background: url("./images/个人中心_我的订单.png") no-repeat;
}

.content .customer > div {
  background-image: url("./images/个人中心_我的客户.png");
}

.content .suggest > div {
  background-image: url("./images/个人中心_意见反馈.png");
}

.content .multi-set > div {
  background-image: url("./images/个人中心_高级设置.png");
}

.content .about-me > div {
  background-image: url("./images/个人中心_关于我们.png");
}

.content .order > .active {
  background-image: url("./images/个人中心_我的订单_选中.png");
}

.content .customer > .active {
  background-image: url("./images/个人中心_我的客户_选中.png");
}

.content .suggest > .active {
  background-image: url("./images/个人中心_意见反馈_选中.png");
}

.content .multi-set > .active {
  background-image: url("./images/个人中心_高级设置_选中.png");
}

.content .about-me > .active {
  background-image: url("./images/个人中心_关于我们_选中.png");
}

.content .row > span {
  line-height: 30px;
  margin-left: 20px;
}

.right .title,
.order-content .title,
.order-wrap .concept,
.order-wrap .concept-multi {
  margin: 0 auto;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.order-wrap .concept-multi {
  flex-wrap: wrap;
  justify-content: space-around;
}

.order-content .title {
  background-color: #f2f5f9;
}
.order-content .title,
.order-wrap .concept {
  justify-content: space-around;
}

.order-wrap .concept,
.order-wrap .concept-multi {
  padding: 20px 0;
  background-color: #fafbfd;
  border-bottom: 1px solid #f2f5f9;
}

.order-content .title > div,
.order-wrap .concept > div,
.concept-multi > div {
  padding: 0.5% 0 0.5% 1%;
}

.order-content > .title > div:nth-of-type(1),
.order-content > .title > div:nth-of-type(7),
.concept > div:nth-of-type(1),
.concept > div:nth-of-type(7) {
  width: 13%;
}

.concept-multi > div:nth-of-type(10n + 1),
.concept-multi > div:nth-of-type(10n + 7) {
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

.concept-multi > div:nth-of-type(10n + 5),
.concept-multi > div:nth-of-type(10n + 8),
.concept-multi > div:nth-of-type(10n + 10) {
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

.concept > div.active,
.concept-multi > div.active {
  background-color: #00338d;
  border-radius: 5px;
  color: #fff;
}

.concept-multi > div:nth-of-type(10n + 9) {
  color: #d5d5d5;
  text-align: center;
}

.order-content > .title > div:nth-of-type(3),
.concept > div:nth-of-type(3) {
  width: 19%;
}

.concept-multi > div:nth-of-type(10n + 3) {
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

.concept-multi > div:nth-of-type(10n + 2),
.concept-multi > div:nth-of-type(10n + 4),
.concept-multi > div:nth-of-type(10n + 6),
.concept-multi > div:nth-of-type(10n + 9) {
  width: 8%;
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
  font-size: 10px;
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
  height: 70px;
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
}

.right .title .introduce {
  margin-left: 25%;
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
  border: 1px solid #00338d;
  border-radius: 5px;
}

.change-email {
  margin-bottom: 25px;
}

.change-pwd {
  margin-bottom: 90px;
}

.login-out {
  background-color: #00338d;
  color: #fff;
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
