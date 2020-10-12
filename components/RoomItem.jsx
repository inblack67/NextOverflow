import Link from 'next/link';
import FormatDate from './FormatDate';
import PropTypes from 'prop-types'


const RoomItem = ({ room: { title, createdAt, _id, description } }) => {
	return (
		<div className='col s12 m6 l6'>
			<div className='card grey darken-4 small'>
				<div className='card-content'>
					<span className='card-title red-text'>{title}</span>
					<p>{description}</p>
					<p>
						Created On:{' '}
						<span className='blue-text'>
							<FormatDate createdAt={createdAt} />
						</span>
					</p>
				</div>
				<div className='card-action'>
					<Link href='/room/[id]' as={`/room/${_id}`}>
						<a>Join</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

RoomItem.propTypes = {
	room: PropTypes.object.isRequired,
}

export default RoomItem;
