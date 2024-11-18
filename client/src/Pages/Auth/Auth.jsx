import React, { useEffect } from 'react'
import AuthWithGoogle from '../../myComponents/AuthWithGoogle/AuthWithGoogle'
import { useSelector } from 'react-redux'
import { Hourglass } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Auth = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // title change
  useEffect(() => {
    document.title = "Auth | Vorria Ai"
  }, [])

  return (
    <>
      {
        auth.loading ?
          <div className='min-h-screen w-full h-screen flex justify-center items-center'>
            <Hourglass
              visible={true}
              height="50"
              width="50"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#306cce', '#72a1ed']}
            />
          </div> :
          <div>
            <AuthWithGoogle />
          </div>
      }
    </>
  )
}

export default Auth