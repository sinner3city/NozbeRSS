import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import * as Styled from "./Loader.Styled"

function Loader({ size = 48 }) {
    return (
        <Styled.LoaderContainer>
            <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
        </Styled.LoaderContainer>
    )
}

export default Loader
