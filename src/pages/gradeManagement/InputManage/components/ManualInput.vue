<!--
 * @Description: 录入管理/录入成绩/手动录入
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-04-29 15:22:09
 * @LastEditTime: 2019-06-19 14:04:32
 -->
 <template>
  <div class="content">
    <!-- 头部 -->
    <div>
      <a-row>
        <a-col :span="6">请选择需要录入的学生</a-col>
        <a-col :span="6" :offset="12">
          <a-button type="primary" ghost @click="goBack()">返回上一层</a-button>
        </a-col>
      </a-row>
    </div>

    <!-- 排序主表格 -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="load"
      :row-key="record => record.stuNo"
      @change="mainpageChange(pagination)"
      class="my-tooltip"
    >
      <!-- 气泡插槽 -->
      <span slot="tooltip" slot-scope="text">
        <a-tooltip placement="top">
          <template slot="title">{{text}}</template>
          <span>{{text}}</span>
        </a-tooltip>
      </span>

      <!-- 操作插槽 -->
      <div slot="operation" slot-scope="text,record" type="primary">
        <a-button type="primary">
          <!-- 动态绑定参数，在进行字符串拼接，然后路由跳转时传过去 -->
          <router-link
            :to="'./InputOneGrade?id='+record.mainId+'&stuId='+record.stuId+'&courseId='+tempCourseId"
          >录入</router-link>
        </a-button>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "学号",
    dataIndex: "stuNo",
    key: "stuNo",
    width: 150,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.stuNo.indexOf(value) === 0,
    sorter: (a, b) => a.stuNo - b.stuNo //数字排序规则
  },
  {
    title: "姓名",
    dataIndex: "stuName",
    key: "stuName",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.stuName.indexOf(value) === 0,
    sorter: (a, b) => a.stuName.localeCompare(b) //非AscII排序规则
  },
  {
    title: "班级",
    dataIndex: "stuClass",
    key: "stuClass",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.stuClass.indexOf(value) === 0,
    sorter: (a, b) => a.stuClass.localeCompare(b) //非AscII排序规则
  },
  {
    title: "联系方式",
    dataIndex: "contact",
    key: "contact",
    width: 150
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 150,
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: " ",
    dataIndex: " ",
    stuNo: " ",
    stuName: " ",
    stuClass: " ",
    contact: " ",
    operation: "录入",
    mainId: " ",
    stuId: " "
  }
];

export default {
  data() {
    return {
      // titleform: this.$form.createForm(this),
      modelform: this.$form.createForm(this),
      data,
      columns,
      visible: false,
      // value: undefined,
      load: false,
      pagination: {
        pageSize: 6 // 设置每页的记录条数
      },
      tempCourseId: this.$route.query.courseId
    };
  },

  // watch: {
  //   value(value) {
  //     console.log(value);
  //   }
  // },

  methods: {
    callback(key) {
      console.log(key);
    },

    /**
     * @page: 页数
     * @limit: 每页的记录数
     */
    fetch(pageNum, limit) {
      this.load = true;
      this.axios
        .get("/json/gradeManagement1/zi", {
          params: {
            cId: this.$route.query.cId,
            classId: this.$route.query.classId,
            semesterId: this.$route.query.semesterId
          }
        })
        .then(response => {
          this.load = false;
          let res = response.data;
          console.log(res);
          // 更新当前表格数据
          this.data = res.data;
          // 更新记录条数更新分页
          this.pagination = {
            total: res.total
            // pageSize: res.data.pageSize,
          };
        });
    },

    /**
     * 切换分页
     */
    mainpageChange(pagination) {
      this.fetch(pagination.current, pagination.pageSize);
    },

    /**
     * 返回上一层
     */
    goBack() {
      console.log("this.$route：******************");
      console.log(this.$route);
      console.log("************************");
      this.$router.go(-1);
    },

    /**
     * 弹出和关闭抽屉
     */
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  },

  /**
   * 页面挂载后,请求第一页内容
   */
  mounted() {
    this.fetch(1, this.pagination.pageSize);
  }
};
</script>

<style>
/* .content {
  background: #fff;
  padding: 30px 30px;
} */
</style>