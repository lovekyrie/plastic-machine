<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center-nopick">
          <span>行业选配</span>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项1 -->
        <div class="left">
          <!-- 一级行业 -->
          <p>一级行业</p>
          <div v-for="(item, index) in productList" :key="index">
            <div
              @click="selectLeftItem(item.id, index)"
              class="row"
              :class="{ active: index === selectIndex }"
            >
              <span>{{ item.name }}</span>
            </div>
            <div class="row-segment"></div>
          </div>
        </div>
        <!-- 左侧选项2 子类 -->
        <div class="middle">
          <!-- 二级行业 -->
          <p>二级行业</p>
          <div v-for="(item, index) in productChildList" :key="index">
            <div
              @click="selectChildItem(item, index)"
              class="row"
              :class="{ active: index === selectTwoIndex }"
            >
              <span>{{ item.name }}</span>
            </div>
            <div class="row-segment"></div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <el-select v-model="firstId" @change="changeType" placeholder="请选销售地区">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <div class="machine-type">机型</div>
            <div class="select-opt">
              <div class="sel-wrap">
                <el-select v-model="form.modelID" @change="changeModel" placeholder="请选择机型">
                  <el-option
                    v-for="item in modelList"
                    :key="item.id"
                    :label="item.modelTypeNm"
                    :value="item.modelType"
                  ></el-option>
                </el-select>
              </div>
              <div class="sel-wrap">
                <el-select
                  v-model="form.clampingForceId"
                  @change="changeClamping"
                  placeholder="请选择锁模力"
                >
                  <el-option
                    v-for="item in clampingForceList"
                    :key="item.id"
                    :label="item.clampingForceNm"
                    :value="item.clampingForce"
                  ></el-option>
                </el-select>
              </div>
              <div class="sel-wrap">
                <el-select
                  v-model="form.injectionId"
                  @change="changeInjection"
                  placeholder="请选择注射当量"
                >
                  <el-option
                    v-for="item in injectionList"
                    :key="item.id"
                    :label="item.injectionNm"
                    :value="item.injection"
                  ></el-option>
                </el-select>
              </div>
              <div class="sel-wrap">
                <el-select v-model="form.screw" @change="changeScrew" placeholder="螺杆型号">
                  <el-option
                    v-for="item in screwModelList"
                    :key="item.id"
                    :label="item.screwTypeNm"
                    :value="item.screwType"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="option-list">
            <!-- 选择列表 -->
            <ul>
              <!-- 选择标题 -->
              <li>
                <img :src="noPick" alt />
                <span>{{ packageNm }}</span>
                <ol>
                  <li v-for="(item, index) in optionList" :key="index">
                    <img :src="item.checked?pickAll:noPick" @click="pickItem(item)" alt />
                    <span>{{ item.sname }}</span>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="footer">
        <div class="foot-wrap">
          <div @click="toShowIndustry">
            <span class="industry">行业配置</span>
          </div>
          <div class="certain-option" @click="toOptionResult">确认</div>
        </div>
      </div>
    </div>
    <div class="basic-model" v-show="showDialog">
      <div class="industry-set" v-show="showIndustry">
        <img class="btn-close" @click="closeIndustry" :src="closeIcon" alt />
        <div v-if="showSettingOp">
          <span>注射当量：</span>
          <el-select v-model="form.injection" placeholder="请选择">
            <el-option
              v-for="item in settingList"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div v-else>
          <span>没有行业配置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import closeIcon from "./images/关闭.png";
import pickAll from "./images/选配清单_全选.png";
import noPick from "./images/选配清单_未选.png";
export default {
  data: () => {
    return {
      backArrow,
      closeIcon,
      pickAll,
      noPick,
      modelList: [],
      clampingForceList: [],
      injectionList: [],
      screwModelList: [],
      bigMenuList: [],
      smallMenuList: [],
      packageNm: "",
      bigMenuIndex: 0,
      bigMenuId: "",
      showDialog: false,
      showIndustry: false,
      relatedSizeImg: "",
      cartId: "",
      selectIndex: 0,
      selectTwoIndex: 0,
      paramForm: {},
      productList: [],
      productChildList: [],
      form: {
        model: "",
        clampingForce: "",
        injection: "",
        screw: "",
        modelID: "",
        clampingForceId: "",
        injectionId: "",
        screwId: ""
      },
      property: {},
      showType: false,
      machineType: "",
      settingList: [],
      showSettingOp: false,
      optionList: [],
      typeList: [],
      firstId: 38,
      secondId: 0,
      thirdId: 0,
      propertyList: [],
      cartInfo: {}
    };
  },
  async mounted() {
    const formStr = this.until.getQueryString("form");
    const idStr = this.until.getQueryString("id");
    if (formStr) {
      this.paramForm = JSON.parse(formStr);
    }
    const {
      model,
      modelID,
      injection,
      injectionId,
      clampingForce,
      clampingForceId,
      screw,
      screwId
    } = this.paramForm;
    this.cartId = idStr ? idStr : "";
    await this.getTypeList();

    await this.changeType(this.firstId);
    await this.selectLeftItem(this.secondId, 0);
    await this.getModelList();
    if (model && modelID) {
      this.form.modelID = modelID;
      this.form.model = model;
    }
    await this.getClampingForceList();
    if (clampingForce && clampingForceId) {
      this.form.clampingForceId = clampingForceId;
      this.form.clampingForce = clampingForce;
    }
    await this.getInjectionList();
    if (injection && injectionId) {
      this.form.injection = injection;
      this.form.injectionId = injectionId;
    }
    await this.getScrewList();
    if (screw && screwId) {
      this.form.screw = screw;
      this.form.screwId = screwId;
    }

    if (this.cartId) {
      await this.getOrderInfo();
    }

    await this.getIndustryOptionalList();
  },
  methods: {
    async getOrderInfo() {
      const info = await this.api.sysGetOrderInfoById(this.cartId);
      if (info) {
        this.cartInfo = JSON.parse(info.data);
      }
    },
    renderOriginalValue() {
      //选中之前选中的值
      let originType = true;
      const proArr = this.until.loGet("property");
      if (proArr) {
        originType = true;
        this.originalProp = JSON.parse(proArr);
      } else {
        this.originalProp = this.cartInfo.techAgreementMatchs
          ? this.cartInfo.techAgreementMatchs
          : [];
        originType = false;
      }

      for (let i = 0, len = this.originalProp.length; i < len; i++) {
        const element = this.originalProp[i];
        this.optionList.forEach((child, index) => {
          if (originType) {
            if (child.cd === element.cd) {
              child.checked = true;
              child.name = child.sname;
              this.propertyList.push(child);
            }
          } else {
            if (child.cd === element.code) {
              child.checked = true;
              child.name = child.sname;
              this.propertyList.push(child);
            }
          }
          this.$set(this.optionList, index, child);
        });
      }
    },
    async getTypeList() {
      const list = await this.api.sysGetMachineTypeList({ pId: 0 });
      list.forEach(item => {
        this.typeList.push(item.sujiIndustryCategoryVo);
      });
    },
    async changeType(e) {
      const list = await this.api.sysGetMachineTypeList({ pId: e });
      list.forEach(item => {
        this.productList.push(item.sujiIndustryCategoryVo);
      });
      this.secondId = this.productList[0].id;
    },
    async changeModel(e) {
      const index = this.modelList.findIndex(item => item.modelType === e);
      if (index >= 0) {
        this.form.model = this.modelList[index].modelTypeNm;
      }
      await this.getClampingForceList();
      await this.getInjectionList();
      await this.getScrewList();
      await this.getIndustryOptionalList();
    },

    async changeClamping(e) {
      const index = this.clampingForceList.findIndex(
        item => item.clampingForce === e
      );
      if (index >= 0)
        this.form.clampingForce = this.clampingForceList[index].clampingForceNm;
      await this.getInjectionList();
      await this.getScrewList();
      await this.getIndustryOptionalList();
    },

    async changeInjection(e) {
      const index = this.injectionList.findIndex(item => item.injection === e);
      if (index >= 0)
        this.form.injection = this.injectionList[index].injectionNm;
      await this.getScrewList();
      await this.getIndustryOptionalList();
    },
    async changeScrew(e) {
      const index = this.screwModelList.findIndex(item => item.screwType === e);
      if (index >= 0) this.form.screw = this.screwModelList[index].screwTypeNm;
      await this.getIndustryOptionalList();
    },
    back() {
      window.history.back();
    },
    pickItem(item) {
      item.checked = !item.checked;
      item.name = item.sname;
      const i = this.optionList.findIndex(k => k === item);
      this.$set(this.optionList, i, item);
      //拼进propertyList,供我的清单中查看
      if (item.checked) {
        this.propertyList.push(item);
      }
    },
    dealWithProperty() {
      //需要整理property里面有数据的值，传过去

      this.propertyList = this.until.arrayDeduplication(this.propertyList);
      const propertyStr = JSON.stringify(this.propertyList);
      this.until.loSave("property", propertyStr);
      if (this.propertyList.length === 0) {
        this.$message.error("您当前未选择任何选配项，请选择再前往查看！");
        return;
      }
    },
    toOptionResult() {
      this.dealWithProperty();
      this.form.machineType = this.machineType;
      const option = JSON.stringify(this.form);
      this.until.href(
        `optionalResult.html?option=${option}&cartId=${this.cartId}&type=industry`
      );
    },
    chooseBigMenu(item, i) {
      this.bigMenuIndex = i;
      this.bigMenuId = item.id;
      this.getSmallMenuList();
    },
    toShowIndustry() {
      this.showDialog = true;
      this.showIndustry = true;

      const param = {
        modelType: this.form.modelID,
        clampingForce: this.form.clampingForceId,
        injection: this.form.injectionId,
        screwType: this.form.screwId
      };

      this.settingList = this.api.sysGetIndustrySettingList(param);
      if (this.settingList.length > 0) {
        this.showSettingOp = true;
      }
    },
    async getIndustryOptionalList() {
      const param = {
        modelType: this.form.modelID,
        clampingForce: this.form.clampingForceId,
        injection: this.form.injectionId,
        screwType: this.form.screwId
      };

      this.optionList = await this.api.sysGetIndustrySettingList(param);
      this.optionList.forEach((item, index) => {
        if (item.status === -1 || item.status === 0) {
          item.checked = true;
          item.name = item.sname;
          this.propertyList.push(item);
        } else {
          item.checked = false;
        }
        this.$set(this.optionList, index, item);
      });
      this.renderOriginalValue();
    },
    closeIndustry() {
      this.showIndustry = false;
      this.showDialog = false;
    },
    async selectLeftItem(id, index) {
      this.productChildList = [];
      this.selectIndex = index;
      const list = await this.api.sysGetMachineTypeList({ pId: id });
      list.forEach(item => {
        this.productChildList.push(item.sujiIndustryCategoryVo);
      });
      this.thirdId = this.productChildList[0].id;
      await this.getModelList();
      await this.getClampingForceList();
      await this.getInjectionList();
      await this.getScrewList();
    },
    async selectChildItem(item, index) {
      this.selectTwoIndex = index;
      this.thirdId = item.id;
      await this.getModelList();
      await this.getClampingForceList();
      await this.getInjectionList();
      await this.getScrewList();
    },
    async getModelList() {
      const query = new this.Query();
      query.buildWhereClause("categoryId", this.thirdId, "EQ");
      const param = query.getParam();
      param.categoryId = this.thirdId;
      this.modelList = await this.api.sysGetIndustryOptionalModelList(param);
      if (this.modelList.length > 0) {
        this.packageNm = this.modelList[0].name;
        this.form.model = this.modelList[0].modelTypeNm;
        this.form.modelID = this.modelList[0].modelType;
        this.modelCode = this.modelList[0].modelCode;
        this.propertiesLetter = this.modelList[0].propertiesLetter;
      } else {
        this.form = {
          model: "",
          clampingForce: "",
          injection: "",
          screw: "",
          modelID: "",
          clampingForceId: "",
          injectionId: "",
          screwId: ""
        };
      }
    },
    async getClampingForceList() {
      if (this.form.modelID) {
        const query = new this.Query();
        query.buildWhereClause("categoryId", this.thirdId, "EQ");
        const param = query.getParam();
        param.categoryId = this.thirdId;
        param.modelType = this.form.modelID;
        this.clampingForceList = await this.api.sysGetIndustryOptionalForceList(
          param
        );

        if (this.clampingForceList.length > 0) {
          this.form.clampingForceId = this.clampingForceList[0].clampingForce;
          this.form.clampingForce = this.clampingForceList[0].clampingForceNm;
        } else {
          this.form.clampingForceId = "";
          this.form.clampingForce = "";
        }
      }
    },
    async getInjectionList() {
      if (this.form.modelID && this.form.clampingForceId) {
        const query = new this.Query();
        query.buildWhereClause("categoryId", this.thirdId, "EQ");

        const param = query.getParam();
        param.categoryId = this.thirdId;
        param.modelType = this.form.modelID;
        param.clampingForce = this.form.clampingForceId;

        this.injectionList = await this.api.sysGetIndustryOptionalInjectionList(
          param
        );
        if (this.injectionList.length > 0) {
          this.form.injectionId = this.injectionList[0].injection;
          this.form.injection = this.injectionList[0].injectionNm;
        } else {
          this.form.injectionId = "";
          this.form.injection = "";
        }
      }
    },
    async getScrewList() {
      if (
        this.form.modelID &&
        this.form.clampingForceId &&
        this.form.injectionId
      ) {
        const query = new this.Query();
        query.buildWhereClause("categoryId", this.thirdId, "EQ");

        const param = query.getParam();
        param.categoryId = this.thirdId;
        param.modelType = this.form.modelID;
        param.clampingForce = this.form.clampingForceId;
        param.injection = this.form.injectionId;

        this.screwModelList = await this.api.sysGetIndustryOptionalScrewTypeList(
          param
        );

        this.form.screwId = this.screwModelList[0].screwType;
        this.form.screw = this.screwModelList[0].screwTypeNm;
      }
    }
  },
  components: {}
};
</script>

<style lang="less">
@import url("../styles/main.less");
html,
body {
  background-color: #fff;
}

#container {
  padding: 0 15px;
  width: 100%;

  .row {
    .content {
      font-size: 16px;
      width: 100%;
      background-color: #fff;
      overflow: hidden;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      .left,
      .middle {
        width: 15%;
        background-color: #fff;
        p {
          text-align: center;
          margin-bottom: 20%;
          padding: 30px 0;
        }
        .row {
          margin-left: 0;
          width: 100%;
          padding: 15px 0;

          > span {
            margin-left: 40%;
          }
        }
        .active {
          background-color: @themeColor;
          color: #000;
        }
        .row-segment {
          height: 1px;
          background: url("./images/个人中心_左侧线.png") center center
            no-repeat;
          background-size: cover;
        }
      }
      .right {
        width: 70%;
        .title {
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          align-items: center;
          padding: 2% 0;
          .machine-type {
            font-size: 20px;
          }
          .select-opt {
            display: -webkit-flex;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            > div {
              position: relative;
              height: 4.5%;
              width: 18%; /*中间留空隙*/
              display: -webkit-flex;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              align-content: center;
            }
            .sel-wrap {
              font-size: 16px;
              display: -webkit-flex;
              display: flex;
              > span {
                padding: 10px 0;
                display: inline-block;
                width: 40%;
              }
              .el-select {
                input {
                  border: 0;
                  background-color: #f2f5f9;
                }
              }
              input {
                border: 0;
                background-color: #f2f5f9;
                outline: none;
              }
            }
            div {
              > img {
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
              }
            }
          }
        }
        .option-list {
          margin: 4% 0 0 10%;
          ul,
          li {
            list-style: none;
          }
          ul {
            li {
              span {
                margin-left: 2%;
              }
              ol {
                margin-top: 30px;
                li {
                  margin-bottom: 30px;
                  span {
                    margin-left: 4%;
                  }
                }
              }
            }
          }
        }
      }
    }
    .footer {
      border-top: 1px solid #cdcdcd;
      background-color: #f2f5f9;
      width: 100%;
      position: fixed;
      height: 6.6%;
      bottom: 0;
      .foot-wrap {
        width: 42%;
        height: 6.6%;
        position: fixed;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        margin-left: 50%;
        > div {
          width: 18%;
          color: #00338d;
          &:nth-last-of-type(1) {
            padding: 1% 0;
            text-align: center;
            width: 30%;
            background-color: @themeColor;
            color: #000;
            border: 0;
            border-radius: 5px;
          }
        }
      }
    }
  }
}

.basic-model {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: rgba(153, 153, 153, 0.5);
}

.basic-model .industry-set {
  z-index: 1999;
  position: fixed;
  width: 500px;
  height: 490px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 15px;
}

.basic-model .industry-set {
  div {
    margin-top: 40px;
    span {
      margin-left: 30px;
      font-size: 18px;
    }
  }
}

.basic-model .industry-set > img {
  position: absolute;
  top: 5%;
  right: 5%;
}
</style>
