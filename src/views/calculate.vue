<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" @click="back" :src="bankArrow" />
        <p class="text-center-nopick">
          塑机计算器
          <!-- 下拉图标 -->
        </p>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项 -->
        <div class="left">
          <div class="result">
            <div>
              <p>锁模力</p>
              <p>（t）</p>
              <p>888888</p>
            </div>
            <div>
              <p>注射当量</p>
              <p>（g）</p>
              <p>888888</p>
            </div>
          </div>
          <div class="info">
            <div>
              <span>制品投影面积：</span>
              <input type="text" placeholder="投影面积" />
              <span>
                cm
                <sup>2</sup>
              </span>
            </div>
            <div>
              <span>最大流水长度：</span>
              <input type="text" />
              <span>mm</span>
            </div>
            <div>
              <span>制品重量（含浇口）：</span>
              <input placeholder="制品重量" />
              <span>g</span>
              <input placeholder="浇口重量" />
              <span>g</span>
            </div>
            <div>
              <span>熔融密度：</span>
              <input type="text" />
              <span>
                g/cm
                <sup>2</sup>
              </span>
            </div>
            <div>
              <span>成型周期：</span>
              <input type="text" />
              <span>s</span>
            </div>
          </div>
        </div>
        <!-- 高级设置 -->
        <div class="right">
          <div class="result">
            <div>
              <p>开合模行程</p>
              <p>（mm）</p>
              <p>888888</p>
            </div>
            <div>
              <p>注射速率</p>
              <p>（g/s）</p>
              <p>888888</p>
            </div>
          </div>
          <div class="info">
            <div>
              <span>最小壁厚：</span>
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>mm</span>
            </div>
            <div>
              <span>射出速度：</span>
              <el-select v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>mm</span>
            </div>
            <div>
              <span>重量修正系数N：</span>
              <el-select v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>g</span>
            </div>
            <div>
              <span>材料类型：</span>
              <el-select v-model="value4" placeholder="请选择">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>
                g/cm
                <sup>2</sup>
              </span>
            </div>
            <div>
              <span>制品高度：</span>
              <input type="text" />
              <span>mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="save">确定</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bankArrow from "./images/返回.png";
export default {
  data() {
    return {
      bankArrow,
      options1: [
        {
          value: "1",
          label: "0.4"
        },
        {
          value: "2",
          label: "1"
        },
        {
          value: "3",
          label: "2"
        },
        {
          value: "4",
          label: "3"
        }
      ],
      options2: [
        {
          value: "1",
          label: "100"
        }
      ],
      options3: [
        {
          value: "1",
          label: "1.2"
        }
      ],
       options4: [
        {
          value: "1",
          label: "PS"
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    save(){
      
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@import url("../styles/main.less");
html,
body {
  #container {
    width: 100%;
    background-color: #fff;
    .row {
    
      p {
        font-size: 18px;
        margin: 16px 0;
      }
      .content {
        display: -webkit-flex;
        display: flex;
        height: 100%;
        width: 80%;
        margin: 0 auto;
        flex-flow: row nowrap;
        justify-content: space-between;
        .left,
        .right {
          flex: 1;
          .result {
            display: flex;
            display: -webkit-flex;
            flex-flow: row nowrap;
            margin: 40px auto;
            padding: 20px;
            width: 90%;
            background-color: #f5f5f5;
            border: 0;
            border-radius: 10px;
            > div {
              flex: 1;
              display: flex;
              display: -webkit-flex;
              flex-flow: column wrap;
              align-items: center;
              > p {
                flex: 1;
                margin: 0;
                &:nth-last-of-type(1) {
                  margin-top: 30px;
                }
              }
              &:nth-last-of-type(1) {
                border-left: 1px solid #e7eaef;
              }
            }
          }
          .info {
            display: flex;
            display: -webkit-flex;
            flex-flow: column wrap;
            > div {
              flex: 1;
              display: flex;
              display: -webkit-flex;
              flex-flow: row nowrap;
              align-items: center;
              margin-bottom: 40px;
              span {
                flex: 0 0 auto;
              }
              input {
                padding: 10px 15px;
                flex: 1;
                outline: none;
                border: 0;
                border-bottom: 1px solid #ccc;
              }
              .el-select {
                flex: 1;
              }
            }
          }
        }
        .right {
          .info {
            > div {
              span {
                &:nth-of-type(1) {
                  flex: 0 0 120px;
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
