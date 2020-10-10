import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { addQuestionMutation } from '../src/queries/questions';
import { getMeQuery } from '../src/queries/auth';
import Router from 'next/router';
import Preloader from '../components/Preloader';
import GrayMatter from 'gray-matter';
import Marked from 'marked';
import ReactMarkdown from 'react-markdown';
import CodeBlocks from '../components/CodeBlocks';
import syntaxTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Why Bother?
// ```js
// console.log('hello hell');
// ```

const AskQuestion = () => {

    const [submitting, setSubmitting] = useState(false);

    const [mdContent, setMdContent] = useState('\`\`\`js console.log(\'hello\') \`\`\`');

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            title: 'Why Postman?',
            description: 'Why Bother?',
            tags: 'APIs'
        }
    });

    const onChange = e => {
        const input = e.target.value;
        const mdData = GrayMatter(input).content;
        const mdHTML = Marked(mdData);
        setMdContent(mdHTML);
    }

    const onAsk = ({ title, description, tags }) => {
        setSubmitting(true);

        // askQuestion({
        //     variables: {
        //         title,
        //         description,
        //         tags
        //     },
        // }).then(() => {
        //     M.toast({ html: 'Question Asked!' });
        //     Router.push('/');
        // }).catch(err => {
        //     M.toast({ html: err });
        // });

        setSubmitting(false);
    }

    return (
        <div className='container'>
            <p className="flow-text center">Ask</p>
            <form onSubmit={handleSubmit(onAsk)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="title"></label>
                    {errors.title ? <span className="helper-text red-text">{errors.title.message}</span> : <span className="helper-text white-text">Title</span>}
                </div>
                <div className="input-field">
                    <input type="text" name='tags' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="tags"></label>
                    {errors.tags ? <span className="helper-text red-text">{errors.tags.message}</span> : <span className="helper-text white-text">Tags <span className="red-text">(Next.js, GraphQL, MERN)</span> </span>}
                </div>
                <div className="input-field">
                    <textarea name="description" id="description" className='materialize-textarea' ref={register({
                        required: 'Required!'
                    })} onChange={onChange}></textarea>
                    <label htmlFor="description"></label>
                    {errors.description ? <span className="helper-text red-text">{errors.description.message}</span> : <span className="helper-text white-text">Description</span>}
                </div>
                <div>
                    {/* <ReactMarkdown
                        source={mdContent}
                        renderers={{ code: CodeBlocks }}
                    /> */}
                            <SyntaxHighlighter style={syntaxTheme} >
                                {mdContent}
                            </SyntaxHighlighter>
                    <div dangerouslySetInnerHTML={{__html: mdContent}} />
                </div>
                <div className="input-field">
                    <button type="submit" className='btn red' disabled={submitting} >
                        Ask
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AskQuestion;