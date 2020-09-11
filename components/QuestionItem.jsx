import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const QuestionItem = ({ question: { title, tags, description, _id, user: { name } } }) => {

    return (
        <div className='col s12 m6 l6'>
            <div className="card grey darken-3">
                <div className="card-content">
                    <span className="card-title">
                        {title}
                    </span>
                    <p>
                        ~ <span className="grey-text">{name}</span>
                    </p>
                </div>
                <div className="card-action">
                    <Link href='/question/[id]' as={`/question/${_id}`}>
                        <a>Explore</a>
                    </Link>
                    <a href="#!" className='secondary-content'>
                        {tags}
                    </a>
                </div>
            </div>
        </div>
    )
}

QuestionItem.propTypes = {
    question: PropTypes.object.isRequired,
}

export default QuestionItem
