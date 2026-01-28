from PIL import Image
import sys

def remove_white_background(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Check if pixel is close to white
            # item[0] is Red, [1] is Green, [2] is Blue
            if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
                new_data.append((255, 255, 255, 0)) # Make Transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Propocess complete. Saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

input_file = r"d:\DATOS\perlatodo\perlawasi-platform\public\images\kawaii-icecream.png"
output_file = r"d:\DATOS\perlatodo\perlawasi-platform\public\images\kawaii-icecream-transparent.png"

remove_white_background(input_file, output_file, tolerance=40)
