<template>
  <div>
    <!-- 上部背景 -->
    <div class="top">
      <!-- 大标题部分 -->
      <div class="top-title"></div>
      <!-- 文字区域部分 -->
      <div class="top-text" v-show="type == 1">
        <ul>
          <li>通过两周的角逐</li>
          <li>选出来15个优质起名大家投票</li>
          <li>
            得票数最多得用户将获得<span class="flower"></span
            ><span class="count">10000玫瑰</span>大奖
          </li>
          <li>
            其他入围用户获得<span class="flower"></span
            ><span class="count">1000玫瑰</span>奖励!
          </li>
          <li>更多活动,敬请期待～</li>
        </ul>
      </div>
    </div>
    <!-- 底部背景 -->
    <div class="bottom">
      <!-- 外部大框 -->
      <div class="bottom-border" v-show="type == 1">
        <!-- 内部标题 -->
        <h5 class="bottom-title" v-show="dateTime">
          每人一次投票机会，投票截止日期12.30日
        </h5>
        <h5 class="bottom-title" v-show="titleActive">
          已投票给《{{ opt_title.title }}》，投票截止日期12.30日
        </h5>
        <div
          class="sm-box"
          v-for="item in list"
          :key="item.id"
          :class="{ voteActive: changeId == item.id ? 1 : 0 }"
        >
          <ul>
            <li>{{ item.title }}</li>
            <li>id:{{ item.nickname }}</li>
          </ul>
          <div class="vote" v-show="btnActive" @click="vote(item)">投票</div>
          <h6 class="votePeople" v-show="voteActive">
            {{ item.vote_num }}人投票
          </h6>
        </div>
      </div>
      <!-- 获奖名单 -->
      <div class="bottom-winner" v-show="type == 2">
        <!-- 标题头 -->
        <div class="title-header"></div>
        <!-- 得票数最多的名称是 -->
        <div class="winner">
          <div class="star-left"></div>
          <h5 class="public">得票数最多的名称是</h5>
          <div class="star-right"></div>
        </div>
        <div class="winnerName">
          <!-- id位 -->
          <!--  -->
          <div class="id-position">{{ winList.nickname }}</div>
          <h5>{{ winList.title }}</h5>
          <!--  -->
          <h6>{{ winList.vote_num }}票</h6>
          <!--  -->
        </div>
        <div class="else-winner">
          <div class="star-left"></div>
          <h5 class="public">其他名称获票数公示</h5>
          <div class="star-right"></div>
        </div>
        <div class="winner-list">
          <ul v-for="item in list" :key="item.id">
            <li>{{ item.title }}</li>
            <li>{{ item.vote_num }}票</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnActive: true, //按钮显示隐藏的字段
      voteActive: false,
      dateTime: true,
      titleActive: false,
      user_id: "", //用户user_id字段
      list: [], //页面渲染数据部分
      winList: {}, //获奖名单渲染部分
      type: "", //投票进行的状态
      opt_title: {}, //获奖的人的数据
      changeId: "",
    };
  },
  mounted() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      let geturl = window.location.href;

      let getqyinfo = geturl.split("?")[1];
      //href.split("?") 截取出来的格式为 ["http://localhost:8080/","user_id=111"]
      let getqys = getqyinfo.split("&");
      let obj = {}; //创建空对象，接收截取的参数
      for (let i = 0; i < getqys.length; i++) {
        console.log(i);
        let item = getqys[i].split("=");
        let key = item[0];
        let value = item[1];
        obj[key] = value;
      }
      this.user_id = obj.user_id;
      console.log(this.user_id);
      this.getList(); //获取投票列表数据
    },
    getList() {
      this.$http
        .post("/api/studyRoom/getAreaTitleVoteList", {
          user_id: this.user_id,
        })
        .then((res) => {
          console.log(res.data.data);
          let data = res.data.data;
          this.list = data.list;
          this.type = data.type;
          this.winList = data.win_out_title;
          this.opt_title = data.opt_title;
          if (this.opt_title.id !== 0) {
            this.btnActive = false;
            this.dateTime = false;
            this.voteActive = true;
            this.titleActive = true;
          }
        });
    },
    vote(item) {
      this.$http
        .post("/api/studyRoom/optAreaTitle", {
          user_id: this.user_id,
          id: item.id,
        })
        .then((res) => {
          console.log(res.data, "999");
          if (res.data.status == 1) {
            this.changeId = item.id;
            this.getList();
            this.btnActive = false;
            this.dateTime = false;
            this.voteActive = true;
            this.titleActive = true;
          }
        });
    },
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 13.36rem;
  background-image: url("@/assets/home-img/7.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top-title {
  width: 7.7333rem;
  height: 2.9733rem;
  background-image: url("@/assets/home-img/1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  transform: translateY(1.5867rem);
}
.top-text {
  width: 9.1867rem;
  height: 5.04rem;
  background-image: url("@/assets/home-img/9.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 1.6rem auto;
  /* transform: translateY(1.8667rem); */
}
.top-text ul {
  transform: translateY(1.0667rem);
}
.top-text li {
  font-size: 0.32rem;
  color: #66422e;
  text-align: center;
  margin-bottom: 0.3733rem;
  white-space: nowrap;
}
.flower {
  display: inline-block;
  width: 0.4267rem;
  height: 0.3333rem;
  background-image: url("@/assets/home-img/2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform: translateY(2px);
}
.count {
  display: inline-block;
  font-size: 0.3467rem;
  color: #ff8b79;
  background-image: url("@/assets/home-img/5.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottom {
  width: 100%;
  height: 23.2133rem;
  background-image: url("@/assets/home-img/6.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottom-border {
  width: 9.7867rem;
  height: 22.04rem;
  background-image: url("@/assets/home-img/8.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: -3.4667rem auto;
  /* transform: translateY(-3.3667rem); */
}
.bottom-title {
  padding-top: 0.4rem;
  padding-bottom: 0.5333rem;
  text-align: center;
  font-size: 0.32rem;
  font-weight: normal;
  color: #ababff;
  white-space: nowrap;
}
.sm-box {
  display: flex;
  justify-content: space-between;
  width: 9.05rem;
  height: 1.2267rem;
  /* background: pink; */
  margin: 0 auto 0.1333rem;
  transform: translateX(-2px);
}
.sm-box li:first-child {
  width: 6rem;
  padding-top: 0.2rem;
  font-size: 0.4267rem;
  color: #66422e;
  margin-bottom: 0.1333rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.2667rem;
}
.sm-box li:last-child {
  width: 6rem;
  line-height: 0.4rem;
  margin-left: 0.2667rem;
  font-size: 0.3067rem;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vote {
  width: 1.72rem;
  height: 0.68rem;
  background-image: url("@/assets/home-img/4.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-size: 0.3333rem;
  text-align: center;
  line-height: 0.68rem;
  color: #fff;
  transform: translateY(12px);
  margin-right: 0.2667rem;
}
.votePeople {
  font-size: 0.3333rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.2267rem;
  margin-right: 0.2667rem;
}
.voteActive {
  background: #f6f3fd;
}
.bottom-winner {
  width: 9.7867rem;
  height: 24.04rem;
  margin: 0 auto;
  background-image: url("@/assets/activity-img/5.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform: translateY(-318px);
}
.title-header {
  width: 4.0267rem;
  height: 1.72rem;
  background-image: url("@/assets/activity-img/7.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform: translateY(-20px);
}
.winner {
  display: flex;
  width: 5.0533rem;
  height: 0.4133rem;
  margin: 0 auto;
}
.star-left {
  width: 0.3467rem;
  height: 0.3467rem;
  background-image: url("@/assets/activity-img/4.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.public {
  font-size: 0.4533rem;
  font-weight: normal;
  color: #66422e;
  white-space: nowrap;
}
.star-right {
  width: 0.3467rem;
  height: 0.3467rem;
  background-image: url("@/assets/activity-img/6.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.winnerName {
  width: 6.4267rem;
  height: 2.4533rem;
  background-image: url("@/assets/activity-img/9.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 20px auto;
}
.winnerName h5 {
  text-align: center;
  font-size: 0.7467rem;
  color: #efb549;
}
.winnerName h6 {
  text-align: center;
  font-size: 0.3867rem;
  font-weight: normal;
  color: #66422e;
  transform: translateY(10px);
}
.else-winner {
  display: flex;
  width: 5.0533rem;
  height: 0.4133rem;
  margin: 0 auto;
}
.winner-list {
  width: 7.6667rem;
  height: 13.0133rem;
  background-image: url("@/assets/activity-img/8.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 40px auto;
}
.winner-list ul {
  display: flex;
  justify-content: space-between;
}
.winner-list li {
  font-size: 0.3733rem;
  color: #66422e;
  margin: 0.2667rem 0.2667rem 0.2533rem;
}
.id-position {
  width: 2rem;
  height: 0.8rem;
  transform: translateX(195px);
  background-image: url("@/assets/activity-img/1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
  font-size: 0.3733rem;
  line-height: 0.6rem;
  color: #a59afe;
  padding-left: 0.1333rem;
  padding-right: 0.1333rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: KoseFont-SC;
}
body {
  width: 100%;
}
@font-face {
  font-family: KoseFont-SC;
  src: url("@/assets/font/KoseFont-SC.ttf");
}
</style>
