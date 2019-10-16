<template>
  <div class="hello">
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
            @click="selectRepairTypeOp(index)"
            :key="index"
          >
            {{ item.label }}
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="inspect-type-child" v-show="showRepairChild">
            <div
              class="inspect-child-item"
              v-for="(item, index) in optionChilds"
              :class="{ active: selectRepairChild === index }"
              @click="selectRepairChildOp(index)"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 调试 -->
        <div style="height: 1200px;" v-if="showDebugger">
          <el-steps direction="vertical" :active="activeStep">
            <el-step title="步骤 1" :description="description1"></el-step>
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
</template>

<script>
import maint from "../views/images/maint.png";
export default {
  data() {
    return {
      maint,
      introduceList: ["每日", "每周", "每月", "每季", "每年"],
      typeList: ["定期检查", "要点维护"],
      selectTab: 3,
      selectType: 0,
      selectRepairType: 0,
      selectRepairChild: 0,
      showDebugger: true,
      showMaintain: false,
      showRepair: false,
      showRepairChild: false,
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
      optionChilds: [],
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
      activeStep: 4,
      description1: `检查注塑机有无损坏；
      检查备件有无缺少配件；`
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
