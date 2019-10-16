import { until } from "./until";
const untilApi = new until();

class api {
  //不检查设备id
  sysLoginNotCheckEquip(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/general/access/login", data).then(res => {
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
      untilApi.get("/general/access/logout", "", header).then(res => {
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
        .postData("/suji/appuser/updEmail", JSON.stringify(data), header)
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
        .postData("/suji/appuser/passwordPc", JSON.stringify(data), header)
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
        .postData("/suji/suggest/addOut", JSON.stringify(data), header)
        .then(res => {
          if (res.code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  }
  //机型
  sysGetModelList(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/matchMenu/listPC", data, header).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //锁模力
  sysGetClampingForceList(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/matchMenu/listxPC", data, header).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //注射当量
  sysGetInjectionList(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/matchMenu/listxPC", data, header).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //螺杆类型
  sysGetScrewList(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/matchMenu/listPC", data, header).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配一级菜单
  sysGetBigMenuList() {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/menuName/listPC", "", header).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配二级菜单
  sysGetSmallMenuList(data) {
    let header = {
      "yui3-token": untilApi.loGet("token")
    };
    return new Promise((resolve, reject) => {
      untilApi
        .get("/suji/secondLevelMenuName/listPC", data, header)
        .then(res => {
          if (res.code === 0) {
            resolve(res.data.list);
          } else {
            reject(res);
          }
        });
    });
  }
  //系统消息列表
  msgList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/notice/pageOut", data).then(res => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  //系统消息详情
  msgDetail(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/notice/infoOut/" + data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //运维指南顶部下拉列表
  operAndMainTopList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/sys/cat/listByPcd2", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }

  //运维指南顶部左边列表
  operAndMainLeftList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/trainTypeOne/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //运维指南顶部左边列表二级
  operAndMainLeftList2(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/trainTypeTwo/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //运维指南内容
  operAndMainDetail(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/trainContent/getContent", data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //冷却水管分页列表
  waterPipeList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/coolingPipe/pagePC", data).then(res => {
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
