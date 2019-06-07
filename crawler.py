
"""
 AUTHOR : Yan Tian
 PURPOSE : To collect celebrity images from Flickr, Google and Baidu
"""
from datetime import date
from icrawler.builtin import GoogleImageCrawler
from icrawler.builtin import BaiduImageCrawler
from icrawler.builtin import BingImageCrawler



google_crawler = GoogleImageCrawler(storage={'test'})
    google_filters = dict(
    size='large',
    color='color',
    license='commercial,modify',
    date=((2015, 1, 1), None))
    google_crawler.crawl(keyword='nude beauty',filters=google_filters,max_num=5)