#include <opencv2/opencv.hpp>
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <iostream>
#include <sstream>
#include <vector>

// Символы ASCII
const std::string ASCII_CHARS = " .:-=+*#%@";

// WebSocket-сервер
typedef websocketpp::server<websocketpp::config::asio> server;
server ws_server;

// Функция конвертации изображения в ASCII
std::string imageToASCII(cv::Mat &image, int width = 80) {
    std::stringstream ascii;
    int height = (image.rows * width) / image.cols / 2;
    
    cv::resize(image, image, cv::Size(width, height));
    cv::cvtColor(image, image, cv::COLOR_BGR2GRAY);

    for (int y = 0; y < image.rows; y++) {
        for (int x = 0; x < image.cols; x++) {
            int brightness = image.at<uchar>(y, x);
            int index = brightness * (ASCII_CHARS.size() - 1) / 255;
            ascii << ASCII_CHARS[index];
        }
        ascii << "\n";
    }
    return ascii.str();
}

// Обработчик сообщений WebSocket
void on_message(websocketpp::connection_hdl hdl, server::message_ptr msg) {
    std::string base64Image = msg->get_payload();

    // Декодируем Base64 → OpenCV Mat (это надо добавить, пока просто заглушка)
    cv::Mat frame = cv::Mat::zeros(100, 100, CV_8UC3); // TODO: Реальный декодинг

    std::string asciiFrame = imageToASCII(frame);
    ws_server.send(hdl, asciiFrame, websocketpp::frame::opcode::text);
}

int main() {
    ws_server.set_message_handler(&on_message);
    ws_server.init_asio();
    ws_server.listen(9000);
    ws_server.start_accept();
    std::cout << "🚀 C++ WebSocket сервер слушает порт 9000..." << std::endl;
    ws_server.run();
}
