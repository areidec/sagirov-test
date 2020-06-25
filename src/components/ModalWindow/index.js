import React from 'react';

import {SuccessSvg} from '../icons';

const ModalWindow = ({title}) => {
  return (
  <div className='modal-window'>
    <SuccessSvg className={'animateSvg'}/>
    {title}
  </div>
  )
}

export default ModalWindow;