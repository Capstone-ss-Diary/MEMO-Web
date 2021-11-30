# -*- coding: utf-8 -*-
from __future__ import print_function
from __future__ import absolute_import

import sys
import numpy as np
import cv2
import os
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import json
import collections
import glob
import pickle
import random
import tensorflow as tf
import argparse

from unet import UNet
from utils import compile_frames_to_gif

# 글씨 있는 부분 좌표 추출
def crop_image(img):
    image = np.array(img)
    blur = cv2.GaussianBlur(image, ksize=(3,3), sigmaX=0)
    ret, thresh1 = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY)
    edged = cv2.Canny(blur, 10, 250)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (7,7))
    closed = cv2.morphologyEx(edged, cv2.MORPH_CLOSE, kernel)
    contours, _ = cv2.findContours(closed.copy(),cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    total = 0
    contours_xy = np.array(contours)
    x_min, x_max = 0,0
    value = list()
    for i in range(len(contours_xy)):
      for j in range(len(contours_xy[i])):
        value.append(contours_xy[i][j][0][0])
        x_min = min(value)
        x_max = max(value)
 
    y_min, y_max = 0,0
    value = list()
    for i in range(len(contours_xy)):
      for j in range(len(contours_xy[i])):
        value.append(contours_xy[i][j][0][1])
        y_min = min(value)
        y_max = max(value)

    x = x_min
    y = y_min
    w = x_max-x_min
    h = y_max-y_min

    return x, y, w, h

# 글씨 있는 부분으로만 자르고 비율로 리사이즈
def process_image(img, x, y, w, h, canvas_size):
    new_width = int(canvas_size * 0.5)
    new_height = int(new_width * h / w)
    if new_height > canvas_size - 10:
        new_height = int(canvas_size * 0.6)
        new_width = int(new_height * w / h)
    img = img.crop((x-1, y-1, x+w+1, y+h+1)).resize((new_width,new_height))
    new_left = int((canvas_size - img.width) / 2)
    new_top = int((canvas_size - img.height) / 2)
    result = Image.new("L", (canvas_size, canvas_size), color=255)
    result.paste(img, (new_left, new_top))

    return result

def make_handwriting_image(full_img, canvas_size, count):
    width, height = 135, 135
    x, y = 73, 146
    diff = 208

    startx, endx = x+width*(count%15), x+width*(count%15+1)
    starty, endy = y+diff*(count//15), y+diff*(count//15)+height
    image = full_img.crop((startx, starty, endx, endy))
    x, y, w, h = crop_image(image)
    image = process_image(image, x-5, y-5, w+10, h+10, canvas_size)
    return image

def draw_single_char(st, font, canvas_size, x_offset, y_offset):
    img = Image.new("RGB", (canvas_size, canvas_size), (255, 255, 255))
    draw = ImageDraw.Draw(img)
    draw.text((x_offset, y_offset), st, (0, 0, 0), font=font)
    x, y, w, h = crop_image(img)
    img = process_image(img, x, y, w, h, canvas_size)
    return img

def draw_example(ch, src_font, canvas_size, x_offset, y_offset, full_img, count):
    dst_img = make_handwriting_image(full_img, canvas_size, count)
    src_img = draw_single_char(ch, src_font, canvas_size, x_offset, y_offset)
    example_img = Image.new("RGB", (canvas_size * 2, canvas_size), (255, 255, 255))
    example_img.paste(dst_img, (0, 0))
    example_img.paste(src_img, (canvas_size, 0))
    return example_img

def font2img(src, stringset, char_size, canvas_size, x_offset, y_offset, sample_dir, label, full_img):
    src_font = ImageFont.truetype(src, size=char_size)
    count = 0
    for s in stringset:
        e = draw_example(' '+s, src_font, canvas_size, x_offset, y_offset, full_img, count)
        if e:
            e.save(os.path.join(sample_dir, "%02d_%04d.jpg" % (label, count)))
            count += 1

# train.obj와 val.obj 생성
def pickle_examples(paths, train_path, val_path, train_val_split):
    with open(train_path, 'wb') as ft:
        with open(val_path, 'wb') as fv:
            for p in paths:
                label = int(os.path.basename(p).split("_")[0])
                with open(p, 'rb') as f:
                    print("img %s" % p, label)
                    img_bytes = f.read()
                    r = random.random()
                    example = (label, img_bytes)
                    if r < train_val_split:
                        pickle.dump(example, fv)
                    else:
                        pickle.dump(example, ft)

# test.obj 생성
def pickle_tests(paths, test_path):
    with open(test_path, 'wb') as fv:
        for p in paths:
            label = int(os.path.basename(p).split("_")[0])
            with open(p, 'rb') as f:
                print("img %s" % p, label)
                img_bytes = f.read()
                example = (label, img_bytes)
                pickle.dump(example, fv)


def create_handwriting_dataset():
    src_font = '/handwriting/source_font.ttf'
    f = open("/handwriting/chosen_hangul.txt", 'r', encoding='UTF8')
    charset = f.readlines()
    char_size, canvas_size = 130, 256
    x_offset, y_offset = 20, 20
    sample_dir = '/handwriting/samples/'
    if not os.path.isdir(sample_dir):
        os.mkdir(sample_dir)
    experiment_dir = '/handwriting/experiment/'
    if not os.path.isdir(experiment_dir):
        os.mkdir(experiment_dir)
    save_dir = '/handwriting/experiment/data'
    if not os.path.isdir(save_dir):
        os.mkdir(save_dir)
    split_ratio = 0.1
    label = 54
    full_img = Image.open('/handwriting/210_written.jpg')

    print("create handwriting dataset function executing")

    font2img(src_font, charset, char_size, canvas_size, x_offset, y_offset, sample_dir, label, full_img)

    train_path = os.path.join(save_dir, "train.obj")
    val_path = os.path.join(save_dir, "val.obj")
    pickle_examples(sorted(glob.glob(os.path.join(sample_dir, "*.jpg"))), train_path=train_path, val_path=val_path, train_val_split=split_ratio)


def train_handwriting():
    experiment_dir = '/handwriting/experiment/'

    experiment_id = 0
    image_size = 256

    L1_penalty, Lconst_penalty, Ltv_penalty, Lcategory_penalty = 100, 15, 0.0, 1.0
    embedding_num, embedding_dim = 53, 2350

    epoch = 200
    batch_size = 16
    lr = 0.0005
    sample_steps, checkpoint_steps = 3000, 1000

    schedule = 10
    resume = 1
    freeze_encoder = True
    fine_tune = None
    inst_norm = 0
    flip_labels = None

    config = tf.ConfigProto()
    config.gpu_options.allow_growth = True

    with tf.Session(config=config) as sess:
        model = UNet(experiment_dir, batch_size=batch_size, experiment_id=experiment_id,
                    input_width=image_size, output_width=image_size, embedding_num=embedding_num,
                    embedding_dim=embedding_dim, L1_penalty=L1_penalty, Lconst_penalty=Lconst_penalty,
                    Ltv_penalty=Ltv_penalty, Lcategory_penalty=Lcategory_penalty)
        model.register_session(sess)
        if flip_labels:
            model.build_model(is_training=True, inst_norm=inst_norm, no_target_source=True)
        else:
            model.build_model(is_training=True, inst_norm=inst_norm)
        fine_tune_list = None
        if fine_tune:
            ids = fine_tune.split(",")
            fine_tune_list = set([int(i) for i in ids])
        model.train(lr=lr, epoch=epoch, resume=resume,
                    schedule=schedule, freeze_encoder=freeze_encoder, fine_tune=fine_tune_list,
                    sample_steps=sample_steps, checkpoint_steps=checkpoint_steps,
                    flip_labels=flip_labels)


def infer_handwriting():
    model_dir = './gdrive/MyDrive/MEMO-GAN/experiment/checkpoint/experiment_1_batch_16/'
    source_obj = './gdrive/MyDrive/MEMO-GAN/handwriting/test.obj'
    save_dir = './handwriting/'
    if not os.path.isdir(save_dir):
        os.mkdir(save_dir)

    batch_size = 235

    embedding_num, embedding_dim = 53, 2350
    embedding_ids = '54'
    count = 0

    inst_norm = 0

    config = tf.ConfigProto()
    config.gpu_options.allow_growth = True

    tf.reset_default_graph()

    with tf.Session(config=config) as sess:
        model = UNet(batch_size=batch_size, embedding_num=embedding_num, embedding_dim=embedding_dim)
        model.register_session(sess)
        model.build_model(is_training=False, inst_norm=inst_norm)
        embedding_ids = [int(i) for i in embedding_ids.split(",")]
        embedding_ids = embedding_ids[0]
        model.infer(model_dir=model_dir, source_obj=source_obj, embedding_ids=embedding_ids, save_dir=save_dir, count=count)





