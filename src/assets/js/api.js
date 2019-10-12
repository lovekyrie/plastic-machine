import { until } from "./until";
const untilApi = new until();

class api {
  //产品线
  getProductCatList() {
    return new Promise((resolve, reject) => {
      untilApi.get("/crm/cat/api/list").then(res => {
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
