import Banner from "./Components/Banner";

export default function HomePage() {
    return (
        <>
            <div className="banner">
                <Banner />
            </div>
            <div className="recommend1">
                <p>추천1</p>
            </div>
            <div className="recommend2">
                <p>추천2</p>
            </div>
        </>
    )
}