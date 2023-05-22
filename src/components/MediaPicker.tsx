'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPreview {
  mediaType: string
  previewURL: string
}

interface PreviewProps {
  data: MediaPreview
}

function Preview({ data }: PreviewProps) {
  if (data.mediaType.startsWith('video')) {
    return (
      <video
        src={data.previewURL}
        controls={true}
        autoPlay
        muted
        className="a-full aspect-video rounded-lg object-cover"
      />
    )
  }

  return (
    // eslint-disable-next-line
    <img
      src={data.previewURL}
      alt=""
      className="a-full aspect-video rounded-lg object-cover"
    />
  )
}

export function MediaPicker() {
  const [preview, setPreview] = useState<MediaPreview | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || files.length < 1) {
      return
    }

    const mediaType = files[0].type

    const previewURL = URL.createObjectURL(files[0])

    setPreview({ mediaType, previewURL })
  }

  return (
    <>
      <input
        name="coverUrl"
        onChange={onFileSelected}
        type="file"
        id="media"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
      />
      {preview && <Preview data={preview} />}
    </>
  )
}
