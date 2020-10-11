import { server } from '../src/server';

const About = () => {
	return (
		<div className='container center'>
			<div>
				<hr />
				<h5>StackOverflow Clone And Beyond</h5>
				<p>Nextjs | GraphQL | Apollo | MongoDB | Firestore | Materialize</p>
				{process.env.NODE_ENV !== 'production' ? (
					<a target='_blank' href={`${server}/api/graphql`} className='btn red'>
						Go Play
					</a>
				) : null}
				<p>
					<strong>
						Next<span className='red-text'>Overlow</span> &copy; 2020
					</strong>
				</p>
				<a href='https://github.com/inblack67/NextOverflow' rel='noopener noreferrer' target='_blank'>
					<i className='fab fa-github fa-2x red-text' />
				</a>
			</div>
		</div>
	);
};

export default About;
