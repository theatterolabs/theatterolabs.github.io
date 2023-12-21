export default {
  common: {
    lab: 'Tencent Media Lab',
    exp: 'Tencent Media Experience',
    smartContent: 'Tencent ConTech Platform',
    smartWriter: 'Smart Writer',
    smartProducer: 'Smart Producer',
    smartMusician: 'Smart Musician',
    samples: 'Samples',
    results: 'Results',
    keywords: 'Keywords',
    articles: 'Articles',
    chinese: 'Chinese',
    english: 'English',
    imageDir: 'Image Description',
    imageDescription: 'E-commerce Image Description',
    imageCaption: 'General Image Description',
    imageComposition: 'Image Composition',
    imageScene:'Image Scene Recognition',
    imageObject:'Image Object Detection',
    videoComposition: 'Video Composition',
    videoDir: 'Video Description',
    videoDescription: 'E-commerce Video Description',
    videoCaption: 'General Video Description',
    instrumentTransform: 'Instrument Transform',
    wzry: 'Game barrage commentary',
    musicDir: 'Music Description',
    lyrics: 'Lyrics Production',
    videoMusic: 'Video BGM Generation',
    musicVideo: 'Music Video Generation',
    football: 'Sport Highlights',
    gva: 'Game Video Analysis',
    videoCrop: 'Video Crop',
    BeatDir: 'Music Highlight',
    musicBeat: 'Beat Recognition',
    musicHighlight: 'Highlight Recognition',
    genreTransform: 'Genre Transform',
    instrumentTransfor: 'Instrument Transform',
    seperateTransform: 'Music Seperate',
    originalVideo: 'Original Video',
    originalImg: 'Original Image',
    originalAudio: 'Original Audio',
    originalMusic: 'Original Music',
    originalFile: 'Original File',
    silentVideo: 'Silent Video',
    generatedVideo: 'Video With Generated Music',
    processedVideo: 'Processed Video',
    processedAudio: 'Processed Audio',
    processedMusic: 'Processed Music',
    processedFile: 'Processed File',
    highlightStart: 'Start time',
    highlightEnd: 'End time',
    highlightScore: 'Score',
    smartCover: 'Smart Cover',
    coverResults: 'Cover Results',
    displayResults:'Display Results',
    generateAudio:'Generate Audio',
    trainModel:'Train Model',
    removeWatermark: 'Watermarks Detection',
    removedWatermarks: 'Watermarks Detected',
    watermarkUnsupported: 'Watermark is not supported, please contact smartmedia@tencent.com to update',
    ocr: 'Optical Character Recognition',
    OCRResult: 'Detection Result',
    smartVlog: 'Smart vlog',
    originalPicture: 'Original Picture',
    inputImage: 'Input Image',
    inputVideo: 'Input Video',
    recognitionResult:'Recognition Result',
    audioTagger: 'Audio Tagger',
    audioTaggerResult: 'Audio Tagger Result',
    game_ad_genre: 'Game Ad Genre',
    game_ad_mood: 'Game Ad Mood',
    game_ad_strength: 'Game Ad Strength',
    processedPicture: 'Processed Picture',
    imageEnhancement: 'Image Enhancement',
    singingConversion:'Singing Timbre Conversion',
    speechConversion:'Speech Tone Conversion',
    voiceCloning:'Voice Cloning',
    voiceCloning2:'Voice Cloning(real-time)',
    music: 'Music',
    file: 'File',
    detectionResult1:'Detection Result (Visualization)',
    detectionResult2:'Detection Result (Json)',
    videoScene:'Video Scene Detection',
    videoObject:'Video Object Detection',
    processDescription:'Process Description',
    btn: {
      upload: 'Upload',
      enter: 'Enter',
    },
    tip: {
      inputKeyword: 'Please input sentence (almost twenty characters)',
      inputURL: 'Please input your image URL',
      uploadingVideo: 'Uploading video',
      processingVideo: 'Processing video',
      uploadingAudio: 'Uploading audio',
      processingAudio: 'Processing audio',
      uploadingMusic: 'Uploading music',
      processingMusic: 'Processing music',
      uploadingPicture: 'Uploading picture',
      processingPicture: 'Processing picture',
      uploadingFile: 'Uploading file',
      uploadingData: 'Uploading data',
      processingFile: 'Processing file',
      progressModel:"Model Training in Progress",
      inputToken: 'Please input access token',
      invalidToken: 'Invalid token. Please make sure the token is correct.',
      invalidImageURL: 'Invalid image URL',
      keywordsFailed: 'Cannot generate keywords',
      articleFailed: 'Cannot generate articles',
      videoTimeLimit: 'Video time limit: 2min',
      videoSizeLimit: 'Video size limit: 2GB',
      videoSizeLimitDialog:'Due to browser limitations, please upload files smaller than 2GB.',
      videoFailed: 'Cannot process video',
      audioFailed: 'Cannot process audio',
      pictureFailed: 'Cannot process picture',
      processedFailed:'Processed Failed',
      emptyResult:'Empty Result',
      modelCompleted:'Model Training Completed',
    },
    cover: {
      cover1: 'Cover 1',
      cover2: 'Cover 2',
      cover3: 'Cover 3',
    },
    wzryResult: {
      time: 'Time',
      tag: 'Tag',
      caption: 'Caption',
      barrage: 'Barrage',
    },
    lyricsPannel: {
      head: 'Sentence',
      pattern: 'Rhyme Pattern',
      lyric: 'Normal Lyric',
      rap: 'Rap Lyric',
    },
    footballType: {
      original: 'Original',
      fast: 'Normal',
      slow: 'Slow',
      corner: 'Corner',
      free: 'Free',
    },
    genre: {
      original: 'Original',
      chinese: 'Chinese',
      pop: 'Pop',
      rnb: 'R&B',
      rock: 'Rock',
      dj: 'DJ',
      futurebass: 'Future Bass',
      opera: 'Opera',
      ballad: 'Ballad',
      light: 'Light',
    },
    instrument: {
      original: 'Original',
      Marimba: 'Marimba',
      Dulcimer: 'Dulcimer',
      Harp: 'Harp',
      MusicBox: 'MusicBox',
      Luan: 'Luan',
      Trombone: 'Trombone',
      AcousticGuitar: 'AcousticGuitar',
      Clarine: 'Clarine',
      Cello: 'Cello',
      Sax: 'Sax',
      Flute: 'Flute',
      Pipa: 'Pipa',
      GuZheng: 'GuZheng',
      Accordion: 'Accordion',
    },
    seperate: {
      original: 'Original',
      vocals: 'Vocals',
      drums: 'Drums',
      bass: 'Bass',
      piano: 'Piano',
      accompaniment: 'Other',
    },
    contactUs: 'Contact Us',
  },
  
  videoComposition:{
    intro:
      'Intelligent video analysis, automatically generating background music that matches emotions, styles, and rhythms.',
  },
  imageComposition:{
    intro:
      'Intelligent image analysis, automatically generating emotional and style matching background music, which can be applied in e-commerce, games, creative and other scenarios.',
  },
  imageDescription: {
    intro:
      'Generate specific categories of tags from the content on the image, and expand into paragraphs according to the tags. It supports custom language styles and subdivided fields, and can be applied to e-commerce, games and other scenarios.',
    supportsTip: 'Currently only supports outfit images',
  },
  imageCaption: {
    intro:
      'Generate specific categories of tags from the content on the image, and expand into paragraphs according to the tags. It supports custom language styles and subdivided fields, and can be applied to e-commerce, games and other scenarios.',
  },
  imageScene:{
    intro:
      'Automatically analyze the content of an image, and identify the scene category of the given image.',
  },
  videoDescription: {
    intro:
      'Identify elements such as scenes,events in the video,and generate corresponding tags or paragraphs based on them. It can customize subdivision fields or language styles, support real-time generation, and can be applied to scenes such as barrage.',
    supportsTip: 'Currently only supports outfit videos',
  },
  videoCaption: {
    intro:
      'Generate specific categories of tags from the content on the video, and expand into paragraphs according to the tags. It supports custom language styles and subdivided fields, and can be applied to e-commerce, games and other scenarios.',
  },
  singingConversion:{
    intro:
      'Extract the timbers from the song and convert them into customized timbers. Applied to voice conversion, AI singer and other scenarios.',
  },
  voiceCloning2:{
    intro:
      "The voice cloning technology models the vocal characteristics of specific individuals, allowing the conversion of anyone's speech input into highly realistic replicas with specific vocal characteristics. This technology is applied in scenarios such as virtual assistants and intelligent broadcasting.",
  },
  voiceCloning:{
    intro:
      "The voice cloning technology models the vocal characteristics of specific individuals, allowing the conversion of anyone's speech input into highly realistic replicas with specific vocal characteristics. This technology is applied in scenarios such as virtual assistants and intelligent broadcasting.",
    inputText:"Input Text",
    outputLanguage:"Output Language",
    outputSpeed:"Output Speech Speed",
    inputAudio:"input Audio",
    selectModel:"Select Model",
    modelName:"Model Name",
    trainingTimes:"Training Times",
    trainingData:"Training Data",
    delete:"Delete",
    pleaseSelect:"Please Select",
    pleaseSelectModel:"Please Select Model",
    pleaseInputText:"Please Input Text",
    pleaseInputAudio:"Please Input Audio",
    errorInputText:"Only English input is supported",
    modelNameFormat:"Combination of Letters and Underscores",
    incorrectName:"Incorrect Name Input",
    incorrectTimes:"Incorrect Times Input",
    incorrectData:"Please Input Training Data",
    nameExists:"Model Name Already Exists, Please Rename",
    textTip:"Text can be read out using model voices",
    inputTip:"The input voice can be replaced with model voices",
    trainingTip:"Only one segment of speech can be uploaded for training at one time"
  },
  wzry: {
    intro:
      'Identify elements such as scenes,events in the video,and generate corresponding tags or paragraphs based on them. It can customize subdivision fields or language styles, support real-time generation, and can be applied to scenes such as barrage.',
    supportsTip: 'Currently only supports Honor of Kings',
  },
  lyrics: {
    intro:
      'The lyrics creation engine can continue to write the first lyrics entered by the user, relying on the powerful AI algorithm capabilities behind it, can generate lyrics in both popular and rap modes, and provides a variety of rhyming modes to choose from. Quickly help musicians provide materials and creative ideas.',
  },
  videoMusic: {
    intro:
      'Automatically match background music that matches the video content and atmosphere, and generate new videos without manual editing. You can customize the music library or use our rich music library to score the video.',
    // tip: {
    //   videoFailed: 'Cannot process video longer than 2min',
    // },
  },
  musicVideo: {
    intro:
      'Find the video that best expresses its emotions or rhythm for your music, and automatically make a music MV. Support custom video library to create exclusive MV.',
  },
  genreTransform: {
    intro:
      'Through artificial intelligence, songs can be quickly adapted to opera, pop and other styles. Support vocal stripping, re-interpret the changed song.',
  },
  instrumentTransform: {
    intro:
      'Automatically convert music into a style played by various instruments such as piano, guitar, and guzheng to adapt to different styles of videos and provide more possibilities for video creation.',
  },
  seperateTransform: {
    intro:
      'Recognize and separate the vocals, drums, guitars, bass and other instruments in music, support multiple separation modes, and provide rich gameplay for dubbing, cover singing, and small videos.',
  },
  football: {
    intro:
      'Based on multi-modal recognition, analyze the content, automatically complete the stripping, soundtrack, and editing, make a video hightlights for a sports game to review the wonderful moments of the game.',
    supportsTip: 'Contact smartmedia@tencent.com to access more demos',
  },
  musicBeat: {
    intro:
      'Analyze rhythms, drum beats, climaxes, etc. in the music and mark their positions. Used in Video soundtrack, video editing, etc. to make the video more rhythmic.',
  },
  musicHighlight: {
    intro:
      'Analyze rhythms, drum beats, climaxes, etc. in the music and mark their positions. Used in Video soundtrack, video editing, etc. to make the video more rhythmic.',
  },
  gva: {
    intro:
      'Automatically recognize game actions, analyze game scenes, capture highlights in game videos and automatically complete stripping. With automatic cover, automatic soundtrack and other capabilities, it can provide editors and content distributors with rich materials.',
    supportsTip: 'The website currently only supports League of Legends and Call of Duty Mobile for gaming experiences. For more game experiences, please contact smartmedia@tencent.com.',
    originalVideo: 'Original Video',
    highlights: 'Highlight Results',
    lol:'League of Legends',
    cod:'Call of Duty'
  },
  videoCrop: {
    intro:
      'Dynamically recognize the visual attention area, and tailor the video to different scales to adapt to different playback terminals. It is common to convert horizontal screen video to vertical screen video, which is convenient for distribution and playback on mobile phones.',
  },
  smartCover: {
    intro:
      'Based on various video comprehension capabilities such as content understanding, face detection, and aesthetic analysis, comprehensively evaluate the content, color, structure and other information of the picture, and automatically select a still frame cover or a dynamic gif cover for the video.'
  },
  ocr: {
    intro:
    'Recognize the text information in the video, you can quickly add subtitles to the video.'
  },
  removeWatermark: {
    intro:
    'Detect the type of watermark contained in the video, and support adding and deleting watermarks at the same time. It can be used in scenarios such as content review, copyright monitoring, and copyright protection.'
  },
  smartVlog: {
    intro:
    'Automatically identify the wonderful segments in the video, and complete the editing, soundtrack, and generate a unique vlog.'
  },
  audioTagger: {
    intro:
    'Understand the dimensions of music intensity, mood, style, emotion, etc., and add corresponding tags to the music.'
  },
  imageEnhancement: {
    intro:
    'Repair and enhance human faces, texture details, and colors to improve image clarity.'
  },
  imageObject: {
    intro:
    'Automatically analyze the content of an image, identify and locate objects of interest in an image.'
  },
  videoScene:{
    intro:
    'Automatically analyze video content, identify the main scene categories of a given video, and give the corresponding time interval.'
  },
  videoObject:{
    intro:
    'Automatically analyze video content, identify the objects of interest in a given video.'
  }

}
