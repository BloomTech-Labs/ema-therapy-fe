import React, { useState } from 'react';
import { Icon, Upload, Modal } from 'antd';
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

  const uploadPhoto = ({ file, onSuccess }) => {
    console.log(file);
    // dummy success...upload to cloudinary
    setTimeout(() => {
      onSuccess('ok');
    });
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
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default UploadPic;
