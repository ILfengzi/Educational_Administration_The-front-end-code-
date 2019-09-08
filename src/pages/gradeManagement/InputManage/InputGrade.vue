<!--
 * @Description: 录入管理/录入成绩
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-04-29 15:22:09
 * @LastEditTime: 2019-06-21 20:53:38
 -->

<template>
  <div class="content">
    <!-- 头部 -->
    <a-form :form="titleform" @submit="handleSearch" layout="inline">
      <!-- <a-form-item label="学期：" id="semester">
        <a-select
          showSearch
          placeholder="请输入或选择学期"
          optionFilterProp="children"
          style="width: 170px"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :filterOption="filterOption"
        >
          <a-select-option value="2018-2019-2">2018-2019-2</a-select-option>
          <a-select-option value="2018-2019-1">2018-2019-1</a-select-option>
          <a-select-option value="2017-2018-2">2017-2018-2</a-select-option>
        </a-select>
      </a-form-item>-->
      <a-form-item label="课程编号：" id="courseId">
        <a-input v-decorator="[
            'courseId'
            ]" placeholder="请输入课程编号"/>
      </a-form-item>
      <a-form-item label="课程名称：" id="courseName">
        <a-input v-decorator="[
            'courseName'
            ]" placeholder="请输入课程名称"/>
      </a-form-item>
      <a-form-item label="教学班级：" id="courseClass">
        <a-input v-decorator="[
            'courseClass'
            ]" placeholder="请输入教学班级"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">查找</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
      </a-form-item>
      <br>
      <br>
      <br>
    </a-form>

    <!-- 排序主表格 -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="load"
      :row-key="record => record.taskId"
      @change="mainpageChange"
      class="my-tooltip"
      :scroll="{}"
    >
      <!-- 气泡插槽 -->
      <span slot="tooltip" slot-scope="text">
        <a-tooltip placement="top">
          <template slot="title">{{text}}</template>
          <span>{{text}}</span>
        </a-tooltip>
      </span>

      <!-- 操作插槽 -->
      <div slot="operation" slot-scope="text,record">
        <a-row :gutter="12">
          <a-col :span="12">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick(record)">
                <a-menu-item key="1">
                  <a-upload
                    name="file"
                    action="http://10.86.2.51:8080/json/gradeManagement1/upload"
                    @change="excelSubmit"
                  >
                    <a-icon type="file-excel"/>导入Excel
                  </a-upload>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-upload
                    name="file"
                    :multiple="true"
                    action="http://10.86.2.51:8080/json/gradeManagement1/upload"
                    @change="handleChange"
                  >
                    <a-icon type="folder"/>导入附件
                  </a-upload>
                </a-menu-item>
              </a-menu>
              <a-button type="primary">
                导入
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" ghost>
              <!-- 动态绑定参数，在进行字符串拼接，然后路由跳转时传过去 -->
              <router-link
                :to="'./manualInput?cId='+record.cId+'&classId='+record.classId+'&semesterId='+record.semesterId+'&courseId='+record.courseId"
              >录入</router-link>
            </a-button>
          </a-col>
        </a-row>
      </div>
    </a-table>
  </div>
</template>

<script>
const columns = [
  // {
  //   title: "学期",
  //   dataIndex: "semester",
  //   key: "semester",
  //   width: 200,
  //   // specify the condition of filtering result
  //   // here is that finding the name started with `value`
  //   onFilter: (value, record) => record.semester.indexOf(value) === 0,
  //   sorter: (a, b) => a.semester.localeCompare(b) //排序规则
  // },
  // 总width：990
  {
    title: "课程编号",
    dataIndex: "courseId",
    key: "courseId",
    width: 130,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.courseId.indexOf(value) === 0,
    sorter: (a, b) => a.courseId - b.courseId //数字排序规则
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    key: "courseName",
    width: 150,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.courseName.indexOf(value) === 0,
    sorter: (a, b) => a.courseName.localeCompare(b) //非AscII排序规则
  },
  {
    title: "教学班级",
    dataIndex: "courseClass",
    key: "courseClass",
    width: 130,
    scopedSlots: { customRender: "tooltip" },
    onFilter: (value, record) => record.courseClass.indexOf(value) === 0,
    sorter: (a, b) => a.courseClass.localeCompare(b) //排序规则
  },
  {
    title: "课程种类",
    dataIndex: "courseType",
    key: "courseType",
    width: 135,
    onFilter: (value, record) => record.courseType.indexOf(value) === 0,
    sorter: (a, b) => a.courseType.localeCompare(b) //排序规则
  },
  {
    title: "课程类别",
    dataIndex: "courseCategory",
    key: "courseCategory",
    width: 135,
    onFilter: (value, record) => record.courseCategory.indexOf(value) === 0,
    sorter: (a, b) => a.courseCategory.localeCompare(b) //排序规则
  },
  {
    title: "学时",
    dataIndex: "classHour",
    key: "classHour",
    width: 80,
    onFilter: (value, record) => record.classHour.indexOf(value) === 0,
    sorter: (a, b) => a.classHour - b.classHour //排序规则
  },
  {
    title: "学分",
    dataIndex: "credit",
    key: "credit",
    width: 80,
    onFilter: (value, record) => record.credit.indexOf(value) === 0,
    sorter: (a, b) => a.credit - b.credit //排序规则
  },
  {
    title: "操作",
    key: "operation",
    width: 150,
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: " ",
    taskId: " ",
    dataIndex: " ",
    // semester: " ",
    courseId: " ",
    courseName: " ",
    courseClass: " ",
    courseType: " ",
    courseCategory: " ",
    classHour: " ",
    credit: " ",
    operation: "导入",
    classId: " ",
    cId: " ",
    semesterId: " "
  }
];

export default {
  data() {
    return {
      titleform: this.$form.createForm(this),
      data,
      columns,
      visible: false,
      value: undefined,
      load: false,
      pagination: {
        pageSize: 5, // 设置每页的记录条数
        current: 1
      },
      excelAddr: undefined, //上传excel文件回调地址变量
      fileList: [], //当前的文件列表
      tempSemesterId: undefined,
      // tempCourseId: undefined,
      tempClassId: undefined,
      tempcId: undefined
    };
  },

  methods: {
    callback(key) {
      console.log(key);
    },

    aa(text) {
      console.log("!!!!!!!!!!!!!!");
      console.log(text);
    },

    /**
     * 上传excel文件回调函数
     */
    excelSubmit(info) {
      if (info.file.status !== "uploading") {
        console.log("cccccccccccccccccccc");
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 文件上传成功！`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 文件上传失败！`);
      }

      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      // Only to show one recent uploaded files, and old ones will be replaced by the new
      // fileList = fileList.slice(-1);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data;
          //上传excel回调的地址变量
          this.excelAddr = file.response.data;
        }
        return file;
      });
      this.fileList = fileList;

      // console.log("&&&&&&&&&&&&&");
      // console.log(this.uploadAddr);
      // console.log(this.semesterId);
      // console.log(this.courseId);
      // console.log(this.classId);
      // console.log("cccccccccccccccccccc");
      //   console.log(info.file, info.fileList);
      // this.uploadAddr = info.file.response.data;
      if (this.excelAddr != undefined) {
        this.axios.post(
          "http://10.86.2.51:8080/json/gradeManagement1/stuExcelUpload",
          {
            excelAddr: this.excelAddr,
            semesterId: this.tempSemesterId,
            courseId: this.tempcId,
            classId: this.tempClassId
          }
        );
      }
    },

    /**
     * 附件文件上传
     */
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 文件上传成功！`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 文件上传失败！`);
      }
    },

    /**
     * @page: 页数
     * @limit: 每页的记录数
     */
    fetch(pageNum, limit) {
      console.log(this.pagination);
      this.titleform.validateFields((err, values) => {
        this.load = true;
        this.axios
          .get("/json/gradeManagement1/fu", {
            params: {
              // pageNum: this.pagination.current,
              pageNum: pageNum,
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
     * 切换分页
     */
    mainpageChange(pagination) {
      // console.log(pagination);
      // // 更新数据
      // if (this.tempSearch === true) {
      //   // 点击了查询，根据条件更新表格数据
      //   this.handleSearch(pagination.current, pagination.pageSize);
      // } else {
      this.fetch(pagination.current, pagination.pageSize);
      // }
    },

    /**
     * 执行搜索
     */
    handleSearch() {
      this.fetch(1, 5);
    },

    /**
     * 清空搜索框的内容
     */
    handleReset() {
      this.titleform.resetFields();
    },

    /**
     * 弹出和关闭抽屉
     */
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },

    /**
     * 多按钮组合
     */
    handleMenuClick(record) {
      // console.log("click", e);
      this.tempSemesterId = record.semesterId;
      // this.tempCourseId = record.courseId;
      this.tempClassId = record.classId;
      this.tempcId = record.cId;
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
</style>