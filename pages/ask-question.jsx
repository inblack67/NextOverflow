import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { addQuestionMutation } from '../src/queries/questions';
import Router from 'next/router';
import Preloader from '../components/Preloader';

const AskQuestion = () => {

    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            title: 'Why Postman?',
            description: 'Why Bother?',
            tags: 'APIs'
        }
    });

    const [askQuestion, { loading, data }] = useMutation(addQuestionMutation);

    const onLogin = ({ title, description, tags }) => {
        setSubmitting(true);

        console.log(title, description, tags);

        askQuestion({
            variables: {
                title,
                description,
                tags
            },
        }).then(() => {
            M.toast({ html: 'Question Asked!' });
            Router.push('/');
        }).catch(err => {
            M.toast({ html: err });
        });

        setSubmitting(false);
    }

    if (loading) {
        return <Preloader />
    }

    console.log(data);

    return (
        <div className='container'>
            <p className="flow-text center">Ask</p>
            <form onSubmit={handleSubmit(onLogin)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="title"></label>
                    {errors.title ? <span className="helper-text red-text">{errors.title.message}</span> : <span className="helper-text white-text">Title</span>}
                </div>
                <div className="input-field">
                    <input type="text" name='description' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="description"></label>
                    {errors.description ? <span className="helper-text red-text">{errors.description.message}</span> : <span className="helper-text white-text">Description</span>}
                </div>
                <div className="input-field">
                    <input type="text" name='tags' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="tags"></label>
                    {errors.tags ? <span className="helper-text red-text">{errors.tags.message}</span> : <span className="helper-text white-text">Tags <span className="red-text">(Next.js, GraphQL, MERN)</span> </span>}
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
