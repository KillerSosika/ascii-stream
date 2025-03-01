cmake_minimum_required(VERSION 3.10)
project(ascii_capture)

# Указываем путь к скачанной OpenCV


set(OpenCV_DIR "C:/Users/р/Desktop/projects/js/ascii-stream/external/opencv/build")
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})


add_executable(capture capture.cpp)
target_include_directories(capture PRIVATE ${OpenCV_INCLUDE_DIRS})
target_link_libraries(capture ${OpenCV_LIBS} ws2_32)
