import PropTypes from 'prop-types';

const DevItem = ({ user: { name, image, createdAt } }) => {
	return (
		<div className='card grey darken-4'>
			<div className='card-content'>
				<span className='card-title'>{name}</span>
				<div className='card-image'>
					<img src={image} alt={name} />
				</div>
			</div>
		</div>
	);
};

DevItem.propTypes = {
	user: PropTypes.object.isRequired,
};

export default DevItem;
