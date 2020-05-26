<template>
  <div
    style="height: 100%;"
    class="container"
  >
    <h1 style="font-weight: 500;font-size: 28px">一维/二维/对象数组可视化</h1>
    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        label="一维数组"
        name="single"
      ></el-tab-pane>
      <el-tab-pane
        label="二维数组"
        name="dua"
      ></el-tab-pane>
      <el-tab-pane
        label="对象数组"
        name="arrayObject"
      ></el-tab-pane>
    </el-tabs>
    <div
      class="data-render"
      style="overflow-x: scroll"
      v-html="renderData"
    ></div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
              >
                <span
                  style="display: inline-block"
                  v-html="node.label"
                  v-if="!data.flag"
                  class="label"
                ></span>
                <input
                  style="width: 100px;height:20px;display: inline-block"
                  class="input-container"
                  :ref="'input-'+data.id"
                  v-else-if="data.flag === 1"
                  v-model="getCurrentModifyIndex(data).label"
                />
                  <template v-else-if="data.flag===2">
                      <input
                        :ref="'input-key-'+data.id"
                        placeholder="Key"
                        style="width: 60px"
                        class="input-container"
                        v-model="data.keyLabel"
                      /> <input
                    :ref="'input-value-'+data.id"
                    placeholder="Value"
                    style="width: 60px"
                    class="input-container"
                    v-model="data.valueLabel"

                  />
                  </template>
                <span style="margin-left: 30px">
                    <template v-if="!data.flag">
                        <el-button
                          type="text"
                          size="mini"
                          v-if="!(data.children)"
                          @click="() => modify(node, data)"
                        >
                            Modify
                        </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => append(data)"
                        v-if="data.children"
                      >
                        Append
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => remove(node, data)"
                      >
                        Delete
                      </el-button>
                    </template>
                    <template v-else>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => changeData(node, data)"
                          style="color: #ff9089"
                        >
                            Right <i class="el-icon-check"></i>
                        </el-button>

                        <el-button
                          type="text"
                          size="mini"
                          @click="() => handleCancel(node, data)"
                          style="color: #ff9089"
                        >
                            Cancel <i class="el-icon-close"></i>
                        </el-button>
                    </template>
                </span>
              </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;

export default {
    name: "PrintOut",
    data() {
        return {
            activeName: 'single',
            renderData: '',
            defaultArrData: {
                single: ['Jacky', 'Alice', 'Tom', 'Dan', 'Michael'],
                dua: [['Jacky', 'Alice', 'Tom', 'Dan', 'Michael'], ['Jacky', 'Alice', 'Tom', 'Dan', 'Michael'].map(item => `Lil-${ item }`)],
                arrayObject: [
                    {
                        name: 'Jacky',
                        comeFrom: 'Canada',
                        age: 19
                    },
                    {
                        name: 'Alice',
                        comeFrom: 'Canada',
                        age: 21
                    },
                    {
                        name: 'Tom',
                        comeFrom: 'Canada',
                        age: 18
                    },
                    {
                        name: 'Dan',
                        comeFrom: 'Canada',
                        age: 30
                    },
                    {
                        name: 'Michael',
                        comeFrom: 'Canada',
                        age: 22
                    },
                ]
            },
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }],
            appendData: [],
            modifyCache: [],
        }
    },
    methods: {

        append(data) {

            let newChild;
            switch (this.activeName) {
                case "dua":
                    newChild = { id: id++, label: '', flag: 1, isNew: true }
                    break
                case 'arrayObject':
                    newChild = {
                        id: id++,
                        label: '',
                        flag: 2,
                        isNew: true
                    }
            }
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        handleCancel(node, data) {
            console.log(node, data)
            for (let [index, item] of node.parent.data.children.entries()) {
                if (item.id === data.id) {
                    if (data.isNew) {
                        node.parent.data.children.splice(index, 1)
                    }else{
                        node.parent.data.children.splice(index,1, {...data, flag:0})
                    }
                }
            }
            // node.parent.data.children.pop()

            // node.parent.data.pop()
            // node.parent.pop()
        },
        remove(node) {
            const currentId = node.data.id
            console.log(node)
            if (['dua', 'single'].includes(this.activeName)) {
                if (typeof currentId === 'string') {
                    const parIndex = currentId.split('-')[0]
                    const childIndex = currentId.split('-')[1]
                    this.defaultArrData[this.activeName][parIndex].splice(childIndex, 1)
                } else {
                    this.defaultArrData[this.activeName].splice(currentId, 1)
                }
            } else {
                if (typeof currentId === 'string') {
                    const parIndex = currentId.split('-')[0]
                    const childIndex = currentId.split('-')[1]
                    const currentObject = this.defaultArrData[this.activeName][parIndex]
                    Object.keys(currentObject).forEach((key, index) => {
                        if (index === Number(childIndex)) {
                            delete currentObject[key]
                        }
                    })
                } else {
                    this.defaultArrData[this.activeName].splice(currentId, 1)
                }
            }

            this.handleClick()
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.id === data.id);
            // children.splice(index, 1);
        },

        renderStandardArrHtml(data) {
            return data.map(item => {
                if (typeof item === 'object') {
                    if (item instanceof Array) {
                        return `<div class="pjfont" style="display: inline-block;margin-right: 6px;overflow-x: scroll;white-space: nowrap">[ ${ item.toString() } ]</div>`
                    } else {
                        return `<div class="pjfont" style="display: inline-block;margin-right: 6px;overflow-x: scroll;white-space: nowrap"> ${ JSON.stringify(item) } </div>`
                    }
                } else {
                    return `<div class="pjfont" style="display: inline-block;margin-right: 6px;overflow-x: scroll;white-space: nowrap">${ item.toString() }</div>`
                }
            }).join(',   ')
        },

        getCurrentModifyIndex(data) {
            console.log(data)
            let currentItem;
            this.modifyCache.find((item) => {
                if (item.id === data.id) {
                    currentItem = item
                }
            })

            if (!currentItem) {
                currentItem = { id: data.id, label: '' }
                this.modifyCache.push(currentItem)
            }

            return currentItem
        },

        modify(node, data) {
            const currentId = node.data.id
            this.modifyCache.push(data)
            if (this.activeName === 'single') {
                this.data.splice(data.id, 1, { id: data.id, flag: 1, default: data.label })
            } else if (this.activeName === 'dua') {
                const parIndex = Number(currentId.split('-')[0])
                const childIndex = Number(currentId.split('-')[1])

                this.data[parIndex].children.splice(childIndex, 1, { id: data.id, flag: 1, label: data.label })
            } else {
                const parIndex = Number(currentId.split('-')[0])
                const childIndex = Number(currentId.split('-')[1])
                console.log(this.data, childIndex, parIndex)
                const [keyValue, labelValue] = data.label.split(': ')
                this.data[parIndex].children.splice(childIndex, 1, { id: data.id, flag: 2, keyLabel: keyValue, valueLabel: labelValue })
            }
        },
        handleTabClick() {
            this.handleClick()
            this.modifyCache = []
        },
        handleClick() {
            const arrData = this.defaultArrData[this.activeName]
            this.renderData = this.renderStandardArrHtml(arrData)
            let data = []
            switch (this.activeName) {
                case "single":
                    data = arrData.map((item, index) => ({ id: index, label: item }))
                    break
                case 'dua':
                    data = arrData.map((item, index) => ({
                        id: index,
                        label: `<span style="color: #3a8ee6">Array - ${ index + 1 }</span>`,
                        children: item.map((child, i) => ({ id: `${ index }-${ i }`, label: child }))
                    }))
                    break
                case 'arrayObject':
                    data = arrData.map((item, index) => ({
                        id: index,
                        label: `<span style="color: #3a8ee6">Object - ${ index + 1 }</span>`,
                        children: Object.keys(item).map((key, i) => ({
                            id: `${ index }-${ i }`,
                            label: `${ key }: ${ item[key] }`,
                        }))
                    }))
            }
            this.data = data
        },
        handleBlur(e) {
            console.log(e)
        },
        changeData(node, data) {
            const currentId = node.data.id
            if (this.activeName === 'dua') {
                const refData = `input-${ data.id }`
                const val = this.$refs[refData].value

                if (typeof currentId === 'string') {
                    const parIndex = Number(currentId.split('-')[0])
                    const childIndex = Number(currentId.split('-')[1])
                    this.defaultArrData.dua[parIndex].splice(childIndex, 1, val)
                } else {
                    this.defaultArrData.dua[node.parent.data.id].push(val)
                }
            } else if (this.activeName === 'arrayObject') {
                // const parIndex = Number(currentId.split('-')[0])
                const refKeyData = `input-key-${ data.id }`
                const refValueData = `input-value-${ data.id }`

                const [key, value] = [this.$refs[refKeyData].value, this.$refs[refValueData].value]
                const currentObject = this.defaultArrData.arrayObject[node.parent.data.id]

                if (typeof currentId === 'string') {
                    const childIndex = Number(currentId.split('-')[1])
                    Object.keys(currentObject).forEach((item, index) => {
                        if (index === childIndex) {
                            delete currentObject[item]
                            currentObject[key] = value
                        }
                    })
                } else {
                    currentObject[key] = value

                }
            } else {
                const refData = `input-${ data.id }`
                const val = this.$refs[refData].value
                this.defaultArrData.single.splice(data.id, 1, val)
            }

            this.handleClick()

        }
    },
    created() {
        this.handleClick()
    }
}
</script>

<style
  lang="scss"
  scoped
>
  .container {
    padding-top: 200px;
    width: calc(60% + (1440px - 100%) / 3);
    margin: 0 auto;
    box-sizing: border-box;

    .data-render {
      margin: 30px 0;
    }

    /deep/ .input-container {
      appearance: none;
      border: 1px solid lightgrey;
      border-radius: 4px;
      outline: none;
      padding-left: 6px;
      height: 18px;
      transition: 0.2s;

      &:focus {
        border: 1px solid #3a8ee6;
      }
    }

    /deep/ .el-tree {
      background: transparent;
    }

    .label{
      width: 250px;
    }


  }

  @media screen and (max-width: 800px){
    .container{
      width: 90%;
      padding-top: 100px;
    }

    .label{
      width: 150px !important;
    }
  }


</style>
