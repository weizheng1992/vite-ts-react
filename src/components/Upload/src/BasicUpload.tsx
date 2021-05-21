import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { buildUUID } from '/@/utils/uuid';
import { checkFileType } from './utils';
import { isString } from '/@/utils/is';
import { commonUploadApi } from '/@/api/common/index';
interface UploadParams {
  value?: any;
  onChange?: any;
  maxSize?: number;
  accept?: string[];
  maxCount?: number;
  multiple?: boolean;
}
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';
export interface FileItem {
  thumbUrl?: string;
  name: string;
  status?: UploadFileStatus;
  uid: string;
  url: string;
}
const BasicUpload: React.FC<UploadParams> = (props) => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  useEffect(() => {
    if (props.value && isString(props.value)) {
      const valList: string[] = props.value.split(',');
      const list: FileItem[] = [];
      valList.map((item) => {
        const nameArr = item.split('/');
        const nameStr = nameArr[nameArr.length - 1];
        const nameStrArr = nameStr.split('-');
        const nameStrStr = nameStrArr[nameStrArr.length - 1];
        const fileItem: FileItem = {
          uid: buildUUID(),
          status: 'done',
          url: item,
          name: nameStrStr,
        };
        list.push(fileItem);
      });
      setFileList(list);
    }
  }, [props.value]);

  const beforeUpload = (file: File) => {
    const { maxSize = 10, accept = [] } = props;
    if (maxSize && file.size / 1024 / 1024 >= maxSize) {
      message.error(`文件不能超出${maxSize}MB`);
      return false;
    }
    // 设置类型,则判断
    if (accept.length > 0 && !checkFileType(file, accept)) {
      message.error(`文件不能超出${maxSize}MB`);
      return false;
    }
    return false;
  };

  const handleChange = async (info: any) => {
    const { maxCount = Infinity, onChange } = props;

    const list = info.fileList;
    const valList: string[] = [];
    if (list.length > 0 && list.length > maxCount) {
      message.error(`文件最多上传${maxCount}个`);
      return false;
    }
    for (let index = 0; index < list.length; index++) {
      if (list[index].status !== 'done') {
        const { data } = await commonUploadApi({ file: list[index].originFileObj });
        console.log('upload', data.data);
        const obj = JSON.parse(data.data);
        list[index].url = obj.file_url;
        valList.push(obj.file_url);
        list[index].percent = 100;
        list[index].status = 'done';
      } else {
        valList.push(list[index].url);
      }
    }
    setFileList(list);
    console.log(valList);
    onChange(valList);
  };
  const { multiple = true, accept = [] } = props;
  const getStringAccept = () => {
    return accept.map((item) => `.${item}`).join(',');
  };
  const onRemove = (file) => {
    const index = fileList.findIndex((item) => item.uid === file.uid);
    if (index !== -1) {
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    }
  };
  return (
    <Upload
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      multiple={multiple}
      accept={getStringAccept()}
      onRemove={onRemove}
    >
      <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
  );
};

export default BasicUpload;
