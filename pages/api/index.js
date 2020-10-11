export default (req, res, next) => {
	return res.status(200).json({ success: true, msg: 'API up and running' });
};
