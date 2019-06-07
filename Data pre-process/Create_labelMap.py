"""
 AUTHOR : Peng Cheng
 PURPOSE : Generate label map
"""

name = open('List26.txt','rt')
file1 = open("classText_1.txt","w")
s = ''
i = 1
for n in name:
    temp = n.strip('\n')
    s+="    if row_label == '" + temp + "':" +"\n"
    s+="        return " + str(i) +"\n"
    i = i + 1

file1.write(s)
name.close()
file1.close()