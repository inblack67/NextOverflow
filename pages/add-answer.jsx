import Editor from 'rich-markdown-editor';

const AddAnswer = () => {
    return (
        <div className='container'>
            <Editor defaultValue='Talk JavaScript to me' placeholder='Can you code?' />
        </div>
    )
}

export default AddAnswer
