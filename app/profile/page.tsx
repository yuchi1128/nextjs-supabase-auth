"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { data } from "autoprefixer";
import { useEffect } from "react";

/**
 * ログイン後のマイページ
 */
const MyPage = () => {
    const supabase = createClientComponentClient();
    useEffect(() => {
        async function getData() {
            const { data } = await supabase.auth.getSession();
            console.log(data);
            // ...
        }
        getData();
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
            <h1 className="text-2xl font-bold">
                ログインに成功しました
            </h1>
            <div className="pt-10">
                <form action="/auth/logout" method="post">
                    <button 
                     className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                     type="submit"
                     >
                        ログアウト
                    </button>
                </form>
            </div>
        </div>
    )
}


export default MyPage;