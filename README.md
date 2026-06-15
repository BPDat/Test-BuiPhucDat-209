# TikTok Vertical Scroll Feed - Bài Kiểm Tra Đầu Vào

Ứng dụng xem video dạng cuộn dọc (TikTok Clone) được xây dựng bằng **Next.js App Router**, **TypeScript**, **Tailwind CSS** và **Lucide React**.

*   **Ứng viên:** Bùi Phúc Đạt
*   **Số điện thoại (3 số cuối):** 209
*   **Vercel Deployment:** [https://test-buiphucdat-209.vercel.app](https://test-buiphucdat-209.vercel.app) *(Link mẫu - Hãy cập nhật sau khi deploy)*
*   **Video Demo (GG Drive):** *(Cập nhật link GG Drive sau khi quay video)*

---

## 🚀 Tính Năng Đã Triển Khai

### A. Yêu Cầu Bắt Buộc (Core Features)
1.  **Giao diện cuộn dọc (Vertical Scroll Layout)**: 
    *   Tự động bám dính video tiếp theo khi cuộn (Scroll Snapping).
    *   Hiển thị khung hình chuẩn di động tỷ lệ `9:16` ở giữa màn hình trên PC, và full-screen trên thiết bị di động.
2.  **Video Player Component**:
    *   Đầy đủ thông tin Overlay: Avatar, Tên tác giả (`@username`), Mô tả video và dải nút tương tác (Tim, Bình luận, Chia sẻ) ở cạnh phải.
    *   Tính năng click/tap vào màn hình video để tạm dừng (Pause) hoặc tiếp tục phát (Play).
3.  **Mock Data**:
    *   Mảng 5 videos chất lượng cao với đầy đủ thông tin mô phỏng cơ sở dữ liệu thật.

### B. Tính Năng Điểm Cộng (Bonus Features)
1.  **Tự động Play/Pause khi cuộn (Auto-play on scroll)**:
    *   Video tự động phát khi cuộn tới (>60% diện tích nằm trong màn hình) và dừng phát khi cuộn qua.
2.  **Tương tác Like (State Mạng Xã Hội)**:
    *   Bấm nút Tim để đổi màu sang màu đỏ và tăng số lượng like lên 1. Bấm lại để giảm số lượng và bỏ màu. Có hiệu ứng nảy (pop) mượt mà.
3.  **Điều hướng Responsive (Navigation Bar)**:
    *   Hiển thị Left Sidebar trên Desktop và Bottom Navigation Bar (kèm nút "+" đặc trưng) trên di động.
4.  **Tối ưu trải nghiệm**:
    *   Nút Mute/Unmute trên từng video để vượt qua chính sách chặn tự động phát có âm thanh của trình duyệt, giúp người dùng chủ động điều khiển âm lượng.
    *   Thanh tiến trình (Progress bar) đồng bộ thời gian thực theo thời lượng phát của từng video.

---

## 🛠️ Giải Thích Logic Play/Pause Khi Cuộn Trang

Để tối ưu hóa hiệu năng render và đảm bảo trải nghiệm cuộn mượt mà như TikTok gốc, dự án sử dụng **Intersection Observer API** thay vì lắng nghe sự kiện `scroll` liên tục (gây gián đoạn main thread).

### Luồng xử lý chi tiết:

1.  **Khởi tạo Observer ở Container Cha (`VideoFeed`)**:
    *   Một instance của `IntersectionObserver` được tạo ra trong Custom Hook `useIntersectionObserver.ts`.
    *   Cấu hình `threshold: 0.6`, nghĩa là một video card được coi là "nằm trong tầm nhìn" (intersecting) khi ít nhất **60%** chiều cao của nó hiển thị trên màn hình.
2.  **Đăng ký Target Elements**:
    *   Tất cả các `VideoCard` được gán thuộc tính `data-video-id={video.id}`.
    *   Khi component mount, Observer sẽ đăng ký theo dõi tất cả các phần tử có thuộc tính này.
3.  **Cập nhật Trạng thái Active**:
    *   Khi người dùng cuộn, nếu một video card đạt ngưỡng 60% hiển thị, Observer Callback sẽ được kích hoạt, lấy ID của thẻ card đó từ thuộc tính `data-video-id` và cập nhật vào state `activeVideoId` ở cấp Feed.
4.  **Đồng bộ tới Trình Phát (`VideoPlayer`)**:
    *   Mỗi `VideoCard` nhận prop `isActive = (video.id === activeVideoId)`.
    *   Trong `VideoPlayer`, một `useEffect` liên tục lắng nghe thay đổi của prop `isActive`:
        *   Nếu `isActive === true`: Gọi phương thức JavaScript nguyên bản `video.play()` để chạy video.
        *   Nếu `isActive === false`: Gọi `video.pause()` để dừng phát và đưa thời gian hiện tại về giây đầu tiên (`video.currentTime = 0`), giúp giải phóng băng thông và giảm tải bộ nhớ cho GPU/CPU.
5.  **Hủy Observer (Cleanup)**:
    *   Khi component unmount, observer tự động ngắt kết nối (`disconnect`) để tránh rò rỉ bộ nhớ (memory leaks).

---

## 💻 Hướng Dẫn Chạy Dưới Local

1.  Cài đặt dependencies:
    ```bash
    npm install
    ```
2.  Khởi động server phát triển:
    ```bash
    npm run dev
    ```
3.  Truy cập trên trình duyệt: [http://localhost:3000](http://localhost:3000)
    *   Nhấp chuột vào màn hình để Play/Pause.
    *   Bấm biểu tượng loa ở góc trên bên phải để Bật/Tắt âm thanh.
    *   F12 chuyển sang chế độ Mobile để trải nghiệm giao diện điện thoại.
