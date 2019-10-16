<template>
  <div class="app">
    <el-table class="list" stripe :data="list" border style="width: 100%">
      <el-table-column
        align="center"
        prop="nominalCaliber"
        label="公称口径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="inchCaliber"
        label="英制口径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="crossSectionalaArea"
        label="横截面积"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="flowCapacity"
        label="通流能力（4m/s）"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="flowCapacity2"
        label="通流能力（2m/s）"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import maint from "../views/images/maint.png";
export default {
  data() {
    return {
      maint,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let qry = new this.Query();
      qry.buildPageClause(this.pageNo, this.pageSize);
      let data = await this.api.waterPipeList(qry.getParam());
      this.list = data.data.list;
      this.total = data.page.total;
    },
    handleCurrentChange(e) {
      this.pageNo = e;
      this.getList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list {
  width: 80% !important;
  margin: 20px auto;
}
.el-pagination {
  width: 80%;
  margin: 0 auto;
}
</style>
