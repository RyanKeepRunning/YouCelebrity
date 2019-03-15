import face_recognition
import os
import operator

# this function is used to encode all the known faces and restore them into a numpy.array
def encode_face(Stars):
    known_faces = []
    Stars_Name = []
    images_list = os.listdir(Stars);
    # store all the known image in "known_image" folder
    for image in images_list:
        if image != ".DS_Store":
            raw_image = face_recognition.load_image_file(Stars + "/" + image);
            try:
                image_encode = face_recognition.face_encodings(raw_image)[0]
                known_faces.append(image_encode);
                Stars_Name.append(image);
            except IndexError:
                print("I wasn't able to locate any faces in at least one of the images. Check the image files. Aborting...")
                continue;
    return known_faces, Stars_Name


# this function is used to calculate the distance between the known image and the test image
def face_distance_result(known_faces, Stars_Name, unknown_face):
    face_distance_result = {}
    raw_unknown_face = face_recognition.load_image_file(unknown_face);
    unknown_face_encoding = face_recognition.face_encodings(raw_unknown_face)[0];
    face_distances = face_recognition.face_distance(known_faces, unknown_face_encoding);
    for i, face_distance in enumerate(face_distances):
        face_distance_result[Stars_Name[i]] = face_distance

    sorted_face_distances = sorted(face_distance_result.items(), key=operator.itemgetter(1))
    for name, dis in enumerate(sorted_face_distances):
        print "%s: %s" % (name, dis)


unknown_face = "wenyunsong.jpeg"
known_faces, Stars_Name = encode_face("known_image");

face_distance_result(known_faces, Stars_Name, unknown_face);