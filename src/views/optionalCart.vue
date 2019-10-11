<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 header">
        <!-- 返回箭头 -->
        <img class="arrow-left" :src="backArrow" />
        <p class="text-center">
          选配清单
          <!-- 下拉图标 -->
        </p>
        <div class="search">
          <img :src="searchIcon" alt />
          <input type="text" placeholder="请输入搜索关键字" />
        </div>
        <span class="confirmBtn">添加机型</span>
      </div>
    </div>
    <div class="row">
      <p class="select-all">
        <img id="pickAll" :src="pickAll" alt />
        <span>全选</span>
      </p>
    </div>
    <div class="row">
      <div class="content">
        <!-- 每一条商品信息 -->
        <div class="product-info">
          <!-- 产品名称 -->
          <img class="pick" :src="pickAll" alt pick="true" />
          <div>
            <span>MA600 / 130 /A(标准机)</span>
          </div>
          <!-- 产品数量 -->
          <div class="count-detail">
            <!-- 数量详细 -->
            <div>
              <span>选配时间：2018-08-16 09:45</span>
            </div>
            <div class="count">
              <span>数量：</span>
              <img :src="numIcon" alt />
              <span>1</span>
              <button class="left-btn"></button>
              <button class="right-btn"></button>
            </div>
            <div>
              <img :src="editIcon" alt />
            </div>
            <div>
              <a href>查看详情</a>
            </div>
            <div>
              <img class="del-order" :src="deleteIcon" alt />
            </div>
          </div>
          <!-- 差异价 -->
          <div>
            <span>差异价：￥120000</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row footer">
      <div class="create-order col-md-1 col-md-offset-10">生成订单</div>
    </div>
    <div class="submit-wrap" style="display:none;">
      <div class="submit" style="display:none;">
        <img :src="closeIcon" alt />
        <h3>提交信息</h3>
        <div class="email">
          <div>
            <span>邮箱地址：</span>
            <div class="email-input">
              <input type="text" value="954540387@qq.com" />
            </div>
          </div>
          <div>
            <span></span>
            <div class="sumbit-btn">提交</div>
          </div>
        </div>
      </div>
      <div class="del" style="display:none;">
        <img :src="closeIcon" alt />
        <h3>删除确认</h3>
        <div class="del-confirm">
          <div>确定删除该选配订单吗？</div>
          <div>
            <div class="del-certain">确认</div>
            <div class="del-cancel">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backArrow from "./images/返回.png";
import searchIcon from "./images/搜索.png";
import pickAll from "./images/选配清单_全选.png";
import numIcon from "./images/数量控件.png";
import editIcon from "./images/编辑.png";
import deleteIcon from "./images/选配清单_删除.png";
import noPick from "./images/选配清单_未选.png";
import closeIcon from "./images/关闭.png";
export default {
  data() {
    return {
      backArrow,
      searchIcon,
      pickAll,
      numIcon,
      editIcon,
      deleteIcon,
      noPick,
      closeIcon
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
html,
body {
  height: 100%;
}

.container {
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

.row .search {
  width: 20%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12%;
  padding-left: 0;
  padding-right: 0;
  margin: 0 2%;
  border: 1px solid #fff;
  border-radius: 5px;
}

.search > img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2%;
}
.search > input {
  border: 0;
  margin-left: 8%;
  padding: 5px 0;
  width: 90%;
  color: #000;
}

.search > input:focus {
  outline: none;
}

.row .arrow-side {
  display: inline-block;
  margin-left: 30px;
}
.row p {
  font-size: 18px;
  margin: 16px 0;
}

.row .confirmBtn {
  font-size: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8%;
}

.row .select-all {
  margin-left: 8%;
}

.row .content {
  margin: 0 8%;
}

.content .product-info {
  position: relative;
  padding: 35px 0 35px 25px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid #bebebe;
}

.content .product-info > img.pick {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 35px;
  left: 0;
}
.content .product-info > div {
  width: 100%;
}

.content .product-info > :nth-of-type(1) {
  margin-bottom: 10px;
  width: 100%;
  font-size: 16px;
}

.content .product-info .count-detail {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between; /*水平留空隙*/
  align-items: center; /*垂直居中*/
}

.count-detail .count {
  position: relative;
}

.count-detail .count > span:nth-last-of-type(1) {
  position: absolute;
  left: 60%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.count-detail .count > button {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  transform: translateY(-50%);
  opacity: 0;
}

.count-detail .count > .left-btn {
  left: 20%;
}

.count-detail .count > .right-btn {
  right: 0;
}

.footer {
  border-top: 1px solid #cdcdcd;
  background-color: #f2f5f9;
  width: 100%;
  position: fixed;
  height: 6.6%;
  bottom: 0;
}

.create-order {
  margin-top: 1.6%;
  transform: translateY(-50%);
  background-color: #00338d;
  color: #fff;
  text-align: center;
  padding: 0.5% 0;
  border-radius: 5px;
}

.submit-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(153, 153, 153, 0.5);
}

.submit {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 330px;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 10px;
}

.submit > img,
.del > img {
  position: absolute;
  top: 7%;
  right: 5%;
}

.submit h3 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.submit > div {
  margin: 0 55px;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.submit > div > div {
  width: 100%;
}

.email > div {
  margin: 25px 0;
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
}

.email > div > span {
  display: inline-block;
  width: 20%;
}

.email-input,
.sumbit-btn {
  width: 80%;
}

.sumbit-btn {
  padding: 10px;
  background-color: #00338d;
  border: 1px solid #00338d;
  border-radius: 5px;
  color: #fff;
  text-align: center;
}
.email-input > input {
  text-indent: 10%;
  border: 1px solid #bebebe;
  border-radius: 5px;
  width: 100%;
  padding: 10px 0;
}

.email-input > input:focus {
  outline: none;
}

.del {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 310px;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 10px;
}

.del h3 {
  text-align: center;
  margin: 40px 0;
}

.del .del-confirm {
  margin: 0 50px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.del .del-confirm > div {
  width: 100%;
  padding: 30px 0;
}

.del .del-confirm > div:nth-of-type(1) {
  text-align: center;
  font-size: 18px;
}

.del .del-confirm > div:nth-of-type(2) {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
}

.del-certain,
.del-cancel {
  padding: 10px 0;
  border: 1px solid #00338d;
  border-radius: 5px;
  background-color: #00338d;
  color: #fff;
  text-align: center;
  width: 45%;
}

.del-cancel {
  border: 1px solid #b5b5b5;
  background-color: #b5b5b5;
}
</style>
