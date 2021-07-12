import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { db } from '../firebase';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client'
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(module => module.Editor), {
    ssr: false,
})

const TextEditor = () => {
    const [session] = useSession();
    if (!session) return <Login />

    const router = useRouter();
    const { id } = router.query;

    const [snapShot] = useDocumentOnce(db.collection('user_docs').doc(session.user.email).collection('docs').doc(id))

    useEffect(() => {
        if (snapShot?.data()?.editorState) {
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(snapShot?.data()?.editorState)
                )
            );
        }
    }, [snapShot]);

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        console.log(editorState)

        db.collection('user_docs').doc(session.user.email).collection('docs').doc(id).set({

            editorState: convertToRaw(editorState.getCurrentContent())

        }, { merge: true })
    }
    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border" />
        </div>
    )
}

export default TextEditor
