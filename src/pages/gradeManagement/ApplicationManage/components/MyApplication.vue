<!--
 * @Description: 我的申请/教师
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-05-08 18:17:18
 * @LastEditTime: 2019-06-18 16:30:00
 -->

<template>
  <div>
    <!-- 筛选和排序表格 -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="load"
      @change="handleChange"
      :row-key="record => record.applyId"
      :scroll="{}"
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
      <a-button
        slot="operation"
        slot-scope="text,record"
        type="primary"
        ghost
        @click="showDrawer(record)"
      >其他</a-button>
    </a-table>

    <!-- 抽屉层 -->
    <a-drawer
      title="申请记录明细"
      :width="520"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '10 8px'}"
    >
      <a-form :form="modelform" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新分数" id="newScore">
              <p>{{newScore}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧分数" id="oldScore">
              <p>{{oldScore}}</p>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新登分人姓名" id="newRegName">
              <p>{{newRegName}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧登分人姓名" id="oldRegName">
              <p>{{oldRegName}}</p>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新登分人部门" id="newRegDepartment">
              <p>{{newRegDepartment}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧登分人部门" id="oldRegDepartment">
              <p>{{oldRegDepartment}}</p>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新登分时间" id="newRegTime">
              <p>{{newRegTime}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧登分时间" id="oldRegTime">
              <p>{{oldRegTime}}</p>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新审核人姓名" id="newAudName">
              <p>{{newAudName}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧审核人姓名" id="oldAudName">
              <p>{{oldAudName}}</p>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新审核人部门" id="newAudDepartment">
              <p>{{newAudDepartment}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧审核人部门" id="oldAudDepartment">
              <p>{{oldAudDepartment}}</p>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新审核时间" id="newAudTime">
              <p>{{newAudTime}}</p>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="旧审核时间" id="oldAudTime ">
              <p>{{oldAudTime}}</p>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <br> -->
        <a :href="aa">
          <a-button type="primary" icon="download">下载附件</a-button>
        </a>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
const columns = [
  // {
  //   title: "纪录编号",
  //   dataIndex: "applyId",
  //   key: "applyId",
  //   width: 130,
  //   onFilter: (value, record) => record.applyId.indexOf(value) === 0,
  //   sorter: (a, b) => a.applyId - b.applyId //数字排序规则
  // },
  {
    title: "课程名称",
    dataIndex: "course",
    key: "course",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.course.indexOf(value) === 0,
    sorter: (a, b) => a.course.localeCompare(b) //非ASCII排序规则
  },
  {
    title: "成绩项",
    dataIndex: "courseItem",
    key: "courseItem",
    width: 130,
    onFilter: (value, record) => record.courseItem.indexOf(value) === 0,
    sorter: (a, b) => a.courseItem.localeCompare(b) //非ASCII排序规则
  },
  {
    title: "学生姓名",
    dataIndex: "studentName",
    key: "studentName",
    width: 120,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.studentName.indexOf(value) === 0,
    sorter: (a, b) => a.studentName.localeCompare(b)
  },
  // {
  //   title: "学号",
  //   dataIndex: "studentNumber",
  //   key: "studentNumber",
  //   onFilter: (value, record) => record.studentNumber.indexOf(value) === 0,
  //   sorter: (a, b) => a.studentNumber.localeCompare(b)
  // },
  // {
  //   title: "班级",
  //   dataIndex: "studentClass",
  //   key: "studentClass",
  //   onFilter: (value, record) => record.studentClass.indexOf(value) === 0,
  //   sorter: (a, b) => a.studentClass.localeCompare(b)
  // },
  {
    title: "发起时间",
    dataIndex: "initiationTime",
    key: "initiationTime",
    width: 130,
    onFilter: (value, record) => record.initiationTime.indexOf(value) === 0,
    sorter: (a, b) => a.initiationTime.localeCompare(b)
  },
  {
    title: "理由",
    dataIndex: "reason",
    key: "reason",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.reason.indexOf(value) === 0,
    sorter: (a, b) => a.reason.localeCompare(b)
  },
  // {
  //   title: "发起人",
  //   dataIndex: "originatorName",
  //   key: "originatorName",
  //   width: 120,
  //   onFilter: (value, record) => record.originatorName.indexOf(value) === 0,
  //   sorter: (a, b) => a.originatorName.localeCompare(b)
  // },
  // {
  //   title: "审核人姓名",
  //   dataIndex: "auditorName",
  //   key: "auditorName",
  //   width: 120,
  //   onFilter: (value, record) => record.auditorName.indexOf(value) === 0,
  //   sorter: (a, b) => a.auditorName.localeCompare(b)
  // },
  // {
  //   title: "审核人部门",
  //   dataIndex: "auditorDepartment",
  //   key: "auditorDepartment",
  //   width: 150,
  //   onFilter: (value, record) => record.auditorDepartment.indexOf(value) === 0,
  //   sorter: (a, b) => a.auditorDepartment.localeCompare(b)
  // },
  {
    title: "审核人回复",
    dataIndex: "reply",
    key: "reply",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.reply.indexOf(value) === 0,
    sorter: (a, b) => a.reply.localeCompare(b)
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 150,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sorter: (a, b) => a.status.localeCompare(b)
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 120,
    // fixed: "right",
    // slots: { name: 'operation'},
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: " ",
    applyId: " ",
    course: " ",
    courseItem: " ",
    studentName: " ",
    studentNumber: " ",
    studentClass: " ",
    initiationTime: " ",
    reason: " ",
    originatorName: " ",
    auditorName: " ",
    auditorDepartment: " ",
    reply: " ",
    status: " ",
    attachment: " "
  }
];
// const formData = [
//   {
//       newScore:'1',
//       newRegName:'',
//       newRegDepartment:'',
//       newRegTime:'',
//       newAudName:'',
//       newAudDepartment:'',
//       newAudTime:'',
//       oldScore:'',
//       oldRegName:'',
//       oldRegDepartment:'',
//       oldRegTime:'',
//       oldAudName:'',
//       oldAudDepartment:'',
//       oldAudTime :''
//   }
// ];

export default {
  data() {
    return {
      modelform: this.$form.createForm(this),
      visible: false,
      data,
      aa: "www.ChangkunHaoShuai.com",
      columns,
      pagination: {
        pageSize: 5 // 设置每页的记录条数
      },
      load: false,
      // formData,
      newScore: "",
      newRegName: "",
      newRegDepartment: "",
      newRegTime: "",
      newAudName: "",
      newAudDepartment: "",
      newAudTime: "",
      oldScore: "",
      oldRegName: "",
      oldRegDepartment: "",
      oldRegTime: "",
      oldAudName: "",
      oldAudDepartment: "",
      oldAudTime: ""
    };
  },

  methods: {
    // onChange,
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
        .get("/json/gradeManagement1/lookmyappl/", {
          params: {
            pageNum: pageNum
          }
        })
        .then(response => {
          this.load = false;
          let res = response.data;
          console.log(res);
          // 更新当前表格数据
          this.data = res.data.list;
          // this.formData = res.data.list;
          // console.log(formData);
          // 更新记录条数更新分页
          this.pagination = {
            total: res.data.total,
            pageSize: res.data.pageSize
          };
        });
    },

    /**
     * 切换分页
     */
    handleChange(pagination) {
      console.log(pagination);
      // 更新数据
      this.fetch(pagination.current, pagination.pageSize);
    },

    /**
     * 显示申请详情
     * TODO: 保存id， 若id不变则直接展示， 否则fetch加载展示，更新id
     */
    showDrawer(record) {
      this.newScore = record.newScore;
      console.log(record.applyId);
      this.newRegName = record.newRegName;
      this.newRegDepartment = record.newRegDepartment;
      this.newRegTime = record.newRegTime;
      this.newAudName = record.newAudName;
      this.newAudDepartment = record.newAudDepartment;
      this.newAudTime = record.newAudTime;
      this.oldScore = record.oldScore;
      this.oldRegName = record.oldRegName;
      this.oldRegDepartment = record.oldRegDepartment;
      this.oldRegTime = record.oldRegTime;
      this.oldAudName = record.oldAudName;
      this.oldAudDepartment = record.oldAudDepartment;
      this.oldAudTime = record.oldAudTime;
      this.aa = "/json/gradeManagement1/download?path=" + record.attachment;
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
.content {
  background: #fff;
  padding: 30px 30px;
}
</style>