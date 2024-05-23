import React from 'react';
import { connect } from 'react-redux';
import * as apiActions from "foundation/Application/client/AuditDocument/actions";
import { getAuditDocumentStatus } from 'foundation/Application/client/AuditDocument/accessors';
import { LinkButton } from '@pmi/dsm-react-bs4';
import ProgressBar from 'feature/PageComponents/client/components/ProgressBar';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import "./dropzone.scss";

class FileDropZone extends React.Component {

state = {
  isFileRequest: false,
  progress:0,
};

constructor(props) {
  super(props);
  this.fileInputRef = React.createRef();
  this.ErrorPanelRef = React.createRef();
}

dragOver = (e) => {
  e.preventDefault();
}

dragEnter = (e) => {
  e.preventDefault();
}

dragLeave = (e) => {
  e.preventDefault();
}

fileDrop = (e) => {
  e.preventDefault();
  // avoid mulitple file drop
  if(!this.state.isFileRequest)
  {
    const files = e.dataTransfer.files;
    if (files.length) {
      this.handleFiles(files);
    }
  }
}

filesSelected = () => {
  const fileCtl = document.getElementById("file-drop-zone-ctl");
  if (fileCtl.files.length) {
    this.handleFiles(fileCtl.files);
  }
}

handleFiles = (files) => {
  if(files.length > 0) {
    if (this.validateFile(files[0])) {
      const { auditDocument } = this.props;
      const apiParam = {
        "data":files[0],
        "_links":auditDocument._links,
        "onSuccess":this.onSuccessUpload,
        "customErrorHandling":this.onFailureUpload,
      }
      this.props.uploadAuditDocument(apiParam);
      this.setState({
        isFileRequest: true,
      });
      this.updateProgress();
    }
  }
}

onFailureUpload = () => {
  const {fields} = this.props;
  clearInterval(this.interval);
  this.setState({
    isFileRequest: false,
  });
  this.ErrorPanelRef.current.innerText = fields.ForbiddenErrorMessage.value;
}

onSuccessUpload = () => {
  this.props.onClose();
}

componentWillUnmount() {
  clearInterval(this.interval);
}

updateProgress =  () => {
  this.interval = setInterval(() => {
    if(this.state.progress >= 80)
    {
      clearInterval(this.interval);
    }
    else
    {
      this.setState(prevState => ({
        progress: prevState.progress + 5,
      }));
    }
  }, 100);
}

validateFile = (file) => {
  const {fields, sitecoreSettings} = this.props;
  const DEFAULT_VALID_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff', 'application/pdf'];
  const validFileType = sitecoreSettings?.auditSettings?.fileType?.value ?? DEFAULT_VALID_TYPES;
  const DEFAULT_FILE_SIZE = 10000000;
  const fileSize = sitecoreSettings?.auditSettings?.fileSize?.value ?? DEFAULT_FILE_SIZE;
  if (validFileType.indexOf(file.type) === -1) {
    this.ErrorPanelRef.current.innerText = fields.FileTypeErrorMessage.value;
    return false;
  }
  if(file.size > fileSize)
  {
    this.ErrorPanelRef.current.innerText = fields.FileSizeErrorMessage.value;
    return false;
  }
  this.ErrorPanelRef.current.innerText = "";
  return true;
}

fileInputClicked = () => {
  this.fileInputRef.current.click();
}

render() {
  const {isFileRequest, progress} = this.state;
  const {fields} = this.props;
  return (
    <>
      <div className="container">
        <div className="drop-container" onDragOver={this.dragOver}
          onDragEnter={this.dragEnter}
          onDragLeave={this.dragLeave}
          onDrop={this.fileDrop}>
          <div className="drop-message">
            <input
              id="file-drop-zone-ctl"
              className="dropzone-file-input"
              type="file"
              multiple={false}
              onChange={this.filesSelected}
              disabled={isFileRequest}
              ref={this.fileInputRef}
            />
            <div>
              <Text field={fields.Description} /> <LinkButton onClick={this.fileInputClicked} titleText={fields.FileOpenContent.value} className="fileUploadBtn" />
            </div>
            <div className="mt-5">
              <Text field={fields.FileTypeAndSizeMessage} />
            </div>
          </div>
        </div>
        <div ref={this.ErrorPanelRef} className="text-danger mt-2" />
        <div className={isFileRequest ? "d-block mt-5 uploading-panel" : "d-none mt-5 uploading-panel"}>
          <h4><Text field={fields.UploadingHeader} /></h4>
          <ProgressBar bgcolor="#4f17a8" completed={progress} className="mt-4" />
        </div>
      </div>
    </>
  )
}
}

const mapStateToProps = state => ({
  sitecoreSettings: getGlobalSettings(state),
  getAuditDocumentStatus: getAuditDocumentStatus(state),
});

const mapDispatchToProps = dispatch => ({
  uploadAuditDocument: (data) => dispatch(apiActions.uploadAuditDocument(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileDropZone);
