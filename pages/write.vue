<template>
  <div style="height: 100%">
    <div style="height: 100%;display: flex;align-items: center;justify-content: center">
      <!--      <el-row type="flex" justify="space-around" style="text-align: left;height: 100%">-->
      <!--        <el-col :span="10">-->
      <!--          <el-input type="textarea" v-model="markdownCode" @input="submitForm"></el-input>-->
      <!--        </el-col>-->
      <!--        <el-col :span="10" >-->
      <!--          <div v-highlight>-->
      <!--            <div v-html="markdownHtml">-->

      <!--            </div>-->
      <!--          </div>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <div>
        <div style="display: flex;align-items: center;margin-bottom: 25px;justify-content: center">
          <h2 style="margin: 0 10px 0 0;">Markdown 文件上传</h2>
        </div>
        <div class="operation">
          <el-radio-group v-model="to" >
            <el-radio label="article">博客</el-radio>
            <el-radio label="algorithm">算法</el-radio>
          </el-radio-group>
          <el-select style="margin-left: 20px" v-model="value" placeholder="请选择主题">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-upload
          class="upload-demo"
          drag
          :action="uploadUrl"
          multiple
          :on-success="fileUploadSuccess"
          :auto-upload="false"
          ref="file"
          :file-list.sync="fileList"
        >
          <div>
            <i style="margin: 0" class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </div>
        </el-upload>
        <el-button @click="onSubmit" style="margin-top: 20px;float: right" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "write",
  data(){
    return{
      value:"JavaScript",
      markdownCode:"",
      markdownHtml:"",
      to: 'article',
      fileList: [],
      articleOptions: [{
        value: 'JavaScript',
        label: 'JavaScript'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'NodeJS',
        label: 'Node.JS'
      }, {
        value: 'Python',
        label: 'Python'
      }, {
        value: 'Golang',
        label: 'Golang'
      },{
        value: 'Vue',
        label: 'Vue'
      },{
        value: 'React',
        label: 'React'
      },{
        value: 'DailyLife',
        label: '生活记录'
      },{
        value: 'Tool',
        label: "工具"
      },{
        value: 'SolveWay',
        label: "解决方案"
      }],
      algorithmOptions:[
        {
          value: 'DailyLife',
          label: '生活记录'
        },{
          value: 'Tool',
          label: "工具"
        },{
          value: 'SolveWay',
          label: "解决方案"
        }
      ]
    }
  },
  computed:{
    selectOptions(){
      if(this.to === 'article'){
        this.value = this.articleOptions[0].value
        return this.articleOptions
      }else{
        this.value = this.algorithmOptions[0].value
        return this.algorithmOptions
      }
    },
    uploadUrl(){
      if(this.to === 'article'){
        return 'http://121.43.155.100:8081/mdUpload'
      }else{
        return `${process.env.BASE_URL}/api/algorithm`
      }
    }
  },
  methods:{
    // submitForm(){
    //     this.$axios.post('/markdown',{markdownCode:this.markdownCode}).then(res => {
    //         this.markdownHtml = res.data.code
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // },
    fileUploadSuccess(res,file,fileList) {
      if (res.code === 200) {
        console.log(res.hash)
        new Promise((resolve => {
          this.writeCategory(res.hash)
          resolve()
        })).then(() => {
          setTimeout(()=>{this.$router.push({name:"pages"})},400)
        })
      }
    },
    writeCategory(hash){
      this.$axios.post('/writeCategory',{category:this.value,urlHash:hash}).then(res => {
        console.log(res)
        this.$message({
          message: "文件上传成功",
          type: "success"
        });
      }).catch(error => {
        console.log(error)
      })
    },
    async onSubmitAlt(name, main, date){
      const res = await this.$service.post(`${process.env.BASE_URL}/api/algorithm`, {name, main,date})
      if(res){
        this.$message({
          message: "文件上传成功",
          type: "success"
        })
        setTimeout(() => this.$router.push({name: 'algorithm'}), 300)
      }
    },
    async onSubmit(){
      if(this.to === 'algorithm'){
        const file = this.$refs.file.uploadFiles[0].raw;
        if(file){
          const fr = new FileReader();
          let _this = this;
          fr.onload = function(){
            _this.onSubmitAlt(file.name, this.result, new Date().toLocaleDateString())
            // _this.handleSubmitAlt(this.result)
          }
          fr.readAsText(file);
        }
      }else{
        this.$refs.file.submit();
      }
    }
  },
}
</script>

<style scoped>

>>>.el-upload-dragger{
  display: flex;
  align-items: center;
  width: 600px;
  height: 250px;
  flex-wrap: wrap;
  justify-content: center;
}

.operation{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
