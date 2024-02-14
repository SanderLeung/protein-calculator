import { useState, useEffect, useRef } from 'react'
import Uppy from'@uppy/core'
import Tus from'@uppy/tus'
import GoogleDrive from '@uppy/google-drive'
import Webcam from '@uppy/webcam'
import RemoteSources from '@uppy/remote-sources' 
import { DashboardModal, ProgressBar } from'@uppy/react'
import { supabase } from '../supabaseClient'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/progress-bar/dist/style.css'

const FileUpload = ({ id }) => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    const STORAGE_BUCKET = 'labels'
    const supabaseStorageURL = `${SUPABASE_URL}/storage/v1/upload/resumable`
    const [open, setOpen] = useState(false);
    const access_token = useRef(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                access_token.current = session.access_token
                console.log(access_token)
            } catch (error) {
                console.error(error);
            }
        }

        fetchSession()
    }, [])

    const uppy = new Uppy({ 
        autoProceed: true, 
        debug: true,
        onBeforeFileAdded: (currentFile) => {
            const modifiedFile = {
              ...currentFile,
              name: `nutrition-${id}-${Date.now()}`
            }
            return modifiedFile
          }
    },)
    .use(Tus, { 
        endpoint: supabaseStorageURL,
        headers: {
            authorization: `Bearer ${access_token.current}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY
        }
    })
    .use(Webcam)
    //.use(RemoteSources, { companionUrl: 'https://companion.uppy.io', sources: ['GoogleDrive', 'Dropbox', 'OneDrive', 'Url'],
    //})

    const handleModalClick = () => {
        setOpen(!open)
    }

    uppy.on('file-added', (file) => {
        const supabaseMetadata = {
          bucketName: STORAGE_BUCKET,
          objectName: file.name,
          contentType: file.type,
        }

        file.meta = {
          ...file.meta,
          ...supabaseMetadata,
        }

        console.log('file added', file)
    })

    uppy.on('complete', (result) => {
        console.log('Upload complete! We’ve uploaded these files:', result.successful)
    })

  return (
    <div className=''>
        <div>
          <button onClick={handleModalClick}>
            { open ? 'Close dashboard' : 'Upload image'}
          </button>
          <DashboardModal
            uppy={uppy}
            open={open}
            theme='dark'
            target={document.body}
            onRequestClose={() => setOpen(false) }
          />
        </div>
      </div>
  )
}

export default FileUpload