import Image from 'next/image'
import Button from '@material-tailwind/react/Button'
import { signIn } from 'next-auth/client'

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Image src="/images/1ui.png" height="300" width="550" objectFit="contain" />

            <Button
                color="blue"
                buttonType="filled"
                ripple="light"
                className="w-44 mt-10"
                onClick={signIn}
            >
                Login
            </Button>
        </div>
    )
}

export default Login
