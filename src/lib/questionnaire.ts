export type QuestionType =
  | "text"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "number"
  | "rating"
  | "priority"
  | "table";

export type QuestionOption = {
  label: string;
  value: string;
};

export type TableRow = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  sectionId: string;
  label: string;
  description?: string;
  type: QuestionType;
  options?: QuestionOption[];
  rows?: TableRow[];
  required?: boolean;
};

export type Section = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export const priorityOptions = ["必须要有", "比较重要", "以后再做", "不需要"].map((value) => ({
  label: value,
  value
}));

export const ratingOptions = [1, 2, 3, 4, 5];

const yesNoOptions = ["是", "否", "不确定"].map((value) => ({ label: value, value }));

const optionList = (items: string[]): QuestionOption[] => items.map((value) => ({ label: value, value }));

const q = (
  sectionId: string,
  id: string,
  label: string,
  type: QuestionType = "textarea",
  options?: string[] | QuestionOption[],
  required = false,
  description?: string
): Question => ({
  id,
  sectionId,
  label,
  type,
  options: options ? (typeof options[0] === "string" ? optionList(options as string[]) : (options as QuestionOption[])) : undefined,
  required,
  description
});

const p = (sectionId: string, id: string, label: string) => q(sectionId, id, label, "priority", priorityOptions);
const yn = (sectionId: string, id: string, label: string) => q(sectionId, id, label, "radio", yesNoOptions);

export const questionnaireSections: Section[] = [
  {
    id: "section_1",
    title: "企业基本情况",
    questions: [
      q("section_1", "company_name", "企业名称是什么？", "text", undefined, true),
      q("section_1", "contact_name", "填写人姓名是什么？", "text", undefined, true),
      q("section_1", "contact_position", "填写人职位是什么？", "text"),
      q("section_1", "contact_phone", "联系电话是什么？", "text"),
      q("section_1", "contact_email", "联系邮箱是什么？", "text"),
      q("section_1", "business_type", "企业主要做什么类型的服装贸易？", "textarea", undefined, true, "例如女装、男装、童装、运动服、鞋帽、配饰、面料等。"),
      q("section_1", "business_model", "企业主要业务模式是什么？", "checkbox", ["批发", "零售", "电商销售", "线下门店销售", "给其他品牌代工或供货", "海外采购", "海外销售", "其他"]),
      q("section_1", "employee_count", "企业目前大概有多少员工？", "text"),
      q("section_1", "warehouse_info", "企业有没有仓库？如果有，请写仓库数量和地点。", "textarea"),
      q("section_1", "sales_channel_count", "企业目前有多少个主要销售渠道？", "text"),
      q("section_1", "monthly_order_count", "企业每个月大概处理多少订单？", "text"),
      q("section_1", "style_count", "企业目前大概有多少个商品款式？", "text"),
      q("section_1", "sku_count", "企业目前大概有多少个 SKU？", "text"),
      q("section_1", "top_pain_point_1", "企业目前最想通过软件解决的问题 1", "text"),
      q("section_1", "top_pain_point_2", "企业目前最想通过软件解决的问题 2", "text"),
      q("section_1", "top_pain_point_3", "企业目前最想通过软件解决的问题 3", "text")
    ]
  },
  {
    id: "section_2",
    title: "当前管理方式",
    questions: [
      q("section_2", "current_management_tools", "企业现在主要用什么方式管理业务？", "checkbox", ["Excel", "微信", "企业微信", "飞书", "钉钉", "纸质单据", "现有 ERP 系统", "电商后台", "财务软件", "仓库系统", "没有固定系统", "其他"]),
      q("section_2", "current_system_name", "现在是否已经有一个管理系统？如果有，请写系统名称。"),
      q("section_2", "current_system_issues", "现在的系统最不好用的地方是什么？"),
      q("section_2", "duplicate_entry", "现在有没有很多信息重复录入的情况？"),
      q("section_2", "error_prone_process", "现在最容易出错的环节是什么？"),
      q("section_2", "time_wasting_work", "现在每天最浪费时间的工作是什么？"),
      q("section_2", "key_person_dependency", "企业现在最依赖哪个人来记住流程或数据？"),
      q("section_2", "key_person_absence_risk", "如果这个人不在，公司哪部分工作最容易出问题？")
    ]
  },
  {
    id: "section_3",
    title: "商品和 SKU 管理",
    questions: [
      p("section_3", "product_management_priority", "企业是否需要在系统里管理商品资料？"),
      q("section_3", "product_fields", "每个商品需要记录哪些信息？", "checkbox", ["商品编号", "商品名称", "品类", "品牌", "年份", "季节", "性别", "颜色", "尺码", "面料", "供应商", "成本价", "批发价", "零售价", "图片", "条形码", "备注", "其他"]),
      q("section_3", "product_code_method", "企业的商品编码现在是怎么生成的？"),
      yn("section_3", "auto_product_sku_code", "是否需要系统自动生成商品编号或 SKU 编号？"),
      yn("section_3", "style_has_colors_sizes", "同一个款式是否会有多个颜色和尺码？"),
      yn("section_3", "product_images_needed", "是否需要上传商品图片？"),
      yn("section_3", "product_price_fields_needed", "是否需要记录商品的吊牌价、批发价、折扣价和成本价？"),
      yn("section_3", "customer_specific_prices_needed", "是否需要记录不同客户的不同价格？"),
      q("section_3", "product_statuses", "是否需要记录商品状态？", "checkbox", ["在售", "停售", "缺货", "清仓", "新品", "预售"]),
      q("section_3", "product_data_confusion", "商品资料现在最混乱的地方是什么？")
    ]
  },
  {
    id: "section_4",
    title: "供应商管理",
    questions: [
      p("section_4", "supplier_management_priority", "企业是否需要管理供应商资料？"),
      q("section_4", "supplier_fields", "每个供应商需要记录哪些信息？", "checkbox", ["供应商名称", "联系人", "电话", "微信", "邮箱", "地址", "主营品类", "付款方式", "账期", "合作状态", "备注", "其他"]),
      q("section_4", "supplier_count", "企业是否有固定供应商？大概有多少个？"),
      yn("section_4", "supplier_purchase_history", "是否需要记录每个供应商的历史采购记录？"),
      yn("section_4", "supplier_evaluation", "是否需要对供应商进行评价？例如交货速度、质量稳定性、价格、沟通效率。"),
      yn("section_4", "supplier_quotes", "是否需要记录供应商报价？"),
      yn("section_4", "supplier_quote_compare", "是否需要比较不同供应商的报价？"),
      q("section_4", "supplier_common_problems", "供应商最常见的问题是什么？")
    ]
  },
  {
    id: "section_5",
    title: "采购流程",
    questions: [
      q("section_5", "purchase_process_steps", "企业目前的采购流程是怎样的？请按步骤写出来。"),
      p("section_5", "purchase_order_priority", "是否需要系统创建采购单？"),
      q("section_5", "purchase_order_fields", "采购单需要包含哪些信息？", "checkbox", ["采购单号", "供应商", "商品", "颜色", "尺码", "数量", "单价", "总金额", "预计到货日期", "实际到货日期", "付款状态", "入库状态", "备注", "其他"]),
      yn("section_5", "purchase_approval", "采购单是否需要审批？"),
      q("section_5", "purchase_payment_status", "是否需要记录采购付款状态？", "checkbox", ["未付款", "部分付款", "已付款"]),
      yn("section_5", "deposit_balance_needed", "是否需要记录定金和尾款？"),
      yn("section_5", "purchase_arrival_reminder", "是否需要系统提醒采购到货时间？"),
      yn("section_5", "purchase_return_needed", "是否需要处理采购退货？"),
      q("section_5", "purchase_biggest_hassle", "采购流程现在最麻烦的地方是什么？"),
      q("section_5", "purchase_error_prone", "采购流程现在最容易出错的地方是什么？")
    ]
  },
  {
    id: "section_6",
    title: "库存管理",
    questions: [
      p("section_6", "realtime_inventory_priority", "企业是否需要系统实时显示库存？"),
      q("section_6", "inventory_dimensions", "库存需要按什么维度查看？", "checkbox", ["商品", "SKU", "颜色", "尺码", "仓库", "供应商", "批次", "销售渠道", "其他"]),
      q("section_6", "multiple_warehouses_transfer", "企业是否有多个仓库？如果有，是否需要不同仓库之间调货？"),
      yn("section_6", "inventory_movements", "是否需要记录库存的入库、出库和调拨？"),
      yn("section_6", "inventory_counting", "是否需要记录库存盘点？"),
      yn("section_6", "count_sheet_export", "盘点时是否需要导出盘点表？"),
      yn("section_6", "inventory_alert", "是否需要库存预警？"),
      yn("section_6", "dead_stock_alert", "是否需要滞销库存提醒？"),
      yn("section_6", "clearance_inventory", "是否需要清仓库存管理？"),
      yn("section_6", "inventory_cost", "是否需要记录库存成本？"),
      yn("section_6", "inventory_total_value", "是否需要计算库存总价值？"),
      yn("section_6", "inventory_difference_reason", "是否需要记录库存差异原因？"),
      q("section_6", "inventory_accuracy_rating", "企业现在库存准确度是多少？", "rating"),
      q("section_6", "inventory_inaccuracy_reason", "库存不准通常是因为什么？"),
      q("section_6", "warehouse_shipping_knowledge", "仓库人员现在怎么知道应该发哪些货？")
    ]
  },
  {
    id: "section_7",
    title: "入库管理",
    questions: [
      p("section_7", "inbound_priority", "企业是否需要入库单功能？"),
      yn("section_7", "inbound_purchase_link", "入库是否要和采购单关联？"),
      q("section_7", "inbound_quantity_mismatch", "到货数量和采购数量不一致时，系统应该怎么处理？"),
      q("section_7", "quality_inspection_result", "是否需要记录质检结果？", "checkbox", ["合格", "不合格", "部分合格"]),
      yn("section_7", "arrival_images", "是否需要上传到货图片或质检图片？"),
      yn("section_7", "inbound_operator_time", "是否需要记录入库操作人和操作时间？")
    ]
  },
  {
    id: "section_8",
    title: "出库管理",
    questions: [
      p("section_8", "outbound_priority", "企业是否需要出库单功能？"),
      yn("section_8", "outbound_sales_link", "出库是否要和销售订单关联？"),
      yn("section_8", "auto_stock_deduction", "是否需要系统自动扣减库存？"),
      yn("section_8", "print_outbound_docs", "是否需要打印出库单、发货单或拣货单？"),
      yn("section_8", "logistics_tracking", "是否需要记录物流公司和快递单号？"),
      yn("section_8", "batch_shipping", "是否需要批量发货？"),
      yn("section_8", "partial_shipping", "是否需要处理部分发货？"),
      yn("section_8", "exchange_return_restock", "是否需要处理换货、退货和重新入库？"),
      q("section_8", "outbound_error_prone", "出库流程现在最容易出错的地方是什么？")
    ]
  },
  {
    id: "section_9",
    title: "客户管理",
    questions: [
      p("section_9", "customer_management_priority", "企业是否需要客户资料管理？"),
      q("section_9", "customer_types", "客户类型有哪些？", "checkbox", ["批发客户", "零售客户", "门店客户", "电商客户", "海外客户", "代理商", "其他"]),
      q("section_9", "customer_fields", "每个客户需要记录哪些信息？", "checkbox", ["客户名称", "联系人", "电话", "微信", "邮箱", "地址", "客户等级", "默认价格等级", "账期", "欠款金额", "历史订单", "备注", "其他"]),
      yn("section_9", "customer_purchase_history", "是否需要记录客户的历史购买记录？"),
      yn("section_9", "customer_levels", "是否需要给客户分等级？"),
      yn("section_9", "customer_different_prices", "不同客户是否有不同价格？"),
      yn("section_9", "customer_debt", "是否需要记录客户欠款？"),
      yn("section_9", "customer_credit_reminder", "是否需要提醒客户账期到期？"),
      q("section_9", "customer_biggest_problem", "客户管理现在最大的问题是什么？")
    ]
  },
  {
    id: "section_10",
    title: "销售订单",
    questions: [
      p("section_10", "sales_order_priority", "企业是否需要销售订单功能？"),
      q("section_10", "sales_process_steps", "企业目前的销售流程是怎样的？请按步骤写出来。"),
      q("section_10", "sales_order_fields", "销售订单需要包含哪些信息？", "checkbox", ["订单号", "客户", "销售员", "商品", "颜色", "尺码", "数量", "单价", "折扣", "总金额", "收款状态", "发货状态", "物流信息", "备注", "其他"]),
      yn("section_10", "auto_order_number", "是否需要系统自动生成订单号？"),
      yn("section_10", "order_approval", "是否需要订单审批？"),
      yn("section_10", "order_price_change", "是否需要支持订单改价？"),
      yn("section_10", "discount_reason", "是否需要记录折扣原因？"),
      yn("section_10", "presale_orders", "是否需要支持预售订单？"),
      yn("section_10", "backorders", "是否需要支持欠货订单？"),
      yn("section_10", "stock_check", "是否需要系统自动检查库存是否足够？"),
      q("section_10", "stock_shortage_prompt", "如果库存不足，系统应该怎么提示？"),
      yn("section_10", "order_cancel", "是否需要支持订单取消？"),
      yn("section_10", "returns_refunds", "是否需要处理退货和退款？"),
      yn("section_10", "order_excel_export", "是否需要订单导出 Excel？"),
      q("section_10", "sales_order_biggest_hassle", "销售订单现在最麻烦的地方是什么？")
    ]
  },
  {
    id: "section_11",
    title: "价格、利润和财务",
    questions: [
      p("section_11", "price_management_priority", "企业是否需要价格管理功能？"),
      q("section_11", "price_types", "企业有几种价格？", "checkbox", ["成本价", "批发价", "零售价", "会员价", "客户专属价", "活动价", "清仓价", "其他"]),
      yn("section_11", "minimum_sale_price", "是否需要设置最低销售价？"),
      yn("section_11", "price_change_reason", "是否需要记录每次改价的原因？"),
      yn("section_11", "order_gross_profit", "是否需要查看每个订单的毛利润？"),
      yn("section_11", "product_margin", "是否需要查看每个商品的毛利率？"),
      yn("section_11", "customer_profit", "是否需要查看每个客户的利润贡献？"),
      p("section_11", "payment_management_priority", "企业是否需要收款管理功能？"),
      yn("section_11", "credit_sales_common", "销售订单是否经常存在赊账？"),
      q("section_11", "receipt_status", "是否需要记录收款状态？", "checkbox", ["未收款", "部分收款", "已收款"]),
      q("section_11", "receipt_methods", "是否需要记录收款方式？", "checkbox", ["现金", "银行转账", "微信", "支付宝", "PayPal", "Stripe", "其他"]),
      yn("section_11", "supplier_payment", "是否需要记录供应商付款？"),
      yn("section_11", "ar_report", "是否需要应收账款报表？"),
      yn("section_11", "ap_report", "是否需要应付账款报表？"),
      yn("section_11", "credit_term_reminder", "是否需要账期提醒？"),
      q("section_11", "existing_finance_software", "企业是否已经有财务软件？如果有，请写名称。"),
      yn("section_11", "finance_software_integration", "新系统是否需要和财务软件连接？")
    ]
  },
  {
    id: "section_12",
    title: "报表和数据分析",
    questions: [
      q("section_12", "daily_metrics", "企业管理者最想每天看到哪些数据？", "checkbox", ["今日销售额", "今日订单数", "今日利润", "今日发货量", "库存预警", "欠款客户", "未发货订单", "未付款采购单", "热销商品", "滞销商品", "其他"]),
      q("section_12", "weekly_metrics", "企业管理者最想每周看到哪些数据？"),
      q("section_12", "monthly_metrics", "企业管理者最想每月看到哪些数据？"),
      p("section_12", "sales_report_priority", "是否需要销售报表？"),
      p("section_12", "inventory_report_priority", "是否需要库存报表？"),
      p("section_12", "profit_report_priority", "是否需要利润报表？"),
      p("section_12", "customer_report_priority", "是否需要客户报表？"),
      p("section_12", "supplier_report_priority", "是否需要供应商报表？"),
      p("section_12", "employee_report_priority", "是否需要员工绩效报表？"),
      yn("section_12", "report_export", "报表是否需要导出 Excel 或 PDF？"),
      yn("section_12", "charts_needed", "是否需要图表展示？"),
      q("section_12", "reporting_biggest_pain", "现在企业做报表最痛苦的地方是什么？")
    ]
  },
  {
    id: "section_13",
    title: "员工角色和权限",
    questions: [
      q("section_13", "user_roles", "系统预计有哪些人使用？", "checkbox", ["老板", "总经理", "财务", "采购", "销售", "仓库人员", "客服", "门店员工", "其他"]),
      q("section_13", "role_counts", "每个角色大概有多少人？"),
      yn("section_13", "account_login_needed", "是否需要账号登录？"),
      yn("section_13", "role_based_visibility", "是否需要不同角色看到不同内容？"),
      q("section_13", "management_only_data", "哪些数据只有老板或管理层可以看？", "checkbox", ["成本价", "利润", "供应商价格", "客户欠款", "员工绩效", "财务报表", "其他"]),
      q("section_13", "restricted_operations", "哪些操作需要限制权限？", "checkbox", ["删除订单", "修改价格", "查看成本价", "修改库存", "创建采购单", "审批采购单", "导出数据", "删除客户", "删除商品", "其他"]),
      yn("section_13", "operation_logs", "是否需要操作日志？"),
      yn("section_13", "boss_approval", "是否需要老板审批某些操作？")
    ]
  },
  {
    id: "section_14",
    title: "通知和提醒",
    questions: [
      p("section_14", "notification_priority", "企业是否需要系统自动提醒？"),
      q("section_14", "notification_events", "哪些事情需要提醒？", "checkbox", ["低库存", "采购到货时间", "客户付款到期", "供应商付款到期", "订单未发货", "退货未处理", "库存盘点", "滞销库存", "价格异常", "其他"]),
      q("section_14", "notification_channels", "提醒方式希望是什么？", "checkbox", ["系统内提醒", "邮件提醒", "微信提醒", "短信提醒", "企业微信提醒", "其他"]),
      q("section_14", "top_notifications", "哪些提醒最重要？请写前三个。")
    ]
  },
  {
    id: "section_15",
    title: "设备和使用场景",
    questions: [
      q("section_15", "devices", "企业员工主要用什么设备操作系统？", "checkbox", ["电脑", "手机", "平板", "扫码枪", "打印机", "其他"]),
      q("section_15", "usage_scenarios", "系统主要是在办公室用，还是仓库用，还是门店用？"),
      yn("section_15", "mobile_needed", "是否需要手机端使用？"),
      yn("section_15", "web_needed", "是否需要网页端使用？"),
      yn("section_15", "mini_program_needed", "是否需要小程序？"),
      yn("section_15", "warehouse_scan_needed", "仓库是否需要扫码入库和扫码出库？"),
      yn("section_15", "printing_needed", "是否需要打印标签、条形码、快递单或发货单？"),
      q("section_15", "current_hardware", "企业现在有没有打印机、扫码枪或条码设备？")
    ]
  },
  {
    id: "section_16",
    title: "现有数据和数据迁移",
    questions: [
      q("section_16", "current_data_sources", "企业现在的数据主要存在哪里？", "checkbox", ["Excel", "旧系统", "电商后台", "微信聊天记录", "纸质单据", "财务软件", "没有系统保存", "其他"]),
      yn("section_16", "has_product_table", "是否有商品表？"),
      yn("section_16", "has_customer_table", "是否有客户表？"),
      yn("section_16", "has_supplier_table", "是否有供应商表？"),
      yn("section_16", "has_order_table", "是否有历史订单表？"),
      yn("section_16", "has_inventory_table", "是否有库存表？"),
      yn("section_16", "need_data_import", "是否需要把旧数据导入新系统？"),
      yn("section_16", "old_data_clean", "旧数据是否比较干净？"),
      q("section_16", "old_data_biggest_problem", "旧数据最大的问题是什么？"),
      yn("section_16", "can_provide_desensitized_excel", "是否能提供一份脱敏后的 Excel 样本？")
    ]
  },
  {
    id: "section_17",
    title: "系统集成需求",
    questions: [
      q("section_17", "ecommerce_integration", "新系统是否需要连接电商平台？例如淘宝、抖音、拼多多、Shopify、Amazon、eBay。"),
      yn("section_17", "logistics_integration", "新系统是否需要连接物流平台？"),
      yn("section_17", "payment_integration", "新系统是否需要连接支付平台？"),
      yn("section_17", "finance_integration", "新系统是否需要连接财务软件？"),
      yn("section_17", "chat_integration", "新系统是否需要连接微信、企业微信、飞书或钉钉？"),
      yn("section_17", "excel_import", "新系统是否需要从 Excel 导入数据？"),
      yn("section_17", "excel_export", "新系统是否需要导出 Excel？"),
      q("section_17", "most_important_integration", "哪个集成最重要？"),
      q("section_17", "later_integrations", "哪些集成可以以后再做？")
    ]
  },
  {
    id: "section_18",
    title: "自动化和 AI 功能",
    questions: [
      yn("section_18", "auto_purchase_suggestion", "是否希望系统自动生成采购建议？"),
      yn("section_18", "auto_hot_slow_products", "是否希望系统自动计算热销商品和滞销商品？"),
      yn("section_18", "auto_replenishment_forecast", "是否希望系统自动预测补货数量？"),
      yn("section_18", "auto_sales_report", "是否希望系统自动生成销售报表？"),
      yn("section_18", "auto_debt_reminder", "是否希望系统自动生成客户欠款提醒？"),
      yn("section_18", "auto_profit_analysis", "是否希望系统自动生成利润分析？"),
      yn("section_18", "ai_assistant", "是否希望系统支持 AI 助手？"),
      q("section_18", "top_automation_jobs", "企业最希望自动化处理的三个工作是什么？")
    ]
  },
  {
    id: "section_19",
    title: "安全、备份和稳定性",
    questions: [
      yn("section_19", "data_security_important", "企业是否特别重视数据安全？"),
      q("section_19", "sensitive_data", "哪些数据最敏感？", "checkbox", ["客户资料", "供应商资料", "成本价", "利润", "财务数据", "员工绩效", "库存数据", "其他"]),
      yn("section_19", "regular_backup", "是否需要定期备份数据？"),
      yn("section_19", "prevent_customer_export", "是否需要防止员工导出全部客户资料？"),
      yn("section_19", "disable_leaver_account", "员工离职后，是否需要快速停用账号？"),
      yn("section_19", "login_logs", "是否需要记录登录日志？"),
      yn("section_19", "deleted_data_restore", "是否需要数据误删恢复？")
    ]
  },
  {
    id: "section_20",
    title: "软件界面和使用体验",
    questions: [
      q("section_20", "ui_style", "企业希望系统界面更像哪种风格？", "checkbox", ["简单清楚", "像 Excel 一样", "像电商后台", "像专业 ERP", "手机操作方便", "电脑操作方便", "其他"]),
      yn("section_20", "staff_familiar_complex_software", "员工是否熟悉复杂软件？"),
      yn("section_20", "fewer_steps", "是否希望操作步骤尽量少？"),
      q("section_20", "must_see_features", "哪些功能必须“一眼就能看到”？"),
      q("section_20", "search_pages", "哪些页面需要搜索功能？", "checkbox", ["商品", "库存", "订单", "客户", "供应商", "采购单", "财务记录", "其他"]),
      yn("section_20", "filter_needed", "是否需要筛选功能？"),
      yn("section_20", "batch_operations", "是否需要批量操作？")
    ]
  },
  {
    id: "section_21",
    title: "第一版系统优先级",
    questions: [
      {
        id: "v1_module_priorities",
        sectionId: "section_21",
        label: "请为第一版系统模块选择优先级",
        type: "table",
        options: priorityOptions,
        rows: [
          "登录和账号权限",
          "商品管理",
          "SKU 管理",
          "客户管理",
          "供应商管理",
          "采购管理",
          "入库管理",
          "库存管理",
          "出库管理",
          "销售订单管理",
          "退货管理",
          "收款管理",
          "付款管理",
          "报表中心",
          "库存预警",
          "数据导入导出",
          "操作日志",
          "手机端适配",
          "扫码功能",
          "打印功能",
          "AI 数据问答"
        ].map((label, index) => ({ id: `module_${index + 1}`, label }))
      }
    ]
  },
  {
    id: "section_22",
    title: "第一版必须解决的问题",
    questions: [
      q("section_22", "v1_top_3_problems", "如果第一版软件只能解决 3 个问题，企业最希望解决哪 3 个？"),
      q("section_22", "can_skip_features", "哪些功能可以先不做？"),
      q("section_22", "v2_features", "哪些功能虽然重要，但是可以第二版再做？"),
      yn("section_22", "accept_web_first", "企业能接受第一版先用网页系统，不做手机 App 吗？"),
      yn("section_22", "accept_manual_excel_import", "企业能接受第一版先手动导入 Excel，不做平台自动对接吗？"),
      yn("section_22", "accept_basic_finance_first", "企业能接受第一版先不接财务软件，只做基础收付款记录吗？")
    ]
  },
  {
    id: "section_23",
    title: "实施计划",
    questions: [
      q("section_23", "trial_timeline", "企业希望多久可以开始试用第一版系统？", "text"),
      q("section_23", "budget_range", "企业是否有明确预算？如果方便，请写一个大概范围。", "text"),
      yn("section_23", "willing_mvp", "企业愿意先做一个最小可用版本吗？"),
      yn("section_23", "willing_trial_staff", "企业是否愿意安排 1 到 2 个员工试用系统并反馈问题？"),
      yn("section_23", "willing_business_samples", "企业是否愿意提供真实业务样本？"),
      yn("section_23", "training_needed", "企业是否需要培训员工使用系统？"),
      yn("section_23", "maintenance_needed", "企业是否需要后期维护？")
    ]
  },
  {
    id: "section_24",
    title: "真实业务案例",
    questions: [
      q("section_24", "case_supplier_product", "企业从哪个供应商采购了什么商品？"),
      q("section_24", "case_purchase_quantity", "一共采购了多少件？有哪些颜色和尺码？"),
      q("section_24", "case_purchase_cost", "采购成本是多少？"),
      q("section_24", "case_arrival_time", "商品什么时候到货？"),
      q("section_24", "case_inbound_method", "到货后怎么入库？"),
      q("section_24", "case_customer", "哪个客户下了订单？"),
      q("section_24", "case_customer_products", "客户买了哪些商品？"),
      q("section_24", "case_sale_price", "销售价格是多少？"),
      q("section_24", "case_payment_status", "是否已经收款？"),
      q("section_24", "case_shipping_status", "是否已经发货？"),
      q("section_24", "case_problem", "这个流程中有没有出错、延迟或重复劳动？"),
      q("section_24", "case_software_help", "如果用软件优化，最希望系统在哪一步帮忙？")
    ]
  },
  {
    id: "section_25",
    title: "痛点严重程度打分",
    description: "1 = 不严重，2 = 有一点影响，3 = 中等影响，4 = 很影响工作，5 = 非常严重，必须解决",
    questions: [
      "商品资料混乱",
      "SKU 管理混乱",
      "库存不准确",
      "仓库发错货",
      "订单漏处理",
      "采购进度不清楚",
      "供应商交期难管理",
      "客户欠款难追踪",
      "销售价格不统一",
      "利润看不清楚",
      "报表制作太慢",
      "员工权限不清楚",
      "数据重复录入",
      "Excel 文件太多",
      "老板无法实时看到数据",
      "员工离职导致信息断层",
      "退货换货难管理",
      "盘点麻烦",
      "低库存不能及时发现",
      "滞销库存不能及时发现"
    ].map((label, index) => q("section_25", `pain_rating_${index + 1}`, label, "rating"))
  },
  {
    id: "section_26",
    title: "最终开放问题",
    questions: [
      q("section_26", "core_value", "你认为这个软件最核心的价值应该是什么？"),
      q("section_26", "avoid_becoming", "你最不希望这个软件变成什么样？"),
      q("section_26", "staff_resistance_reason", "你觉得员工最可能抗拒使用这个系统的原因是什么？"),
      q("section_26", "homepage_content", "如果系统上线后只能看一个首页，你希望首页显示什么内容？"),
      q("section_26", "good_software_example", "有没有一个你见过的系统、软件或 App，你觉得它很好用？请写名称和原因。"),
      q("section_26", "bad_software_example", "有没有一个你见过的系统、软件或 App，你觉得它很难用？请写名称和原因。"),
      q("section_26", "other_important_needs", "还有哪些没有问到，但你认为很重要的需求？"),
      q("section_26", "sample_files_checklist", "建议企业后续提供的样本文件", "checkbox", ["商品 Excel 表", "SKU Excel 表", "库存 Excel 表", "客户 Excel 表", "供应商 Excel 表", "采购单样本", "销售订单样本", "出库单样本", "入库单样本", "财务收付款记录样本", "报表样本", "现有系统截图", "现有业务流程图"])
    ]
  }
];

export const questionById = new Map(
  questionnaireSections.flatMap((section) => section.questions.map((question) => [question.id, question]))
);
