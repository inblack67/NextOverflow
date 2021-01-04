import Moment from 'react-moment';
import PropTypes from 'prop-types';

const FormatDate = ({ createdAt }) => {
	let finalDate = null;
	const date = new Date(createdAt);
	if (isNaN(date.getTime)) {
		finalDate = new Date(+createdAt);
	} else {
		finalDate = date;
	}
	return <Moment date={finalDate} format='MMMM Do YYYY' />;
};

FormatDate.propTypes = {
	createdAt: PropTypes.number.isRequired,
};

export default FormatDate;
