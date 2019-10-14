<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" @click="back" />
        <p class="text-center" @click="showOption">
          <span>{{ operate }}</span>
          <!-- 下拉图标 -->
          <img class="arrow-side" :src="pullDown" />
        </p>
        <div type="false" class="ul-style" v-if="showType">
          <li
            v-for="(item, index) in operateList"
            :key="index"
            @click="chooseOperate(item)"
          >
            {{ item }}
          </li>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="content">
        <!-- 左侧选项 -->
        <div class="left">
          <div class="img">
            <img :src="maint" alt />
          </div>
          <!-- 注塑机维护 -->
          <div class="maintain" v-if="showMaintain">
            <p>5个要点维护、5个定期检查</p>
            <div
              class="inspect-type"
              v-for="(item, index) in typeList"
              :class="{ active: selectType === index }"
              @click="selectType = index"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <!-- 注塑机维修 -->
          <div class="repair" v-if="showRepair">
            <div
              class="inspect-type"
              v-for="(item, index) in options"
              :class="{ active: selectRepairType === index }"
              @click="selectRepairType = index"
              :key="index"
            >
              {{ item.label }}
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="right">
          <!-- 调试 -->
          <div style="height: 1200px;" v-if="showDebugger">
            <el-steps direction="vertical" :active="1">
              <el-step title="步骤 1" :description="description1"> </el-step>
              <el-step title="步骤 2"></el-step>
              <el-step
                title="步骤 3"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 4"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 5"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 6"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 7"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 8"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 9"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
              <el-step
                title="步骤 10"
                description="这是一段很长很长很长的描述性文字"
              ></el-step>
            </el-steps>
          </div>
          <!-- 维护 -->
          <div class="maintain-right" v-if="showMaintain">
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
            <div class="concept" v-show="selectTab === 3">
              <p>2005年，HTF普通型注塑机</p>
              <p>2006年-2011年，天隆MA伺服节能注塑机</p>
              <p>2012年后，天隆MAII伺服节能、高效、精密注塑机</p>
              <p>
                我们将产品归拢为8大品类，每个品类列举的实例中设计的设备所魔力最高至2300千牛。我们具体地描述了八大品类产品的特质
                及其质量标准，以此为轴线，进一步具体地探讨了质量要求与设备功能之间的相互关联，最终导出最有推荐方案。我们将产品归拢为8大品类，
                每个品类列举的实例中涉及的设备锁模力最高至2300千牛。我们具体地秒速了八大品类产品的特质及其质量标准，
                以此为轴线，进一步具体的探讨了质量要求与设备功能之间的相互关联，最终导出最优推荐方案。
              </p>
            </div>
          </div>
          <!-- 维修 -->
          <div class="repair-right" v-if="showRepair">
            <div>
              <div>序号</div>
              <div>故障现象</div>
              <div>故障原因</div>
              <div>解决方法</div>
            </div>
            <div v-for="(item, index) in repairList" :key="index">
              <div>{{ item.no }}</div>
              <div>{{ item.phenomenon }}</div>
              <div>
                <p v-for="(i, index) in item.reason" :key="index">{{ i }}</p>
              </div>
              <div>{{ item.solution }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import pullDown from "./images/标签栏下拉箭头.png";
import maint from "./images/maint.png";
export default {
  data() {
    return {
      backArrow,
      pullDown,
      maint,
      showType: false,
      operateList: ["注塑机调试", "注塑机维护", "注塑机维修"],
      operate: "注塑机调试",
      introduceList: ["每日", "每周", "每月", "每季", "每年"],
      typeList: ["定期检查", "要点维护"],
      selectTab: 3,
      selectType: 0,
      selectRepairType: 0,
      showDebugger:true,
      showMaintain: false,
      showRepair: false,
      options: [
        {
          value: "zhinan",
          label: "合模",
          children: [
            {
              value: "jixie",
              label: "机械"
            },
            {
              value: "yeya",
              label: "液压"
            },
            {
              value: "dianlu",
              label: "电路"
            }
          ]
        },
        {
          value: "zujian",
          label: "开模",
          children: [
            {
              value: "basic",
              label: "Basic"
            },
            {
              value: "form",
              label: "Form"
            },
            {
              value: "data",
              label: "Data"
            },
            {
              value: "notice",
              label: "Notice"
            },
            {
              value: "navigation",
              label: "Navigation"
            },
            {
              value: "others",
              label: "Others"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "顶出",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "调模",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "抽芯",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "预塑",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "射出",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      repairList: [
        {
          no: 1,
          phenomenon: "调模不动作",
          reason: ["制品壁厚不匀"],
          solution: "清洗电磁阀"
        },
        {
          no: 2,
          phenomenon: "调模不动作",
          reason: [
            "1.制品壁厚不匀",
            "2.制品壁厚不匀",
            "3.制品壁厚不匀",
            "4.制品壁厚不匀"
          ],
          solution: "加大调模压力"
        },
        {
          no: 1,
          phenomenon: "调模不动，压力低",
          reason: ["液压油较脏，停机20多天，造成流量先导卡滞，无法响应小流量"],
          solution:
            "将流量先导阀清洗（起先怀疑此阀已坏，拆洗麻烦），装上，恢复正常"
        }
      ],
      description1:`检查注塑机有无损坏；
      检查备件有无缺少配件；`
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    chooseTab(index) {
      this.selectTab = index;
    },
    showOption() {
      this.showType = !this.showType;
    },
    chooseOperate(item) {
      this.operate = item;
      this.showType = false;
      if (item === "注塑机维修") {
        this.showRepair = true;
        this.showMaintain = false;
        this.showDebugger=false;
      } else if (item === "注塑机维护") {
        this.showMaintain = true;
        this.showRepair = false;
        this.showDebugger=false
      }
      else{
        this.showDebugger=true
        this.showRepair=false
        this.showMaintain=false
      }
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
  background-color: #fff;
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

.row .arrow-side {
  display: inline-block;
  margin-left: 3%;
}

.text-center {
  font-size: 18px;
}

.text-center > span {
  display: inline-block;
  width: 5%;
}

.header {
  > .ul-style {
    color: #00338d;
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
    background-color: #00338d;
    box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
    > li {
      width: 100%;
      /* background-color: #00338D; */
      background-color: #fff;
      padding: 8px 0 8px 6%;
      &:hover {
        background-color: #00338d;
        color: #fff;
      }
    }
  }
}

.row {
  p {
    margin: 18px 0;
  }
  .content {
    display: -webkit-flex;
    display: flex;
    width: 1440px;
    margin: 60px auto;
    height: 100%;
    flex-flow: row nowrap;
    justify-content: space-between;
    .left {
      width: 260px;
      background-color: #fff;
      text-align: center;
      .img {
        border: 1px solid #ccc;
      }
      .inspect-type {
        padding: 20px 0;
        background-color: #fafafa;
        color: #8c8c8c;
      }
      .active {
        background-color: #00338d;
        color: #fff;
      }
    }

    .repair {
      margin-top: 60px;
      .inspect-type {
        text-align: left;
        padding-left: 40px;
        i {
          margin-left: 100px;
        }
      }
    }
    .right {
      width: 70%;

      .maintain-right {
        .title {
          width: 100%;
          display: -webkit-flex;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          background-color: #f2f5f9;
          > div {
            margin: 0 30px;
            padding: 15px 0;
            flex: 6;
            text-align: center;
          }
          > .active {
            border-bottom: 1px solid #4e72b0;
            color: #4e72b0;
          }
        }
        .concept {
          margin: 50px 150px 0 40px;
          line-height: 30px;
          > p {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      }
      .repair-right {
        display: -webkit-flex;
        display: flex;
        flex-flow: column wrap;
        > div {
          flex: 1;
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          align-items: center;

          &:nth-of-type(2n) {
            background-color: #f7f9fb;
          }
          &:nth-of-type(2n + 1) {
            background-color: #edf1f7;
          }
          &:nth-of-type(1) {
            background-color: #00338d;
            color: #fff;
          }
          > div {
            padding: 5px 0;
            &:nth-of-type(1) {
              width: 10%;
              text-align: center;
            }
            &:nth-of-type(2) {
              width: 20%;
            }
            &:nth-of-type(3) {
              width: 30%;
            }
            &:nth-last-of-type(1) {
              width: 40%;
            }
          }
        }
      }
    }
  }
}
</style>
