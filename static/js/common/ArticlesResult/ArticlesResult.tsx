import React, { Fragment } from 'react'
import cn from 'classnames'

import './ArticlesResult.scss'

interface ArticlesResultProps {
  article: string[] | undefined
}

const ArticlesResult: React.FC<ArticlesResultProps> = ({ article }) => {
  return (
    <div
      className={cn('ArticlesResult', {
        loading: !article,
      })}
    >
      {article ? (
        article.map((words, index) => (
          <Fragment key={index}>
            {/* <span className="ArticleResult-key">{key}</span> */}
            <span className="ArticlesResult-value">{words}</span>
          </Fragment>
        ))
      ) : (
        <Fragment>
          {/* <span className="ArticleResult-key"></span> */}
          <span className="ArticlesResult-value"></span>
          {/* <span className="ArticleResult-key"></span> */}
          <span className="ArticlesResult-value"></span>
          {/* <span className="ArticleResult-key"></span> */}
          <span className="ArticlesResult-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default ArticlesResult
