

CelebrityList = open('List26.txt','rt')
file1 = open("carton_label_map.pbtxt","w")
s = ''
i = 0
for nameList in CelebrityList:
    name = nameList.strip('\n')
    s+= "item {\n"
    s+="  id: "+ str(i+1) +"\n"
    s+="  name: \""+ name + "\"\n"
    s+="}\n"
    i = i + 1

file1.write(s)
CelebrityList.close()
file1.close()