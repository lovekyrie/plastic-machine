<template>
  <div id="container">
    <div class="login">
      <h3>登录</h3>
      <div class="operate">
        <div>
          <img :src="accountIcon" alt />
          <input
            id="account"
            v-model="account"
            type="text"
            placeholder="请输入账号"
          />
        </div>
        <div>
          <img :src="passwordIcon" alt />
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="login"
          />
        </div>
        <div @click="login">
          <button :disabled="canClick">确认</button>
        </div>
      </div>
    </div>
    <div class="row copy-right">
      <p>Copyright &#169; 2016 博创智能装备股份有限公司 版权所有</p>
      <p>技术支持 - 宁波聚联科技有限公司</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import accountIcon from "./images/账号.png";
import passwordIcon from "./images/密码.png";
export default {
  name: "login",
  data() {
    return {
      accountIcon,
      passwordIcon,
      rememberClick: false,
      account: "",
      password: "",
      macAddress: "",
      canClick: false
    };
  },
  watch: {
    account: function(val) {
      if (val) {
        this.canClick = false;
      }
    },
    password: function(val) {
      if (val) {
        this.canClick = false;
      }
    }
  },
  mounted() {},
  methods: {
    login() {
      //调用接口
      this.canClick = true;
      const msg = this.rules();
      if (msg) {
        this.$message.error(msg);
      } else {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          let param = {
            username: this.account,
            password: this.password,
            rememberMe: this.rememberClick
          };

          this.api.sysLoginNotCheckEquip(param).then(res => {
            if (res.code === 400) {
              this.canClick = false;
            } else {
              this.$message({
                message: "登录成功",
                type: "success"
              });

              this.until.loSave("token", res.data.token);
              this.until.loSave("userInfo", JSON.stringify(res.data.userInfo));
              setTimeout(() => {
                window.location.href = "home.html";
              }, 1000);
            }
          });
        }, 1200);
      }
    },
    rules() {
      let msg = "";
      if (!this.account) {
        msg += "请输入用户名";
      } else if (!this.password) {
        msg += "请输入密码";
      }

      return msg;
    }
  },
  components: {}
};
</script>

<style lang="less">
@import url("../styles/main.less");

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
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
}

.login h3 {
  text-align: center;
  margin: 25px 0;
  color: #333;
  letter-spacing: 5px;
}

.login .operate {
  margin: 0 30px;
  display: -webkit-flex;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.operate > div {
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  margin: 10px 0 30px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.operate > div > img {
  width: 20px;
  height: 20px;
}

.operate > div > span {
  margin-top: 5px;
  margin-right: 20px;
}

.remember,
.auto-login {
  flex: 2;
}

.operate > div {
  &:nth-last-of-type(1) {
    width: 80%;
    background-color: @themeColor;
    color: #000;
    border-radius: 5px;
    border: 0;
    > button {
      padding: 15px 0;
      width: 100%;
      border: 0;
      background-color: @themeColor;
      font-size: 16px;
    }
  }
}

.operate > div:nth-last-of-type(1) > span {
  margin-left: 50%;
  transform: translateX(-50%);
}

.operate > div > input {
  margin-left: 40px;
  flex: 1;
  border: 0;
  padding: 5px 0;
  background-color: rgba(255, 255, 255, 0);
}

input:focus {
  outline: 0;
}

.copy-right {
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #666;
  line-height: 2;
}
</style>
