"""
Usage:
  # From tensorflow/models/
  # Create train data:
  python generate_tfrecord.py --csv_input=data/train_labels.csv  --output_path=data/train.record

  # Create test data:
  python generate_tfrecord.py --csv_input=data/test_labels.csv  --output_path=data/test.record
"""
from __future__ import division
from __future__ import print_function
from __future__ import absolute_import

import os
import io
import pandas as pd
import tensorflow as tf

from PIL import Image
from object_detection.utils import dataset_util
from collections import namedtuple, OrderedDict

flags = tf.app.flags
flags.DEFINE_string('csv_input', '', 'Path to the CSV input')
flags.DEFINE_string('output_path', '', 'Path to output TFRecord')
flags.DEFINE_string('image_dir', '', 'Path to images')
FLAGS = flags.FLAGS


# TO-DO replace this with label map
def class_text_to_int(row_label):
    if row_label == 'Aamir Khan':
        return 1
    if row_label == 'Adam Sandler':
        return 2
    if row_label == 'Angelina Jolie':
        return 3
    if row_label == 'Anne Hathaway':
        return 4
    if row_label == 'Antonio Banderas':
        return 5
    if row_label == 'Arnold Schwarzenegger':
        return 6
    if row_label == 'Ben Affleck':
        return 7
    if row_label == 'Benedict Cumberbatch':
        return 8
    if row_label == 'Beyonce Knowles':
        return 9
    if row_label == 'Brad Pitt':
        return 10
    if row_label == 'Bruce Lee':
        return 11
    if row_label == 'Bruce Willis':
        return 12
    if row_label == 'Bruno Mars':
        return 13
    if row_label == 'Calvin Harris':
        return 14
    if row_label == 'Ceron Diaz':
        return 15
    if row_label == 'Channing Tatum':
        return 16
    if row_label == 'Charles Chaplin':
        return 17
    if row_label == 'Chris Evans':
        return 18
    if row_label == 'Chris Hemsworth':
        return 19
    if row_label == 'Christian Bale':
        return 20
    if row_label == 'Clint Eastwood':
        return 21
    if row_label == 'Conor McGregor':
        return 22
    if row_label == 'Cristiano Ronaldo':
        return 23
    if row_label == 'Daniel Craig':
        return 24
    if row_label == 'Daniel Radcliffe':
        return 25
    if row_label == 'David Copperfield':
        return 26
    if row_label == 'Denzel Washington':
        return 27
    if row_label == 'Detective Conan':
        return 28
    if row_label == 'Drew Barrymore':
        return 29
    if row_label == 'Dwayne Johnson':
        return 30
    if row_label == 'Edward Norton':
        return 31
    if row_label == 'Ellen DeGeneres':
        return 32
    if row_label == 'Emilia Clarke':
        return 33
    if row_label == 'Emma Stone':
        return 34
    if row_label == 'George Clooney':
        return 35
    if row_label == 'Goku':
        return 36
    if row_label == 'Gordon Rsay':
        return 37
    if row_label == 'Halle Berry':
        return 38
    if row_label == 'Heath Ledger':
        return 39
    if row_label == 'Hugh Jackman':
        return 40
    if row_label == 'Ian McKellen':
        return 41
    if row_label == 'Jack Nicholson':
        return 42
    if row_label == 'Jackie Chan':
        return 43
    if row_label == 'Jake Gyllenhaal':
        return 44
    if row_label == 'Jason Biggs':
        return 45
    if row_label == 'Jason Momoa':
        return 46
    if row_label == 'Jason Stath':
        return 47
    if row_label == 'Jay-Z':
        return 48
    if row_label == 'Jennifer Aniston':
        return 49
    if row_label == 'Jes Franco':
        return 50
    if row_label == 'Jes Harden':
        return 51
    if row_label == 'Jes McAvoy':
        return 52
    if row_label == 'Jessica Alba':
        return 53
    if row_label == 'Jet Li':
        return 54
    if row_label == 'Jim Carrey':
        return 55
    if row_label == 'John Travolta':
        return 56
    if row_label == 'Johnny Depp':
        return 57
    if row_label == 'Julia Roberts':
        return 58
    if row_label == 'Kate Beckinsale':
        return 59
    if row_label == 'Kate Winslet':
        return 60
    if row_label == 'Katy Perry':
        return 61
    if row_label == 'Keanu Reeves':
        return 62
    if row_label == 'Keira Knightley':
        return 63
    if row_label == 'Kevin Spacey':
        return 64
    if row_label == 'Kit Harington':
        return 65
    if row_label == 'Lady Gaga':
        return 66
    if row_label == 'LeBron Jes':
        return 67
    if row_label == 'Leonardo DiCaprio':
        return 68
    if row_label == 'Li Neeson':
        return 69
    if row_label == 'Macaulay Culkin':
        return 70
    if row_label == 'Mark Wahlberg':
        return 71
    if row_label == 'Marlon Brando':
        return 72
    if row_label == 'Matt Don':
        return 73
    if row_label == 'Megan Fox':
        return 74
    if row_label == 'Mel Gibson':
        return 75
    if row_label == 'Morgan Freeman':
        return 76
    if row_label == 'Natalie Portman':
        return 77
    if row_label == 'Neymar':
        return 78
    if row_label == 'Nicolas Cage':
        return 79
    if row_label == 'Nikolaj Coster-Waldau':
        return 80
    if row_label == 'Orlando Bloom':
        return 81
    if row_label == 'Owen Wilson':
        return 82
    if row_label == 'Peter Jackson':
        return 83
    if row_label == 'Peter dinklage':
        return 84
    if row_label == 'Rachel McAds':
        return 85
    if row_label == 'Robert De Niro':
        return 86
    if row_label == 'Robert Downey Jr':
        return 87
    if row_label == 'Roger Federer':
        return 88
    if row_label == 'Roger Waters':
        return 89
    if row_label == 'Rowan Atkinson':
        return 90
    if row_label == 'Russell Crowe':
        return 91
    if row_label == 'Ryan Seacrest':
        return 92
    if row_label == 'Sandra Bullock':
        return 93
    if row_label == 'Scarlett Johansson':
        return 94
    if row_label == 'Sean Combs':
        return 95
    if row_label == 'Shah Rukh Khan':
        return 96
    if row_label == 'Shia LaBeouf':
        return 97
    if row_label == 'Sigourney Weaver':
        return 98
    if row_label == 'Stephen Curry':
        return 99
    if row_label == 'Steve Carell':
        return 100
    if row_label == 'Steve Harvey':
        return 101
    if row_label == 'Steven Spielberg':
        return 102
    if row_label == 'Suel L. Jackson':
        return 103
    if row_label == 'Sylvester Stallone':
        return 104
    if row_label == 'Taylor Swift':
        return 105
    if row_label == 'Tim Allen':
        return 106
    if row_label == 'Tom Cruise':
        return 107
    if row_label == 'Tom Hanks':
        return 108
    if row_label == 'Tom Hiddleston':
        return 109
    if row_label == 'Tommy Lee Jones':
        return 110
    if row_label == 'Vin Diesel':
        return 111
    if row_label == 'Will Smith':
        return 112
    if row_label == 'Zach Galifianakis':
        return 113


def split(df, group):
    data = namedtuple('data', ['filename', 'object'])
    gb = df.groupby(group)
    return [data(filename, gb.get_group(x)) for filename, x in zip(gb.groups.keys(), gb.groups)]


def create_tf_example(group, path):
    with tf.gfile.GFile(os.path.join(path, '{}'.format(group.filename)), 'rb') as fid:
        encoded_jpg = fid.read()
    encoded_jpg_io = io.BytesIO(encoded_jpg)
    image = Image.open(encoded_jpg_io)
    width, height = image.size

    filename = group.filename.encode('utf8')
    image_format = b'jpg'
    xmins = []
    xmaxs = []
    ymins = []
    ymaxs = []
    classes_text = []
    classes = []

    for index, row in group.object.iterrows():
        xmins.append(row['xmin'] / width)
        xmaxs.append(row['xmax'] / width)
        ymins.append(row['ymin'] / height)
        ymaxs.append(row['ymax'] / height)
        classes_text.append(row['class'].encode('utf8'))
        classes.append(class_text_to_int(row['class']))


    tf_example = tf.train.Example(features=tf.train.Features(feature={
        'image/height': dataset_util.int64_feature(height),
        'image/width': dataset_util.int64_feature(width),
        'image/filename': dataset_util.bytes_feature(filename),
        'image/source_id': dataset_util.bytes_feature(filename),
        'image/encoded': dataset_util.bytes_feature(encoded_jpg),
        'image/format': dataset_util.bytes_feature(image_format),
        'image/object/bbox/xmin': dataset_util.float_list_feature(xmins),
        'image/object/bbox/xmax': dataset_util.float_list_feature(xmaxs),
        'image/object/bbox/ymin': dataset_util.float_list_feature(ymins),
        'image/object/bbox/ymax': dataset_util.float_list_feature(ymaxs),
        'image/object/class/text': dataset_util.bytes_list_feature(classes_text),
        'image/object/class/label': dataset_util.int64_list_feature(classes),
        
    }))
    return tf_example


def main(_):
    writer = tf.python_io.TFRecordWriter(FLAGS.output_path)
    path = os.path.join(FLAGS.image_dir)
    examples = pd.read_csv(FLAGS.csv_input)
    grouped = split(examples, 'filename')
    for group in grouped:
        tf_example = create_tf_example(group, path)
        writer.write(tf_example.SerializeToString())

    writer.close()
    output_path = os.path.join(os.getcwd(), FLAGS.output_path)
    print('Successfully created the TFRecords: {}'.format(output_path))


if __name__ == '__main__':
    tf.app.run()
