<!--
 * @Description: 录入管理/录入成绩组成项
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-05-04 23:15:01
 * @LastEditTime: 2019-06-19 21:50:57
 -->

<template>
  <div class="content">
    <a-form :form="titleform" @submit="handleSearch" layout="inline">
      <!-- <a-form :form="titleform" @submit="handleSearch(1)" layout="inline"> -->
      <a-form-item label="课程编号：">
        <a-input v-decorator="[
            'courseId'
            ]" placeholder="请输入课程编号"/>
      </a-form-item>
      <a-form-item label="课程名称：">
        <a-input v-decorator="[
            'courseName'
            ]" placeholder="请输入课程名称"/>
      </a-form-item>
      <a-form-item label="教学班级：">
        <a-input v-decorator="[
            'courseClass'
            ]" placeholder="请输入教学班级"/>
      </a-form-item>
      <a-form-item>
        <!-- <a-button type="primary" html-type="submit" @click="searchChange">查找</a-button> -->
        <a-button type="primary" html-type="submit">查找</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
      </a-form-item>
      <br><br><br>
    </a-form>

    <!-- 排序表格 -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="load"
      @change="mainpageChange"
      :row-key="record => record.taskId"
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
      >录入</a-button>
    </a-table>

    <!-- 抽屉层 -->
    <a-drawer
      title="录入成绩组成项"
      :width="550"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '10 8px'}"
    >
      <a-form :form="modelform" layout="vertical" hideRequiredMark @submit="handleSubmit">
        <a-form-item label="组成项名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <!-- Select 选择器/带搜索框 -->
          <a-select
            showSearch
            v-decorator="[
            'name',
             {rules: [{ required: true, message: '请输入或选择正确的成绩组成项名称！' }]
                }]"
            placeholder="请输入或选择成绩组成项名称"
            optionFilterProp="children"
            style="width: 250px"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :filterOption="filterOption"
          >
            <a-select-option value="1">作业</a-select-option>
            <a-select-option value="2">考勤</a-select-option>
            <a-select-option value="3">期中</a-select-option>
            <a-select-option value="4">实验</a-select-option>
            <a-select-option value="5">期末</a-select-option>
            <a-select-option value="6">其他</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="总次数" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input-number
            v-decorator="[
            'count',
             {rules: [{ required: true, message: '请输入正确的总数量！' }]
                }]"
            style="width: 150px"
            :min="0"
            :step="1"
            :precision="0"
          />
        </a-form-item>

        <a-form-item label="占总成绩百分比" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input-number
            v-decorator="[
            'rate',
             {rules: [{ required: true, message: '请输入正确的占总成绩百分比！' }]
                }]"
            style="width: 150px"
            :min="0"
            :max="100"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          />
        </a-form-item>

        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
// 数组生成筛选数据
// let xx = [];
// for (let i = 0; i < 10; i++) {
//   xx.push({ text: i, value: '"' + i + '"' });
// }

const columns = [
  {
    title: "学期",
    dataIndex: "semester",
    key: "semester",
    width: 150,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.semester.indexOf(value) === 0,
    sorter: (a, b) => a.semester.localeCompare(b) //排序规则
  },
  {
    title: "课程编号",
    dataIndex: "courseId",
    key: "courseId",
    width: 150,
    // filterMultiple: false,//不可多选
    // filters: xx,
    onFilter: (value, record) => record.courseId.indexOf(value) === 0,
    sorter: (a, b) => a.courseId - b.courseId
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    key: "courseName",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.courseName.indexOf(value) === 0,
    sorter: (a, b) => a.courseName.localeCompare(b)
  },
  {
    title: "教学班级",
    dataIndex: "courseClass",
    key: "courseClass",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    // filterMultiple: false,
    onFilter: (value, record) => record.courseClass.indexOf(value) === 0,
    sorter: (a, b) => a.courseClass.localeCompare(b)
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 150,
    // slots: { name: 'operation'},
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: " ",
    semester: " ",
    courseId: " ",
    courseName: " ",
    courseClass: " ",
    cId: " ",
    operation: " ",
    taskId: " ",
    semesterId: " ",
  }
];

export default {
  data() {
    return {
      modelform: this.$form.createForm(this),
      titleform: this.$form.createForm(this),
      visible: false,
      data,
      columns,
      load: false,
      pagination: {
        pageSize: 5, // 设置每页的记录条数
        current: 1
      },
      tempcId: undefined,
      tempTaskId: undefined,
      tempSemesterId: undefined,

      // tempSearch: false
      // nowTime: new Date() // 当前时间
    };
  },

  // watch: {
  //   tempSearch: function (newtempSearch, oldtempSearch){
  //     console.log('------------------');
  //     console.log(this.pagination);
  //     console.log('------------------');
  //     this.pagination.current = 1;

  //   }
  // },

  methods: {
    callback(key) {
      console.log(key);
    },

    /**
     * 切换分页
     */
    // mainpageChange(pagination) {
    //   console.log(pagination);
    //   // 更新数据
    //   if (this.tempSearch === true) {
    //     // 点击了查询，根据条件更新表格数据
    //     this.handleSearch(pagination.current);
    //   } else {
    //     this.fetch(pagination.current, pagination.pageSize);
    //   }
    // },
    mainpageChange(pagination) {
      this.fetch(pagination.current, pagination.pageSize);
    },


    /**
     * @page: 页数
     * @limit: 每页的记录数
     */
    // fetch(pageNum, limit) {
    //   this.load = true;
    //   this.axios
    //     .get("/json/gradeManagement1/courseItem/listInfo/", {
    //       params: {
    //         pageNum: pageNum
    //       }
    //     })
    //     .then(response => {
    //       this.load = false;
    //       let res = response.data;
    //       console.log(res);
    //       // 更新当前表格数据
    //       this.data = res.data.list;
    //       // this.formData = res.data.list;
    //       // console.log(formData);
    //       // 更新记录条数更新分页
    //       this.pagination = {
    //         total: res.data.total,
    //         pageSize: res.data.pageSize,
    //         current: pageNum,
    //       };
    //     });
    // },

    /**
     * 提交表单操作
     * 校验，发送ajax请求提交表单
     */
    handleSubmit(e) {
      e.preventDefault();
      // 进行表单校验
      this.modelform.validateFields((err, values) => {
        console.log(values);
        if (err) {
          // 表单有误
          console.log("表单校验失败: ", values);
        } else {
          let load = this.$message.loading("正在提交", 0);
          this.axios
            .post("/json/gradeManagement1/courseItem", {
              courseId: this.tempcId,
              taskId: this.tempTaskId,
              semesterId: this.tempSemesterId,
              name: values.name,
              rate: values.rate,
              count: values.count,

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

    /**
     * 执行查询
     * 将数据发回给后台
     * 后台再将符合条件的table数据传回
     * 拿到后台数据后，将table数据更新
     */
    handleSearch() {
      this.fetch(1, 1);
    },

    // handleSearch(pageNum) {
    fetch(pageNum, limit) {     
      // this.tempSearch = true; // 设置个状态，true为复杂查询
      console.log(this.pagination);
      this.titleform.validateFields((err, values) => {
        this.load = true;
        this.axios
          .get("/json/gradeManagement1/courseItem/listInfo", {
            params: {
              pageNum: pageNum,
              // pageNum: this.pagination.current,
              courseId: values.courseId,
              courseName: values.courseName,
              courseClass: values.courseClass
            }
          })
          .then(response => {
            this.load = false;
            let res = response.data;
            console.log(res);
            // 更新当前表格数据
            this.data = res.data.list;
            // 更新记录条数更新分页
            this.pagination = {
              total: res.data.total,
              pageSize: res.data.pageSize
            };
          });
      });
    },

    /**
     * 清空搜索框的内容
     */
    handleReset() {
      this.titleform.resetFields();
    },

    /**
     * 以下为 Select 选择器事件
     */
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },

    /**
     * 弹出和关闭抽屉
     */
    showDrawer(record) {
      this.tempTaskId = record.taskId;
      this.tempSemesterId = record.semesterId;
      this.tempcId = record.cId;
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