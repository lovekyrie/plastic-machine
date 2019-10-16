<template>
  <div class="app">
    <div class="content">
      <!-- 左侧选项 -->
      <div class="left">
        <div class="img">
          <img :src="maint" alt />
        </div>
        <!-- 注塑机维护 -->
        <div class="maintain">
          <p>5个要点维护、5个定期检查</p>
          <div
            class="inspect-type"
            v-for="(item, index) in typeList"
            :class="{ active: id === item.id }"
            @click="id = item.id"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 维护 -->
        <div class="maintain-right">
          <div class="title">
            <div
              v-for="(item, index) in introduceList"
              :key="index"
              :class="{ active: contentId === item.id }"
              @click="chooseTab(item.id)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="concept" v-html="info.content"></div>
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
      id: "",
      contentId: "",
      info: {}
    };
  },
  watch: {
    id: function() {
      this.getTypeList2();
    },
    contentId: function() {
      this.getInfo();
    }
  },
  methods: {
    async getTypeList(cd) {
      let query = new this.Query();
      query.buildWhereClause("typeCd", cd, "LK");
      this.typeList = await this.api.operAndMainLeftList(query.getParam());
      if (this.typeList.length > 0) {
        this.id = this.typeList[0].id;
      }
    },
    async getTypeList2() {
      let query = new this.Query();
      query.buildWhereClause("trainTypeOneId", this.id, "LK");
      this.introduceList = await this.api.operAndMainLeftList2(
        query.getParam()
      );
      this.contentId = this.introduceList[0].id;
    },
    async getInfo() {
      // this.info = await this.api.operAndMainDetail({trainTypeTwoId:this.contentId})
    }
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
