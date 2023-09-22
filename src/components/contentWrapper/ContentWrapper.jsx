/* eslint-disable react/prop-types */
import './style.scss'

const ContentWrapper = (props) => {
  return (
    <div className='contentWrapper'>
      {props.children}  
    </div>
  )
}

export default ContentWrapper