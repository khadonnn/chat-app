// src/utils/cron-keep-alive.js

import { CronJob } from "cron"; // Lấy lớp CronJob từ thư viện
import https from "https";

// ⚠️ Cảnh báo: Đảm bảo process.env.API_URL đã được thiết lập 
const job = new CronJob("*/14 * * * *", function () {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
        console.error("API_URL is not defined in environment variables.");
        return;
    }

    // Thực hiện GET request
    https
        .get(apiUrl, (res) => {
            if (res.statusCode === 200) {
                console.log(`[Keep-Alive Job] GET request sent successfully to ${apiUrl}`);
            } else {
                console.log(`[Keep-Alive Job] GET request failed, status code: ${res.statusCode}`);
            }
        })
        .on("error", (e) => console.error("[Keep-Alive Job] Error while sending request:", e.message));
});

// Bắt đầu Cron Job ngay khi module này được import
job.start();

console.log(`[Cron Job] Lập lịch để gửi GET request mỗi 14 phút.`)

export default job;