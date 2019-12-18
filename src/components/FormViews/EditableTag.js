import React, { useState, useEffect, useRef } from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';

const EditableTagGroup = () => {
  const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    // console.log(tags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) inputRef.current.focus();
  }, [inputVisible]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let newTags = [...tags];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...newTags, inputValue];
    }
    // console.log(tags);
    setTags(newTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div>
      {tags.map((tag, index) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: '78px' }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="plus" /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default EditableTagGroup;
