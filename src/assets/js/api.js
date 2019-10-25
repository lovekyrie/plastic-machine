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
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/matchMenu/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配-锁模力
  sysGetClampingForceList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/machineParam/listClampForce", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配-注射当量
  sysGetInjectionList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/machineParam/listInjection", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配-螺杆类型
  sysGetScrewList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/screwType/listScrewType", data).then(res => {
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
  //产品概览-顶部机型列表
  sysGetProductBigModelList() {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/product/listPC", "").then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //产品概览-左侧机型列表
  sysGetLeftSideSmallModelList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/standardMachine/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //产品概览-性能特征
  sysGetPerformanceCharacter(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/productInfo/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //产品概览-典型制品
  sysGetTypicalProduct(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/productInfo2/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //产品概览-标准配置
  sysGetStandardSetting(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/productInfo1/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //产品概览-技术参数
  sysGetTechnicalParameter(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/screwType/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //厂房规划机型列表
  modelList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/factoryParams/listMachineModel", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //厂房规划锁模力列表
  clampingForce(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/factoryParams/listClampForce", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //厂房规划注射列表
  injection(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/factoryParams/listInjection", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //厂房规划详情
  factoryInfo(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/factoryParams/getFactoryParams", data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配-尺寸查询
  sysGetRelatedSize(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/machineParam/getImg", data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //机型选配-获取选配项
  sysGetMatchMenu(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/matchMenuPrice/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //特殊选配-获取选配项
  sysGetUniqueMatchMenu(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/selectEditInfo/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //pc机型选配-标准机/组合机检查
  sysGetStandardOrCombination(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/standardMachine/check", data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配-底部行业配置
  sysGetIndustrySettingList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/featurePack/listFeaturePack", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //选配结果-参数部门
  sysGetOptionResultParamList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/screwType/infoPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  //新增到购物车
  sysPosttoCart(data) {
    return new Promise((resolve, reject) => {
      untilApi.postData("/suji/cart/addPC", JSON.stringify(data)).then(res => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  //购物车列表
  sysGetCartList(data) {
    return new Promise((resolve, reject) => {
      untilApi.get("/suji/cart/listPC", data).then(res => {
        if (res.code === 0) {
          resolve(res.data.list);
        } else {
          reject(res);
        }
      });
    });
  }
  //修改购物车
  sysModifyCart(data) {
    return new Promise((resolve, reject) => {
      untilApi.postData("/suji/cart/updPC", JSON.stringify(data)).then(res => {
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
