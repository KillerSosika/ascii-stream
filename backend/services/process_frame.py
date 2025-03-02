import sys
import cv2
import numpy as np

ASCII_CHARS = "@%#*+=-:. "

frame_data = sys.stdin.buffer.read()
nparr = np.frombuffer(frame_data, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)

height, width = img.shape
aspect_ratio = 0.5
new_width = 80
new_height = int(aspect_ratio * new_width * height / width)
img = cv2.resize(img, (new_width, new_height))

ascii_frame = "\n".join("".join(ASCII_CHARS[pixel // 32] for pixel in row) for row in img)

sys.stdout.write(ascii_frame)
