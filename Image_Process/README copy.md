# YouCelebrity User Guide

This is a simple instruction about how to activate the image processing function which is located in google cloud platform

## Step 1
First you need download the public key file "pubkey" to your local machine and input code below in your ternimal:
```ssh -i <path_of_pubkey> cyg@35.244.113.146```
The gcp will then ask you for the password, just input "159357".

## Step 2
Then you need go to the object_detection folder as follow:
```cd models\research\object_dectection```

## Step 3
Run the python file "modelselection.py"
```python modelselection```