import React, { useState, useEffect } from 'react'
import { Uploader, Spinner } from 'common'
import { useTranslation } from 'react-i18next'
import { getJob, createJob, getListModels, readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl } from 'utils'
import { Button } from 'common'
import cn from 'classnames'

const GenerateAudio: React.FC = () => {
    const { t } = useTranslation('voiceCloning')
    const [curRadio, setCurRadio] = useState('text');
    const [options, setOptions] = useState<model[]>([]);
    const [curModelName, setCurModelName] = useState('default');
    const [inputText, setInputText] = useState('');
    const [textLanguage, setTextLanguage] = useState(2);   //1英文 2中文
    const [speechRate, setSpeechRate] = useState(1);  //文本语速设置


    const [currentTuuid, setCurrentTuuid] = useState<string>('')
    const [MSG, setMSG] = useState<string | number>('')
    const [result, setResult] = useState<string>('')
    const [previewURL, setPreviewURL] = useState<string>('')
    const [curFile, setCurFile] = useState<File | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

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

    type model = {
        name: string
        createdAt: string
    }

    useEffect(() => {
        getModels();
    }, []);

    //获取模型
    async function getModels() {
        try {
            const data: any = await getListModels(0, 100);
            if (data?.body?.listModelsResponse?.models) {
                setOptions(data.body.listModelsResponse.models)
            } else {
                console.log("error", data.body)
            }

        } catch (e) {
            console.log(e)
        }
    }

    //生成音频
    async function generateAudio(obj: object, modelName: string) {
        const data = await createJob(
            obj,
            // { sourceData: "今天是国庆节，大家早上好啊" },
            {
                outputPrefix: `${Math.random().toString(36).slice(-6)}`,
                voiceCloning: {
                    type: 1,
                    modelName: modelName,
                    language:textLanguage,
                    speechRate:speechRate
                },
                
            },
            `assets/speechConver`,
        )

        if (data.createJobResponse?.job?.id) {
            setCurrentTuuid(data.createJobResponse.job.id)
        } else {
            alert("error:" + data?.errorResponse?.message)
            setIsLoading(false)
            setIsUploading(false)
            setIsProcessing(false)

            setInputText('')
            setCurModelName('default')
            setPreviewURL('')
            setCurFile(undefined)
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
                    console.log(job);
                    let songName = job.outputs[0].smartContentResult?.voiceCloning?.voiceName

                    let result = `https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/speechConver/${songName}`

                    setResult(result)

                    setIsLoading(false)
                    setIsProcessing(false)

                    setInputText('')
                    setCurModelName('default')
                    setPreviewURL('')
                    setCurFile(undefined)
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

    const onDelete = () => {
        setPreviewURL('')
        setCurFile(undefined)
    }

    const onSubmit = async () => {
        if (curModelName === "") {
            alert(t`pleaseSelectModel`)
            return false;
        }

        if (curRadio === 'text') {

            if (inputText.trim() === "") {
                alert(t`pleaseInputText`)
                return false;
            }
            setIsLoading(true)
            setIsProcessing(true)
            generateAudio({ sourceData: inputText }, curModelName)

        } else if (curRadio === 'audio') {
            if (previewURL === "") {
                alert(t`pleaseInputAudio`)
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
                generateAudio({ url }, curModelName)
            }
        }
    }

    return (
        <div className="VoiceCloning-generate">
            <div className="VoiceCloning-main">
                <div className="VoiceCloning-preview">
                    <div className="VoiceCloning-formitem">
                        <div className="VoiceCloning-formitem-left">
                            <input
                                type="radio"
                                value="text"
                                checked={curRadio === 'text'}
                                onChange={(e) => { setCurRadio(e.target.value) }}
                                className="VoiceCloning-formitem-radio"
                            />

                            {t`inputText`}：
                        </div>

                        <div className="VoiceCloning-formitem-right">
                            <textarea
                                value={inputText}
                                onChange={(e) => { setInputText(e.target.value); }}
                                className="VoiceCloning-formitem-textarea"
                            />
                            <div className="upload-tip">{t`textTip`}</div>
                        </div>

                    </div>
                    {
                        curRadio === 'text' && (
                            <>
                                <div className="VoiceCloning-formitem">
                                    <div className="VoiceCloning-formitem-left">
                                        {t`outputLanguage`}：
                                    </div>
                                    <div className="VoiceCloning-formitem-right">
                                        <input
                                            type="radio"
                                            value={2}
                                            checked={textLanguage === 2}
                                            onChange={(e: any) => { setTextLanguage(parseInt(e.target.value)) }}
                                            className="VoiceCloning-formitem-radio"
                                        />
                                        {t`chinese`}&nbsp;&nbsp;
                                        <input
                                            type="radio"
                                            value={1}
                                            checked={textLanguage === 1}
                                            onChange={(e: any) => { setTextLanguage(parseInt(e.target.value)) }}
                                            className="VoiceCloning-formitem-radio"
                                        />
                                        {t`english`}
                                    </div>
                                </div>
                                <div className="VoiceCloning-formitem">
                                    <div className="VoiceCloning-formitem-left">
                                         {t`outputSpeed`}：
                                    </div>
                                    <div className="VoiceCloning-formitem-right">
                                        <input type="range"
                                            max={2}
                                            min={0}
                                            step={0.1}
                                            value={speechRate}
                                            onChange={(e) => { setSpeechRate(parseFloat(e.target.value)); }}
                                        />
                                        <span>{speechRate}</span>
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <div className="VoiceCloning-formitem">
                        <div className="VoiceCloning-formitem-left">
                            <input
                                type="radio"
                                value="audio"
                                checked={curRadio === 'audio'}
                                onChange={(e) => { setCurRadio(e.target.value); }}
                                className="VoiceCloning-formitem-radio"
                            />
                            {t`inputAudio`}：
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
                            <div className="upload-tip">{t`inputTip`}</div>
                        </div>

                    </div>
                    <div className="VoiceCloning-formitem">
                        <div className="VoiceCloning-formitem-left">
                            {t`selectModel`}：
                        </div>

                        <select id="select" value={curModelName} onChange={(e) => { setCurModelName(e.target.value); }} className="VoiceCloning-formitem-select">
                            <option value="default">default</option>
                            {options.map(option => (
                                <option key={option.name} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="VoiceCloning-button">
                        <Button loading={isLoading} onClick={onSubmit}>{t`generateAudio`}</Button>
                    </div>
                </div>
                <div className="VoiceCloning-result">
                    <h2 className="VoiceCloning-main-title">{t`displayResults`}</h2>
                    <div
                        className={cn('VoiceCloning-result-wrap', {
                            loading: isLoading,
                        })}>{MSG && !result ? (
                            <div className="VoiceCloning-result-message">{`${t`tip.processedFailed`} (${MSG})`}</div>
                        ) : (
                            <audio
                                src={result}
                                controls
                                controlsList="nodownload"
                            ></audio>
                        )}

                        <div className="VoiceCloning-result-cover">
                            <Spinner size={'20px'} />
                            <p className="VoiceCloning-result-cover-status">
                                {isProcessing && t(`tip.processingFile`)}
                                {isUploading && t(`tip.uploadingFile`)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateAudio;