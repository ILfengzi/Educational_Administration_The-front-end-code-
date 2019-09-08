<!--
 * @Description: 查询成绩/学生
 * @Author: Xiao Xiao
 * @LastEditors: Xiao Xiao
 * @Date: 2019-04-29 15:22:17
 * @LastEditTime: 2019-06-20 18:45:59
 -->

<template>
<div class="content">

  <!-- <div>查询成绩/学生</div> -->
    <div>
      <a-row>
        <a-col :span="6">
          当前学期：{{dataSources2.semesterName}}
        </a-col>
        <a-col :span="5">
          姓名：{{dataSources2.studentName}}
        </a-col>
          学号：{{dataSources2.stuNo}}
      </a-row>
      <br>
      <a-row>
        <a-col :span="6">
          学院：{{dataSources2.departmentName}}
        </a-col>
        <a-col :span="5">
          专业：{{dataSources2.specialtyName}}
        </a-col>
          所属班级：{{dataSources2.studentClass}}
      </a-row>
    </div>
    <br>
    <!-- 双条件查询 -->
      <template> 
        <a-form :form="searchForm" @submit="searchSubmit" layout="inline" >
          <a-form-item label="学期：">
            <a-select v-decorator="['semesterName']" placeholder="选择学期" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px"  @select="select" :defaultActiveFirstOption="false"> 
              <a-select-option v-for="item1,index in semesterList" :key="index" :value="item1">{{item1}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="课程名称：">
            <a-select v-decorator="['courseName']" placeholder="选择课程名称" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" @dropdownVisibleChange="openselect" :defaultActiveFirstOption="false">
              <a-select-option v-for="item2,index in courseList" :key="index" :value="item2">{{item2}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item class="form-btn-item"> <!-- 提交搜索条件 -->
            <a-button class="filter-btn" html-type="submit" type="primary" icon="search">查找</a-button>
            <a-button class="reset-btn" type="danger" icon="reload" @click="reset">清空条件</a-button>
          </a-form-item>
        </a-form>
      </template> 
    <!-- 学生表 -->
    <template>
      <a-table 
          :columns="Columns2"
          :dataSource="dataSources2.data"
          :pagination="pagination2"
          :loading="load"
          bordered
          size="small"
          :scroll="{ x: 800, y: 340 }"
          :row-key="record => record.id"
          @change="onChange"
        >
        <a-button slot="courseNumber" slot-scope="_,record" style="border-style: none" @click="showcourse(record.courseNumber)">{{record.courseNumber}}</a-button>
        <a-button slot="courseName" slot-scope="_,record" style="border-style: none" @click="showcourse(record.courseNumber)">{{record.courseName}}</a-button>
        <a-button slot="operation1" slot-scope="_,record" type="primary" @click="showDetailed(record)">明细</a-button>
      </a-table>
    </template>
    <!-- 课程信息模态框1 -->
    <a-modal title="课程信息" :width="650" :visible="visible0" @ok="handleOk0" :confirmLoading="confirmLoading0"
      @cancel="handleCancel0">
      <template>
        课程编号：{{this.coursedata.number}}<br>
        课程名称：{{this.coursedata.courseName}}<br>
        课程英文名称：{{this.coursedata.courseEname}}<br>
        课程种类：{{this.coursedata.speciesName}}<br>
        课程类别：{{this.coursedata.categoryName}}<br>
        课程分类：{{this.coursedata.classificationName}}<br>
        考核方式：{{this.coursedata.exam_typeName}}<br>
        考核形式：{{this.coursedata.exam_modeName}}<br>
        总课时：{{this.coursedata.hour}}<br>
        学分：{{this.coursedata.credit}}
      </template>
    </a-modal>

</div>
</template>

<script>

  // 学生表格_1 
  const Columns2 = [
    {
      title: '课程编号',
      key: 'courseNumber',//ok
      width: 110,
      scopedSlots: {
        customRender: 'courseNumber'
      },
    }, {
      title: '课程名称',
      dataIndex: 'courseName',
      scopedSlots: {
        customRender: 'courseName'
      },
    }, {
      title: '课程种类',
      dataIndex: 'speciesName',//1111111111111
      width: 120,
    }, {
      title: '课程类别',
      dataIndex: 'categoryName',//1111111111111  categoryName
      width: 110,
    }, {
      title: '总成绩',
      dataIndex: 'score',//
      width: 100,
      sorter: (a, b) => a.score - b.score,
    }, {
      title: '绩点',
      dataIndex: 'point',//ok
      width: 80,
      sorter: (a, b) => a.point - b.point,
    }, {
      title: '考试性质',
      dataIndex: 'state',//ok
      width: 90,
    }, {
      title: '教师姓名',
      dataIndex: 'teacherName',
      width: 100,
    }, {
      fixed: 'right',
      title: '操作',
      key: 'operation1',//ok
      width: 100,
      scopedSlots: {
      customRender: 'operation1'
      },
    }
  ];

export default {
  data(){
    return{
      Columns2,
      load:false,

      searchForm:this.$form.createForm(this),
      semesterList: [
          "2014-2015-1",
          "2014-2015-2",
          "2015-2016-1",
      ],//学期列表
      courseList: [
          "英美影视赏析与英语交际",
          "生命科学与人类文明",
          "计算机组成原理",
      ],//课程名称
      ifsemester:0,//下拉框相关

      visible0:false,
      confirmLoading0:false,
      coursedata:{},//课程信息

      dataSources2:[],//学生主表信息
      pagination2:{total:0,pageSize:5},
      
      inputId:{
        courseId:'',
        stuGradeMainId:'',
        studentId:'',
        universityId:'',
        semesterId:'',
        stuItemGradeDetailOldId:''
      },//传给申请修改的id
      data0:"1",
      
  //明细相关
      Detaileddata:[],//真正的明细项
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
      ], //嵌套表格_1
      inputId:{
        courseId:'',
        stuGradeMainId:'',
        studentId:'',
        universityId:'',
        semesterId:'',
        stuItemGradeDetailOldId:''
      }
    }

  },
      created: function () {
        this.axios
          .get("/json/gradeManagement1/selectcurrentStudent",)
          .then(response => {
            // this.load=false,
            this.dataSources2=response.data.data;
            this.pagination2={total:response.data.data.total,pageSize:5}
            if(this.dataSources2.data.state==0)
              this.dataSources2.data.state="正常考试"
            else if(this.dataSources2.data.state==1)
              this.dataSources2.data.state="第一次重修"
            else if(this.dataSources2.data.state==2)
              this.dataSources2.data.state="第二次重修"
            console.log(this.dataSources2);
          })
          .catch(function (error) {
            console.log(error);
        });
        this.axios
          .get("/json/gradeManagement1/getsemesterNameAll",)
          .then(response=>{
            this.semesterList=response.data.data;
              console.log(response.data.data);
          })
          .catch(function (error) {
              console.log(error);
        });

      },
  methods: {
    //查询相关
      filterSelectedOption(input, option) { //下拉框输入文字自动匹配选项
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      btn: function () {
        var search = this.search;
        if (search) {
          this.searchData = this.products.filter(function (product) {
            console.log(product)
            return Object.keys(product).some(function (key) {
              console.log(key)
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
      },//与查询相关
      openselect(){
        console.log("打开了");
        if(this.ifsemester==0){
          this.axios
          .get("/json/gradeManagement1/getcourseNameAll",)
          .then(response=>{
            this.courseList=response.data.data;
            console.log(this.courseList);
          })
          .catch(function (error) {
              console.log(error);
          })
        }
      },//打开下拉框
      select(value){
        this.axios
        .get("/json/gradeManagement1/getcourseNameAll",
            {
              params: {
                semesterName: value
              }
            }
          )
        .then(response=>{
          this.courseList=response.data.data;
          this.ifsemester=1,//已获得semester
          console.log(value);
        })
        .catch(function (error) {
            console.log(error);
        }),
          this.searchForm.setFieldsValue({courseName:""})
      },//选择下拉框
      reset(){
        this.searchForm.resetFields()
        this.ifsemester=0
      },//重置下拉框
      searchSubmit (e) {
        e.preventDefault();
        console.log('ok！');
        this.searchForm.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            this.axios
            .get("/json/gradeManagement1/selectcurrentStudent",//GET /json/gradeManagement1/selectcurrentStudent
                {
                  params: {
                    semesterName: values.semesterName,
                    courseName:values.courseName
                  }
                }
              )
            .then(response=>{
              this.dataSources2=response.data.data;
              this.fetch(this.pagination2.current,1);
              if(dataSources2.data.state==0)
                dataSources2.data.state="正常考试"
              else if(dataSources2.data.state==1)
                dataSources2.data.state="第一次重修"
              else if(dataSources2.data.state==2)
                dataSources2.data.state="第二次重修"
              console.log(this.dataSources2);
            })
            .catch(function (error) {
                console.log(error);
            })
          }
        });
      },//查询表单提交

    //查看课程     
      showcourse(value){
        this.axios
        .get("/json/gradeManagement1/selectBycourseNumber",
            {
              params: {
                courseNumber:value
              }
            }
          )
        .then(response=>{
          this.coursedata=response.data.data;
          console.log(this.coursedata);
        })
        .catch(function (error) {
            console.log(error);
        })
        this.visible0=true
      },//打开查看课程
      handleOk0(e) {
        this.confirmLoading0 = true;
        setTimeout(() => { this.visible0 = false; this.confirmLoading0 = false; }, 500);
      }, //关闭课程信息model0
      handleCancel0(e) {
        this.visible0 = false;
      }, //关闭model

    //查看成绩明细      
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
            console.log('this.value  S');
            this.$router.push({
              path:"./DetailedSearchGrade",
              query:{
                data1:this.Detaileddata,
                data2:this.dataSources2,
                data3:this.inputId,
                data0:this.data0
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }, //打开model1 明细
      
    //翻页
      onChange(pagination, sorter) {
        this.fetch(pagination.current,12);
      },//翻页相关
      //输入当前页和每页条数
      fetch(current,pageSize){
        this.pagination2={total:this.dataSources2.total,pageSize:5}
      },
  }
}
</script>

<style>

</style>