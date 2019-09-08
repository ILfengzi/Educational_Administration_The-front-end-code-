<!--
 * @Description: 录入管理/录入成绩/手动录入/录入某个学生的成绩
 * @Author: Lin Changkun
 * @LastEditors: Lin Changkun
 * @Date: 2019-04-29 15:22:09
 * @LastEditTime: 2019-06-20 22:35:54
 -->
 <template>
  <div class="content">
    <a-form :form="modelform" layout="horizontal" hideRequiredMark @submit="handleSubmit">
      <a-form-item label="成绩项明细" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
        <!-- 使用 treeData 把从后台拿到的 JSON 数据直接生成树结构 -->
        <a-tree-select
          v-decorator="[
              'itemDetail',
              {
                rules: [{ required: true, message: '请选择正确的成绩组成项！' }]
              }]"
          style="width: 250px"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="请选择成绩组成项"
          treeDefaultExpandAll
          @select="inputSelect"
        >
          <!-- <span style="color: #08c" slot="title" slot-scope="{key, value}" v-if="key='1'">{{value}}</span> -->
        </a-tree-select>
      </a-form-item>

      <a-form-item label="内容描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 7 }">
        <a-textarea
          v-decorator="[
              'content',
              {
                rules: [{ required: true, message: '内容描述不能为空！' }]
              }]"
          :rows="4"
          placeholder="请输入内容描述"
        />
      </a-form-item>

      <a-form-item label="成绩" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
        <a-input-number
          v-decorator="[
              'score',
              {
                rules: [{ required: true, message: '成绩不能为空！' }]
              }]"
          style="width: 150px"
          :min="0"
          :max="100"
          :step="1"
          :precision="1.0"
        />
      </a-form-item>

      <a-form-item label="评语" :label-col="{ span: 4 }" :wrapper-col="{ span: 7 }">
        <a-textarea
          v-decorator="[
              'note',
              {
                rules: [{ required: true, message: '多少写点吧！' }]
              }]"
          :rows="4"
          placeholder="请输入评语"
        />
      </a-form-item>
      <a-form-item label="上传附件" :label-col="{ span: 4 }" :wrapper-col="{ span: 7 }">
        <a-upload-dragger
          :fileList="fileList"
          action="http://10.86.2.51:8080/json/gradeManagement1/upload"
          @change="fileSubmit"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox"/>
          </p>
          <p class="ant-upload-text">{{this.temMessage}}</p>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item label=" " :colon="false" :label-col="{ span: 6 }" :wrapper-col="{ span: 9 }">
        <a-button type="primary" ghost :style="{marginRight: '10px'}" @click="handleReset">清空</a-button>
        <a-button type="primary" :style="{marginRight: '20px'}" html-type="submit">提交</a-button>
        <a-button @click="goBack()">返回上一层</a-button>
      </a-form-item>
      <br>
      <br>
      <br>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelform: this.$form.createForm(this),
      visible: false,
      treeData: [],
      load: false,
      fileList: [],
      uploadAddr: undefined,
      temMessage: "单击或拖动附件到此区域进行上载",
      tmpItemDetailId: undefined,
      tmpItemGradeId: undefined
    };
  },

  methods: {
    callback(key) {
      console.log(key);
    },

    /**
     * 点击或拖拽上传文件回调函数
     */
    fileSubmit(info) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      // Only to show one recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data;
          /**
           * 自己加的，最后一次上传的附件的url
           * 用户多次上传则只用最后一个，
           * 立个flag：后期可与后台交流优化清理用户误传、多传的垃圾文件
           */
          this.uploadAddr = file.response.data;
          // 将提示信息改为上传的文件名
          this.temMessage = file.name;
        }
        return file;
      });
      this.fileList = fileList;
    },

    /**
     * @page: 页数
     * @limit: 每页的记录数
     */
    fetch() {
      console.log("fetch");
      this.load = true;
      this.axios
        .get("/json/gradeManagement1/courseItemDetail/itemName", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(response => {
          this.load = false;
          let res = response.data;
          console.log(res.data.length);

          // 构造树形选择器
          for (let i = 0; i < res.data.length; i++) {
            console.log("this lengthL: " + res.data.length);
            // 构造父项
            let tmp = {
              key: i,
              // value: res.data.name + '' + i,
              value: res.data[i].name,
              title: res.data[i].name,
              selectable: false,
              children: []
            };
            // treeData.push();

            for (let j = 0; j < res.data[i].itemNames.length; j++) {
              // 构造子项数组
              tmp.children.push({
                key: i + "-" + j,
                title: res.data[i].itemNames[j].itemName,
                value: res.data[i].itemNames[j].itemName,
                itemDetailId: res.data[i].itemNames[j].itemDetailId,
                itemGradeId: res.data[i].itemNames[j].itemGradeId,
                disabled: false //true为不可点击
              });
              if (res.data[i].itemNames[j].in === true) {
                // 已经录过了则不能再点击录入
                tmp.children[j].disabled = true;
              }
              // console.log(treeData[i].children[j]);
            }
            // console.log(tmp);
            // 将完整父项填进父数组，构造完整选择器（树）
            this.treeData.push(tmp);
          }
        });
    },

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
          let load = this.$message.loading("正在提交表单", 0);
          this.axios
            .post("/json/gradeManagement1/stuItemGradeDetail",{
              params: {
                stuId: this.$route.query.stuId,
                courseId: this.$route.query.courseId,
                itemDetail: values.itemDetail,
                content: values.content,
                score: values.score,
                note: values.note,
                uploadAddr: this.uploadAddr,
                itemDetailId: this.tmpItemDetailId,
                itemGradeId: this.tmpItemGradeId
              }
            })
            .then(res => {
              // 请求回调事件
              load();
              if (res.data.code === 0) {
                // 表单提交成功
                this.$message.success("表单提交成功", 4);
                // 刷新表单
                this.modelform = this.$form.createForm(this);
              } else {
                this.$message.error(res.data.msg, 4);
              }
            });
        }
      });
    },

    /**
     * 选择器的文本框值变化时回调
     */
    inputSelect(value) {
      console.log("%%%%%%%%%%%%%%%%");
      // 遍历整棵树，拿到选择器的input值对应的树中的itemDetailId、itemGradeId
      // let flag = 0;
      for (let i = 0; i < this.treeData.length; i++) {
        for (let j = 0; j < this.treeData[i].children.length; j++) {
          if (value === this.treeData[i].children[j].value) {
            this.tmpItemDetailId = this.treeData[i].children[j].itemDetailId;
            this.tmpItemGradeId = this.treeData[i].children[j].itemGradeId;
            return;
          }
        }
      }
    },

    /**
     * 以下为 Select 选择器的事件
     */
    // handleChange(value) {
    //   console.log(`selected ${value}`);
    // },
    // handleBlur() {
    //   console.log("blur");
    // },
    // handleFocus() {
    //   console.log("focus");
    // },
    // filterOption(input, option) {
    //   return (
    //     option.componentOptions.children[0].text
    //       .toLowerCase()
    //       .indexOf(input.toLowerCase()) >= 0
    //   );
    // },

    /**
     * 返回上一层
     */
    goBack() {
      console.log("this.$route最后：******************");
      console.log(this.$route);
      console.log("************************");
      this.$router.go(-1);
    },

    /**
     * 清空搜索框的内容
     */
    handleReset() {
      this.modelform.resetFields();
    }
  },

  /**
   * 页面挂载后,请求第一页内容
   */
  mounted() {
    this.fetch();
  }
};
</script>

<style>
/* .content {
  background: #fff;
  padding: 30px 30px;
} */
</style>