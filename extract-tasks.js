const fs = require('fs');
const path = require('path');

const testPlanPath = 'E:/work/echowork/automat_review/insbot-plugin/测试计划_PinkPunch评论系统.md';
const content = fs.readFileSync(testPlanPath, 'utf8');

const outputDir = 'E:/work/echowork/automat_review/insta_bot_ui/task/fire';

console.log('开始提取策略配置...\n');

// 存储所有任务的 prompt 映射
const promptMap = {};
const allTasks = [];

// 提取完整 prompt
const promptRegex = /### ([A-Z]\d+) \|[^]*\n[\s\S]*?\*\*AI 评论 Prompt：\*\*\s*```\n([\s\S]*?)\n```/g;
while ((match = promptRegex.exec(content)) !== null) {
    promptMap[match[1]] = match[2];
}

console.log(`✓ 提取了 ${Object.keys(promptMap).length} 个完整 Prompt\n`);

// 提取 JSON 配置
const jsonBlockRegex = /```json\s*({[\s\S]*?"accounts":\s*\[[\s\S]*?"name":\s*"([A-Z]\d+)"[\s\S]*?})\s*```/g;
let seenIds = new Set();

while ((match = jsonBlockRegex.exec(content)) !== null) {
    try {
        const config = JSON.parse(match[1]);
        const taskId = config.accounts?.[0]?.name || '';

        if (!taskId || seenIds.has(taskId + '-' + config.mode)) continue;
        seenIds.add(taskId + '-' + config.mode);

        // 只保留 keyword 模式（评论任务），跳过 nurture 模式
        if (config.mode === 'nurture') {
            console.log(`⊘ 跳过 ${taskId} nurture 任务`);
            continue;
        }

        const titleMatch = content.match(new RegExp(`### ${taskId} \\|([^\\n]+)`));
        const name = titleMatch ? titleMatch[1].trim() : (config.name || taskId);

        let prompt = config.aiConfig?.prompt || '';
        const placeholderMatch = prompt.match(/【与 ([A-Z]\d+) 完全相同/);
        if (placeholderMatch && promptMap[placeholderMatch[1]]) {
            prompt = promptMap[placeholderMatch[1]];
        }

        allTasks.push({
            id: taskId,
            name: name,
            mode: config.mode,
            commentMode: config.commentMode,
            maxComments: config.maxComments,
            waitMin: config.waitTime?.min || 25,
            waitMax: config.waitTime?.max || 45,
            urlFile: config.urlFile || '',
            searchQueries: (config.searchQueries || []).join(','),
            aiPrompt: prompt,
            enableReply: config.enableReply || false,
            postsPerQuery: config.postsPerQuery || 2,
            postSelectionMode: config.postSelectionMode || 'random',
            shufflePosts: config.shufflePosts || false,
            serialNumber: '【待填】'
        });

        console.log(`✓ 提取 ${taskId}: ${name}`);
    } catch (e) {
        console.log(`⚠ 解析失败: ${e.message}`);
    }
}

console.log(`\n共提取 ${allTasks.length} 个评论任务\n`);

// 按区域分组
const zones = {
    A: { name: 'A区 - G1网站引流', tasks: [] },
    B: { name: 'B区 - G2 IG关注', tasks: [] },
    C: { name: 'C区 - G3品牌种草', tasks: [] },
    D: { name: 'D区 - 对照组', tasks: [] },
    E: { name: 'E区 - 重复验证', tasks: [] }
};

for (const task of allTasks) {
    const zone = task.id.charAt(0);
    if (zones[zone]) {
        zones[zone].tasks.push(task);
    }
}

// 创建区域文件
for (const [zoneId, zone] of Object.entries(zones)) {
    if (zone.tasks.length === 0) continue;

    const zoneFile = {
        zone: zoneId,
        zoneName: zone.name.split(' - ')[1] || zone.name,
        description: getDescription(zoneId),
        tasks: zone.tasks
    };

    const fileName = path.join(outputDir, `${zoneId.toLowerCase()}-zone-tasks.json`);
    fs.writeFileSync(fileName, JSON.stringify(zoneFile, null, 2), 'utf8');
    console.log(`✓ 创建: ${path.basename(fileName)} (${zone.tasks.length} 个任务)`);
}

// 创建总览文件
const overview = {
    projectName: 'Fire - PinkPunch Instagram评论系统',
    version: '1.0',
    created: new Date().toISOString().split('T')[0],
    totalTasks: allTasks.length,
    zones: Object.entries(zones)
        .filter(([_, z]) => z.tasks.length > 0)
        .map(([id, zone]) => ({
            id: id,
            name: zone.name,
            taskCount: zone.tasks.length,
            file: `${id.toLowerCase()}-zone-tasks.json`
        }))
};

fs.writeFileSync(
    path.join(outputDir, '00-task-overview.json'),
    JSON.stringify(overview, null, 2),
    'utf8'
);
console.log(`\n✓ 创建: 00-task-overview.json`);

console.log(`\n✅ 完成！`);

function getDescription(zoneId) {
    const descriptions = {
        A: '评论中包含 pinkpunch.com，不需要回复',
        B: '评论中包含 @pinkpunch.official，不需要回复',
        C: '评论只提品牌名，AI回复补转化信息',
        D: '对照组（固定评论、压力测试、极保守）',
        E: '重复验证组（复制高价值策略）'
    };
    return descriptions[zoneId] || '';
}
