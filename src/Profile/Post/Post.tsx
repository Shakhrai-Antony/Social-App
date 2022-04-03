import React from "react";
import s from './Post.module.css'

type postType = {
    message: string
    likesCount: number
    id: number
}

const Post: React.FC<postType> = (props) => {
    return (
        <div className={s.post}>
            <div className={s.postAva}>
                <img src="https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/2/2020/01/shutterstock_1268241238-2-768x512.jpg"/>
                {props.message}
            </div>
            <span>
                {props.likesCount}
            </span>
        </div>
    )
}

export default Post