<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center" @click="showOption">
          <span>{{ category }}</span>
          <!-- 下拉图标 -->
          <img class="arrow-side" :src="pullDownIcon" />
        </p>
        <div type="false" class="ul-style" v-if="showType">
          <li
            v-for="(item, index) in optionList"
            :key="index"
            @click="chooseCategory(item,index)"
          >{{ item }}</li>
        </div>
      </div>
    </div>

    <div class="row main-opt">
      <div class="select-opt">
        <div class="sel-wrap">
          <span>机型：</span>
          <el-select v-model="form.modelID" @change="changeModel" placeholder="请选择">
            <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="sel-wrap">
          <span>锁模力：</span>
          <el-select v-model="form.clampingForceId" @change="changeClamping" placeholder="请选择">
            <el-option
              v-for="item in clampingForceList"
              :key="item.value"
              :label="item.name"
              :value="item.clampForceId"
            ></el-option>
          </el-select>
        </div>
        <div class="sel-wrap">
          <span>注射当量：</span>
          <el-select v-model="form.injectionId" @change="changeInjection" placeholder="请选择">
            <el-option
              v-for="item in injectionList"
              :key="item.value"
              :label="item.name"
              :value="item.injectionId"
            ></el-option>
          </el-select>
        </div>
        <div class="sel-wrap">
          <span>螺杆型号：</span>
          <el-select v-model="form.screwId" @change="changeScrew" placeholder="请选择">
            <el-option
              v-for="item in screwModelList"
              :key="item.value"
              :label="item.name"
              :value="item.screwTypeId"
            ></el-option>
          </el-select>
        </div>
        <div class="sel-wrap">
          <span>类别：</span>
          <input readonly type="text" class="text-sel" v-model="machineType" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <div class="sel-one">
          <div
            :class="{ active: bigMenuIndex === index }"
            v-for="(item, index) in bigMenuList"
            :key="item.id"
            @click="chooseBigMenu(item, index)"
          >
            <span>{{ item.nameCh }}</span>
          </div>
        </div>
        <!-- 常规选配 -->
        <div class="usual-pick" v-show="showUsual">
          <ul class="sel-three">
            <li v-for="item in this.smallMenuList" :key="item.matchMenuId" @click="pickItem(item)">
              <img v-if="item.checked" :src="item.status===-1 ?requiredIcon:pickAll" alt />
              <img v-else :src="noPick" alt />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <!-- 特殊选配(定制SO) -->
        <div class="unique-pick" v-show="uniquePick">
          <div class="setting-wrap" v-for="(item, index) in specialList" :key="index">
            <div>
              <img :src="required" alt />
              <span>配置：</span>
              <input type="text" v-model="item.name" placeholder="请输入名称（必填）" />
            </div>
            <div>
              <img :src="required" alt />
              <span>编码：</span>
              <input type="text" v-model="item.cd" placeholder="请输入编码（必填）" />
            </div>
            <div>
              <img :src="required" alt />
              <span>单价：</span>
              <input type="number" v-model="item.price" placeholder="请输入单价（必填）" />
            </div>
            <div>
              <span>数量：</span>
              <input type="number" v-model="item.num" />
            </div>
            <!-- <div>
              <img class="upload" :src="uploadIcon" alt />
              <input class="input-file" type="file" style="display:none;" />
            </div>-->
            <div class="add" @click="operateItem(item,index)">
              <img :src="item.btnType==='add'?addSetting:delSetting" alt />
            </div>
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
          <div @click="toShowRelatedSize">
            <span class="about-size">相关尺寸图</span>
          </div>
          <div>
            <span class="current-order" @click="toOptionalList">当前清单</span>
          </div>
          <div class="certain-option" @click="toOptionResult">确认</div>
        </div>
      </div>
    </div>
    <div class="basic-model" v-show="showDialog">
      <div class="dialog" v-show="showBasic">
        <!-- <img class="btn-close" :src="closeIcon" alt /> -->
        <p @click="toIndex">
          <i class="el-icon-arrow-left"></i>
          <span>首页</span>
        </p>
        <h3>基础机型</h3>
        <div class="model-sel">
          <div>
            <span>机型：</span>
            <input type="text" v-model="model" class="text-sel" @click="showModelOp" />
            <div class="ul-style" v-show="showModel">
              <li
                v-for="(item, index) in modelList"
                :key="index"
                @click="chooseModel(item)"
              >{{ item.name }}</li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <div>
            <span>锁模力：</span>
            <input
              type="text"
              v-model="clampingForce"
              class="text-sel"
              @click="showClampingForceOp"
            />
            <div class="ul-style" v-show="showClampingForce">
              <li
                v-for="(item, index) in clampingForceList"
                :key="index"
                @click="chooseClamping(item)"
              >{{ item.name }}</li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <div>
            <span>注射当量：</span>
            <input type="text" v-model="injection" class="text-sel" @click="showInjectionOp" />
            <div class="ul-style" v-show="showInjection">
              <li
                v-for="(item, index) in injectionList"
                :key="index"
                @click="chooseInjection(item)"
              >{{ item.name }}</li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <div>
            <span>螺杆型号：</span>
            <input type="text" v-model="screw" class="text-sel" @click="showScrewOp" />
            <div class="ul-style" v-show="showScrew">
              <li
                v-for="(item, index) in screwModelList"
                :key="index"
                @click="chooseScrew(item)"
              >{{ item.name }}</li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <p>注射重量(PS):{{ injectionWeight }}g</p>
          <div>
            <span></span>
            <button class="confirmPick" @click="confirm">确认</button>
          </div>
        </div>
      </div>
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
      <div class="connect-size" v-show="showRelatedSize">
        <img class="btn-close" @click="closeRelatedSize" :src="closeIcon" alt />
        <div>
          <img :src="relatedSizeImg" alt />
        </div>
      </div>
      <div class="machine-color" v-show="showMachineColor">
        <img class="btn-close" :src="closeIcon" alt />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import searchIcon from "./images/搜索.png";
import pullDown from "./images/选配_箭头.png";
import pullDownIcon from "./images/标签栏下拉箭头.png";
import infoIcon from "./images/信息.png";
import required from "./images/必填.png";
import uploadIcon from "./images/上传图片.png";
import addSetting from "./images/添加配置.png";
import delSetting from "./images/删除配置.png";
import closeIcon from "./images/关闭.png";
import pickAll from "./images/选配清单_全选.png";
import noPick from "./images/选配清单_未选.png";
import requiredIcon from "./images/required.png";

export default {
  data: () => {
    return {
      requiredIcon,
      backArrow,
      searchIcon,
      pullDown,
      pullDownIcon,
      infoIcon,
      required,
      uploadIcon,
      addSetting,
      delSetting,
      closeIcon,
      pickAll,
      noPick,
      modelList: [],
      clampingForceList: [],
      injectionList: [],
      screwModelList: [],
      bigMenuList: [],
      smallMenuList: [],
      showModel: false,
      showClampingForce: false,
      showInjection: false,
      showScrew: false,
      showDialog: true,
      showUsual: false,
      model: "",
      clampingForce: "",
      injection: "",
      screw: "",
      bigMenuIndex: 0,
      bigMenuId: "",
      uniquePick: false,
      category: "常规选配",
      optionList: ["常规选配", "特殊选配(推荐)", "特殊选配(定制SO)"],
      showBasic: true,
      showIndustry: false,
      showRelatedSize: false,
      relatedSizeImg: "",
      showMachineColor: false,
      injectionWeight: "",
      cartId: "",
      paramForm: {},
      modelType: "",
      modelCode: "",
      propertiesLetter: "",
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
      propertyList: [],
      originalProp: [],
      showType: false,
      machineType: "",
      settingList: [],
      showSettingOp: false,
      cartInfo: {},
      specialList: [],
      special: {
        name: "",
        cd: "",
        price: "",
        num: 1,
        btnType: "add",
        type: 1 //特殊定制，用于区分常规
      }
    };
  },
  async mounted() {
    this.specialList.push(JSON.parse(JSON.stringify(this.special)));
    const formStr = this.until.getQueryString("form");
    const idStr = this.until.getQueryString("id");

    if (formStr && idStr) {
      this.paramForm = JSON.parse(formStr);
      this.cartId = idStr;
      this.showDialog = false;
      this.showUsual = true;
    }
    let {
      model,
      modelID,
      injection,
      injectionId,
      clampingForce,
      clampingForceId,
      screw,
      screwId
    } = this.paramForm;
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
    if (idStr) {
      // await this.getStandardOrCombination();
      await this.getOrderInfo();
    }
    this.propertyList = [];
    await this.getBigMenuList();
  },
  watch: {},
  methods: {
    operateItem(item, i) {
      if (item.btnType === "add") {
        item.btnType = "del";
        this.specialList.push(JSON.parse(JSON.stringify(this.special)));
      } else {
        this.specialList.splice(i, 1);
      }
    },
    showModelOp() {
      this.showModel = !this.showModel;
      this.showClampingForce = false;
      this.showInjection = false;
      this.showScrew = false;
    },
    showOption() {
      this.showType = !this.showType;
    },
    chooseCategory(item, index) {
      this.showType = false;
      this.category = item;
      this.getBigMenuList();
      if (index === 2) {
        this.uniquePick = true;
        this.showUsual = false;
      } else {
        this.uniquePick = false;
        this.showUsual = true;
      }
    },
    showClampingForceOp() {
      this.showClampingForce = !this.showClampingForce;
      this.showModel = false;
      this.showInjection = false;
      this.showScrew = false;
    },
    showInjectionOp() {
      this.showInjection = !this.showInjection;
      this.showModel = false;
      this.showClampingForce = false;
      this.showScrew = false;
    },
    showScrewOp() {
      this.showScrew = !this.showScrew;
      this.showModel = false;
      this.showClampingForce = false;
      this.showInjection = false;
    },
    async chooseModel(item) {
      this.model = item.name;
      this.form.modelID = item.id;
      this.showModel = false;
      await this.getClampingForceList();
      await this.getInjectionList();
      await this.getScrewList();
      await this.getBigMenuList();
    },
    async changeModel(e) {
      const index = this.modelList.findIndex(item => item.id === e);
      if (index >= 0) {
        this.form.model = this.modelList[index].name;
        this.modelType = this.modelList[index].standModelType;
        this.propertiesLetter = this.modelList[index].propertiesLetter;
        this.modelCode = this.modelList[index].modelCode;
      }
      await this.getClampingForceList();
      await this.getInjectionList();
      await this.getScrewList();
      //  await this.getStandardOrCombination();
      await this.getBigMenuList();
      this.bigMenuIndex = 0;
      this.propertyList = [];
    },
    async chooseClamping(item) {
      this.clampingForce = item.name;
      this.form.clampingForceId = item.clampForceId;
      this.showClampingForce = false;
      await this.getInjectionList();
      await this.getBigMenuList();
    },
    async changeClamping(e) {
      const index = this.clampingForceList.findIndex(
        item => item.clampForceId === e
      );
      if (index >= 0)
        this.form.clampingForce = this.clampingForceList[index].name;
      await this.getInjectionList();
      // await this.getStandardOrCombination();
      await this.getBigMenuList();
      this.bigMenuIndex = 0;
      this.propertyList = [];
    },
    async chooseInjection(item) {
      this.injection = item.name;
      this.form.injectionId = item.injectionId;
      this.showInjection = false;
      await this.getScrewList();
      await this.getBigMenuList();
    },
    async changeInjection(e) {
      const index = this.injectionList.findIndex(
        item => item.injectionId === e
      );
      if (index >= 0) this.form.injection = this.injectionList[index].name;
      await this.getScrewList();
      // await this.getStandardOrCombination();
      await this.getBigMenuList();
      this.bigMenuIndex = 0;
      this.propertyList = [];
    },
    async chooseScrew(item) {
      this.screw = item.name;
      this.injectionWeight = item.injectionWeight;
      this.form.screwId = item.screwTypeId;
      this.showScrew = false;
    },
    async changeScrew(e) {
      const index = this.screwModelList.findIndex(
        item => item.screwTypeId === e
      );
      if (index >= 0) this.form.screw = this.screwModelList[index].name;
      // await this.getStandardOrCombination();
      await this.getBigMenuList();
      this.bigMenuIndex = 0;
      this.propertyList = [];
    },
    back() {
      window.history.back();
    },
    toIndex() {
      this.until.href("home.html");
    },
    async confirm() {
      this.form.model = this.model;
      this.form.clampingForce = this.clampingForce;
      this.form.injection = this.injection;
      this.form.screw = this.screw;

      this.showDialog = false;
      this.showBasic = false;
      this.showUsual = true;
      //根据选项得出标准机/组合机
      // await this.getStandardOrCombination();
      await this.getBigMenuList();
    },
    toOptionResult() {
      this.form.machineType = this.machineType;
      const option = JSON.stringify(this.form);
      this.dealWithProperty();
      this.until.href(
        `optionalResult.html?option=${option}&cartId=${this.cartId}&type=usual`
      );
    },
    pickItem(item) {
      if (item.status === -1) {
        this.$message.error("当前选择项不能取消");
        return;
      } else {
        item.checked = !item.checked;
        item.type = this.category === "常规选配" ? 0 : 1;
        const i = this.smallMenuList.findIndex(k => k === item);
        this.$set(this.smallMenuList, i, item);
        //拼进propertyList,供我的清单中查看
        if (item.checked) {
          this.propertyList.push(item);
        } else {
          this.propertyList = this.propertyList.filter(pro => pro != item);
        }
      }
    },
    toOptionalList() {
      this.form.machineType = this.machineType;
      const option = JSON.stringify(this.form);
      this.dealWithProperty();
      this.until.href(`optionalList.html?option=${option}`);
    },
    dealWithProperty() {
      //需要整理property里面有数据的值，传过去
      this.propertyList = this.until.arrayDeduplication(this.propertyList);
      this.specialList.forEach(item => {
        if (item.name) {
          this.propertyList.push(item);
        }
      });
      const propertyStr = JSON.stringify(this.propertyList);
      this.until.loSave("property", propertyStr);
      if (this.propertyList.length === 0) {
        this.$message.error("您当前未选择任何选配项，请选择再前往查看！");
        return;
      }
    },
    chooseBigMenu(item, i) {
      this.bigMenuIndex = i;
      this.bigMenuId = item.id;
      this.smallMenuList = this.bigMenuList[i].list;
    },
    toShowRelatedSize() {
      this.showDialog = true;
      this.showRelatedSize = true;
      const param = {
        machineModelId: this.form.modelID,
        clampForceId: this.form.clampingForceId,
        injectionId: this.form.injectionId
      };

      this.api.sysGetRelatedSize(param).then(res => {
        this.relatedSizeImg = res.imgUrl;
      });
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
    closeIndustry() {
      this.showIndustry = false;
      this.showDialog = false;
    },
    closeRelatedSize() {
      this.showDialog = false;
      this.showRelatedSize = false;
    },
    async getModelList() {
      let query = new this.Query();
      query.buildWhereClause("matchMenuTypeId", 21, "EQ");
      query.buildWhereClause("status", 1, "EQ");
      query.buildOrderClause("sort", "asc");

      let param = query.getParam();
      this.modelList = await this.api.sysGetModelList(param);
      this.model = this.modelList[0].name;
      this.modelType = this.modelList[0].standModelType;
      this.modelCode = this.modelList[0].modelCode;
      this.propertiesLetter = this.modelList[0].propertiesLetter;
      this.form.modelID = this.modelList[0].id;
    },
    async getClampingForceList() {
      this.clampingForceList = await this.api.sysGetClampingForceList({
        modelTypeId: this.form.modelID
      });
      this.clampingForce = this.clampingForceList[0].name;
      this.form.clampingForceId = this.clampingForceList[0].clampForceId;
      this.form.clampingForce = this.clampingForceList[0].name;
    },
    async getInjectionList() {
      if (this.form.modelID && this.form.clampingForceId) {
        const param = {
          modelTypeId: this.form.modelID,
          clampForceId: this.form.clampingForceId
        };
        this.injectionList = await this.api.sysGetInjectionList(param);
        this.injection = this.injectionList[0].name;
        this.form.injectionId = this.injectionList[0].injectionId;
        this.form.injection = this.injectionList[0].name;
      }
    },
    async getScrewList() {
      if (this.form.modelID && this.form.injectionId && this.form.clampingForceId) {
        const param = {
          modelTypeId: this.form.modelID,
          injectionId: this.form.injectionId,
          clampForceId: this.form.clampingForceId
        };
        this.screwModelList = await this.api.sysGetScrewList(param);
        this.screw = this.screwModelList[0].name;
        this.injectionWeight = this.screwModelList[0].injectionWeight;
        this.form.screwId = this.screwModelList[0].screwTypeId;
        this.form.screw = this.screwModelList[0].name;
      }
    },
    async getBigMenuList() {
      this.bigMenuList = await this.api.sysGetBigMenuList();

      this.bigMenuList.forEach((item, index) => {
        item.list = [];
        const query = new this.Query();
        query.buildWhereClause("menuNameId", item.id, "EQ");
        query.buildWhereClause("status", "0", "EQ");
        query.buildOrderClause("sort", "asc");

        const param = query.getParam();
        this.api.sysGetSmallMenuList(param).then(res => {
          const secondMenuList = res;

          for (let i = 0, len = secondMenuList.length; i < len; i++) {
            const element = secondMenuList[i];

            const fixedParam = {
              machineId: this.form.modelID,
              clampForceId: this.form.clampingForceId,
              injectionId: this.form.injectionId,
              screwType: this.form.screwId
            };
            //二级菜单循环取数

            if (this.category === "常规选配") {
              const param = { ...fixedParam };
              param.secondLevelMenuId = element.secondLevelMenuId;
              this.api.sysGetMatchMenuOptional(param).then(res => {
                const list = res;

                list.forEach((itemChild, index) => {
                  if (itemChild.status === -1 || itemChild.status === 0) {
                    itemChild.checked = true;
                    itemChild.type = 0;
                    this.propertyList.push(itemChild);
                  } else {
                    itemChild.checked = false;
                  }
                  this.$set(list, index, itemChild);
                });
                item.list.push(...list);
                if (index === 0) {
                  this.smallMenuList = list;
                }
                this.renderOriginalValue();
              });
            } else {
              const param = { ...fixedParam };
              param.secondLevelMenuId = res[0].secondLevelMenuId;
              this.api.sysGetUniqueMatchMenu(param).then(res => {
                const list = res;
                list.forEach((item, index) => {
                  item.name = item.selectEditInfoNm;
                  this.$set(list, index, item);
                });

                /*    list.forEach((item, index) => {
                  if (item.status === -1 || item.status === 0) {
                    item.checked = true;
                  } else {
                    item.checked = false;
                  }
                  this.$set(list, index, item);
                }); */
                item.list = list;
                if (index === 0) {
                  this.smallMenuList = list;
                }
                this.renderOriginalValue();
              });
            }
          }
        });

        this.$set(this.bigMenuList, index, item);
      });
    },
    renderOriginalValue() {
      //选中之前选中的值
      let originType = true;
      const proArr = this.until.loGet("property");
      if (proArr) {
        this.showDialog = false;
        this.showUsual = true;
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
        if (element.hasOwnProperty("btnType")) {
          this.specialList.push(element);
        } else {
          this.bigMenuList.forEach(item => {
            if (item.list && item.list.length > 0) {
              item.list.forEach((child, index) => {
                if (originType) {
                  if (child.cd === element.cd) {
                    child.checked = true;
                    child.type = element.type;
                    this.propertyList.push(child);
                  }
                } else {
                  if (child.cd === element.code) {
                    child.checked = true;
                    child.type = element.type;
                    this.propertyList.push(child);
                  }
                }
                this.$set(item, index, child);
              });
            }
          });
        }
      }
    },
    async getOrderInfo() {
      const info = await this.api.sysGetOrderInfoById(this.cartId);
      if (info) {
        this.cartInfo = JSON.parse(info.data);
      }
    },
    async getStandardOrCombination() {
      const param = {
        modelType: this.modelType,
        modelCode: this.modelCode,
        propertiesLetter: this.propertiesLetter,
        clampForce: this.form.clampingForce,
        injection: this.form.injection
      };

      const machine = await this.api.sysGetStandardOrCombination(param);
      this.machineType = machine.machineType === 1 ? "标准机" : "组合机";
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
  .header {
    > .ul-style {
      color: #000;
      display: -webkit-flex;
      display: flex;
      display: block;
      width: 15%;
      z-index: 12;
      list-style: none;
      position: absolute;
      top: 100%;
      left: 43%;
      border: 1px solid #d2d2d2;
      background-color: @themeColor;
      box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
      > li {
        width: 100%;
        background-color: #fff;
        padding: 8px 0 8px 6%;
        &:hover {
          background-color: @themeColor;
          color: #000;
        }
      }
    }
  }

  .main-opt {
    background-color: @grayColor;
  }
  .row {
    .select-opt {
      height: 4.5%;
      margin: 0 8%;
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
          .el-input {
            input {
              border: 0;
              background-color: @grayColor;
            }
            .el-select__caret {
              color: @headerColor;
            }
          }
        }
        input {
          border: 0;
          background-color: @grayColor;
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
    .content {
      height: 100%;
      font-size: 16px;
      width: 100%;
      background-color: #fff;
      overflow: hidden;
      .sel-one,
      .sel-three,
      .setting-wrap {
        display: -webkit-flex;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        margin: 2% 8% 0px;
        justify-content: space-between;
        color: #d4d4d4;
      }
      .setting-wrap {
        color: #000;
        margin-right: 80px;
        &:nth-last-of-type(1) {
          margin-bottom: 5%;
        }
        > div {
          margin: 1% 0;
          position: relative;
          display: -webkit-flex;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          &:nth-of-type(1),
          &:nth-of-type(2),
          &:nth-of-type(3) {
            width: 19%;
          }
          &:nth-of-type(4) {
            width: 15%;
          }
          &:nth-of-type(5) {
            width: 8%;
          }
          &:nth-of-type(6) {
            width: 3%;
          }
          img {
            position: absolute;
            top: 50%;
            left: -5px;
            transform: translateY(-50%);
            color: transparent;
            opacity: 1;
          }
          > span {
            text-align: center;
            display: inline-block;
            width: 30%;
          }
          input {
            border: 0;
            border-bottom: 1px solid #cdcdcd;
            width: 70%;
            &:focus {
              outline: none;
            }
          }
        }
      }
      .sel-one {
        > div {
          flex: 8;
          border-bottom: 1px solid #cdcdcd;
          padding-bottom: 8px;
          text-align: center;
        }
        > .active {
          color: @headerColor;
          border-bottom: 1px solid @themeColor;
        }
      }
      .sel-three {
        display: flex;
        display: -webkit-flex;
        flex-flow: column wrap;
        justify-content: flex-start;
        height: 650px;

        li {
          list-style: none;
          color: #000;
          margin-bottom: 20px;
          img {
            cursor: pointer;
          }
          span {
            cursor: pointer;
            margin-left: 30px;
          }
        }

        .active {
          color: #000;
          > div {
            > img {
              display: block;
            }
          }
        }
      }
      .sel-three {
        > div {
          &:nth-last-of-type(1) {
            > span {
              width: 57%;
            }
          }
        }
      }
    }
    .footer {
      border-top: 1px solid #cdcdcd;
      background-color: #fafafa;
      width: 100%;
      height: 60px;
      .foot-wrap {
        width: 42%;
        height: 60px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        margin-left: 50%;
        > div {
          width: 18%;
          color: #676768;
          &:nth-last-of-type(1) {
            padding: 1% 0;
            text-align: center;
            width: 30%;
            background-color: @themeColor;
            color: #000;
            border: 1px solid @themeColor;
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

.basic-model .dialog,
.basic-model .industry-set,
.basic-model .connect-size,
.basic-model .machine-color {
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

.basic-model .connect-size {
  top: 10%;
  transform: translate3d(-50%, 0, 0);
  div {
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }
}

.basic-model .dialog > p {
  position: absolute;
  top: 5%;
  left: 5%;
}

.basic-model .industry-set > img,
.basic-model .connect-size > img,
.basic-model .machine-color > img {
  position: absolute;
  top: 5%;
  right: 5%;
}

.basic-model .dialog h3 {
  text-align: center;
  margin: 40px 0;
}

.basic-model .dialog .model-sel {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px 55px;
}

.dialog .model-sel > div {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.model-sel > div span {
  display: inline-block;
  width: 20%;
}

.model-sel > div input {
  background-color: #fff;
  padding: 8px 0 8px 30px;
  width: 78%;
  border: 1px solid #bebebe;
  border-radius: 5px;
}

.model-sel > div > .ul-style {
  display: -webkit-flex;
  display: flex;
  display: block;
  width: 78%;
  max-height: 240px;
  overflow-y: auto;
  z-index: 9999;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 20%;
  border: 1px solid #d2d2d2;
  background-color: @themeColor;
}

.model-sel > div > .ul-style > li {
  width: 100%;
  /* background-color: #00338D; */
  background-color: #fff;
  padding: 8px 0 8px 30px;
}

.model-sel > div > .ul-style > li:hover {
  background-color: @themeColor;
  color: #000;
}

.model-sel > div input:focus {
  outline: none;
}

.model-sel > div button {
  margin-top: 15px;
  width: 78%;
  padding: 8px 0;
  border: 0;
  border-radius: 5px;
  background-color: @themeColor;
  color: #000;
}

.model-sel div > img {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}

.sel-three > div > input {
  padding: 10px 0;
  width: 50%;
  text-align: center;
  text-align-last: center;
  border: 0;
  background-color: #fff;
}

.sel-three > div > .ul-multi-style {
  display: -webkit-flex;
  display: flex;
  display: block;
  width: 100%;
  z-index: 9999;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0%;
  border: 1px solid #d2d2d2;
  background-color: #00338d;
}

.sel-three > div > .ul-multi-style > li {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #fff;
  padding: 8px 16% 8px 8%;
}

.ul-multi-style > li > img {
  position: absolute;
  top: 34%;
  right: 8%;
  transform: translateY(-50%);
}

.ul-multi-style > li > span::before {
  margin-right: 10%;
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

.ul-multi-style > li > span.active::before {
  background: url("./images/勾选.png") no-repeat center center;
}
</style>
