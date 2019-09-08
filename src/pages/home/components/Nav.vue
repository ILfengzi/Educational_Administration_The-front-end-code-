<template>
  <div class="nav">
    <h4 class="nav-h4">教务管理系统</h4>
    <div class="side-bar">
      <a-menu mode="inline" theme="dark">
        <template v-for="item in navList">
          <a-menu-item v-if="!item.children" :key="item.key" @click="changeUrl(item.key)">
            <span>{{item.title}}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key"/>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";
export default {
  components: {
    "sub-menu": SubMenu
  },
  data() {
    return {
      navList: [
        {
          key: "studentLeave", //作为跳转的地址（具有语义的单词拼接）
          title: "在线请假"
        },
        {
          key: "gradeManageMent",
          title: "成绩管理系统",
          children: [
            {
              key: "StudentSearchGrade",
              title: "（学生）查看成绩"
            },
            {
              key: "TeacherSearchGrade",
              title: "（教师）查看成绩"
            },
            {
              key: "InputGradeItem",
              title: "录入组成项"
            },
            {
              key: "InputGrade",
              title: "录入成绩"
            },
            {
              key: "StudentApplication",
              title: "我的申请"
            },
            {
              key: "TeacherApplicationManage",
              title: "申请管理"
            },
            {
              key: "OfficerApplicationManage",
              title: "我的审核"
            }
          ]
        }

        // {//一级菜单
        //   key: 'leaveRecords',
        //   title: '查看请假记录',
        // },
        // {//二级菜单
        //   key: 'menu3',
        //   title: 'menu3',
        //   children: [{
        //       key: 'menu3-item1',
        //       title: 'menu3-item1',
        //     },
        //     {
        //       key: 'menu3-item2',
        //       title: 'menu3-item2',
        //     },
        //   ],
        // },
        // {//三级菜单
        //   key: 'menu4',
        //   title: 'menu4',
        //   children: [{
        //       key: 'menu4-item1',
        //       title: 'menu4-item1',
        //       children: [{
        //           key: 'sub4-item1',
        //           title: 'sub4-item1',
        //         },
        //         {
        //           key: 'sub4-item2',
        //           title: "sub4-item2",
        //         },
        //         {
        //           key: 'sub4-item3',
        //           title: "sub4-item3",
        //         }
        //       ]
        //     },
        //     {
        //       key: 'menu4.2',
        //       title: 'menu4.2',
        //     }
        //   ],
        // },
      ]
    };
  },
  methods: {
    changeUrl(url) {
      this.$router.push({ name: url });
    }
  }
};
</script>

<style scoped>
.nav {
  width: 15%;
  min-width: 120px;
  background: #2c3b48;
  color: rgba(255, 255, 255, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.nav-h4 {
  width: 100%;
  height: 59px;
  min-width: 120px;
  line-height: 59px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  border-bottom: 1px solid #4b545c;
}

.side-bar {
  width: 110%;
  height: 100vh;
  min-width: 120px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 50%;
}

.ant-menu {
  background: #2c3b48 !important;
}
</style>
