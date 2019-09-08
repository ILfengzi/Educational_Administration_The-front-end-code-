<!--
 * @Description: 我的审批/教师
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-05-08 18:22:17
 * @LastEditTime: 2019-06-21 20:55:45
 -->

<template>
  <div>
    <!-- 排序表格 -->
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
            <a-button type="primary" ghost @click="approvalDrawer(record)">审核</a-button>
          </a-col>
        </a-row>
      </div>
    </a-table>

    <!-- 明细抽屉层 -->
    <a-drawer
      title="申请记录明细"
      :width="400"
      @close="detailOnClose"
      :visible="detailVisible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '10 8px'}"
    >
      <a-form :form="modelform" layout="horizontal" hideRequiredMark>
        <!-- <a-form-item
          label="旧登分人部门"
          id="oldRegDepartment"
          :labelCol="{ span: 8}"
          :wrapperCol="{ span: 8, offset: 1}"
        >
          <p>{{oldRegDepartment}}</p>
        </a-form-item>-->
        <a-form-item
          label="学生学号"
          id="studentNumber"
          :labelCol="{ span: 6}"
          :wrapperCol="{ span: 8, offset: 2}"
        >
          <p>{{studentNumber}}</p>
        </a-form-item>

        <a-form-item
          label="学生班级"
          id="studentClass"
          :labelCol="{ span: 6}"
          :wrapperCol="{ span: 8, offset: 2}"
        >
          <p>{{studentClass}}</p>
        </a-form-item>

        <a-form-item
          label="发起时间"
          id="initiationTime"
          :labelCol="{ span: 6}"
          :wrapperCol="{ span: 8, offset: 2}"
        >
          <p>{{initiationTime}}</p>
        </a-form-item>

        <a-form-item
          label="旧登分时间"
          id="oldRegTime"
          :labelCol="{ span: 7}"
          :wrapperCol="{ span: 8, offset: 1}"
        >
          <p>{{oldRegTime}}</p>
        </a-form-item>
        
        <br>
        <br>
        <a-form-item id="downloadButton" :labelCol="{ span: 8}" :wrapperCol="{ span: 8, offset: 3}">
          <a :href="aa">
            <a-button type="primary" icon="download">下载附件</a-button>
          </a>
        </a-form-item>
      </a-form>
    </a-drawer>

    <!-- 审核一层抽屉 -->
    <a-drawer title="审核申请" width="520" :closable="false" @close="closeForm1" :visible="visible">
      <a-form :form="approvalForm1" layout="horizontal" hideRequiredMark @submit="LayerSubmit1">
        <a-form-item
          label="旧分数"
          id="oldScore"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12, offset: 1}"
        >
          <p>{{oldScore}}</p>
        </a-form-item>
        <a-form-item
          label="新分数"
          id="newScore"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12, offset: 1}"
        >
          <a-input-number
            v-decorator="[
             'newScore',
              {
                rules: [{ required: true, message: '请输入新分数！' }]
              }]"
            style="width: 150px"
            :min="0"
            :max="100"
            :step="1"
            :precision="1.0"
          />
        </a-form-item>
        <a-form-item
          label="回复申请"
          id="reply"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12, offset: 1}"
        >
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
        <a-form-item
          label="审核意见"
          id="opinion"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12, offset: 1}"
        >
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
        <!-- <a-button type="primary" html-type="submit" @click="showChildrenDrawer">提交</a-button> -->
        <a-button :style="{marginRight: '8px'}" @click="closeForm1">取消</a-button>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form>

      <!-- 审核二层抽屉 -->
      <a-drawer
        title="向上级提交申请"
        width="320"
        :closable="false"
        @close="onChildrenDrawerClose"
        :visible="childrenDrawer"
      >
        <!-- 审核二层抽屉的表单 -->
        <a-form :form="approvalForm2" layout="horizontal" hideRequiredMark @submit="LayerSubmit2">
          <a-form-item
            label="理由"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 12, offset: 1}"
            style="width: 400px"
          >
            <a-textarea
              v-decorator="[
                'reason', 
               {
                  rules: [{ required: true, message: '多少写点吧！' }]
               }]"
              :rows="6"
              placeholder="请说明理由"
            />
          </a-form-item>
          <br>
          <a-button :style="{marginRight: '8px'}" @click="onChildrenDrawerClose">取消</a-button>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form>
      </a-drawer>
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
    width: 160,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.course.indexOf(value) === 0,
    sorter: (a, b) => a.course.localeCompare(b) //非ASCII排序规则
  },
  {
    title: "成绩项",
    dataIndex: "courseItem",
    key: "courseItem",
    width: 150,
    onFilter: (value, record) => record.courseItem.indexOf(value) === 0,
    sorter: (a, b) => a.courseItem.localeCompare(b) //非ASCII排序规则
  },
  {
    title: "学生姓名",
    dataIndex: "studentName",
    key: "studentName",
    width: 140,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.studentName.indexOf(value) === 0,
    sorter: (a, b) => a.studentName.localeCompare(b)
  },
  // {
  //   title: "学号",
  //   dataIndex: "studentNumber",
  //   key: "studentNumber",
  //   width: 140,
  //   onFilter: (value, record) => record.studentNumber.indexOf(value) === 0,
  //   sorter: (a, b) => a.studentNumber.localeCompare(b)
  // },
  // {
  //   title: "班级",
  //   dataIndex: "studentClass",
  //   key: "studentClass",
  //   width: 150,
  //   scopedSlots: { customRender: "tooltip" },
  //   onFilter: (value, record) => record.studentClass.indexOf(value) === 0,
  //   sorter: (a, b) => a.studentClass.localeCompare(b)
  // },
  // {
  //   title: "发起时间",
  //   dataIndex: "initiationTime",
  //   key: "initiationTime",
  //   width: 130,
  //   onFilter: (value, record) => record.initiationTime.indexOf(value) === 0,
  //   sorter: (a, b) => a.initiationTime.localeCompare(b)
  // },
  {
    title: "理由",
    dataIndex: "reason",
    key: "reason",
    width: 180,
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
  //   onFilter: (value, record) => record.auditorDepartment.indexOf(value) === 0,
  //   sorter: (a, b) => a.auditorDepartment.localeCompare(b)
  // },
  {
    title: "教务员回复",
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
    width: 150,
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
  }
];

export default {
  data() {
    return {
      modelform: this.$form.createForm(this),
      approvalForm1: this.$form.createForm(this),
      approvalForm2: this.$form.createForm(this),
      visible: false,
      detailVisible: false,
      childrenDrawer: false,
      data,
      columns,
      pagination: {
        pageSize: 5 // 设置每页的记录条数
      },
      load: false,
      tempapplyId: undefined,
      value: undefined,
      aa: "www.changkunhaoshuai.com",
      isApproval: 0,

      // formData,
      newScore: "", //新分数
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
      oldAudTime: "",
      studentNumber: "",
      studentClass: "",
      initiationTime: "",
      reply: "",

    };
  },

  methods: {
    // onChange,
    callback(key) {
      console.log(key);
    },

    /**
     *发送请求（get），拿到主页数据
     * @page: 页数
     * @limit: 每页的记录数
     */
    fetch(pageNum, limit) {
      this.load = true;
      this.axios
        .get("/json/gradeManagement1/mycheck/", {
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
     * 一层抽屉
     * 提交表单操作
     * 校验，发送ajax请求提交表单
     */
    LayerSubmit1(e) {
      e.preventDefault();
      // 进行表单校验
      this.approvalForm1.validateFields((err, values) => {
        // console.log(values);
        if (err) {
          // 表单有误
          console.log("表单校验失败: ", values);
        } else {
          let load = this.$message.loading("正在提交", 0);
          this.axios
            .post("/json/gradeManagement1/dwabyTea/", {
              //this.url1
              applyId: this.tempapplyId,
              newScore: values.newScore,
              reply: values.reply,
              status: values.value
            })
            .then(res => {
              // 请求回调事件
              load();
              // 表单提交成功
              if (res.data.code === 0) {
                if (res.data.data === 1) {
                  //需要教务员审核，不关闭抽屉，弹出二层抽屉
                  // this.isApproval = 1;
                  this.childrenDrawer = true;
                } else {
                  //教师不同意或不需要教务员审核，关闭当前抽屉
                  // this.isApproval = 1;
                  this.visible = false;
                }
                // 刷新表单
                this.approvalForm1 = this.$form.createForm(this);
              } else {
                this.$message.error(res.data.msg, 4);
                this.visible = false;
              }
            });
        }
      });
    },

    /**
     * 二层抽屉
     * 提交表单操作
     * 校验，发送ajax请求提交表单
     */
    LayerSubmit2(e) {
      e.preventDefault();
      // 进行表单校验
      this.approvalForm2.validateFields((err, values) => {
        // console.log(values);
        if (err) {
          // 表单有误
          console.log("表单校验失败: ", values);
        } else {
          let load = this.$message.loading("正在提交", 0);
          this.axios
            .post("/json/gradeManagement1/submitapplBytea/", {
              //this.url1 +
              applyId: this.tempapplyId,
              reason: values.reason
            })
            .then(res => {
              // 请求回调事件
              load();
              if (res.data.code === 0) {
                // 表单提交成功
                this.$message.success("提交成功", 4);
                // 刷新表单
                this.approvalForm2 = this.$form.createForm(this);
                //关闭当前抽屉
                this.childrenDrawer = false;
                //关闭一层抽屉
                this.visible = false;
              } else {
                this.$message.error(res.data.msg, 4);
                this.childrenDrawer = false;
                this.visible = false;
              }
            });
        }
      });
    },

    /** 是否同意申请 */
    isAgree(e) {
      console.log("radio checked", e.target.value);
    },

    /**点击“审核”按钮
     * 更新旧分数
     * 存此条记录的id
     * 弹出一层抽屉
     */
    approvalDrawer(record) {
      this.oldScore = record.oldScore;
      this.tempapplyId = record.applyId;
      this.visible = true;
    },

    /**
     * 一层抽屉关闭事件
     */
    closeForm1() {
      this.visible = false;
    },

    /**
     * 二层抽屉关闭事件
     */
    onChildrenDrawerClose() {
      this.childrenDrawer = false;
    },

    /**
     * 明细抽屉关闭事件
     */
    detailOnClose() {
      this.detailVisible = false;
    },

    // showChildrenDrawer() {
    //   if(this.isApproval === 1){
    //     //需要教务员审核，弹出二层抽屉
    //     console.log("isApproval:"+this.isApproval);
    //     this.childrenDrawer = true;
    //   } else{
    //     // 教师不同意或不需要教务员审核，关闭当前抽屉
    //     console.log("isApproval:"+this.isApproval);
    //     this.visible = false;
    //   }
    // },

    /**
     *明细，将明细里每一项的数据进行更新
     */
    detailDrawer(record) {
      this.studentNumber = record.studentNumber;
      this.studentClass = record.studentClass;
      this.initiationTime = record.initiationTime;
      this.reply = record.reply;
      // this.newScore = record.newScore;
      // this.newRegName = record.newRegName;
      // this.newRegDepartment = record.newRegDepartment;
      // this.newRegTime = record.newRegTime;
      // this.newAudName = record.newAudName;
      // this.newAudDepartment = record.newAudDepartment;
      // this.newAudTime = record.newAudTime;
      // this.oldScore = record.oldScore;
      // this.oldRegName = record.oldRegName;
      // this.oldRegDepartment = record.oldRegDepartment;
      this.oldRegTime = record.oldRegTime;
      // this.oldAudName = record.oldAudName;
      // this.oldAudDepartment = record.oldAudDepartment;
      // this.oldAudTime = record.oldAudTime;
      this.aa = "/json/gradeManagement1/download?path=" + record.attachment;
      this.detailVisible = true;
    }
  },

  /**
   * 生命周期钩子
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