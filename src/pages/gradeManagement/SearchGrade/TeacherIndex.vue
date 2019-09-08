<!--
 * @Description: 查询成绩/教师
 * @Author: Xiao Xiao
 * @LastEditors: Xiao Xiao
 * @Date: 2019-04-29 15:22:17
 * @LastEditTime: 2019-06-21 15:11:05
 -->

<template>
  <div class="content">
    <div class="safetyInfo">
      <a-row>
      <a-col :span="8">
        当前学期：{{dataSources1.semesterName }} 
      </a-col>
      <a-col :span="5" :offset="11">
        <a-button type="primary" @click="showSearch">高级查询</a-button>
      </a-col>
    </a-row><!-- 还有嵌套表格没改！！！！！ -->
    </div>


    <!-- 主表/班级表 -->
    <a-table 
      :columns="Columns1"
      :dataSource="dataSources1.data"
      :pagination="pagination1"
      :loading="load"
      bordered
      size="small"
      :row-key="record => record.id"
      @change="onChange"
      >
      <a-button slot="studentCode" slot-scope="_,record" style="border-style: none" @click="showclass(record.studentCode)">{{record.studentCode}}</a-button>
      <a-button slot="studentClass" slot-scope="_,record" style="border-style: none" @click="showclass(record.studentCode)">{{record.studentClass}}</a-button>
      <a-button slot="courseNumber" slot-scope="_,record" style="border-style: none" @click="showcourse(record.courseNumber)">{{record.courseNumber}}</a-button>
      <a-button slot="courseName" slot-scope="_,record" style="border-style: none" @click="showcourse(record.courseNumber)">{{record.courseName}}</a-button>
      <a-button slot="operation1" slot-scope="_,record" type="primary" @click="showStudent(record)">管理成绩</a-button>
    </a-table>
    <!-- 课程信息模态框1 -->
    <a-modal title="课程信息" :width="550" :visible="visible0" @ok="handleOk0" :confirmLoading="confirmLoading0"
      @cancel="handleCancel0">
      <template>
        <h1>
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
        </h1>
      </template>
    </a-modal>
    <!-- 班级信息模态框1 -->
    <a-modal title="班级信息" :width="550" :visible="visible1" @ok="handleOk1" :confirmLoading="confirmLoading1"
      @cancel="handleCancel1">
        <h1>
        所属学院：{{this.classdata.departmentName}}<br>
        班级编号：{{this.classdata.classCode}}<br>
        班级专业名称：{{this.classdata.specialtyName}}<br>
        班级名称：{{this.classdata.className}}<br>
        开班月份：{{this.classdata.classMonth}}<br>
        班主任名字：{{this.classdata.headteacherName}}<br>
        是否解散：{{this.classdata.classCover}}<br>
        开班年份：{{this.classdata.classYear}}<br>
        班级性质：{{this.classdata.classLength}}
        </h1>
    </a-modal>
    <!-- 高级查询模态框1 -->
    <a-modal title="高级查询" :width="500" :visible="visible3" @ok="handleOk3" :confirmLoading="confirmLoading3"
      @cancel="handleCancel3">
      <template> 
        <a-form :form="searchForm" @submit="searchSubmit" layout="inline" >
          <a-form-item label="开始学期：" v-bind="formItemLayout">
            <a-select v-decorator="['StartsemesterName']" placeholder="选择学期" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false"> 
              <a-select-option v-for="item0,index in semesterList" :key="index" :value="item0.name">{{item0.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="结束学期：" v-bind="formItemLayout">
            <a-select v-decorator="['Endsemester']" placeholder="选择学期" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false"> 
              <a-select-option v-for="item1,index in semesterList" :key="index" :value="item1.name">{{item1.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="课程名称：" v-bind="formItemLayout">
            <a-select v-decorator="['courseName']" placeholder="选择课程名称" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false">
              <a-select-option v-for="item2,index in courseList" :key="index" :value="item2.name">{{item2.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="课程种类：" v-bind="formItemLayout">
            <a-select v-decorator="['speciesName']" placeholder="选择课程种类" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false">
              <a-select-option v-for="item3,index in speciesList" :key="index" :value="item3.name">{{item3.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="课程类别：" v-bind="formItemLayout">
            <a-select v-decorator="['categoryName']" placeholder="选择课程类别" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false">
              <a-select-option v-for="item4,index in categoryList" :key="index" :value="item4.name">{{item4.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="选择班级：" v-bind="formItemLayout">
            <a-select v-decorator="['studentClass']" placeholder="选择班级" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false">
              <a-select-option v-for="item5,index in ClassList" :key="item5.id" :value="item5.name">{{item5.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="选择年级：" v-bind="formItemLayout">
            <a-select v-decorator="['studentGrade']" placeholder="选择年级" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false">
              <a-select-option v-for="item6,index in GradeList" :key="index"  :value="item6.name">{{item6.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="学院名称：" v-bind="formItemLayout">
            <a-select v-decorator="['departmentName']" placeholder="选择学院名称" optionFilterProp="children" showSearch
              :filterOption="filterSelectedOption" style="width: 200px" :defaultActiveFirstOption="false">
              <a-select-option v-for="item7,index in departmentList" :key="index" :value="item7.name">{{item7.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <br>
          <a-form-item class="form-btn-item"> <!-- 提交搜索条件 -->
            <a-button class="filter-btn" html-type="submit" type="primary" icon="search">查找</a-button>
            <a-button class="reset-btn" type="danger" icon="reload" @click="resetSearch">清空条件</a-button>
          </a-form-item>
        </a-form>
      </template> 
    </a-modal>

  <br><br><br><br>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { DatePicker} from 'ant-design-vue';
  Vue.use(DatePicker);
  import 'ant-design-vue/dist/antd.css';
  import { Button } from 'ant-design-vue';
  Vue.use(Button);

//班级主表格1
  const Columns1 = [
    {
      title: '班级编号',
      dataIndex: 'studentCode',
      width: 140,
      scopedSlots: {
        customRender: 'studentCode'
      },
    },{
      title: '班级名称',
      dataIndex: 'studentClass',
      width: 100,
      scopedSlots: {
        customRender: 'studentClass'
      },
    }, {
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
      title: '班级人数',
      dataIndex: 'allNumber',
      width: 100,
    }, {
      title: '通过人数',
      dataIndex: 'adoptNumber',//ok
      width: 80,
    }, {
      title: '不通过人数',
      dataIndex: 'failNumber',
      width: 100,
    }, {
      fixed: 'right',
      title: 'Action',
      key: 'operation1',//ok
      width: 120,
      scopedSlots: {
      customRender: 'operation1'
      },
    }
  ];

  export default {
    data() {

      return {
//查询相关
        Columns1,//班级主表
        load:false,//主表格式
        search: '',
        searchData: '',
        searchForm:this.$form.createForm(this),
        pagination1:{total:0,pageSize:5},//翻页器
        semesterList: [
          {id:1,name:''},
        ],//学期列表
        departmentList: [
          {id:1,name:''},
        ],//学院
        GradeList: [
          {id:1,name:'2014'},
          {id:2,name:'2015'},
          {id:3,name:'2016'},
          {id:4,name:'2017'},
          {id:5,name:'2018'},
          {id:6,name:'2019'},
          {id:7,name:'2020'},
        ],//年级
        ClassList: [
          {id:1,name:''},
        ],//班级
        courseList: [
          {id:1,name:''},
        ],//课程名称
        speciesList: [
          {id:1,name:''},
        ],//课程种类
        categoryList: [
          {id:1,name:''},
        ],//课程类别
        dataSources1:{ 
          total:13,
          data:[
          ]
        },
        visible3: false, //modal高级查询
        confirmLoading3: false, //modal高级查询
//班级课程信息
        classdata:{},//班级信息
        coursedata:{},//课程信息
        visible0: false, //课程信息modal
        confirmLoading0: false, //课程信息modal
        visible1: false, //modal班级信息
        confirmLoading1: false, //modal班级信息
        formItemLayout: {
          labelCol: { span: 8 },
          wrapperCol: { span: 14 },
        },

        a:1,
      }
    },
      created: function () {
        this.axios
          .get("/json/gradeManagement1/selectByTeacher",)
          .then(response => {
            // this.load=false,
            this.dataSources1=response.data.data;
            this.pagination1={total:response.data.data.total,pageSize:5}
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
        });//get默认主表
        this.axios
          .get("/json/educateAffair/semester/listAll",)
          .then(response => {
              this.semesterList=response.data.semesters;
            console.log("this.semesterList");
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });//学期信息
        this.axios
          .get("/json/educateAffair/curriculum/getInstitute",)
          .then(response => {
              this.departmentList=response.data.Institute;
            console.log("this.departmentList");
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });//年级信息
        this.axios
          .get("json/administrativestructure/classes/listAll",)
          .then(response => {
              this.ClassList=response.data.classes;
            console.log("this.ClassList");
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });//班级种类
        this.axios
          .get("json/professionalCourses/courses/listAll",)
          .then(response => {
              this.courseList=response.data.courses;
            console.log("this.courseList");
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });//课程名称
        this.axios
          .get("json/professionalCourses/courseSpeciess/listAll",)
          .then(response => {
              this.speciesList=response.data.courseSpeciess;
            console.log("this.speciesList");
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });//课程种类
        this.axios
          .get("json/professionalCourses/courseCategorys/list/1")
          .then(response => {
              this.categoryList=response.data.pageInfo.list;
            console.log("this.categoryList");
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });//课程类别
      },//获取默认查询项内容

    methods: {
//高级查询
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
      showSearch(){
        this.visible3=true;
      },//打开高级查询！！！
      searchSubmit (e) {
        e.preventDefault();
        this.searchForm.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.axios
              .get("/json/gradeManagement1/selectAllByexample",{//GET /json/gradeManagement1/selectAllByexample
                  params:{
                    semesterStart:values.semesterStart,
                    semesterEnd:values.semesterEnd,
                    courseName:values.courseName,
                    speciesName:values.speciesName,
                    categoryName:values.categoryName,
                    studentClass:values.studentClass,
                    studentGrade:values.studentGrade,
                    departmentName:	values.departmentName
                  }
                }
              )
              .then(response => {
                // this.load=false,
                this.dataSources1=response.data.data;
                this.pagination1={total:response.data.data.total,pageSize:5}
                console.log("高级查询成功了啊啊啊");
                console.log(this.dataSources1);
                console.log("高级查询成功了啊啊啊");
                 this.visible3 = false;
              })
              .catch(function (error) {
                console.log(error);
            });
          }
        });
        this.searchForm.resetFields()
      },//提交查找表单
      resetSearch(){
        this.searchForm.resetFields()
      },//重置下拉框
      handleOk3(e) {
        this.confirmLoading3 = true;
        setTimeout(() => { this.visible3 = false; this.confirmLoading3 = false; }, 500);
        this.searchForm.resetFields()
      }, //关闭model3
      handleCancel3(e) {
        this.visible3 = false;
        this.searchForm.resetFields()
      }, //关闭model3

//查看信息 或者 跳转到 班级所有学生成绩
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
      },//打开查看课程信息
      handleOk0(e) {
        this.confirmLoading0 = true;
        setTimeout(() => { this.visible0 = false; this.confirmLoading0 = false; }, 500);
      },//关闭课程信息model0
      handleCancel0(e) {
        this.visible0 = false;
      },//关闭model
      showclass(value){
        this.axios
        .get("/json/gradeManagement1/selectByclassCode",//
            {
              params: {
                classCode:value
              }
            }
          )
        .then(response=>{
          this.classdata=response.data.data;
          if(this.classdata.classLength==1)
            this.classdata.classLength="临时班"
          else if(this.classdata.classLength==6)
            this.classdata.classLength="大专班"
          else if(this.classdata.classLength==8)
            this.classdata.classLength="本科班"
          if(this.classdata.classCover==false)
            this.classdata.classCover="否"
          else if(this.classdata.classCover==true)
            this.classdata.classCover="是"
          console.log(this.classdata);

        })
        .catch(function (error) {
            console.log(error);
        })
        this.visible1=true
      },//打开查看课程信息
      handleOk1(e) {
        this.confirmLoading1 = true;
        setTimeout(() => { this.visible1 = false; this.confirmLoading1 = false; }, 500);
      },//关闭课程信息model0
      handleCancel1(e) {
        this.visible1 = false;
      },//关闭model
      
      showStudent(value) {
        const num=value.id-1;
        this.dataSources2=value,
        this.pagination2={total:value.allNumber,pageSize:this.dataSources1.pageSize}
        this.$router.push({
          path:"./officerSearchGrade",
          query:{
            data1:this.dataSources2
          }
        });
        console.log(this.dataSources2)
        //this.visible = true
      }, //跳转到 班级所有学生成绩

//翻页
      fetch(current,pageSize){
      },
      onChange(pagination, sorter) {
        this.fetch(pagination.current,5);
      },//执行fetch

    }
  }
</script>

<style>
.ant-table td { white-space: nowrap; }
</style>
