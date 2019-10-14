<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" />
        <div class="option">
          <div
            class="col-md-4"
            :class="{ active: selectTab === item }"
            @click="selectTabOp(item, index)"
            v-for="(item, index) in optionList"
            :key="index"
          >
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="search">
          <img :src="searchIcon" alt />
          <input type="text" placeholder="请输入搜索关键字" />
        </div>
        <div class="edit col-md-1" style="display:none;">
          <span class="editInfo">编辑</span>
        </div>
      </div>
    </div>
    <div class="row main-opt">
      <div class="select-opt">
        <div class="sel-wrap">
          <span>机型：</span>
          <input
            type="text"
            @click="showModelTwo = !showModelTwo"
            v-model="form.model"
            class="text-sel"
          />
          <div class="ul-style" v-show="showModelTwo">
            <li
              v-for="(item, index) in modelList"
              :key="index"
              @click="chooseModelTwo(item)"
            >
              {{ item }}
            </li>
          </div>
          <img :src="pullDown" alt />
        </div>
        <div class="sel-wrap">
          <span>锁模力：</span>
          <input
            type="text"
            @click="showClampingForceTwo = !showClampingForceTwo"
            v-model="form.clampingForce"
            class="text-sel"
          />
          <div class="ul-style" v-show="showClampingForceTwo">
            <li
              v-for="(item, index) in clampingForceList"
              :key="index"
              @click="chooseClampingTwo(item)"
            >
              {{ item }}
            </li>
          </div>
          <img :src="pullDown" alt />
        </div>
        <div class="sel-wrap">
          <span>注射当量：</span>
          <input
            type="text"
            @click="showInjectionTwo = !showInjectionTwo"
            v-model="form.injection"
            class="text-sel"
          />
          <div class="ul-style" v-show="showInjectionTwo">
            <li
              v-for="(item, index) in injectionList"
              :key="index"
              @click="chooseInjectionTwo(item)"
            >
              {{ item }}
            </li>
          </div>
          <img :src="pullDown" alt />
        </div>
        <div class="sel-wrap">
          <span>螺杆型号：</span>
          <input
            type="text"
            @click="showScrewTwo = !showScrewTwo"
            v-model="form.screw"
            class="text-sel"
          />
          <div class="ul-style" v-show="showScrewTwo">
            <li
              v-for="(item, index) in screwModelList"
              :key="index"
              @click="chooseScrewTwo(item)"
            >
              {{ item }}
            </li>
          </div>
          <img :src="pullDown" alt />
        </div>
        <div class="sel-wrap">
          <span>类别：</span>
          <input readonly type="text" class="text-sel" value="标准机" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <div class="sel-one">
          <div class="active">
            <span>总体</span>
          </div>
          <div>
            <span>基础</span>
          </div>
          <div>
            <span>注射</span>
          </div>
          <div>
            <span>合模</span>
          </div>
          <div>
            <span>塑化</span>
          </div>
          <div>
            <span>电气接口</span>
          </div>
          <div>
            <span>自动化</span>
          </div>
          <div>
            <span>搜索</span>
          </div>
        </div>
        <!-- 常规选配 -->
        <div class="usual-pick" v-show="showUsual">
          <div class="sel-two">
            <div>
              <span>安全认证标准</span>
              <input type="text" readonly />
            </div>
            <div>
              <span>行业专机</span>
              <input type="text" readonly />
            </div>
            <div>
              <span>地区标准</span>
              <input type="text" readonly />
            </div>
            <div>
              <span>整机电压</span>
              <input type="text" readonly />
            </div>
          </div>
          <div class="sel-three">
            <div>
              <span>整机颜色和喷字</span>
              <input
                @click="showColorAndFont = !showColorAndFont"
                type="text"
                class="text-nosel"
              />
              <div class="ul-multi-style" v-show="showColorAndFont">
                <li>
                  <div></div>
                  <span>(AGE0100)机器颜色只可选21种特殊定制</span>
                  <img :src="infoIcon" alt />
                </li>
                <li>
                  <div></div>
                  <span>(AGE0200)机器颜色超出可选21种（附张总报告）</span>
                  <img :src="infoIcon" alt />
                </li>
                <li>
                  <div></div>
                  <span>(AGE0300)机器喷字非标（需公司总裁书面批准）</span>
                  <img :src="infoIcon" alt />
                </li>
              </div>
              <img :src="pullDown" alt />
            </div>
            <div>
              <span>多国语言标牌</span>
              <input type="text" readonly />
            </div>
            <div>
              <span>多国语言说明</span>
              <input type="text" readonly />
            </div>
            <div>
              <span>地区标准特殊条款</span>
              <input type="text" readonly />
            </div>
          </div>
        </div>
        <!-- 特殊选配(定制SO) -->
        <div class="unique-pick" v-show="uniquePick">
          <div class="setting-wrap">
            <div>
              <img :src="required" alt />
              <span>配置：</span>
              <input type="text" placeholder="请输入名称（必填）" />
            </div>
            <div>
              <img :src="required" alt />
              <span>单价：</span>
              <input type="text" placeholder="请输入单价（必填）" />
            </div>
            <div>
              <img :src="required" alt />
              <span>数量：</span>
              <input type="text" placeholder="请输入输了（必填）" />
            </div>
            <div>
              <span>价格：</span>
              <input type="text" />
            </div>
            <div>
              <img class="upload" :src="uploadIcon" alt />
              <input class="input-file" type="file" style="display:none;" />
            </div>
            <div class="add">
              <img :src="addSetting" type="add" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="footer">
        <div class="foot-wrap">
          <div>
            <span class="industry">行业配置</span>
          </div>
          <div>
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
      <div class="dialog" style="display:block;">
        <img class="btn-close" :src="closeIcon" alt />
        <h3>基础机型</h3>
        <div class="model-sel">
          <div>
            <span>机型：</span>
            <input
              type="text"
              v-model="model"
              class="text-sel"
              @click="showModelOp"
            />
            <div class="ul-style" v-show="showModel">
              <li
                v-for="(item, index) in modelList"
                :key="index"
                @click="chooseModel(item)"
              >
                {{ item }}
              </li>
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
              >
                {{ item }}
              </li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <div>
            <span>注射当量：</span>
            <input
              type="text"
              v-model="injection"
              class="text-sel"
              @click="showInjectionOp"
            />
            <div class="ul-style" v-show="showInjection">
              <li
                v-for="(item, index) in injectionList"
                :key="index"
                @click="chooseInjection(item)"
              >
                {{ item }}
              </li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <div>
            <span>螺杆型号：</span>
            <input
              type="text"
              v-model="screw"
              class="text-sel"
              @click="showScrewOp"
            />
            <div class="ul-style" v-show="showScrew">
              <li
                v-for="(item, index) in screwModelList"
                :key="index"
                @click="chooseScrew(item)"
              >
                {{ item }}
              </li>
            </div>
            <img :src="pullDown" alt />
          </div>
          <p>注射重量(PS):46g</p>
          <div>
            <span></span>
            <button class="confirmPick" @click="confirm">确认</button>
          </div>
        </div>
      </div>
      <div class="industry-set" style="display:none;">
        <img class="btn-close" :src="closeIcon" alt />
      </div>
      <div class="connect-size" style="display:none;">
        <img class="btn-close" :src="closeIcon" alt />
      </div>
      <div class="machine-color" style="display:none;">
        <img class="btn-close" :src="closeIcon" alt />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import searchIcon from "./images/搜索.png";
import pullDown from "./images/选配_箭头.png";
import infoIcon from "./images/信息.png";
import required from "./images/必填.png";
import uploadIcon from "./images/上传图片.png";
import addSetting from "./images/添加配置.png";
import closeIcon from "./images/关闭.png";

export default {
  data() {
    return {
      backArrow,
      searchIcon,
      pullDown,
      infoIcon,
      required,
      uploadIcon,
      addSetting,
      closeIcon,
      modelList: ["MAIIS", "MAII", "MA/G", "VEII", "ZE"],
      clampingForceList: ["900", "1200", "1600", "2000", "2500"],
      injectionList: ["130", "140", "150", "160"],
      screwModelList: ["A", "B", "C", "D"],
      showModel: false,
      showModelTwo: false,
      showClampingForce: false,
      showClampingForceTwo: false,
      showInjection: false,
      showInjectionTwo: false,
      showScrew: false,
      showScrewTwo: false,
      showDialog: true,
      showUsual: false,
      model: "MAIIS",
      clampingForce: "900",
      injection: "130",
      screw: "A",
      showColorAndFont: false,
      uniquePick: false,
      optionList: ["常规选配", "特殊选配(推荐)", "特殊选配(定制SO)"],
      selectTab: "常规选配",
      form: {
        model: "",
        clampingForce: "",
        injection: "",
        screw: ""
      }
    };
  },
  methods: {
    showModelOp() {
      this.showModel = !this.showModel;
    },
    showClampingForceOp() {
      this.showClampingForce = !this.showClampingForce;
    },
    showInjectionOp() {
      this.showInjection = !this.showInjection;
    },
    showScrewOp() {
      this.showScrew = !this.showScrew;
    },
    chooseModel(item) {
      this.model = item;
      this.showModel = false;
    },
    chooseClamping(item) {
      this.clampingForce = item;
      this.showClampingForce = false;
    },
    chooseInjection(item) {
      this.injection = item;
      this.showInjection = false;
    },
    chooseScrew(item) {
      this.screw = item;
      this.showScrew = false;
    },
    chooseModelTwo(item) {
      this.form.model = item;
      this.showModelTwo = false;
    },
    chooseClampingTwo(item) {
      this.form.clampingForce = item;
      this.showClampingForceTwo = false;
    },
    chooseInjectionTwo(item) {
      this.form.injection = item;
      this.showInjectionTwo = false;
    },
    chooseScrewTwo(item) {
      this.form.screw = item;
      this.showScrewTwo = false;
    },
    selectTabOp(item,index) {
      this.selectTab = item;
      if(index===2){
        this.uniquePick=true
        this.showUsual=false
      }
      else{
        this.showUsual=true
        this.uniquePick=false
      }
    },
    confirm() {
      this.form.model = this.model;
      this.form.clampingForce = this.clampingForce;
      this.form.injection = this.injection;
      this.form.screw = this.screw;

      this.showDialog = false;
      this.showUsual = true;
    },
    toOptionResult() {
      this.until.href("optionalResult.html")
    },
    toOptionalList() {
      this.until.href("optionalList.html")
    }
  },
  components: {}
};
</script>

<style lang="less">
html,
body {
  background-color: #fff;
}

#container {
  padding: 0 15px;
  width: 100%;
}

#container .main-opt {
  background-color: #f2f5f9;
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

.row .search {
  width: 20%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 9%;
  padding-left: 0;
  padding-right: 0;
  margin: 0 2%;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #000;
}

.header .edit {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.search > img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2%;
}
.search > input {
  text-indent: 8%;
  padding: 5px 0;
  width: 100%;
  border: 0;
}

.search > input:focus {
  outline: none;
}

#container .row .option {
  width: 46%;
  padding-left: 0;
  padding-right: 0;
  margin: 10px 0 10px 18%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.row .option > div {
  border: 1px solid #fff;
  font-size: 16px;
  padding: 10px 0;
  text-align: center;
  overflow: hidden;
}

.row .option > div:nth-of-type(1) {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.row .option > div:nth-last-of-type(1) {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.row .option > div:not(:nth-of-type(1)) {
  margin-left: -1px;
}

.row .option > .active {
  background-color: #fff;
  color: #00338d;
}

/* .row .option >div:nth-of-type(3){
  border-right:0;
} */

.select-opt {
  height: 4.5%;
  margin: 0 8%;
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.select-opt > div {
  position: relative;
  height: 4.5%;
  width: 18%; /*中间留空隙*/
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
}

.select-opt > div > .ul-style {
  display: -webkit-flex;
  display: flex;
  display: block;
  width: 60%;
  z-index: 9999;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 40%;
  border: 1px solid #d2d2d2;
  background-color: #00338d;
}

.select-opt > div > .ul-style > li {
  width: 100%;
  /* background-color: #00338D; */
  background-color: #fff;
  padding: 8px 0 8px 1%;
}

.select-opt > div > .ul-style > li:hover {
  background-color: #00338d;
  color: #fff;
}

.sel-wrap {
  font-size: 16px;
  display: -webkit-flex;
  display: flex;
}

.sel-wrap > span {
  padding: 10px 0;
  display: inline-block;
  width: 40%;
}

.sel-wrap > div {
  position: relative;
  border-bottom: 1px solid #bebebe;
  text-align: center;
  flex: 1;
}

.select-opt .sel-wrap > input {
  padding: 10px 0;
  width: 60%;
  text-align: center;
  text-align-last: center;
  border: 0;
  border-bottom: 1px solid #bebebe;
  background-color: #f2f5f9;
}

.select-opt .sel-wrap > input:focus {
  outline: none;
}

.select-opt div > img {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.content {
  height: 100%;
  padding-bottom: 20%;
  font-size: 16px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}

.content .sel-one,
.content .sel-two,
.content .sel-three,
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
}

.setting-wrap:nth-last-of-type(1) {
  margin-bottom: 5%;
}

.setting-wrap > div {
  margin: 1% 0;
  position: relative;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.setting-wrap > div img {
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  color: transparent;
  opacity: 1;
}

.setting-wrap > div > span {
  text-align: center;
  display: inline-block;
  width: 30%;
}

.setting-wrap > div input {
  border: 0;
  border-bottom: 1px solid #cdcdcd;
  width: 70%;
}

.setting-wrap > div input:focus {
  outline: none;
}

.setting-wrap > div:nth-of-type(1),
.setting-wrap > div:nth-of-type(2),
.setting-wrap > div:nth-of-type(3) {
  width: 19%;
}

.setting-wrap > div:nth-of-type(4) {
  width: 15%;
}

.setting-wrap > div:nth-of-type(5) {
  width: 8%;
}

.setting-wrap > div:nth-of-type(6) {
  width: 3%;
}

.content .sel-one > div {
  flex: 8;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 8px;
  text-align: center;
}

.content .sel-one > .active {
  color: #00338d;
  border-bottom: 1px solid #00338d;
}

.content .sel-two > .active,
.content .sel-three > .active {
  color: #000;
}

.sel-two > .active > div > img,
.sel-three > .active > div > img {
  display: block;
}

.content .sel-two > div,
.content .sel-three > div {
  position: relative;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 8px;
  width: 22%;
  border-bottom: 1px solid #cdcdcd;
}

.sel-three > div:nth-last-of-type(1) > span {
  width: 57%;
}

.sel-two > div > span,
.sel-three > div > span {
  display: inline-block;
  width: 50%;
}

.sel-two > div > input,
.sel-three > div > input {
  border: 0;
  width: 100%;
}

.sel-two > div > input:focus,
.sel-three > div > input:focus {
  outline: none;
}

.sel-two > div > img,
.sel-three > div > img {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.footer {
  border-top: 1px solid #cdcdcd;
  background-color: #f2f5f9;
  width: 100%;
  position: fixed;
  height: 6.6%;
  bottom: 0;
}

.footer .foot-wrap {
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
}

.footer > .foot-wrap > div {
  width: 18%;
  color: #00338d;
}

.footer > .foot-wrap > div:nth-last-of-type(1) {
  padding: 1% 0;
  text-align: center;
  width: 30%;
  background-color: #00338d;
  color: #fff;
  border: 1px solid #00338d;
  border-radius: 5px;
}

.basic-model {
  position: fixed;
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

.basic-model .dialog > img,
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
  z-index: 9999;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 20%;
  border: 1px solid #d2d2d2;
  background-color: #00338d;
}

.model-sel > div > .ul-style > li {
  width: 100%;
  /* background-color: #00338D; */
  background-color: #fff;
  padding: 8px 0 8px 30px;
}

.model-sel > div > .ul-style > li:hover {
  background-color: #00338d;
  color: #fff;
}

.model-sel > div input:focus {
  outline: none;
}

.model-sel > div button {
  margin-top: 15px;
  border: 1px solid #00338d;
  width: 78%;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #00338d;
  color: #fff;
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
