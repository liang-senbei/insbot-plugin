# {BRAND_NAME} Instagram 评论系统 — 独立隔离测试计划

> 品牌：{BRAND_NAME}（{WEBSITE}）| 官方 IG：@{IG_HANDLE}
> 核心原则：**一个账号 = 一个策略 = 终身绑定，绝不交叉**
> 执行方式：Claude Code + insbot-plugin
> 状态：🔴 未开始 | 🟡 进行中 | 🟢 已完成 | ⚫ 废弃

---

## ⚙️ 执行指引（Claude 自动执行专用）

> 本章节是给 Claude Code 读的操作手册。当用户将本文档交给 Claude 并说「执行」时，
> Claude 应按以下规则自动操控 insbot-plugin 系统完成所有策略的评论任务。

### 1. 文档解析规则

{EXECUTION_PARSING_RULES}

### 2. 执行前检查

{EXECUTION_PREFLIGHT}

### 3. 执行模式

{EXECUTION_MODES}

### 4. 核心执行循环

{EXECUTION_LOOP}

### 5. E 区 Prompt 解析表

{E_ZONE_TABLE}

### 6. 错误处理与紧急停止

{ERROR_HANDLING}

### 7. 执行报告

{REPORT_FORMAT}

---

## 〇、品牌背景（所有 AI Prompt 共用的品牌知识）

> 以下内容必须嵌入每个 AI Prompt 的开头，作为 AI 生成评论时的背景知识。

```
{BRAND_CONTEXT}
```

---

## 一、策略分类体系

### 三层模型

```
目标层（Goal）
{GOALS_TREE}

搜索场景（Scene）
{SCENES_TREE}

互动风格（Style）
{STYLES_TREE}
```

### 组合矩阵

{STRATEGY_MATRIX_TABLE}

### 回复规则

{REPLY_RULES}

---

## 二、竞品与搜索词库

### S1 竞品账号池

{S1_COMPETITORS_TABLE}

### S2 产品标签池

{S2_PRODUCT_TAGS}

### S3 场景标签池

{S3_SCENE_TAGS}

### S4 关键词池

{S4_KEYWORDS}

---

## 三、策略总览

{STRATEGY_OVERVIEW_TABLE}

---

## 四、A 区策略详细配置（G1 网站引流）

{A_ZONE_STRATEGIES}

---

## 四（续）、B 区策略详细配置（G2 IG 关注引导）

{B_ZONE_STRATEGIES}

---

## 四（续）、C 区策略详细配置（G3 品牌种草 + 回复）

{C_ZONE_STRATEGIES}

---

## 四（续）、D 区对照组

{D_ZONE_STRATEGIES}

---

## 四（续）、E 区重复验证组

{E_ZONE_STRATEGIES}

---

## 五、账号分配表

{ACCOUNT_TABLE}

---

## 六、执行时间线

### Phase 0：准备期（启动前）

{PHASE_0_CHECKLIST}

### Phase 1：冷启动养号（第 1-3 天）

{PHASE_1_CONFIG}

### Phase 2：低频试跑（第 4-7 天）

{PHASE_2_CONFIG}

### Phase 3：全量运行（第 8 天起）

{PHASE_3_CONFIG}

### Phase 4：持续运行 + 数据收集（第 8-30 天）

{PHASE_4_CONFIG}

---

## 七、评估框架

### 核心指标

{EVALUATION_METRICS}

---

## 八、风险控制

### 账号被限制时的处理流程

{RESTRICTION_HANDLING}

### 紧急停止条件

{EMERGENCY_STOP}

---

*本文件由 ig-comment-strategist Skill 自动生成*
*所有【待填】字段需在启动前填入实际值*
