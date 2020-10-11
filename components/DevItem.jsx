import PropTypes from 'prop-types';
import FormatDate from './FormatDate';
import Link from 'next/link';

const DevItem = ({ user: { name, image, createdAt, _id } }) => {
	return (
		<div className='col s12 m6 l6'>
			<div className='card grey darken-4 medium'>
				<div className='card-image'>
					<img src={image} alt={name} className='responsive-img' />
					<span className='card-title'>{name}</span>
				</div>
				<div className='card-content'>
					<p>
						Member since:{' '}
						<span className='blue-text'>
							<FormatDate createdAt={createdAt} />
						</span>
					</p>
				</div>
				<div className='card-action'>
					<Link href='/dev/[id]' as={`/dev/${_id}`}>
						<a>Explore</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

DevItem.propTypes = {
	user: PropTypes.object.isRequired,
};

export default DevItem;
