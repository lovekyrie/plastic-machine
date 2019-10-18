<template>
  <div class="factory">
    <div class="choose" v-show="choose">
      <div class="main">
        <div class="title">
          <span @click="choose = false">&lt; 返回</span>
          <p>基础机型</p>
          <span @click="toView">查看</span>
        </div>
        <div class="select">
          <p>机型</p>
          <el-select
            v-model="currentChoose.machineModel"
            placeholder="请选择机型"
          >
            <el-option
              v-for="item in modelList"
              :key="item.machineModel"
              :label="item.machineModel"
              :value="item.machineModel"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <p>锁模力</p>
          <el-select
            v-model="currentChoose.clampForce"
            placeholder="请选择锁模力"
          >
            <el-option
              v-for="item in clampingForce"
              :key="item.clampForce"
              :label="item.clampForce"
              :value="item.clampForce"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <p>注射当量</p>
          <el-select v-model="currentChoose.injection" placeholder="请选择">
            <el-option
              v-for="item in injection"
              :key="item.injection"
              :label="item.injection"
              :value="item.injection"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <p>数量</p>
          <el-select v-model="currentChoose.qty" placeholder="请选择">
            <el-option
              v-for="item in qtyList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="button">
          <button @click="confirm">确定</button>
          <button @click="toAdd">添加</button>
        </div>
      </div>
    </div>
    <div class="view" v-show="view">
      <div class="main">
        <div class="viewList">
          <p>机型</p>
          <p>锁模力</p>
          <p>注射重量</p>
          <p>机械手用气量</p>
          <p>数量</p>
          <p>操作</p>
        </div>
        <div class="viewList" v-for="(item, index) in dataList" :key="index">
          <p>{{ item.machineModel }}</p>
          <p>{{ item.clampForce }}</p>
          <p>{{ item.injection }}</p>
          <p>{{ item.manipulatorGas }}</p>
          <p>{{ item.qty }}</p>
          <p @click="toDelet(index)"><i class="el-icon-delete"></i></p>
        </div>
        <p @click="view = false">确定</p>
      </div>
    </div>
    <p>
      <span @click="view = true">编辑</span
      ><span @click="choose = true">添加</span>
    </p>
    <el-table
      class="list"
      :data="dataList"
      border
      style="width: 100%"
      :row-class-name="tabRowClassName"
    >
      <el-table-column
        align="center"
        prop="nominalCaliber"
        label="机型/代号"
        width="180"
      >
        <template slot-scope="scop">
          <p>
            {{ scop.row.machineModel ? scop.row.machineModel : "空" }}/{{
              scop.row.codeName ? scop.row.codeName : "空"
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="锁模力/注射当量" width="180">
        <template slot-scope="scop">
          <p>
            {{ scop.row.clampForce ? scop.row.clampForce : "空" }}/{{
              scop.row.injection ? scop.row.injection : "空"
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="machinePower" label="整机功率(KW)">
      </el-table-column>
      <el-table-column
        align="center"
        prop="transformerPower"
        label="变压器功率(KW)"
      >
      </el-table-column>
      <el-table-column align="center" prop="powerConsumer" label="用电量(KW)">
      </el-table-column>
      <el-table-column align="center" prop="totalWater" label="用水量(L/min)">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gasConsumption"
        label="用气量(L/Min)"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="manipulatorGas"
        label="机械手用气量(L/Min)"
      >
      </el-table-column>
      <el-table-column align="center" prop="totalWeight" label="总重量(T)">
      </el-table-column>
      <el-table-column align="center" prop="machineHeight" label="机器高度(M)">
      </el-table-column>
      <el-table-column align="center" prop="qty" label="数量">
      </el-table-column>
    </el-table>
    <el-table
      class="total"
      stripe
      :data="total"
      border
      style="width: 100%"
      :row-class-name="tabRowClassName"
    >
      <el-table-column align="center" prop="qty" label="机器总数量" width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="powerConsumer"
        label="总用电量(KW)"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" prop="totalWater" label="总用水量(L/Min)">
      </el-table-column>
      <el-table-column
        align="center"
        prop="transformerPower"
        label="变压器功率(KW)"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="coolingTower"
        label="所需冷却塔(T/h)"
      >
      </el-table-column>
      <el-table-column align="center" prop="pondage" label="蓄水量(m3)">
      </el-table-column>
      <el-table-column align="center" prop="diameter" label="公称内径(mm)">
      </el-table-column>
      <el-table-column align="center" prop="gas" label="厂房用气量(L/Min)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import maint from "../views/images/maint.png";
export default {
  data() {
    return {
      maint,
      ifAdd: false, //在选择弹出窗是否点击了添加，点了添加确定按键只是关闭窗口，没有点击过添加，确定可以添加一条
      choose: true,
      modelList: [],
      clampingForce: [],
      injection: [],
      qtyList: [],
      view: false,
      addList: [], //添加的列表信息
      addInfoList: [], //添加的数据转换成的详情列表
      dataList: [], //显示全部的详情列表
      currentChoose: {
        machineModel: "",
        clampForce: "",
        injection: "",
        qty: 1,
        manipulatorGas: ""
      },
      deleIndex: [], //删除的索引，通过这个来删除详情列表里数据
      totalData: {
        qty: 0,
        gas: 0,
        diameter: 0,
        pondage: 0,
        coolingTower: 0,
        transformerPower: 0,
        totalWater: 0,
        powerConsumer: 0
      },
      total: []
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    "currentChoose.machineModel": async function() {
      this.clampingForce = await this.api.clampingForce({
        machineModel: this.currentChoose.machineModel
      });
      this.currentChoose.clampForce = this.clampingForce[0].clampForce;
    },
    "currentChoose.clampForce": async function() {
      this.injection = await this.api.injection({
        machineModel: this.currentChoose.machineModel,
        clampForce: this.currentChoose.clampForce
      });
      this.currentChoose.injection = this.injection[0].injection;
    },
    dataList: {
      deep: true,
      handler: function(data) {
        this.total = [];
        if (data.length > 0) {
          let total = JSON.parse(JSON.stringify(this.totalData));
          this.total = [];
          data.forEach(item => {
            total.qty += item.qty;
            total.transformerPower += parseInt(item.transformerPower);
            total.totalWater += parseInt(item.totalWater);
            total.powerConsumer += parseInt(item.powerConsumer);
          });
          this.total.push(total);
        }
      }
    }
  },
  methods: {
    toDelet(index) {
      this.dataList.splice(index, 1);
    },
    async getData() {
      this.modelList = await this.api.modelList();
      this.currentChoose.machineModel = this.modelList[0].machineModel;
      for (let i = 1; i < 100; i++) {
        this.qtyList.push(i);
      }
      this.currentChoose.qty = this.qtyList[0];
    },
    getInfo() {
      let param = {
        machineModel: this.currentChoose.machineModel,
        clampForce: this.currentChoose.clampForce,
        injection: this.currentChoose.injection
      };
      return this.api.factoryInfo(param);
    },
    toView() {
      this.choose = false;
      this.view = true;
    },
    confirm() {
      if (this.ifAdd) {
        this.dataList.push(...this.addInfoList);
        this.addInfoList = [];
        this.choose = false;
        this.ifAdd = false;
      } else {
        this.toAdd("confirm");
      }
    },
    async toAdd(type) {
      let info = await this.getInfo();
      info.qty = this.currentChoose.qty;
      this.addInfoList.push(info);
      // console.log(this.addInfoList);
      this.ifAdd = true;
      if (type === "confirm") {
        this.dataList.push(...this.addInfoList);
        this.addInfoList = [];
        // console.log(this.dataList);
        this.choose = false;
        this.ifAdd = false;
      }
    },
    tabRowClassName({ rowIndex }) {
      let index = rowIndex;
      if (index % 2 == 0) {
        return "warning-row";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
tr.warning-row {
  background: #f3f9ff !important;
}
</style>
<style scoped lang="less">
p {
  margin: 0;
}
.factory > p {
  text-align: center;
  span {
    display: inline-block;
    margin: 10px;
  }
}
.choose {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  display: -webkit-flex;
  z-index: 99;
  .main {
    margin: auto;
    width: 500px;
    background: #ffffff;
    border-radius: 10px;
    .title {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      margin-top: 10px;
      span {
        margin: 0 20px;
        cursor: pointer;
      }
      p {
        flex: 1;
        text-align: center;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
      }
    }
    .select {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      margin-left: 40px;
      margin-bottom: 20px;
      p {
        width: 90px;
      }
    }
    .button {
      width: 100%;
      border-top: 1px solid #e4e4e4;
      padding: 20px 0;
      button {
        width: 120px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #00338d;
        color: #ffffff;
        border: 0;
        border-radius: 5px;
        margin-left: 40px;
      }
    }
  }
}
.view {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  display: -webkit-flex;
  z-index: 99;
  .main {
    margin: auto;
    width: 60%;
    background: #ffffff;
    border-radius: 10px;
    padding: 30px;
    > p {
      background: #00338d;
      color: #ffffff;
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      border-radius: 3px;
      margin-top: 10px;
    }
    .viewList {
      display: flex;
      display: -webkit-flex;
      padding: 10px 0;
      border-bottom: 1px solid #e4e4e4;
      height: 50px;
      align-items: center;
      p {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
