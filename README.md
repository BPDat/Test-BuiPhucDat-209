# Bài Kiểm Tra Đầu Vào

Ứng dụng xem video dạng cuộn dọc.

*   **Ứng viên:** Bùi Phúc Đạt
*   **Số điện thoại (3 số cuối):** 209
*   **Vercel Deployment:** [https://test-bui-phuc-dat-209.vercel.app/](https://test-bui-phuc-dat-209.vercel.app/)

---

## 🚀 Tính Năng

1. **Giao diện cuộn dọc (Vertical Scroll Layout)**
2. **Tự động phát video**
3. **Tính năng bổ sung**:
   - Thả tim.
   - Bật/tắt âm thanh.
   - Thanh tiến trình video.

---

## ⚙️ Logic Xử Lý Play/Pause Khi Cuộn Trang

Dùng **Intersection Observer API** để theo dõi và điều khiển trạng thái phát video.
1. **Theo dõi trạng thái hiển thị**: Khởi tạo một Observer ở component cha (`VideoFeed`) với cấu hình `threshold: 0.6` (khi ít nhất 60% diện tích video nằm trong màn hình).
2. **Kích hoạt phát (Play)**: Khi video đạt ngưỡng hiển thị, component cha cập nhật ID video đang hoạt động, truyền `isActive = true` xuống component con để gọi hàm `.play()`.
3. **Tạm dừng (Pause & Reset)**: Khi video cuộn qua, `isActive` chuyển thành `false`, gọi `.pause()` và reset thời gian phát về giây đầu tiên (`video.currentTime = 0`).

---

## 💻 Hướng Dẫn Chạy Dưới Local

1. Cài đặt thư viện:
   ```bash
   npm install
   ```
2. Chạy dự án:
   ```bash
   npm run dev
   ```
3. Truy cập: [http://localhost:3000](http://localhost:3000)
