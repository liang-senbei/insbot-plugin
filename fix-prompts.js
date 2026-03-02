const fs = require('fs');

const filePath = '测试计划_PinkPunch评论系统.md';
const content = fs.readFileSync(filePath, 'utf8');

// 按策略分割
const strategyBlocks = content.split(/^### ([A-Z]\d+) /m);
// 移除第一个空元素
strategyBlocks.shift();

const log = (msg) => process.stdout.write(msg + '\n');
log('开始处理...\n');

let result = [];
let processedCount = 0;

for (let i = 0; i < strategyBlocks.length; i += 2) {
    const strategyId = strategyBlocks[i];
    const blockContent = strategyBlocks[i + 1];

    log(`${strategyId}...`);
    processedCount++;

    // 提取完整 Prompt
    const promptMatch = blockContent.match(/\*\*AI 评论 Prompt：\*\*\s*```\n([\s\S]*?)\n```/);
    let fullPrompt = '';
    if (promptMatch) {
        fullPrompt = promptMatch[1];
    }

    // 替换 JSON 中的 prompt
    const newBlockContent = blockContent.replace(
        /("prompt":\s*")[^"]+"/g,
        (match, prefix) => {
            if (fullPrompt) {
                let escapedPrompt = fullPrompt
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '');
                log(` ✓ 替换完成`);
                return prefix + escapedPrompt + '"';
            }
            return match;
        }
    );

    result.push(`### ${strategyId} ` + newBlockContent);
}

fs.writeFileSync(filePath, result.join('\n'), 'utf8');
log(`\n完成！处理了 ${processedCount} 个策略`);
