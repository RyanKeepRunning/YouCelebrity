
"""
 AUTHOR : Yan Tian
 PURPOSE : To collect celebrity images from Flickr, Google and Baidu
"""
from datetime import date
from icrawler.builtin import GoogleImageCrawler
from icrawler.builtin import BaiduImageCrawler
from icrawler.builtin import BingImageCrawler

folder_path = 'E:\StudyInMelb\Project\YouCelebrity'

CelebrityList = open('List.txt','rt')

for nameList in CelebrityList:
    name = nameList.strip('\n')

    print("Scrawling " + name + " on Google")
    imageDir = folder_path + '/Google/' + name
    google_crawler = GoogleImageCrawler(storage={'root_dir': imageDir})
    google_filters = dict(
    size='large',
    color='color',
    license='commercial,modify',
    date=((2015, 1, 1), None))
    google_crawler.crawl(keyword=name,filters=google_filters,max_num=3)

    print("Scrawling " + name + " on Baidu")
    imageDir = folder_path + '/Baidu/' + name
    baidu_crawler = BaiduImageCrawler(storage={'root_dir': imageDir})
    baidu_crawler.crawl(keyword=name, min_size=(200,200), max_num=5)

    print("Scrawling " + name + " on Bing")
    imageDir = folder_path + '/Bing/' + name
    bing_crawler = BingImageCrawler(storage={'root_dir': imageDir})
    bing_crawler.crawl(keyword=name, min_size=(200,200), max_num=5)

print("Finished")
