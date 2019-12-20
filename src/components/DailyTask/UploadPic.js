import React, { useState } from 'react';
import { Icon, Upload, Modal } from 'antd';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });
}

function UploadPic({ upload }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const uploadPhoto = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
      upload(file);
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

UploadPic.propTypes = {
  upload: PropTypes.func.isRequired,
};

export default UploadPic;
