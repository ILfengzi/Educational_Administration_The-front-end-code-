<!--
 * @Description: 申请管理/教师
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-04-29 15:21:39
 * @LastEditTime: 2019-06-11 14:59:10
 -->
 
<template>
  <div class="content">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="我的申请" key="1">
        <my-application></my-application>
      </a-tab-pane>
      <a-tab-pane tab="我的审核" key="2" forceRender>
        <my-approvals></my-approvals>
      </a-tab-pane>
    </a-tabs>
    <br><br><br><br><br>
  </div>
</template>
<script>

import MyApplication from './components/MyApplication';
import MyApprovals from './components/MyApprovals';

export default {
  components: {
    MyApplication,
    MyApprovals,
  },
  methods: {
    callback() {
      console.log('callback');
    }
  }
};
</script>

<style>
/* .content {
  background: #fff;
  padding: 30px 30px;
} */
</style>