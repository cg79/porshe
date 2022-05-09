
import Link from "next/link"

export default function Home(){
    //return <div>hi</div>

    console.log(process.env.REACT_APP_API_URL)
    return <Link href='/products'prefetch={false}>Products</Link>
}