
import React, { useState, useEffect } from 'react'
import { Uploader, Spinner } from 'common'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { getJob, createJob, readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, CDN_COS } from 'utils'
import { Button } from 'common'


const TrainingModel: React.FC = () => {
    const { t } = useTranslation('voiceCloning')
    const [modelName, setModelName] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [trainingCount, setTrainingCount] = useState('30');
    const [previewURL, setPreviewURL] = useState<string>('')
    const [curFile, setCurFile] = useState<File | undefined>(undefined)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [currentTuuid, setCurrentTuuid] = useState<string>('')
    const [result, setResult] = useState<string>('')
    const [MSG, setMSG] = useState<string | number>('')

    const handleModelName = (event: any) => {
        setModelName(event.target.value);
    }
    const handleTrainingCount = (event: any) => {
        setTrainingCount(event.target.value);
    }

    const onSubmit = async () => {
        const regex = /^[a-zA-Z0-9_]+$/;

        if (!regex.test(modelName)) {
            alert(t`incorrectName`)
            return false
        }

        if(!(parseInt(trainingCount) >=0 && parseInt(trainingCount)<=50)){
            alert(t`incorrectTimes`)
            return false
        }

        if (previewURL === "") {
            alert(t`incorrectData`)
            return false;
        }

        if (curFile) {
            setIsLoading(true)
            setIsUploading(true)
            const cosKey = `${BACK_ENV}/speechconver/${curFile?.size}-${curFile?.name}`
            await putObjectSlice(curFile, cosKey)
            const url = await getTempUrl(cosKey)
            setIsUploading(false)
            setIsProcessing(true)
            trainingModel({ url })
        }
    }

    useEffect(() => {
        if(localStorage.getItem("trainingModel")){
            let data = JSON.parse(localStorage.getItem("trainingModel")  as string)

            setCurrentTuuid(data.id)
            setModelName(data.modelName)
            setTrainingCount(data.trainingCount)
            setPreviewURL(data.url)

            setIsLoading(true)
            setIsProcessing(true)
        }
    },[])

    //生成模型
    async function trainingModel(obj: object) {
        const data = await createJob(
            obj,
            {
                outputPrefix: `${Math.random().toString(36).slice(-6)}`,
                voiceCloning: {
                    type: 2,
                    totalEpoch: trainingCount,
                    modelName: modelName
                }
            },
            `assets/speechConver`,
        )

        if (data.createJobResponse?.job?.id) {
            setCurrentTuuid(data.createJobResponse.job.id)

            localStorage.setItem('trainingModel', JSON.stringify({id:data.createJobResponse.job.id,trainingCount,modelName,...obj}))
        }else if(data.errorResponse){
            setIsProcessing(false)
            setIsLoading(false)
            alert(t`nameExists`)
        }
    }

    useEffect(() => {

        async function request() {

            setResult('')
            setMSG('')

            try {
                const data = await getJob(currentTuuid)
                const job = data.getJobResponse?.job
                if (job && job.state === 3) {
                    let resModelName = job.outputs[0].smartContentResult?.voiceCloning?.modelName

                    if(resModelName){
                        setResult(resModelName)

                        setIsLoading(false)
                        setIsProcessing(false)

                        setTrainingCount('')
                        setModelName('')
                        setPreviewURL('')
                        setCurFile(undefined)

                        localStorage.setItem('trainingModel','')
                    }
                    
                } else {
                    if (data.errorResponse) {
                        setIsLoading(false)
                        setIsProcessing(false)
                        setMSG(data.errorResponse.message)
                    } else if (job) {
                        if (job.state === 4) {
                            setIsLoading(false)
                            setIsProcessing(false)
                            setMSG('Job Failed')
                        } else if ([1, 2].includes(job.state)) {
                            setTimeout(request, 500)
                        }
                    }
                }
            } catch (e) {
                setTimeout(request, 500)
                console.log(e)
            } 
        }

        currentTuuid && request()

    }, [currentTuuid])

    const onUpload = async (files: FileList | null) => {
        if (!files || !files.length) return

        const file = files[0]
        const target = await readFile(file)
        if (target) {
            const url = target.result as string
            setPreviewURL(url)
            setCurFile(file)
        }
    }

    const onDelete = () => {
        setPreviewURL('')
        setCurFile(undefined)
    }

    return (
        <div className="VoiceCloning-tranining">
            <div className="VoiceCloning-main">
                <div className="VoiceCloning-preview">
                    {/* <h2 className="VoiceCloning-main-title">{t`originalFile`}</h2> */}
                    <div className="VoiceCloning-formitem">
                        <div className="VoiceCloning-formitem-left">
                            {t`modelName`}：
                        </div>
                        <input
                            type="text"
                            value={modelName}
                            onChange={handleModelName}
                            className="VoiceCloning-formitem-text"
                            placeholder={t`modelNameFormat`}
                        />

                    </div>
                    <div className="VoiceCloning-formitem">
                        <div className="VoiceCloning-formitem-left">
                            {t`trainingTimes`}：
                        </div>
                        
                        <input
                            type="number"
                            value={trainingCount}
                            onChange={handleTrainingCount}
                            className="VoiceCloning-formitem-text"
                            placeholder="0-50"
                        />

                    </div>
                    <div className="VoiceCloning-formitem">
                        <div className="VoiceCloning-formitem-left">
                            {t`trainingData`}：
                        </div>
                        
                        <div className="VoiceCloning-formitem-upload">
                            {!previewURL && (
                                <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3" />
                            )}

                            {previewURL && (
                                <div className="VoiceCloning-formitem-preview">
                                    <audio
                                        src={previewURL}
                                        controls
                                        controlsList="nodownload"
                                    ></audio>
                                    <span className="VoiceCloning-formitem-del" onClick={onDelete}>{t`delete`}</span>
                                </div>
                            )}
                            <div className="upload-tip">{t`trainingTip`}</div>
                        </div>
                    </div>
                    <div className="VoiceCloning-button">
                        <Button loading={isLoading} onClick={onSubmit}>{t`trainModel`}</Button>
                    </div>
                </div>
                <div className="VoiceCloning-result">
                    <h2 className="VoiceCloning-main-title">{t`processDescription`}</h2>
                    <div
                        className={cn('VoiceCloning-result-wrap', {
                            loading: isLoading,
                        })}>{MSG && !result ? (
                            <div className="VoiceCloning-result-message">{`${t`tip.processedFailed`} (${MSG})`}</div>
                        ) : 
                            (result && (<p>{result} {t(`tip.modelCompleted`)}</p>))
                        }

                        <div className="VoiceCloning-result-cover">
                            <Spinner size={'20px'} />
                            <p className="VoiceCloning-result-cover-status">
                                {isProcessing && t(`tip.progressModel`)}
                                {isUploading && t(`tip.uploadingData`)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainingModel;