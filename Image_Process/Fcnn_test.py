import numpy as np
import os
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile
import base64
from io import BytesIO
import matplotlib.image as mpimg
import crawler
import Fcnn_anime

from distutils.version import StrictVersion
from collections import defaultdict
from io import StringIO
from PIL import Image

# This is needed since the notebook is stored in the object_detection folder.
sys.path.append("..")
from object_detection.utils import ops as utils_ops

if StrictVersion(tf.__version__) < StrictVersion('1.12.0'):
  raise ImportError('Please upgrade your TensorFlow installation to v1.12.*.')


from utils import label_map_util

from utils import visualization_utils as vis_util


# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_FROZEN_GRAPH = "/home/cyg/frozen_inference_graph.pb"
# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = '/home/cyg/celebrities_label_map.pbtxt'
predict_name = ""
predict_score = 0


# firebase connection
#import firebase_admin
#from firebase_admin import credentials
#from firebase_admin import firestore
import base64
import time 
#cred = credentials.Certificate('firebase-adminsdk.json')
#app = firebase_admin.initialize_app(cred)
#db = firestore.client()
filename = "to_be_detected.png"



detection_graph = tf.Graph()
with detection_graph.as_default():
  od_graph_def = tf.GraphDef()
  with tf.gfile.GFile(PATH_TO_FROZEN_GRAPH, 'rb') as fid:
    serialized_graph = fid.read()
    od_graph_def.ParseFromString(serialized_graph)
    tf.import_graph_def(od_graph_def, name='')
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=113, use_display_name=True)
category_index = label_map_util.create_category_index(categories)


def load_image_into_numpy_array(image):
  (im_width, im_height) = image.size
  return np.array(image.getdata()).reshape(
      (im_height, im_width, 3)).astype(np.uint8)


def run_inference_for_single_image(image, graph):
  with graph.as_default():
    with tf.Session() as sess:
      # Get handles to input and output tensors
      ops = tf.get_default_graph().get_operations()
      all_tensor_names = {output.name for op in ops for output in op.outputs}
      tensor_dict = {}
      for key in [
          'num_detections', 'detection_boxes', 'detection_scores',
          'detection_classes', 'detection_masks'
      ]:
        tensor_name = key + ':0'
        if tensor_name in all_tensor_names:
          tensor_dict[key] = tf.get_default_graph().get_tensor_by_name(
              tensor_name)
      if 'detection_masks' in tensor_dict:
        # The following processing is only for single image
        detection_boxes = tf.squeeze(tensor_dict['detection_boxes'], [0])
        detection_masks = tf.squeeze(tensor_dict['detection_masks'], [0])
        # Reframe is required to translate mask from box coordinates to image coordinates and fit the image size.
        real_num_detection = tf.cast(tensor_dict['num_detections'][0], tf.int32)
        detection_boxes = tf.slice(detection_boxes, [0, 0], [real_num_detection, -1])
        detection_masks = tf.slice(detection_masks, [0, 0, 0], [real_num_detection, -1, -1])
        detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
            detection_masks, detection_boxes, image.shape[0], image.shape[1])
        detection_masks_reframed = tf.cast(
            tf.greater(detection_masks_reframed, 0.5), tf.uint8)
        # Follow the convention by adding back the batch dimension
        tensor_dict['detection_masks'] = tf.expand_dims(
            detection_masks_reframed, 0)
      image_tensor = tf.get_default_graph().get_tensor_by_name('image_tensor:0')

      # Run inference
      output_dict = sess.run(tensor_dict,
                             feed_dict={image_tensor: np.expand_dims(image, 0)})

      # all outputs are float32 numpy arrays, so convert types as appropriate
      output_dict['num_detections'] = int(output_dict['num_detections'][0])
      output_dict['detection_classes'] = output_dict[
          'detection_classes'][0].astype(np.uint8)
      output_dict['detection_boxes'] = output_dict['detection_boxes'][0]
      output_dict['detection_scores'] = output_dict['detection_scores'][0]
      if 'detection_masks' in output_dict:
        output_dict['detection_masks'] = output_dict['detection_masks'][0]
#     print(output_dict)
  return output_dict


def output(TEST_IMAGE_PATHS):
  image = Image.open(TEST_IMAGE_PATHS)
  # the array based representation of the image will be used later in order to prepare the
  # result image with boxes and labels on it.
  image_np = load_image_into_numpy_array(image)
  # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
  image_np_expanded = np.expand_dims(image_np, axis=0)
  # Actual detection.
  output_dict = run_inference_for_single_image(image_np, detection_graph)
  # Visualization of the results of a detection.
  vis_util.visualize_boxes_and_labels_on_image_array(
      image_np,
      output_dict['detection_boxes'],
      output_dict['detection_classes'],
      output_dict['detection_scores'],
      category_index,
      instance_masks=output_dict.get('detection_masks'),
      use_normalized_coordinates=True,
      line_thickness=8)
  img = Image.fromarray(image_np, 'RGB')
  buffered = BytesIO()
  img.save(buffered, format="PNG")
  img_base64 = base64.b64encode(buffered.getvalue())
  predict_name = output_dict.get('detection_classes')[0]
  predict_score = output_dict.get('detection_scores')[0] * 100
  predict_name = category_index.get(predict_name).get('name')
  
  
  crawler.find(predict_name)
  img = Image.open(predict_name+'/000001.jpg')
  buffered = BytesIO()
  img.save(buffered, format="JPEG")
  img_str = base64.b64encode(buffered.getvalue())
  return ({
    u"predict_name":predict_name,
    u"predict_score":predict_score,
    u"img":img_base64,
    u"celebrity":img_str
  })



def find_upload_data(db):
    doc_pull = db.collection(u'imgs').document(u'img')
    imgdata = doc_pull.get().to_dict()
    # machine learning function here!
    if imgdata is not None:
	imgmodel = imgdata['model']
	if imgmodel == "Anime":
		Fcnn_anime.find_upload_data(db)
		return
        imgdata = imgdata['base64']
        imgdata = base64.b64decode(imgdata)
        print("img successfully found")
        with open(filename, 'wb') as f:
            f.write(imgdata)

        upload_data = output(filename)
	
        doc_push = db.collection(u'output').document(u'output')
        doc_push.set(upload_data)
        db.collection(u'imgs').document(u'img').delete()
        print("upload img deleted")
    else:
        return 

