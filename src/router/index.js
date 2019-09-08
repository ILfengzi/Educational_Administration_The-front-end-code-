import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Announcement from '@/pages/announcement/Announcement'
import StudentLeave from '@/pages/studentLeave/StudentLeave'
import StudentApplication from '@/pages/gradeManagement/ApplicationManage/StudentIndex.vue'
import TeacherApplicationManage from '@/pages/gradeManagement/ApplicationManage/TeacherIndex.vue'
import OfficerApplicationManage from '@/pages/gradeManagement/ApplicationManage/OfficerIndex.vue'
// import InputManage from '@/pages/gradeManagement/InputManage/index.vue'
//肖箫的路由配置
import StudentSearchGrade from '@/pages/gradeManagement/SearchGrade/StudentIndex.vue'
import TeacherSearchGrade from '@/pages/gradeManagement/SearchGrade/TeacherIndex.vue'
import OfficerSearchGrade from '@/pages/gradeManagement/SearchGrade/OfficerIndex.vue'
import DetailedSearchGrade from '@/pages/gradeManagement/SearchGrade/showDetailed.vue'
import ApplySearchGrade    from '@/pages/gradeManagement/SearchGrade/showApply.vue'

import GradeManage from '@/pages/gradeManagement/gradeManagement.vue'
import InputGradeItem from '@/pages/gradeManagement/InputManage/InputGradeItem.vue'
import InputGrade from '@/pages/gradeManagement/InputManage/InputGrade.vue'

import ManualInput from '@/pages/gradeManagement/InputManage/components/ManualInput.vue'
import InputOneGrade from '@/pages/gradeManagement/InputManage/components/InputOneGrade.vue'
Vue.use(Router)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'announcement',
          name: 'Announcement',
          component: Announcement
        },
        {
          path: 'studentLeave',
          name: 'StudentLeave',
          component: StudentLeave
        },
        {
          path: 'gradeManage',
          name: 'GradeManage',
          component: GradeManage,
          children:
            [
              {
                path: 'studentApplication',
                name: 'StudentApplication',
                component: StudentApplication
              },
              {
                path: 'teacherApplicationManage',
                name: 'TeacherApplicationManage',
                component: TeacherApplicationManage
              },
              {
                path: 'officerApplicationManage',
                name: 'OfficerApplicationManage',
                component: OfficerApplicationManage
              },
              // {
              //   path: 'inputManage',
              //   name: 'InputManage',
              //   component: InputManage
              // },
              {
                path: 'inputGradeItem',
                name: 'InputGradeItem',
                component: InputGradeItem
              },
              {
                path: 'inputGrade',
                name: 'InputGrade',
                component: InputGrade
              },
              {
                path: 'studentSearchGrade',
                name: 'StudentSearchGrade',
                component: StudentSearchGrade
              },//xiao
              {
                path: 'teacherSearchGrade',
                name: 'TeacherSearchGrade',
                component: TeacherSearchGrade
              },//xiao
              {
                path: 'officerSearchGrade',
                name: 'OfficerSearchGrade',
                component: OfficerSearchGrade
              },//xiao
              {
                path: 'manualInput',
                name: 'ManualInput',
                component: ManualInput
              },
              {
                path: 'inputOneGrade',
                name: 'InputOneGrade',
                component: InputOneGrade
              },
              {
                path: 'DetailedSearchGrade',
                name: 'DetailedSearchGrade',
                component: DetailedSearchGrade
              },//xiao
              {
                path: 'ApplySearchGrade',
                name: 'ApplySearchGrade',
                component: ApplySearchGrade
              },//xiao
            ]
        }
      ]
    }
  ]
})

