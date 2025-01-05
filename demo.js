javascript:(function() {
    // 直播页面发送消息
    const inputSelector = 'textarea.chat-input'; // 输入框选择器
    const sendButtonSelector = 'span.txt'; // 发送按钮选择器
    const sendMessage = (msg) => {
        const inputField = document.querySelector(inputSelector);
        const sendButton = document.querySelector(sendButtonSelector);
        if (inputField && sendButton) {
            inputField.value = msg; // 使用传入的消息
            const inputEvent = new Event('input', { bubbles: true });
            inputField.dispatchEvent(inputEvent); // 触发输入事件
            sendButton.click(); // 点击发送按钮
            console.log('发送信息:', msg);
            console.log('发送时间', getCurrentTime());
        } else {
            console.error('找不到输入框或发送按钮，程序终止');
            if (typeof likeIntervalId !== 'undefined') {
                clearInterval(likeIntervalId); // 停止计时器1
            }
            if (typeof meowIntervalId !== 'undefined') {
                clearInterval(meowIntervalId); // 停止计时器2
            }
        }
    };

    // 获取当前时间
    const getCurrentTime = () => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Shanghai' };
        return now.toLocaleTimeString('zh-CN', options); // 返回格式化的时间字符串
    };

    // 自动点赞
    const likeButtonSelector = 'div[data-type="dianzan.0.show"]'; // 点赞按钮的选择器
    let likeCount = 0; // 点赞计数器
    const maxLikes = 1000; // 点赞次数，单个主播每天最多点赞1000次
    const msg1 = `开始点赞×${maxLikes}，${getCurrentTime()}`;
    sendMessage(msg1);

    const likeIntervalId = setInterval(() => {
        const likeButton = document.querySelector(likeButtonSelector); // 获取点赞按钮
        if (likeButton) {
            likeButton.click(); // 模拟点击点赞按钮
            likeCount++; // 增加点赞计数
            if (likeCount >= maxLikes) {
                clearInterval(likeIntervalId); // 停止点赞
                const msg2 = `完成点赞×${maxLikes}，${getCurrentTime()}`;
                sendMessage(msg2);
            }
        } else {
            console.error('找不到点赞按钮'); // 如果找不到按钮，输出错误信息
            clearInterval(likeIntervalId); // 停止计时器
        }
    }, 500); // 每500毫秒触发一次点赞

    // 猫猫养成，每间隔15分钟发“喵”
    let meowCount = 0; // 发送计数器
    const maxSendTimes = 40; // 发送次数
    const meowIntervalId = setInterval(() => {
        sendMessage('喵');
        meowCount++;
        if (meowCount >= maxSendTimes) {
            clearInterval(meowIntervalId);
            sendMessage(`猫猫养成完成，${getCurrentTime()}`); // 使用反引号解析
            console.log('猫猫养成完成');
        }
    }, 900000); // 每900秒触发一次

    // 添加1秒延时发送开始猫猫养成消息
    setTimeout(() => {
        sendMessage(`开始猫猫养成，${getCurrentTime()}`);
        setTimeout(() => {
            sendMessage('喵'); // 发送“喵”，延时1秒
        }, 1000); // 1000毫秒（1秒）延迟
    }, 1000); // 1000毫秒（1秒）延迟
})();
