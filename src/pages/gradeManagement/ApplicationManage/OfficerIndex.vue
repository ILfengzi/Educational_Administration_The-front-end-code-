<!--
 * @Description: 我的审核/教务员
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-04-29 15:22:17
 * @LastEditTime: 2019-06-19 11:45:07
 -->

<template>
  <div class="content">
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
      <div slot="operation" slot-scope="text,record" type="primary">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-button type="primary" ghost @click="detailDrawer(record)">其他</a-button>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" ghost @click="showDrawer(record)">审核</a-button>
          </a-col>
        </a-row>
      </div>
    </a-table>

    <!-- 审核抽屉层 -->
    <a-drawer title="最终审核" width="520" :closable="false" @close="onClose" :visible="visible">
      <!-- 审核抽屉层表单 -->
      <a-form :form="modelform" layout="vertical" hideRequiredMark @submit="handleSubmit">
        <a-form-item label="回复申请" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea
            v-decorator="[
            'reply', 
            {
              rules: [{ required: true, message: '多少写点吧！' }]
            }]"
            :rows="4"
            placeholder="请对此申请进行回复"
          />
        </a-form-item>
        <br>
        <a-form-item label="是否同意申请：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <!-- 单选框 -->
          <a-radio-group
            @change="isAgree"
            v-decorator="[
            'value', 
            {
              rules: [{ required: true, message: '请选择审批意见？' }]
            }]"
          >
            <a-radio :value="1">同意</a-radio>
            <a-radio :value="2">不同意</a-radio>
          </a-radio-group>
          <br>
          <br>
        </a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form>
    </a-drawer>

    <!-- 明细抽屉层 -->
    <a-drawer
      title="申请记录明细"
      :width="520"
      @close="detailOnClose"
      :visible="detailVisible"
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
        <br>
        <a :href="aa">
          <a-button type="primary" icon="download">下载附件</a-button>
        </a>
      </a-form>
    </a-drawer>
    <br><br><br><br><br>
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
  {
    title: "学号",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 140,
    onFilter: (value, record) => record.studentNumber.indexOf(value) === 0,
    sorter: (a, b) => a.studentNumber.localeCompare(b)
  },
  {
    title: "班级",
    dataIndex: "studentClass",
    key: "studentClass",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.studentClass.indexOf(value) === 0,
    sorter: (a, b) => a.studentClass.localeCompare(b)
  },
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
  {
    title: "发起人",
    dataIndex: "originatorName",
    key: "originatorName",
    width: 120,
    onFilter: (value, record) => record.originatorName.indexOf(value) === 0,
    sorter: (a, b) => a.originatorName.localeCompare(b)
  },
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
  //   onFilter: (value, record) => record.auditorDepartment.indexOf(value) === 0,
  //   sorter: (a, b) => a.auditorDepartment.localeCompare(b)
  // },
  // {
  //   title: "审核人回复",
  //   dataIndex: "reply",
  //   key: "reply",
  //   width: 150,
  //   scopedSlots: { customRender: "tooltip" },
  //   onFilter: (value, record) => record.reply.indexOf(value) === 0,
  //   sorter: (a, b) => a.reply.localeCompare(b)
  // },
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
    width: 230,
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
    status: " "
  }
];

export default {
  data() {
    return {
      modelform: this.$form.createForm(this),
      visible: false,
      detailVisible: false,
      data,
      columns,
      pagination: {
        pageSize: 5 // 设置每页的记录条数
      },
      load: false,
      tempapplyId: undefined,
      aa: "www.changkunhaoshuai.com",

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
     * 发送请求（get），拿到主页数据
     * @page: 页数
     * @limit: 每页的记录数
     */
    fetch(pageNum, limit) {
      this.load = true;
      this.axios
        .get("/json/gradeManagement1/mycheckAud/", {
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
     * 提交表单操作
     * 校验， 发送ajax请求提交表单
     */
    handleSubmit(e) {
      e.preventDefault();
      // 进行表单校验
      this.modelform.validateFields((err, values) => {
        // console.log(values);
        if (err) {
          // 表单有误
          console.log("表单校验失败: ", values);
        } else {
          let load = this.$message.loading("正在提交", 0);
          this.axios
            .post("/json/gradeManagement1/dwabyAud/", {
              //this.url1
              applyId: this.tempapplyId,
              status: values.value,
              reply: values.reply
            })
            .then(res => {
              // 请求回调事件
              load();
              if (res.data.code === 0) {
                // 表单提交成功
                this.$message.success("提交成功", 4);
                // 刷新表单
                this.modelform = this.$form.createForm(this);
                this.visible = false;
              } else {
                this.$message.error(res.data.msg, 4);
                this.visible = false;
              }
            });
        }
      });
    },

    /** 是否同意申请 */
    isAgree(e) {
      // this.tempvalue =  e.target.value;
      console.log("radio checked", e.target.value);
    },

    /**抽屉层处理 */
    showDrawer(record) {
      console.log(record);
      this.tempapplyId = record.applyId;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    detailOnClose() {
      this.detailVisible = false;
    },

    /**
     *明细，将明细里每一项的数据进行更新
     */
    detailDrawer(record) {
      this.newScore = record.newScore;
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
      this.detailVisible = true;
    }
  },

  /**
   * 生命周期钩子，
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