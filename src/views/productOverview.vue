<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center" @click="showOption">
          <span>{{ category }}</span>
          <!-- 下拉图标 -->
          <img class="arrow-side" :src="pullDown" />
        </p>
        <div type="false" class="ul-style" v-if="showType">
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            @click="chooseCategory(item)"
          >{{ item.machineCh }}</li>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项 -->
        <div class="left">
          <p></p>
          <div v-for="(item, index) in productList" :key="index">
            <div
              @click="selectLeftItem(item, index)"
              class="row"
              :class="{ active: index === selectIndex }"
            >
              <span>
                {{
                item.modelType +
                item.weight +
                item.propertiesLetter +
                item.modelCode+' '+item.injection
                }}
              </span>
            </div>
            <!-- <div class="row-segment"></div> -->
          </div>
        </div>
        <div class="right">
          <div class="title">
            <div
              v-for="(item, index) in introduceList"
              :key="index"
              :class="{ active: index === selectTab }"
              @click="chooseTab(index)"
            >
              <span>{{ item }}</span>
            </div>
          </div>
          <!-- 机型简介 -->
          <div class="concept" v-show="selectTab === 0" v-html="conceptCont"></div>
          <!-- 性能特征 -->
          <div class="performance" v-show="selectTab === 1">
            <div v-for="(item, index) in performanceList" :key="index">
              <p>{{ item.noticeCh }}</p>
              <img v-for="item in item.imgList" :key="item" :src="item" alt="图片" />
            </div>
          </div>
          <!-- 典型制品 -->
          <div class="typical" v-show="selectTab === 2">
            <div v-for="(item, index) in typicalProductList" :key="index">
              <p>{{ item.nameCh }}</p>
              <img v-for="item in item.imgList" :key="item" :src="item" alt="图片" />
            </div>
          </div>
          <!-- 标准配置 -->
          <div class="standard-set" v-show="selectTab === 3">
            <div class="wrap" v-for="(item, index) in standardSettingList" :key="index">
              <div class="injection">
                <div class="part">{{ item.titleCh }}</div>
                <div class="triangle"></div>
              </div>
              <div class="injection-ct" v-html="item.contentCh">
                <!-- <p v-for="(item, index) in injectionList" :key="index">
                  {{ item }}
                </p>-->
              </div>
            </div>
          </div>
          <!-- 技术参数 -->
          <technical-param v-show="selectTab === 4" :list="technicalParameterList"></technical-param>
          <!-- 相关尺寸 -->
          <div class="related-size" v-show="selectTab === 5">
            <img v-for="(item, index) in relatedSizeList" :key="index" :src="item" alt="图片" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import pullDown from "./images/标签栏下拉箭头.png";
import technicalParam from "../components/technicalParam";

export default {
  data() {
    return {
      backArrow,
      pullDown,
      selectIndex: 0,
      selectTab: 0,
      showType: false,
      categoryObj: {},
      category: "",
      categoryId: "",
      conceptCont: "",
      categoryList: [],
      productList: [],
      technicalParam: {},
      introduceList: [
        "机型简介",
        "性能特征",
        "典型制品",
        "标准配置",
        "技术参数",
        "相关尺寸"
      ],
      performanceList: [],
      typicalProductList: [],
      standardSettingList: [],
      technicalParameterList: [],
      relatedSizeList: []
    };
  },
  async mounted() {
    await this.getCategoryList();
    await this.getSmallCategoryList();
  },
  methods: {
    back() {
      window.history.back();
    },
    chooseTab(index) {
      this.selectTab = index;

      if (index === 1) {
        this.getPerformanceCharacter();
      }
      if (index === 2) {
        this.getTypicalProduct();
      }
      if (index === 3) {
        this.getStandardSetting();
      }
      if (index === 4) {
        this.getTechnicalParameter();
      }
      if (index === 5) {
        this.getRelatedSize();
      }
    },
    showOption() {
      this.showType = !this.showType;
    },
    async selectLeftItem(item, i) {
      this.selectIndex = i;
      this.categoryObj = item;
      await this.getTechnicalParameter();
      await this.getRelatedSize();
    },
    async chooseCategory(item) {
      this.showType = false;
      this.categoryObj = item;
      this.category = item.machineCh;
      this.categoryId = item.id;
      this.conceptCont = item.noticeCh;
      await this.getSmallCategoryList();
      await this.getPerformanceCharacter();
      await this.getTypicalProduct();
      await this.getStandardSetting();
      await this.getTechnicalParameter();
    },
    async getCategoryList() {
      this.categoryList = await this.api.sysGetProductBigModelList();
      this.category = this.categoryList[0].machineCh;
      this.categoryId = this.categoryList[0].id;
      this.conceptCont = this.categoryList[0].noticeCh;
    },
    async getSmallCategoryList() {
      this.productList = await this.api.sysGetLeftSideSmallModelNewList({
        machineCh: this.category
      });
      this.categoryObj = this.productList[0];
      this.getTechnicalParameter();
    },
    async getPerformanceCharacter() {
      const query = new this.Query();
      query.buildWhereClause("productId", this.categoryId, "EQ");
      query.buildOrderClause("sort", "asc");

      const param = query.getParam();
      this.performanceList = await this.api.sysGetPerformanceCharacter(param);
      this.performanceList.forEach(item => {
        if (item.imgUrl) {
          item.imgList = item.imgUrl.split(",");
        }
      });
    },
    async getTypicalProduct() {
      const query = new this.Query();
      query.buildWhereClause("productId", this.categoryId, "EQ");
      query.buildOrderClause("sort", "asc");

      const param = query.getParam();
      this.typicalProductList = await this.api.sysGetTypicalProduct(param);
      this.typicalProductList.forEach(item => {
        if (item.imgUrl) {
          item.imgList = item.imgUrl.split(",");
        }
      });
    },
    async getStandardSetting() {
      const query = new this.Query();
      query.buildWhereClause("productId", this.categoryId, "EQ");
      query.buildOrderClause("sort", "asc");

      const param = query.getParam();
      this.standardSettingList = await this.api.sysGetStandardSetting(param);
    },
    async getTechnicalParameter() {
      this.technicalParam = {
        modelType: this.categoryObj.modelType,
        modelCode: this.categoryObj.modelCode,
        propertiesLetter: this.categoryObj.propertiesLetter,
        weight: this.categoryObj.weight,
        injection: this.categoryObj.injection
      };

      this.technicalParameterList = await this.api.sysGetTechnicalParameter(
        this.technicalParam
      );
      //去除后两个字段
      this.technicalParameterList.forEach(item => {
        delete item.imgUrl;
        delete item.imgUrlEn;
        delete item.priceIn;
        delete item.priceOut;
      });
    },
    async getRelatedSize() {
      const list = await this.api.sysGetTechnicalParameter(this.technicalParam);
      list.forEach(item => {
        this.relatedSizeList.push(item.imgUrl);
      });

      this.relatedSizeList = new Set(this.relatedSizeList);
    }
  },
  components: {
    technicalParam
  }
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
#container {
  padding: 0 15px;
  width: 100%;
  background-color: #fff;
  .row {
    > .header {
      position: relative;
      background-color: @headerColor;
      color: #fff;

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
    p {
      margin: 18px 0;
    }
    .content {
      display: -webkit-flex;
      display: flex;
      height: 100%;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 80%;
      margin: 0 auto;
      .left {
        width: 20%;
        background-color: @grayColor;
        p {
          margin: 0;
          height: 20px;
        }
        .row {
          margin-left: 0;
          width: 100%;
          padding: 15px 0;
          > span {
            margin-left: 10%;
          }
        }
        .active {
          background-color: @themeColor;
        }
      }
      .right {
        margin-top: 20px;
        width: 78%;
        .title {
          width: 100%;
          display: -webkit-flex;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          background-color: @themeColor;
          > div {
            margin: 0 30px;
            padding: 15px 0;
            flex: 6;
            text-align: center;
          }
          > .active {
            border-bottom: 3px solid #575756;
            color: #575756;
          }
        }
        .concept,
        .standard-set,
        .performance,
        .typical,
        .related-size {
          margin: 50px 150px 0 40px;
          line-height: 30px;
        }
        .content {
          > p {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
        .performance,
        .typical {
          div {
            p {
              font-size: 18px;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              width: auto;
              height: auto;
              vertical-align: middle;
            }
          }
        }
        .standard-set {
          .wrap {
            margin-bottom: 30px;
            .injection,
            .lock {
              display: -webkit-flex;
              display: flex;
              background-color: #fff;
              color: #000;
              > .part {
                width: 210px;
                height: 100%;
                background-color: @themeColor;
                color: #000;
                text-indent: 30px;
              }
              > .triangle {
                width: 0;
                height: 0;
                border: 15px solid #fff;
                border-left-color: @themeColor;
                border-bottom-color: @themeColor;
              }
            }
            .injection-ct,
            .lock-ct {
              padding: 10px 0;
              background-color: #f2f5f9;
              > p {
                margin-top: 0;
                margin-bottom: 0;
                text-indent: 30px;
                padding: 5px 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
