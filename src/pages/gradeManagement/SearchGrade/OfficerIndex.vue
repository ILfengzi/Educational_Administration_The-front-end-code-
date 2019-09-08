<!--
 * @Description: 查询成绩/学生
 * @Author: Xiao Xiao
 * @LastEditors: Xiao Xiao
 * @Date: 2019-04-29 15:22:17
 * @LastEditTime: 2019-06-21 15:13:52
 -->

<template>
<div class="content">

  <div>
    <a-row>
      <a-col :span="10">
        课程名称：{{dataSources2.courseName}}
      </a-col>
      <a-col :span="8">
        课程编号：{{dataSources2.courseNumber}}
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :span="10">
        班级名称：{{dataSources2.studentClass}}
      </a-col>
      <a-col :span="8">
        班级编号：{{dataSources2.studentCode}}
      </a-col>
    </a-row>
  </div>
    <a-row type="flex" justify="end">
      <a-col :span="3">
      <a-button type="primary" @click="goBack()">返回教师主页</a-button>
      </a-col>
    </a-row>

    <!-- 课程信息模态框1 -->
    <a-modal title="学生信息" :width="650" :visible="visible0" @ok="handleOk0" :confirmLoading="confirmLoading0"
      @cancel="handleCancel0">
      <template>
        专业名称：{{this.studentdata.specialtyName}}<br>
        学生地址：{{this.studentdata.address}}<br>
        学生姓名：{{this.studentdata.studentName}}<br>
        年级：    {{this.studentdata.grade}}<br>
        入学时间：{{this.studentdata.begin_learn_date}}<br>
        政治面貌：{{this.studentdata.political}}<br>
        所属班级：{{this.studentdata.className}}<br>
        联系方式：{{this.studentdata.communication}}<br>
        学号：    {{this.studentdata.stuNo}}<br>
      </template>
    </a-modal>

    <!-- 学生表 -->
    <template>
      <a-table 
          :columns="Columns2"
          :dataSource="dataSources2.stuItemGradeVOList"
          :pagination="pagination2"
          :loading="load"
          bordered
          size="small"
          :row-key="record => record.id"
          @change="onChange"
        >
        <a-button slot="stuNo" slot-scope="_,record" style="border-style: none" @click="showstudent(record.studentId)">{{record.stuNo}}</a-button>
        <a-button slot="studentName" slot-scope="_,record" style="border-style: none" @click="showstudent(record.studentId)">{{record.studentName}}</a-button>
        <a-button slot="operation1" slot-scope="_,record" type="primary" @click="showDetailed(record)">明细</a-button>
      </a-table>
    </template>

</div>
</template>

<script>

  // 学生表格_1 
  const Columns2 = [
    {
      title: '学号',
      width: 130,
      key: 'stuNo',
      scopedSlots: {
      customRender: 'stuNo'
      },
      sorter: (a, b) => a.stuNo - b.stuNo,
    }, {
      title: '学生姓名',
      key: 'studentName',
      scopedSlots: {
      customRender: 'studentName'
      },
      //width: 80,
    }, {
      title: '课程种类',
      dataIndex: 'speciesName',//1111111111111
      width: 110,
    }, {
      title: '课程类别',
      dataIndex: 'categoryName',//1111111111111  categoryName
      width: 110,
    }, {
      title: '总成绩',
      dataIndex: 'score',//
      width: 90,
      sorter: (a, b) => a.score - b.score,
    }, {
      title: '绩点',
      dataIndex: 'point',//ok
      width: 70,
      sorter: (a, b) => a.point - b.point,
    }, {
      title: '考试性质',
      dataIndex: 'state',//ok
      width: 80,
    }, {
      title: '教师姓名',
      dataIndex: 'teacherName',
      width: 100,
    }, {
      fixed: 'right',
      title: '操作',
      key: 'operation1',//ok
      width: 90,
      scopedSlots: {
      customRender: 'operation1'
      },
    }
  ];

  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 12
    },
  };

export default {
  data(){
    return{
      Columns2,
      load:false,
      form:this.$form.createForm(this),//创建提交的表单//dataSources2:this.$route.query.data1
      dataSources2:this.$route.query.data1,
      studentdata:{},//课程信息
      visible0: false, //modal
      confirmLoading0: false, //modal
      pagination2:{total:2,pageSize:5},
  //明细相关
      Detaileddata:[
        {id:1}
      ],//真正的明细项&表格_1
      data: [
          {
          score: undefined,
          rate: undefined,
          name: '作业成绩',
          count: undefined,
          id: 1
          },{
          score: undefined,
          rate: undefined,
          name: '考勤成绩',
          count: undefined,
          id: 2
          },{
          score: undefined,
          rate: undefined,
          name: '期中成绩',
          count: '',
          id: 3
          },{
          score: undefined,
          rate: undefined,
          name: '实验成绩',
          count: undefined,
          id: 4
          },{
          score: undefined,
          rate: undefined,
          name: '期末成绩',
          count: undefined,
          id: 5
          },{
          score: undefined,
          rate: undefined,
          name: '其他成绩',
          count: undefined,
          id: 6
          },
      ], //嵌套表格_1格式
      inputId:{
        courseId:'',
        stuGradeMainId:'',
        studentId:'',
        universityId:'',
        semesterId:'',
        stuItemGradeDetailOldId:''
      },

      data0:"2",
    }

  },
    mounted () {
    this.form = this.$form.createForm(this);
    this.pagination2={total:this.dataSources2.allNumber,pageSize:5}
    },
  methods: {

    
      showstudent(value){
        this.axios
        .get("/json/gradeManagement1/selectBystudentinform",
            {
              params: {
                studentId:value
              }
            }
          )
        .then(response=>{
          this.studentdata=response.data.data;
          console.log(value);
          console.log(this.studentdata);
        })
        .catch(function (error) {
            console.log(error);
        })
        this.visible0=true
      },//打开查看学生信息
      handleOk0(e) {
        this.confirmLoading0 = true;
        setTimeout(() => { this.visible0 = false; this.confirmLoading0 = false; }, 500);
      }, //关闭课程信息model0
      handleCancel0(e) {
        this.visible0 = false;
      }, //关闭model

    //明细相关
      showDetailed(value) { //点击明细
        this.axios
          .get("/json/gradeManagement1/selectCourseItem", {
            params: {
              id: value.id,
            }
          })
          .then(response => {
             for(let i=0;i<6;i++){
               if( response.data.data[i]!=undefined)
                 {
                    this.data[i] = response.data.data[i];
                    if(this.data[i].name==1)
                    this.data[i].name = '作业成绩';
                    else if(this.data[i].name==2)
                    this.data[i].name = '考勤成绩';
                    else if(this.data[i].name==3)
                    this.data[i].name = '期中成绩';
                    else if(this.data[i].name==4)
                    this.data[i].name = '实验成绩';
                    else if(this.data[i].name==5)
                    this.data[i].name = '期末成绩';
                    else if(this.data[i].name==6)
                    this.data[i].name = '其它成绩';
                 }
             };
            this.Detaileddata=this.data;
            this.inputId.courseId=value.courseId
            this.inputId.studentId=value.studentId
            this.inputId.universityId=value.universityId
            this.inputId.semesterId=value.semesterId
            this.inputId.stuGradeMainId=value.id
            console.log(this.inputId);
            console.log('this.value  A');
            this.$router.push({
              path:"./DetailedSearchGrade",
              query:{
                data0:this.data0,
                data1:this.Detaileddata,
                data2:this.dataSources2,
                data3:this.inputId,
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        //this.visible1 = true
      }, //打开model1 明细

    //翻页
      onChange(pagination, sorter) {
        this.fetch(pagination.current,1);
      },
      //输入当前页和每页条数
      fetch(current,pageSize){
        this.pagination1={total:this.dataSources2.allNumber,pageSize:5}
      },

    //返回教师主页
      goBack() {
        this.$router.push({
          path:"./teacherSearchGrade",
          query:{
            ok:"ok"
          }
        });
      },
  }
}
</script>

<style>

</style>