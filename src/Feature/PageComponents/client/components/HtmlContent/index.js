import React, { useState, useEffect } from 'react';

const HtmlContent = ({ fields, params }) => {
  const [loadingStarted, setLoadingStarted] = useState(false);

  useEffect(() => {
    if (!fields && !params) return;
    let isScript;
    if(params)
    {
      isScript = params.isScript ? params.isScript : params.IsScript;
    }
    else
    {
      isScript = fields.IsScript.value;
    }
    if (!loadingStarted && isScript) {
      setLoadingStarted(true)
      try {
        let scriptContent;
        if(params)
        {
          scriptContent = params.content ? params.content : params.Content;
        }
        else
        {
          scriptContent = fields.Content.value;
        }
        const scripts = document.createRange().createContextualFragment(scriptContent);
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(scripts);
      } catch (err) {
        console.error(err);
      }
    }
  }, [loadingStarted, fields, params]); // Only re-run the effect if loadingStarted or fields changes

  if(fields || params)
  {
    let isScript;
    if(params)
    {
      isScript = params.isScript ? params.isScript : params.IsScript;
    }
    else
    {
      isScript = fields.IsScript.value;
    }
    if (!isScript) {
      let content;
      if(params)
      {
        content = params.content ? params.content : params.Content;
      }
      else
      {
        content = fields.Content.value;
      }
      return <div className="custom-html-include" dangerouslySetInnerHTML={{__html: content}} />;
    }
  }
  return null;
};

export default HtmlContent;