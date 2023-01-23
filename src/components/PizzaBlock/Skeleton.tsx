import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={250}
        height={465}
        viewBox="0 0 250 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="128" cy="122" r="118" />
        <rect x="9" y="245" rx="13" ry="13" width="237" height="21" />
        <rect x="8" y="282" rx="9" ry="9" width="239" height="63" />
        <rect x="10" y="357" rx="8" ry="8" width="88" height="26" />
        <rect x="209" y="453" rx="0" ry="0" width="0" height="3" />
        <rect x="127" y="357" rx="28" ry="28" width="122" height="38" />
    </ContentLoader>
)

export default Skeleton;