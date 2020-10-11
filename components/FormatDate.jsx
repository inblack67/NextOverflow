import Moment from 'react-moment';
import PropTypes from 'prop-types';

const FormatDate = ({ createdAt }) => {
	return <Moment date={createdAt} format='MMMM Do YYYY' />;
};

FormatDate.propTypes = {
	createdAt: PropTypes.number.isRequired,
};

export default FormatDate;
