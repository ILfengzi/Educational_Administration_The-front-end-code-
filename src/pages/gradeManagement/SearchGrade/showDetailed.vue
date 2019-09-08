<!--
 * @Description: 查询成绩/学生
 * @Author: Xiao Xiao
 * @LastEditors: Xiao Xiao
 * @Date: 2019-04-29 15:22:17
 * @LastEditTime: 2019-06-21 22:13:38
 -->

<template>
  <div class="content">

    <div>
    <a-row type="flex" justify="end">
      <a-col :span="3">
        <a-button type="primary" @click="goBack()">返回上一页主页</a-button>
      </a-col>
    </a-row>
    </div>
    
    <!-- 成绩明细模态框1 -->
      <template>
        <!-- 嵌套表格_1 -->
        <a-table :columns="Columns" :dataSource="Detaileddata" :pagination="false" size="small"
          :rowKey="record => record.course_Item_Id" @expand="expand" :expandedRowKeys="expandedRowKeys"
          class="components-table-demo-nested">
          <!-- 嵌套表格_2 -->
          <!-- data.list.数据 -->
          <a-table slot="expandedRowRender" :pagination="false" :columns="innerColumns" :dataSource="innerData"
            size="small" :row-key="record => record.number">
            <a slot="operation2" slot-scope="record" :href="'json/gradeManagement1/download?path=' + record.attachment">
              <a-button icon="download">下载附件</a-button>
            </a>
            <a-button slot="operation3" slot-scope="record" @click="showApply(record)">申请修改成绩</a-button>
          </a-table>
          <!-- 嵌套表格_2 -->
        </a-table>
        <!-- 嵌套表格_1 -->
      </template>

  </div>
</template>

<script>
  //明细项表格_1
  const Columns = [{
    title: '名称',
    dataIndex: 'name',
    width: 490,
    key: 'name'
  }, {
    title: '总评占比',
    dataIndex: 'rate',
    width: 200,
    key: 'rate'
  }, {
    title: '次数',
    dataIndex: 'count',
    width: 120,
    key: 'count'
  }, {
    title: '得分',
    dataIndex: 'score',
    key: 'score'
  }]; /* { title: 'Action', key: 'operation', scopedSlots: { customRender: 'operation' } }*/
  // 嵌套表格_2
  const innerColumns = [{
      title: '编号',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: '附件',
      key: 'attachment',
      scopedSlots: {
        customRender: 'operation2'
      }
    },
    {
      title: '学生得分',
      dataIndex: 'score',
      key: 'score'
    },
    {
      title: '申请',
      key: 'operation3',
      scopedSlots: {
        customRender: 'operation3'
      }
    },
  ];

export default {
    data() {
      return {
        //身份判断返回
        data0: this.$route.query.data0,
        //明细相关
        Detaileddata: this.$route.query.data1, //真正的明细项&表格_1
        dataSources2:this.$route.query.data2,//传递给申请修改的dataSources2
        inputId:this.$route.query.data3,//传递给申请修改的inputid
        Columns,
        data: [
            {
            score: undefined,
            rate: undefined,
            name: '作业成绩',
            count: undefined,
            id: 1
            }, {
            score: undefined,
            rate: undefined,
            name: '考勤成绩',
            count: undefined,
            id: 2
            }, {
            score: undefined,
            rate: undefined,
            name: '期中成绩',
            count: '',
            id: 3
            }, {
            score: undefined,
            rate: undefined,
            name: '实验成绩',
            count: undefined,
            id: 4
            }, {
            score: undefined,
            rate: undefined,
            name: '期末成绩',
            count: undefined,
            id: 5
            }, {
            score: undefined,
            rate: undefined,
            name: '其他成绩',
            count: undefined,
            id: 6
            }, 
        ], //嵌套表格_1格式
        expandedRowKeys: [], //依赖数组长度的key
        innerColumns, // 嵌套表格_2格式
        innerData: [{
          number: '1',
          score: '',
          attachment: '',
          content: ''
        }], // 嵌套表格_2
        visible1: false, //modal
        confirmLoading1: false, //modal
      }

    },
    methods: {

      //明细相关

      expand(expanded, record) { //点击折叠板展开分数
        this.innerData = []
        console.log('---------------')
        if (record.name == "作业成绩") {
          this.axios.get("/json/gradeManagement1/selectCourseItemDetail1", {
              params: {
                course_item_id: record.course_Item_Id,
                stu_item_grade_id: record.stu_item_grade_Id
              }
            })
            .then(response => {
              this.innerData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if (record.name == "考勤成绩") {
          this.axios.get("/json/gradeManagement1/selectCourseItemDetail2", {
              params: {
                course_item_id: record.course_Item_Id,
                stu_item_grade_id: record.stu_item_grade_Id
              }
            })
            .then(response => {
              this.innerData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if (record.name == "期中成绩") {
          this.axios.get("/json/gradeManagement1/selectCourseItemDetail3", {
              params: {
                course_item_id: record.course_Item_Id,
                stu_item_grade_id: record.stu_item_grade_Id
              }
            })
            .then(response => {
              this.innerData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if (record.name == "实验成绩") {
          this.axios.get("/json/gradeManagement1/selectCourseItemDetail4", {
              params: {
                course_item_id: record.course_Item_Id,
                stu_item_grade_id: record.stu_item_grade_Id
              }
            })
            .then(response => {
              this.innerData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if (record.name == "期末成绩") {
          this.axios.get("/json/gradeManagement1/selectCourseItemDetail5", {
              params: {
                course_item_id: record.course_Item_Id,
                stu_item_grade_id: record.stu_item_grade_Id
              }
            })
            .then(response => {
              this.innerData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if (record.name == "其它成绩") {
          this.axios.get("/json/gradeManagement1/selectCourseItemDetail6", {
              params: {
                course_item_id: record.course_Item_Id,
                stu_item_grade_id: record.stu_item_grade_Id,
              }
            })
            .then(response => {
                this.innerData = response.data.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if (this.expandedRowKeys[0] != record.course_Item_Id || this.expandedRowKeys.length == 0)
          this.expandedRowKeys = [record.course_Item_Id]
        else
          this.expandedRowKeys = []
        setTimeout(() => {
          console.log('---------------')
        }, 1500);
      },

      //申请修改模块
      showApply(value) {
        //this.visible2 = true;
        console.log(value)
        this.inputId.stuItemGradeDetailOldId=value.stu_item_grade_detail_id
        this.$router.push({
            path:"./ApplySearchGrade",
            query:{
                data0:this.data0,
                data1:this.Detaileddata,
                data2:this.dataSources2,
                data3:this.inputId,
          }
        });
      }, //打开model2 申请
      handleOk2(e) {
        this.confirmLoading2 = true;
        setTimeout(() => {
          this.visible2 = false;
          this.confirmLoading2 = false;
        }, 500);
        this.inputForm.resetFields()
      }, //关闭model2
      handleCancel2(e) {
        this.visible2 = false;
        this.inputForm.resetFields()
      }, //关闭model2返回model1
      
      //返回教师主页
    goBack() {
        if(this.data0=="1"){
            this.$router.push({
              path:"./studentSearchGrade",
              query:{
                data1:this.dataSources2,
              }
            });
        }
        else if(this.data0=="2"){
            this.$router.push({
              path:"./officerSearchGrade",
              query:{
                data1:this.dataSources2,
              }
            });
        }
    },
    }
}
</script>

<style>

</style>