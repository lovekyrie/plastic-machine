<template>
  <div id="container">
    <div class="login">
      <h3>海天塑机销售选配系统</h3>
      <div class="operate">
        <div>
          <img :src="accountIcon" alt />
          <input
            id="account"
            v-model="account"
            type="text"
            placeholder="账号"
          />
        </div>
        <div>
          <img :src="passwordIcon" alt />
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="密码"
          />
        </div>
        <div>
          <div class="remember" @click="rememberClick = !rememberClick">
            <span type="true" :class="{ active: rememberClick }">记住密码</span>
          </div>
        </div>
        <div @click="login">
          <span>登录</span>
        </div>
      </div>
    </div>
    <div class="row copy-right">
      <span>Copyright &#169; 2018 WCJ2100</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import accountIcon from "./images/账号.png";
import passwordIcon from "./images/密码.png";
export default {
  data() {
    return {
      accountIcon,
      passwordIcon,
      rememberClick: false,
      account: "",
      password: "",
      macAddress: ""
    };
  },
  mounted() {

  },
  methods: {
    login() {
      if (!this.account) {
        alert("请输入用户名");
      } else if (!this.password) {
        alert("请输入密码");
      } else {
        //调用接口
        let param = {
          username: this.account,
          password: this.password,
          rememberMe: this.rememberClick
        };

        this.api.sysLoginNotCheckEquip(param).then(res => {
          if (res) {
            this.$message({
              message: "登录成功",
              type: "success"
            });

            this.until.loSave('token',res.token)
            this.until.loSave('userInfo',JSON.stringify(res.userInfo))
            setTimeout(() => {
              window.location.href = "home.html";
            }, 1500);
          }
        });
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
#container {
  width: 100%;
  height: 100%;
  background: url("./images/登录背景.png") no-repeat top center;
  background-size: cover;
}

.login {
  position: fixed;
  left: 50%;
  top: 40%;
  width: 410px;
  height: 310px;
  transform: translate3d(-50%, -50%, 0);
  background-color: #e5f1fa;
  border-radius: 10px;
}

.login h3 {
  text-align: center;
  margin: 25px 0;
  color: #00338d;
}

.login .operate {
  margin: 0 30px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.operate > div {
  display: -webkit-flex;
  display: flex;
  position: relative;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #b3b8bc;
}

.operate > div > img {
  height: 20px;
  margin: 5px 10px 0;
}

.operate > div > span {
  margin-top: 5px;
  margin-right: 20px;
}

.operate > div:nth-last-of-type(2) {
  border: 0;
}

.remember,
.auto-login {
  flex: 2;
}

.remember > span::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #979798;
  border-radius: 15%;
  vertical-align: middle;
  margin-right: 10px;
  background-image: none;
}

.remember > span.active::before {
  background: url("./images/勾选.png") no-repeat center center;
}

.operate > div:nth-last-of-type(1) {
  padding: 8px 0;
  background-color: #00338d;
  color: #fff;
  border-radius: 5px;
}

.operate > div:nth-last-of-type(1) > span {
  margin-left: 50%;
  transform: translateX(-50%);
}

.operate > div > input {
  background-color: #e5f1fa;
  flex: 1;
  border: 0;
  padding: 5px 0;
}

input:focus {
  outline: 0;
}

.copy-right {
  width: 100%;
  height: 3%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #a7a7a7;
  line-height: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
