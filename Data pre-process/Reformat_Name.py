"""
 AUTHOR : Peng Cheng
 PURPOSE : Reformat Image Name
"""
import os
import shutil

path = r'D:\1Study\UOM\Project\YouCelebrity\cartoon\image'
TargetFolder = r'D:\1Study\UOM\Project\YouCelebrity\cartoon\image\zimg'
def change_name():
    nameset = set()
    for root, dirs, files in os.walk(path):
        i = 1
        for name in files:
                # if name.endswith('.jpg'):  
            os.chdir(os.path.join(root))
            parentName = os.path.basename(os.getcwd())
            
            os.rename(name, parentName + '_' + str(i) + '.jpg' )
                    # os.renames(name,str(i) + '.txt')
            i  = i + 1
def transfer_img():
    for root, dirs, files in os.walk(path):
        # print(root)
        # print(dirs)
        # print(files)
        for name in files:
                if name.endswith('.jpg'):  
                    SourceFolder = os.path.join(root,name)
                    shutil.copy2(SourceFolder, TargetFolder)
                # os.renames(name,str(i) + '.txt')
# change_name()
transfer_img()
