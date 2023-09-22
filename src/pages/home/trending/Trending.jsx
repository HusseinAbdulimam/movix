import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";


const Trending = () => {
    const [endPoint, setEndPoint] = useState('day')
    const {data, loading} = useFetch(`/trending/all/${endPoint}`)
    const onTabChande = (tab) => {
        setEndPoint(tab === "day" ? "day" : "week")
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={['day', 'week']} onTabChande={onTabChande} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    );
}

export default Trending;
