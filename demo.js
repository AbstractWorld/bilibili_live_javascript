javascript:(function() {
    // 自动点赞部分
    const likeButtonSelector = 'div[data-type="dianzan.0.show"]'; // 点赞按钮的选择器
    let likeCount = 0; // 点赞计数器
    const maxLikes = 1000; // 最大点赞次数
    console.log('开始点赞');
    // 打印当前时间
    const now = new Date();
    const options = { timeZone: 'Asia/Shanghai', hour12: false };
    const east8Time = now.toLocaleString('zh-CN', options);
    console.log('当前时间:', east8Time);
    const likeIntervalId = setInterval(() => {
        const likeButton = document.querySelector(likeButtonSelector); // 获取点赞按钮
        if (likeButton) {
            likeButton.click(); // 模拟点击点赞按钮
            likeCount++; // 增加点赞计数
            if (likeCount >= maxLikes) {
                clearInterval(likeIntervalId); // 停止点赞
                console.log('完成点赞');
            	// 打印当前时间
            	const now = new Date();
            	const options = { timeZone: 'Asia/Shanghai', hour12: false };
            	const east8Time = now.toLocaleString('zh-CN', options);
            	console.log('当前时间:', east8Time);

                // 点赞完成后开始发送“喵”
                sendMeowMessages();
            }
        } else {
            console.error('找不到点赞按钮'); // 如果找不到按钮，输出错误信息
            clearInterval(likeIntervalId); // 停止计时器
        }
    }, 500); // 每500毫秒触发一次点赞

    // 定义发送“喵”消息的部分
    const inputSelector = 'textarea.chat-input'; // 输入框选择器
    const sendButtonSelector = 'span.txt'; // 发送按钮选择器
    let meowCount = 0; // 发送计数器
    const sendMessage = () => {
        const inputField = document.querySelector(inputSelector);
        const sendButton = document.querySelector(sendButtonSelector);
        if (inputField && sendButton) {
            // 输入“喵”
            inputField.value = '喵';
            // 创建输入事件以触发输入框的变化
            const inputEvent = new Event('input', { bubbles: true });
            inputField.dispatchEvent(inputEvent);
            // 点击发送按钮
            sendButton.click();
            console.log('已发送: 喵');
            // 打印当前时间
            const now = new Date();
            const options = { timeZone: 'Asia/Shanghai', hour12: false };
            const east8Time = now.toLocaleString('zh-CN', options);
            console.log('当前时间:', east8Time);
            meowCount++;
            if (meowCount >= 40) {
                clearInterval(meowIntervalId);
                console.log('已发送完成，自动停止。');
            }
        } else {
            console.error('找不到输入框或发送按钮');
            clearInterval(meowIntervalId); // 停止计时器
        }
    };
    // 发送“喵”消息的定时器
    const meowIntervalId = setInterval(() => {
        sendMessage();
    }, 900000); // 每900秒触发一次
    // 开始发送消息
    const sendMeowMessages = () => {
        console.log('开始发送“喵”消息...');
        sendMessage(); // 立即发送第一次消息
    };
})();