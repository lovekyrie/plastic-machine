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
}

export { api };
