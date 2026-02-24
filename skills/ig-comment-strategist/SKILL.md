---
name: ig-comment-strategist
description: >
  Instagram 评论策略矩阵生成器。输入品牌信息，自动完成品牌拆解、竞品分析、策略矩阵设计、
  AI Prompt 撰写、测试计划输出。适用于任何品牌的 IG 评论营销自动化。
  USE WHEN user wants to create IG comment strategy, 评论策略, Instagram 营销计划,
  品牌评论矩阵, 竞品截流策略, comment automation plan, 社媒评论自动化.
license: MIT
version: 1.0.0
author: Echo
tags: [instagram, comment-strategy, brand-marketing, competitor-interception]
categories: [marketing, social-media, automation]
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, AskUserQuestion
---

# IG Comment Strategist — Instagram 评论策略矩阵生成器

## 核心能力

将任何品牌的 IG 评论营销从零构建到可执行的完整测试计划：
- 品牌情报采集（爬取官网、提取产品信息）
- 竞品研究（识别竞品 IG 账号、评估截流价值）
- 策略矩阵设计（Goals × Scenes × Styles 组合）
- AI Prompt 工程（persona-driven、品牌定制化）
- 测试计划文档输出（含执行指引、50 策略配置、时间线、风控）

## 运行前准备

1. 读取 memory.json：`~/.claude/skills/ig-comment-strategist/memory.json`
2. 检查是否有进行中的项目（`currentProject.phase != "idle"`）
3. 如果有，询问用户是继续还是新建

## Phase 1：品牌情报采集

### Step 1.1 — 获取基础信息

使用 AskUserQuestion 收集：
- 品牌名称
- 品牌官网 URL
- 品牌 Instagram 账号（@handle）
- 品牌所属品类/行业
- 是否有现成的品牌资料文档？（可选，用户可提供文件路径）

### Step 1.2 — 自动爬取品牌信息

使用 WebFetch 爬取品牌官网的以下页面：

1. **首页** — 提取品牌 slogan、主视觉调性
2. **产品页/Shop** — 提取所有产品（名称、价格、核心卖点、材质、特色功能）
3. **About/关于我们** — 提取品牌故事、创始人背景、品牌使命
4. **FAQ/帮助** — 提取配送政策、退换政策等实用信息

提取后写入 memory.json 的 `brand` 字段。

### Step 1.3 — 品牌画像确认 ⚠️ 用户确认

输出给用户审阅：

```
品牌画像摘要：

品牌名：{brandName}
一句话定位：{oneLiner}
品牌调性：{vibeAnalogy}（类比描述，如 "think Glossier meets intimate wellness"）
目标用户：{targetAudience}

核心产品：
1. {product1.name} (${product1.price}) — {product1.keyFeatures}
2. {product2.name} (${product2.price}) — {product2.keyFeatures}
...

关键卖点：
- {sellingPoint1}
- {sellingPoint2}
...

这些信息准确吗？需要补充或修改什么？
```

用户确认后，生成 BRAND CONTEXT 段落并保存到 memory.json。

---

## Phase 2：竞品研究

### Step 2.1 — 自动识别竞品

使用 WebSearch 搜索以下查询：
- `"{brandName} competitors"`
- `"{品类} best brands instagram 2026"`
- `"{brandName} alternatives reddit"`
- `"top {品类} brands"`

从搜索结果中提取候选竞品列表（15-30 个），按以下维度分类：
- **直接竞品**：同品类、同价位、同目标用户
- **品类竞品**：同品类但不同定位
- **场景竞品**：不同品类但共享使用场景
- **渠道型**：大型零售/平台账号

### Step 2.2 — 竞品列表确认 ⚠️ 用户确认

输出竞品表格：

| # | 竞品名 | IG 账号 | 分类 | 截流价值 | 理由 |
|---|--------|---------|------|----------|------|
| 1 | {name} | @{handle} | 直接竞品 | 高 | {reason} |
| ... | | | | | |

用户可增删竞品，最终确定 20-25 个。

### Step 2.3 — 搜索词库生成

基于品牌品类和竞品列表，自动生成四类搜索词：

- **S1 竞品账号池**：@competitor_handle × 20-25 个
- **S2 产品标签池**：#品类相关标签 × 10 个（如 #vibrator #sextoy #intimatewellness）
- **S3 场景标签池**：#使用场景标签 × 10 个（如 #selfcare #longdistancerelationship）
- **S4 关键词池**：长尾搜索词 × 10 个（如 "vibrator review" "best couples toy"）

### Step 2.4 — 搜索词确认 ⚠️ 用户确认

输出四类搜索词给用户审阅，用户可修改后确认。

---

## Phase 3：策略矩阵设计

### Step 3.1 — 确定目标层 ⚠️ 用户确认

提供默认三层目标模型：

| 目标 | 代号 | 评论中包含 | 是否需要回复 |
|------|------|-----------|-------------|
| 网站引流 | G1 | 品牌官网 URL | 否（信息已在评论中） |
| IG 关注引导 | G2 | @品牌IG号 | 否（信息已在评论中） |
| 品牌种草 | G3 | 仅品牌名（无 URL 无 @） | 是（回复补 URL 或 @handle） |

用户可增删目标层。

### Step 3.2 — 确定风格层 ⚠️ 用户确认

提供默认三种评论风格：

| 风格 | 代号 | 角色设定 | 适用场景 |
|------|------|---------|---------|
| 体验分享 | T1 | 买过产品的真实用户 | 竞品帖子、产品标签帖子 |
| 场景代入 | T3 | 有特定生活场景的用户 | 场景标签帖子、情感帖子 |
| 专业推荐 | T4 | 试过多个品牌的测评达人 | 竞品帖子、产品标签帖子 |

用户可根据品牌特性增加自定义风格。

### Step 3.3 — 生成策略矩阵 ⚠️ 用户确认

自动计算组合：

```
核心策略 = Goals × Scenes × Styles
例如：3 Goals × 4 Scenes × 3 Styles = 36 个核心 AI 策略

对照组（固定 4 个）：
  D01: 固定评论对照（与 A 区同搜索词，固定评论列表）
  D02: 固定评论对照（与 B 区同搜索词，固定评论列表）
  D03: 压力测试（高频评论，测试 IG 风控阈值，牺牲号）
  D04: 极保守策略（超低频，作为安全基线）

重复验证组（10 个）：
  从核心策略中选 10 个高价值策略，用不同账号重复执行，验证结果可复现性

总计 = 36 + 4 + 10 = 50 个策略 = 50 个账号
```

输出矩阵总览表给用户确认。用户可调整矩阵规模（如减少 Styles 或 Scenes）。

### Step 3.4 — 回复规则设计

仅 G3（品牌种草）策略需要回复，因为评论中不含 URL 和 @handle，需要通过自回复补充转化信息。

默认规则：
- G3 奇数策略（C01, C03, C05...）的回复补 **品牌官网 URL**
- G3 偶数策略（C02, C04, C06...）的回复补 **@品牌IG号**
- 回复等待时间：60-180 秒（模拟真人思考后补充）

---

## Phase 4：AI Prompt 工程

### Step 4.1 — 生成 BRAND CONTEXT ⚠️ 用户确认

基于 Phase 1 确认的品牌信息，生成通用品牌上下文段落。格式：

```
BRAND CONTEXT (use this knowledge naturally, never recite it):

{brandName} is a {定位描述}. {品牌故事 1-2 句}.

Website: {website} | Instagram: @{igHandle}
{配送信息}

HERO PRODUCTS (mention by name when relevant):
- {product1.name} (${product1.price}) — {product1.description}
- {product2.name} (${product2.price}) — {product2.description}
...

KEY SELLING POINTS you can casually reference:
- {sellingPoint1}
- {sellingPoint2}
...

BRAND VIBE: {vibeAnalogy}
```

### Step 4.2 — 为每种组合生成 Prompt ⚠️ 用户确认

每个 Prompt 采用三段式结构：

**段落 1 — BRAND CONTEXT**（所有策略共用，来自 Step 4.1）

**段落 2 — YOUR ROLE**（按 Style 变化）

```
# T1 体验分享
YOUR ROLE: You are a {targetDemo} who bought from {website} and genuinely loves
what you got. You see this post and something about it makes you want to share
your experience...

# T3 场景代入
YOUR ROLE: You are a {targetDemo} who lives for a good story. Something from
{website} ended up in one of those stories — {场景示例}. You see this post and
it triggers that memory...

# T4 专业推荐
YOUR ROLE: You are a {targetDemo} who has tried 10+ {品类} brands and genuinely
geeks out about specs. You have strong opinions...
```

**段落 3 — CRITICAL RULES**（按 Goal 变化）

```
# G1 网站引流
- Weave in your {website} experience naturally mid-thought, never as opening or closing line

# G2 IG 关注引导
- Weave @{igHandle} naturally mid-thought, never as opening or closing line

# G3 品牌种草
- Weave {brandName} brand name naturally mid-thought
- NEVER include any URL or @handle — only the brand name
```

**通用规则（所有 Prompt 共用）：**
```
- Write ONE English comment, 3-5 sentences
- You MUST react to what you see in this specific post first
- Write the way real people talk online: lowercase fine, abbreviations fine (ngl, tbh, lowkey, tho, lol)
- Be specific and a little vulnerable — the more personal the detail, the more real it sounds
- Have a TAKE — an opinion, comparison, hot take, or funny observation
- End with something that makes people want to respond
- 0-2 emojis max, sometimes none
- NEVER sound like an ad — no "check out", no "highly recommend"
- A comment that could apply to any post is a failed comment
- Match the language of the post
```

输出 3-5 个代表性 Prompt（覆盖不同 Goal × Style 组合）给用户审阅。

### Step 4.3 — 生成回复 Prompt（仅 G3 策略）

回复 Prompt 模板：

```
# 补 URL 版本
You just commented on an Instagram post about {brandName}. Now write a SHORT
follow-up reply to your own comment (1-2 sentences). Casually mention {website}
as if you just remembered the link. Keep it natural — like "oh btw their site
is {website}" or "i got mine from {website} if anyone's curious". Never sound
like an ad.

# 补 @handle 版本
You just commented on an Instagram post about {brandName}. Now write a SHORT
follow-up reply to your own comment (1-2 sentences). Casually mention
@{igHandle} as if recommending their feed. Keep it natural. Never sound like an ad.
```

---
<!-- SKILL_CONTINUED_3 -->

## Phase 5：测试计划文档生成

### Step 5.1 — 确定执行参数 ⚠️ 用户确认

使用 AskUserQuestion 收集：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| A/B 区每日评论量 | 25 条 | G1/G2 策略的日评论上限 |
| C 区每日评论量 | 20 条 | G3 策略（含回复）的日评论上限 |
| 评论间隔（A/B 区） | 25-45 秒 | 两条评论之间的随机等待 |
| 评论间隔（C 区） | 30-50 秒 | 含回复策略的间隔更长 |
| 回复等待时间 | 60-180 秒 | 评论后到自回复的等待 |
| 压力测试参数（D03） | 8-15 秒, 100 条 | 测试 IG 风控阈值 |
| 极保守参数（D04） | 60-120 秒, 10 条 | 安全基线 |
| AI API Key | — | Kimi/Moonshot 或其他 LLM 的 API Key |
| AI 模型 | kimi-k2.5 | 评论生成模型 |
| 导出路径 | — | CSV 导出目录 |
| AdsPower 账号数量 | 50 | 需要的浏览器环境数 |

### Step 5.2 — 生成完整测试计划文档

使用 `templates/test-plan-template.md` 骨架，填入所有参数化内容：

1. **执行指引**（自动插入，格式参照 PinkPunch 文档的执行指引章节）
2. **品牌背景**（BRAND CONTEXT 段落）
3. **策略分类体系**（Goals × Scenes × Styles 矩阵说明）
4. **竞品与搜索词库**（四类搜索词完整列表）
5. **策略总览表**（50 个策略的 ID、组合、搜索词、评论模式一览）
6. **50 个策略详细配置**（每个含完整 API JSON + AI Prompt）
7. **账号分配表**（策略 ID → 环境编号映射）
8. **执行时间线**（Phase 0-4）
9. **评估框架**（核心指标定义）
10. **风险控制**（限制处理流程、紧急停止条件）

文档输出到用户指定路径，文件名格式：`测试计划_{brandName}评论系统.md`

### Step 5.3 — 验证文档完整性

自动检查：
- [ ] 所有策略是否都有完整 API JSON 代码块
- [ ] E 区策略的 Prompt 引用是否指向正确的源策略
- [ ] 搜索词是否与词库一致
- [ ] C 区策略是否都有 aiReplyPrompt
- [ ] 回复规则（奇数补 URL / 偶数补 @handle）是否正确
- [ ] BRAND CONTEXT 是否嵌入每个 AI Prompt
- [ ] 产品名称是否在 Prompt 中被提及

输出验证报告，如有问题自动修复。

---

## 记忆系统

### memory.json 用途

- 存储当前项目的品牌信息、竞品列表、策略配置
- 记录历史项目（方便复用和参考）
- 跟踪工作流进度（断点续做）

### 断点续做

如果工作流中断（用户关闭会话），下次启动时：
1. 读取 memory.json 的 `currentProject.phase` 和 `currentProject.lastStep`
2. 询问用户是否继续上次的项目
3. 从断点处恢复

---

## 注意事项

1. **每个 ⚠️ 确认点必须等用户明确确认后才能继续**，不能自动跳过
2. **Prompt 必须是 persona-driven 风格**，不能是规则列表式的指令堆砌
3. **评论必须有活人感**：具体的、有观点的、略带脆弱的、有故事的
4. **品牌信息必须嵌入 Prompt**：产品名称、价格、核心卖点都要让 AI 知道
5. **不同 Goal 的转化信息位置不同**：G1/G2 在评论中，G3 在回复中
6. **文档必须自包含**：Claude 读完文档就能直接执行，不需要额外信息
7. **只生成一个文档**：不要生成额外的 README、摘要等文件
