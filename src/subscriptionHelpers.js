import MessageModel from '../models/Message';

export const subscribers = [];
export const onMessageUpdates = (fn) => subscribers.push(fn);

export const getMessages = async () => {
	return await MessageModel.find().populate('user');
};
