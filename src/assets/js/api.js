import { until } from "./until";
const untilApi = new until();

class api {
  //不检查设备id
  sysLoginNotCheckEquip(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/api/general/access/login", data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //登出
  sysLoginOut() {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi.get("/api/general/access/logout", "", header).then(res => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  //修改邮箱
  sysModifyEmail(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi
        .postData("/api/suji/appuser/updEmail", JSON.stringify(data), header)
        .then(res => {
          if (res.code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  }
  //修改密码
  sysModifyPassword(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi
        .postData("/api/suji/appuser/passwordPc", JSON.stringify(data), header)
        .then(res => {
          if (res.code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  }
  //意见反馈
  sysSuggestCallback(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi
        .postData("/api/suji/suggest/addOut", JSON.stringify(data), header)
        .then(res => {
          if (res.code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  }
}

export { api };
