import React, { useState } from 'react';
import { Icon, Upload, Modal } from 'antd';
import request from 'superagent';
import theme from '../../styles/theme';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });
}

function UploadPic() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url:
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url:
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);

  const onPhotoSelected = (file) => {
    const cloudName = 'moodbloom';
    const uploadPreset = 'jqzoqbwo';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    request
      .post(url)
      .field('upload_preset', uploadPreset)
      .field('file', file)
      .field('multiple', false)
      // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
      // .field('context', title ? `photo=${title}` : '')
      // .on('progress', (progress) => onPhotoUploadProgress(photoId, file.name, progress))
      // .end((error, response) => {
      //     onPhotoUploaded(photoId, fileName, response);
      // });
      .on('progress', (progress) => console.log(progress))
      .end((error, response) => {
        console.log(error, response);
        // set local state to response.body.secure_url for when we submit form to our database
      });
  };

  const uploadPhoto = ({ file, onSuccess }) => {
    console.log(file);
    // dummy success...upload to cloudinary
    setTimeout(() => {
      onSuccess('ok');
      onPhotoSelected(file);
    }, 0);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList: files }) => setFileList(files);

  const uploadButton = (
    <div>
      <Icon
        type="picture"
        style={{ fontSize: 32, color: theme.darkJungleGreen }}
      />
    </div>
  );

  return (
    <div>
      <Upload
        customRequest={uploadPhoto}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default UploadPic;
