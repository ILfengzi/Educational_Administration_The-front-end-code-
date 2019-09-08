<!--
 * @Description: 查询成绩/学生
 * @Author: Xiao Xiao
 * @LastEditors: Xiao Xiao
 * @Date: 2019-04-29 15:22:17
 * @LastEditTime: 2019-06-21 22:33:57
 -->

<template>
  <div class="content">
    <a-row type="flex" justify="end">
      <a-col :span="3">
        <a-button type="primary" @click="goBack()">返回成绩明细</a-button>
      </a-col>
    </a-row>

    <!-- 输入框 1 -->
    <template>
      <a-form id="Application" :form="inputForm" @submit="inputSubmit">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="原因"
        >
          <a-textarea
            v-decorator="[
              'reason',
              {rules: [{ required: true, message: '请输入原因' }]}
              ]"
            placeholder="Please input your reason"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="上传附件">
          <a-upload-dragger
            :fileList="fileList"
            action="/json/gradeManagement1/upload"
            @change="fileSubmit"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox"/>
            </p>
            <p class="ant-upload-text">{{this.temMessage}}</p>
          </a-upload-dragger>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button class="reset-btn" type="danger" icon="reload" @click="resetInput">重置条件</a-button>
        </a-form-item>
      </a-form>
    </template>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 12
  }
};

export default {
  data() {
    return {
      //申请相关
      data0: this.$route.query.data0,
      Detaileddata: this.$route.query.data1, //真正的明细项&表格_1
      dataSources2: this.$route.query.data2, //传递给申请修改的dataSources2
      inputId: this.$route.query.data3, //传递给申请修改的inputid
      inputForm: this.$form.createForm(this), //创建提交的表单
      fileList: [],
      uploadAddr: undefined,
      temMessage: "单击或拖动附件到此区域上传",
      visible2: false, //申请修改modal
      confirmLoading2: false, //申请修改modal
      formItemLayout
    };
  },

  methods: {
    //申请修改模块
    handleCancel2(e) {
      this.visible2 = false;
      this.inputForm.resetFields();
    }, //关闭model2返回model1
    inputSubmit(e) {
      e.preventDefault();
      console.log("ok！");
      console.log(this.uploadAddr);
      console.log("AAAAAAAAA");
      this.inputForm.validateFields((err, values) => {
        if (!err) {
          console.log(
            "Received values of form: ",
            values,
            "and",
            this.uploadAddr
          );
          this.axios
            .post("/json/gradeManagement1/submitappl", {
              filePath: this.uploadAddr,
              courseId: this.inputId.courseId, //课程id SS
              reason: values.reason,
              stuGradeMainId: this.inputId.stuGradeMainId, //学生主表id
              stuItemGradeDetailOldId: this.inputId.stuItemGradeDetailOldId, //成绩明细项id
              studentId: this.inputId.studentId, //学生id SS
              universityId: this.inputId.universityId, //学校id SS
              semesterId: this.inputId.semesterId //学期id SS
            })
            .then(response => {
              let res = response.data;
              // this.$message.success(res.msg);
              if (res.code === 0) {
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg, 3);
              }
            });
        }
      });
      this.inputForm.resetFields();
    }, //申请表单提交
    fileSubmit(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.data;
          this.uploadAddr = file.response.data;
          this.temMessage = file.name;
        }
        return file;
        console.log("提交文件！！");
      });
      this.fileList = fileList;
    }, //上传文件
    resetInput() {
      this.inputForm.resetFields();
    }, //重置下拉框

    //返回教师主页
    goBack() {
      this.$router.push({
        path: "./DetailedSearchGrade",
        query: {
          data0: this.data0,
          data1: this.Detaileddata,
          data2: this.dataSources2
        }
      });
    }
  }
};
</script>

<style>
</style>