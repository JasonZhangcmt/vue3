<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryForm.applyState">
            <el-option value="" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleApply">申请休假</el-button>
      </div>
      <el-table :data="applyList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleDetail(scope.row)"
              >查看</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row._id)"
              >作废</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        class="pagination"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="申请休假"
      v-model="showModal"
      :before-close="handleClose"
      width="70%"
    >
      <el-form
        :model="leaveForm"
        ref="dialogForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item prop="applyType" label="休假类型" required>
          <el-select v-model="leaveForm.applyType">
            <el-option :value="1" label="事假"></el-option>
            <el-option :value="2" label="调休"></el-option>
            <el-option :value="3" label="年假"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="休假日期" required>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="startTime">
                <el-date-picker
                  v-model="leaveForm.startTime"
                  type="date"
                  placeholder="请选择开始日期"
                  @change="(val) => handleDateChange('startTime', val)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="8">
              <el-form-item prop="endTime">
                <el-date-picker
                  v-model="leaveForm.endTime"
                  type="date"
                  placeholder="请选择结束日期"
                  @change="(val) => handleDateChange('endTime', val)"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="休假时长" required prop="leaveTime">
          {{ leaveForm.leaveTime }}
        </el-form-item>
        <el-form-item label="休假原因" required prop="reasons">
          <el-input
            type="textarea"
            :row="3"
            placeholder="请输入休假的原因"
            v-model="leaveForm.reasons"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="申请休假详情" width="50%" v-model="showDetailModal">
      <el-steps
        :active="detail.applyState > 2 ? 3 : detail.applyState"
        finish-status="success"
      >
        <el-step title="待审批"></el-step>
        <el-step title="审批中"></el-step>
        <el-step title="审批通过/审批拒绝"></el-step>
      </el-steps>
      <el-form label-width="120px" label-suffix=":">
        <el-form-item label="休假类型">
          <div>
            {{ detail.applyTypeName }}
          </div>
        </el-form-item>
        <el-form-item label="休假时间">
          <div>
            {{ detail.time }}
          </div>
        </el-form-item>
        <el-form-item label="休假时长">
          <div>
            {{ detail.leaveTime }}
          </div>
        </el-form-item>
        <el-form-item label="休假原因">
          <div>
            {{ detail.reasons }}
          </div>
        </el-form-item>
        <el-form-item label="审批状态">
          <div>
            {{ detail.applyStateName }}
          </div>
        </el-form-item>
        <el-form-item label="审批人">
          <div>
            {{ detail.curAuditUserName }}
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, getCurrentInstance, ref, toRaw } from "vue";
import utils from "../utils/utils";
export default {
  name: "Leave",
  setup() {
    // 获取全局对象 类似于 options api  里面的 this
    // this.$api
    const { proxy } = getCurrentInstance();
    // 生命周期函数
    onMounted(() => {});

    // 查询的条件
    const queryForm = reactive({
      applyState: "",
    });
    // 申请的列表
    // vue3的一个写法
    const applyList = ref([]);
    // const applyList = []
    // 表格的列的配置
    const columns = reactive([
      {
        label: "单号",
        prop: "orderNo",
      },
      {
        label: "休假时间",
        prop: "",
        // 年月日的形式 前端在开发过程中 需要自己去处理的 年月日 --- 年月日
        formatter(row) {
          return (
            utils.formateDate(new Date(row.startTime), "yyyy-MM-dd") +
            "到" +
            utils.formateDate(new Date(row.endTime), "yyyy-MM-dd")
          );
        },
      },
      {
        label: "休假时长",
        prop: "leaveTime",
      },
      {
        label: "休假类型",
        prop: "applyType",
        formatter(row, column, value) {
          // 字典的处理
          // 1,//申请类型  1:事假 2：调休 3:年假
          return {
            1: "事假",
            2: "调休",
            3: "年假",
          }[value];
        },
      },
      {
        label: "休假原因",
        prop: "reasons",
      },
      {
        label: "申请时间",
        prop: "createTime",
        formatter(row, column, value) {
          return utils.formateDate(new Date(value));
        },
      },
      {
        label: "审批人",
        prop: "auditUsers",
      },
      {
        label: "当前审批人",
        prop: "curAuditUserName",
      },
      {
        label: "审批状态",
        prop: "applyState",
        formatter(row, column, value) {
          // 字典的处理
          // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
          return {
            1: "待审批",
            2: "审批中",
            3: "审批拒绝",
            4: "审批通过",
            5: "作废",
          }[value];
        },
      },
    ]);
    // 分页的配置
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 10,
    });

    // 查找重置
    const handleReset = (form) => {
      proxy.$refs[form].resetFields();
    };
    // 生命周期函数
    onMounted(() => {
      getApplyList();
    });
    const getApplyList = async () => {
      let params = { ...queryForm, ...pager };
      let { list, page } = await proxy.$api.getApplyList(params);
      // 前后端交互 axios 这就是axios的事情了
      applyList.value = list;
      pager.total = page.total;
    };
    // 分页点击
    const handleCurrentChange = (current) => {
      pager.pageNum = current;
      getApplyList();
    };
    // 用户单个删除
    const leaveForm = reactive({
      applyType: 1,
      startTime: "",
      endTime: "",
      leaveTime: "0天",
      reasons: "",
    });
    const action = ref("create");
    const showModal = ref(false);
    const rules = reactive({
      startTime: [
        {
          type: "date",
          required: true,
          message: "请输入开始时间",
          trigger: ["change", "blur"],
        },
      ],
      endTime: [
        {
          type: "date",
          required: true,
          message: "请输入结束时间",
          trigger: ["change", "blur"],
        },
      ],
      reasons: [
        {
          required: true,
          message: "请输入休假原因",
          trigger: ["change", "blur"],
        },
      ],
    });
    // 申请休假
    const handleApply = () => {
      showModal.value = true;
      action.value = "create";
    };

    const handleClose = () => {
      showModal.value = false;
      handleReset("dialogForm");
    };
    const handleSubmit = () => {
      proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          try {
            let params = { ...leaveForm, action: action.value };
            await proxy.$api.leaveOperate(params);
            proxy.$message.success("创建成功");
            handleClose();
            getApplyList();
          } catch (error) {}
        }
      });
    };
    const handleDateChange = (key, val) => {
      let { startTime, endTime } = leaveForm;
      if (!startTime || !endTime) return;

      if (startTime > endTime) {
        proxy.$message.error("开始日期不能晚于结束日期");
        leaveForm.leaveTime = "0天";
        leaveForm[key] = "";
      } else {
        leaveForm.leaveTime =
          (endTime - startTime) / (24 * 60 * 60 * 1000) + 1 + "天";
      }
    };

    const showDetailModal = ref(false);
    const detail = ref({});
    const handleDetail = (row) => {
      showDetailModal.value = true;
      let data = { ...row };
      data.applyTypeName = {
        1: "事假",
        2: "调休",
        3: "年假",
      }[data.applyType];

      data.time =
        utils.formateDate(new Date(data.startTime), "yyyy-MM-dd") +
        "到" +
        utils.formateDate(new Date(data.endTime), "yyyy-MM-dd");

      data.applyStateName = {
        1: "待审批",
        2: "审批中",
        3: "审批拒绝",
        4: "审批通过",
        5: "作废",
      }[data.applyState];

      detail.value = data;
    };
    //后台接口没有出来
    const handleDelete = async (_id) => {
      try {
        let params = { _id, action: "delete" };
        await proxy.$api.leaveOperate(params);
        proxy.$message.success("作废成功");
        getApplyList();
      } catch (error) {}
    };
    const handleQuery = () => {
      getApplyList();
    };

    return {
      applyList,
      columns,
      pager,
      showModal,
      // action,
      queryForm,
      leaveForm,
      rules,
      handleApply,
      handleReset,
      handleClose,
      handleSubmit,
      handleDateChange,
      showDetailModal,
      handleDetail,
      handleDelete,
      detail,
      handleQuery,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss">
</style>