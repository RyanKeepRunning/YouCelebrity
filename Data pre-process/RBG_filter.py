
"""
 AUTHOR : Peng Cheng
 PURPOSE : Delete None-RGB image
"""


from PIL import Image
import os       
path = r'D:\1Study\UOM\Project\YouCelebrity\cartoon\image\zimg' 
namePath = r'C:\Users\PENG\Desktop\Carton_imgList.txt'

def no_rgb_fname():
    file1 = open("Carton_imgList.txt","w")
    for file in os.listdir(path):
        # print(file)
            
        extension = file.split('.')[-1]
        fname     = file.split('.')[0]
        if extension == 'jpg':
            img = Image.open(path+ '\\' + file)
            if img.mode != 'RGB':
                    file1.write(fname + '\n')

def delete_no_rgb():
    imgList = []
    iList = []
    os.chdir(path)
    with open(namePath) as file:
        for name in file:
            imgList.append(name)
    # print(imgList)
    for i in imgList:
        n = i.strip()
        iList.append(n)
    # print(iList)

    for f in os.listdir(path):
        name = f.split('.')[0]
        if name in iList:
            os.remove(f)
            print(f + 'has been removed')

# no_rgb_fname()
delete_no_rgb()