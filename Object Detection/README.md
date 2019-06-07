# BUILDING MODEL AND EVALUATION:
Main idea is gatherred from [Object_Detection](https://github.com/tensorflow/models/tree/master/research/object_detection)

## BUILDING MODEL 
**1. Get models**:
Clone or download the pre-trained model from 
[models](https://github.com/tensorflow/models) and put the model under **models/research/object_detection** directory

**2. Training**:
Run the following command under **models/research/object_detection** to train the downloaded model:
```
python legacy/train.py --logtostderr --train_dir=PATH_OF_TRAIN_OUTPUT_DIR --pipeline_config_path=PATH_OF_CONFIG_FILE
```

**3. Export Model**:
Run the following command under **models/research/object_detection** to export the trained model:
```
python export_inference_graph.py \
    --input_type encoded_image_string_tensor \
    --pipeline_config_path /YOURPATH/pipeline.config \
    --trained_checkpoint_prefix /YOURPATH/model.ckpt-YOUR_CHECKPOINT \
    --output_directory /YOUR_OUTPUT_PATH/
```

## MODEL Evaluation 
Run the following command under **models/research/object_detection** to generate the evaluation results:
```
python legacy/eval.py --logtostderr --train_dir=PATH_OF_TRAIN_OUTPUT_DIR --pipeline_config_path=PATH_OF_CONFIG_FILE --checkpoint_dir=PATH_OF_TRAINED_CHECKPOINT --eval_dir=PATH_OF_EVAL_DIR
```
## Monitor training process in your 'PATH_OF_TRAIN_OUTPUT_DIR' through tensorboard

```bash
tensorboard --logdir=PATH_OF_TRAIN_OUTPUT_DIR
```
