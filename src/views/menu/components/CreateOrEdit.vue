<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option v-for="item in parentMenuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" :min="1" label="排序"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
          <el-button @click="handleReturn">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'MenuCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1, // 表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      parentMenuList: [] // 父级菜单列表
    }
  },

  created () {
    this.loadMenuInfo()
  },

  methods: {
    async loadMenuInfo () {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { menuInfo, parentMenuList } = await getEditMenuInfo(this.$route.params.id || -1)
      // const { data: resultData } = await getEditMenuInfo((this.$route as any).params.id || -1)
      // const { code, data } = resultData
      // if (code === '000000') {
      this.form = menuInfo || this.form
      this.parentMenuList = parentMenuList
      // }
    },
    async handleSubmit () {
      // 1. 表单验证
      // 2. 验证通过，提交表单
      const success = await createOrUpdateMenu(this.form)
      if (success) {
        this.$message.success('提交成功')
        this.$router.back()
      }
      // const { data } = await createOrUpdateMenu(this.form)
      // if (data.code === '000000') {
      //   this.$message.success('提交成功')
      //   this.$router.back()
      // }
    },
    handleReturn () {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped></style>
