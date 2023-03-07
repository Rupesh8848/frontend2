import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
export default function FilePreview({ fileType }) {
  const type = fileType;
  return <FileIcon extension={type} {...defaultStyles[type]} />;
}
