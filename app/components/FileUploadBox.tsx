'use client'

import { addToast, Button, cn, Progress, Snippet } from '@heroui/react';
import { CloudUpload, FileArchive, Upload } from 'lucide-react';
import { useState, DragEvent, useRef, ChangeEvent, Fragment } from 'react';
import { ByteFileSize, isFileSizeExceeded } from '../utils/size';
import { CheckInUpload } from '../core/github-actoins';
import { DLDOMAIN } from '../constant/config';

const FileUploadBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dLink, setDLink] = useState<false | string>(false);
  const [ReadyFile, setReadyFile] = useState<File | false>(false);
  const [isProcessing, setProcessing] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (isFileSizeExceeded(droppedFiles[0])) {
      addToast({
        title: "Rejected",
        description: "File size exceeds 25MB limit.",
        variant: 'flat',
        color: "danger",
      })
      return;
    }

    setReadyFile(droppedFiles[0]);
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (isFileSizeExceeded(selectedFiles[0])) {
        addToast({
          title: "Rejected",
          description: "File size exceeds 25MB limit.",
          variant: 'flat',
          color: "danger",
        })
        return;
      }

      setReadyFile(selectedFiles[0]);
    }
  };

  const onDivClick = () => {
    InputRef.current?.click();
  };

  const onClickUpload = async () => {
    setDLink(false)
    if (!ReadyFile) { return; }
    if (isFileSizeExceeded(ReadyFile)) {
      addToast({
        title: "Rejected",
        description: "File size exceeds 25MB limit.",
        variant: 'flat',
        color: "danger",
      })
      setProcessing(false);
      setReadyFile(false);
      return;
    }

    setProcessing(true);
    const response = await CheckInUpload(ReadyFile);
    setProcessing(false);
    setReadyFile(false);
    if (!response) {
      addToast({
        title: "Connection Error",
        description: "Try again",
        variant: 'flat',
        color: "warning",
      })
      setProcessing(false);
      setReadyFile(false);
      return;
    }
    setDLink(response.link)
    addToast({
      title: "Success",
      description: "Link valid for 30 days.",
      variant: 'flat',
      color: "success",
    })
  }

  return (
    <div className='flex max-w-full w-full flex-col items-center justify-center gap-y-2 p-6'>
      <div className='h-56 w-[450px] flex items-center justify-center'>
        <div
          onClick={onDivClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 flex flex-col items-center active:w-[395px] active:h-[182px] justify-center relative border-dashed border-white/50 w-[400px] h-48 rounded-2xl transition-all',
            isDragging ? 'border-indigo-700 w-[430px] h-52' : null
          )}>
          {
            ReadyFile ?
              <div className='flex flex-col pointer-events-none items-center justify-center mb-2'>
                <FileArchive
                  className={`pointer-events-none mb-2 transition-all ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`}
                  strokeWidth={1.5}
                  size={isDragging ? 44 : 42}
                />
                <span className='text-base pointer-events-none truncate max-w-72'>{ReadyFile.name}</span>
                <span className='pointer-events-none'>{ByteFileSize(ReadyFile.size)}</span>
              </div>
              : <Upload
                className={`pointer-events-none mb-2 transition-all ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`}
                size={isDragging ? 30 : 26}
              />
          }
          <p className="pointer-events-none text-lg font-semibold text-gray-700">
            {isDragging ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="pointer-events-none text-sm text-gray-500">
            or click to browse (max 5Mb)
          </p>
        </div>
      </div>
      {
        ReadyFile ? (
          <Fragment>
            <Button
              startContent={isProcessing ? null : <CloudUpload size={18} />}
              isLoading={isProcessing}
              isDisabled={isProcessing}
              className='bg-indigo-700 text-white'
              variant='flat'
              color='primary'
              onPress={onClickUpload}
            >Upload</Button>
            {
              isProcessing ?
                <Progress
                  classNames={{
                    base: 'max-w-full w-full',
                    track: "drop-shadow-md border border-default",
                    label: "text-foreground/60",
                    value: "text-foreground/60",
                  }}
                  label="Pushing.."
                  radius="sm"
                  showValueLabel={true}
                  size="sm"
                  color='secondary'
                  isIndeterminate
                /> : null
            }
          </Fragment>
        ) : null
      }
      {
        dLink ?
          <Snippet classNames={{
            base: 'max-w-full w-full',
            pre: 'truncate'
          }} symbol="#" variant="bordered">
            {`https://${DLDOMAIN}${dLink}`}
          </Snippet> : null
      }
      <input
        ref={InputRef}
        onChange={onFileInputChange}
        className='hidden'
        type='file' />
    </div>
  )
}

export default FileUploadBox
