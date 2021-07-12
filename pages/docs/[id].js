import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon';
import { useRouter } from 'next/dist/client/router';
import { db } from '../../firebase';
import {useDocumentOnce } from 'react-firebase-hooks/firestore';
import { getSession, signOut, useSession } from 'next-auth/client'
import Login from '../../components/Login';
import Head from 'next/head'
import TextEditor from '../../components/TextEditor';

const Doc = () => {
    const [session] = useSession();
    if (!session) return <Login />

    const router = useRouter();
    const { id } = router.query;

    const [snapShot, loadingSnapShot] = useDocumentOnce(db.collection('user_docs').doc(session.user.email).collection('docs').doc(id));

    if (!loadingSnapShot && !snapShot.data()?.fileName) {
        router.replace('/')
    }
    return (
        <div>
            <Head>
                <title>Docs | {snapShot?.data()?.fileName}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="flex justify-between items-center p-3 pb-1">
                <span onClick={() => router.push('/')} className="cursor-pointer">
                    <Icon name="description" size="5xl" color="blue" />
                </span>


                <div className="flex-grow px-2">
                    <h2 className="">{snapShot?.data()?.fileName+'.txt'}</h2>
                    <div className="flex items-center text-sm capitalize space-x-1 ml-1 h-8 text-gray-600">
                        <p className="option">file</p>
                        <p className="option">Edit</p>
                        <p className="option">view</p>
                        <p className="option">insert</p>
                        <p className="option">format</p>
                        <p className="option">tools</p>
                    </div>

                </div>
                <Button
                 color="lightBlue"
                 buttonType="filled"
                 size="regular"
                 rounded={false}
                 block={false}
                 iconOnly={false}
                 ripple="light"
                 className="hidden md:inline-flex h-10">
                    <Icon name="people" size="md" />SHARE
                </Button>
                <img onClick={()=>signOut()} className="rounded-full cursor-pointer h-10 w-10 ml-2" src={session.user.image} alt="" />
            </header>
            <TextEditor/>
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context) {

    await new  Promise((resolve)=>{
      setTimeout(resolve,2500)
    })
    const session = await getSession(context)
    return {
      props: {
        session
      }
    }
  
  }
