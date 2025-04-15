import { useStore } from "@/store/useStore"
import { useAppContext } from "@/hooks"
import reactLogo from "@assets/react.svg"

function Home() {
    const { users, increment } = useStore()
    const { settings, user, data } = useAppContext()

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1>Home #{users}</h1>

                <img src={reactLogo} className="logo react" alt="" />
                <button onClick={increment}>add+</button>
                <p>Theme: {settings.theme}</p>
                <p>User: {user.name}</p>
                <p>Data: {data.length}</p>
            </div>
        </>
    )
}

export default Home
