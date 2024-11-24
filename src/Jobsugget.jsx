import React from 'react'

const Jobsugget = ({url,title,by,time}) => {
  const foramatime=new Date(time*1000).toLocaleString();
  return (
<div className='posts' role='itemlist'>
  <h2 className='post_title'>

    <a className={url?"":"Inactivelink"} href={url} target='_blank' rel='nopener'>{title}</a>
  </h2>
  <span>by--{foramatime}</span>
  
</div>
  )
}

export default Jobsugget