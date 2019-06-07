
"""
 AUTHOR : Peng Cheng
 PURPOSE : rotate image & flip image functions, xml file editing
"""
import cv2
import os
import glob
import pandas as pd
import xml.etree.ElementTree as ET
import math
from PIL import Image
path = r'D:\1Study\UOM\Project\YouCelebrity\image\zimage' 
def img_rotation(angle, scale):
    for file in os.listdir(path):
        if file.endswith('jpg'):
            img_path = path + '\\' + file
            img = cv2.imread(img_path)
            (h, w) = img.shape[:2]
            center = (w / 2, h / 2)
            M = cv2.getRotationMatrix2D(center, angle, scale)
            rotated180 = cv2.warpAffine(img, M, (w, h)) 
            cv2.imwrite(img_path,rotated180)
    print('rotation job completed')

def img_flip(path):
    for file in os.listdir(path):
        if file.endswith('jpg'):
            impath = path + '\\' + file
            im = Image.open(impath)
            out = im.transpose(Image.FLIP_LEFT_RIGHT)
            out.save(impath)
    print('Flipping job completed')

def xml_flip(path):
    xml_list = []
    for xml_file in glob.glob(path + '/*.xml'):
        tree = ET.parse(xml_file)
        root = tree.getroot()
        for size in root.findall('size'):
            width  = size.find("width")
            height = size.find("height")
        x_central = int(int(width.text)/2)
        y_central = int(int(height.text)/2)
        for object in root.findall('object'):
            xmin = object.find("bndbox").find("xmin")
            ymin = object.find("bndbox").find("ymin")
            xmax = object.find("bndbox").find("xmax")
            ymax = object.find("bndbox").find("ymax")
            xmin = int(xmin.text)
            ymin = int(ymin.text)
            xmax = int(xmax.text) 
            ymax = int(ymax.text)
        xmin_dif = x_central - xmin
        xmax_dif = x_central - xmax 
        new_xmin = x_central + xmax_dif
        new_xmax = x_central + xmin_dif
            #error file check
            # if xmin == 0 or xmax > int(width.text):
            #     print(xml_file)
        for elem in root.findall('.//xmin'):
            elem.text = str(new_xmin)
        for elem in root.findall('.//xmax'):
            elem.text = str(new_xmax)
        tree.write(xml_file, "UTF-8")
    print('Editing completed')

def xml_rotation(path):
    xml_list = []
    for xml_file in glob.glob(path + '/*.xml'):
        tree = ET.parse(xml_file)
        root = tree.getroot()
        for size in root.findall('size'):
            width  = size.find("width")
            height = size.find("height")
        x_central = int(int(width.text)/2)
        y_central = int(int(height.text)/2)
        for object in root.findall('object'):
            xmin = object.find("bndbox").find("xmin")
            ymin = object.find("bndbox").find("ymin")
            xmax = object.find("bndbox").find("xmax")
            ymax = object.find("bndbox").find("ymax")
            xmin = int(xmin.text)
            ymin = int(ymin.text)
            xmax = int(xmax.text) 
            ymax = int(ymax.text)
        xmin_dif = x_central - xmin
        ymin_dif = y_central - ymin 
        xmax_dif = x_central - xmax 
        ymax_dif = y_central - ymax 
        new_xmin = x_central + xmin_dif
        new_ymin = y_central + ymin_dif
        new_xmax = x_central + xmax_dif
        new_ymax = y_central + ymax_dif
        for elem in root.findall('.//xmin'):
            elem.text = str(new_xmin)
        for elem in root.findall('.//ymin'):
            elem.text = str(new_ymin)
        for elem in root.findall('.//xmax'):
            elem.text = str(new_xmax)
        for elem in root.findall('.//ymax'):
            elem.text = str(new_ymax)
        tree.write(xml_file, "UTF-8")
    print('Editing completed')

