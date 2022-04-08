import React, {useState} from "react";
import s from "./users.module.css";
import classNames from "classnames";
import UsersForm from "./UsersForm";



type paginatorType = {
    totalItems: number
    pagesSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    onFilterChanged:(filter: string, isFriend: boolean) => void
}

const Paginator:React.FC<paginatorType> = (props) => {

    let pagesCount = Math.ceil(props.totalItems / props.pagesSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionSize = 10
    let portions = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortion = (portionNumber - 1) * portionSize + 1
    let rightPortion = portionNumber  * portionSize

    return (
        <div className={s.paginationSection}>
            {
                portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>
            }
            {pages
                .filter(page => page >= leftPortion && page <= rightPortion)
                .map((p, index) => {
                return <span key={index} className={ classNames({ [s.selectedPage] : props.currentPage === p}, s.pages )}
                    onClick={ () => {props.onPageChanged(p)} }>{p}</span>
            })}
            {
                portions > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
            }
            <div>
            <UsersForm onFilterChanged={props.onFilterChanged} totalItems={props.totalItems}/>
            </div>
        </div>
    )
}

export default Paginator