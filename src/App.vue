<template>
  <div id="app">
   <routerView></routerView>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  .ant-menu-dark .ant-menu-inline.ant-menu-sub{background: rgb(46, 63, 78);}
  .ant-badge-multiple-words{
    padding: 0;
  }
  .my-tooltip .ant-table-column-has-actions{
    /* 列最大宽度，不换行，超过最大长度出现省略号并把超过的内容隐藏 */
    max-width: 150px;
    white-space: nowrap; 
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
